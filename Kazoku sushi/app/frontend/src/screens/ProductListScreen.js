import DashboardMenu from "../components/DashboardMenu";
import { createProduct, getProducts, deleteProduct } from "../api";
import  { showLoading, hideLoading, rerender, showMessage } from "../utils";

const ProductListScreen = {
  after_render: () => {
      document.getElementById('create-product-button')
      .addEventListener('click', async()=> {
          document.location.hash = `/productcreate`;
      });
      const editButtons = document.getElementsByClassName('edit-button');
      Array.from(editButtons).forEach(editbutton => {
          editbutton.addEventListener('click', ()=> {
              document.location.hash = `/product/${editbutton.id}/edit`;
          });
      });
      const deleteButtons = document.getElementsByClassName('delete-button');
      Array.from(deleteButtons).forEach((deletebutton)=> {
        deletebutton.addEventListener('click', async() => {
          console.log('dddd');
          if(confirm('Tem certeza que deseja deletar este produto?')){
            showLoading();
            const data = await deleteProduct(deletebutton.id);
            if(data.error){
              showMessage(data.error)
            } else {
              rerender(ProductListScreen);
            }
            hideLoading();
            
          }
        });
      });
  },

  render: async () => {
    const products = await getProducts();
    return `
        <div class="dashboard">
        ${DashboardMenu.render({ selected: "product" })}
        <div class="dashboard-content">
          <h1>Produtos</h1> 
          <button id="create-product-button" class="primary">
            Criar Produto
          </button>
          <div class="product-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>PREÇO</th>
                        <th>CATEGORIA</th>
                    </tr>
                </thead>
                <tbody>
                    ${products
                      .map(
                        (product) => `
                        <tr>
                          <td>${product._id}</td>
                          <td>${product.name}</td>
                          <td>${product.price}</td>
                          <td>${product.category}</td>
                          <td>
                            <button id="${product._id}" class="edit-button">Editar</button>
                          </td>
                          <td>
                          <button id="${product._id}" class="delete-button">Deletar</button>
                          </td>
                        </tr>

                    `
                      )
                      .join("\n")}
                </tbody>
            </table>
          </div>
        </div>
    </div>
        `;
  },
};

export default ProductListScreen;
