import { createProduct, uploadProductImage } from "../api";
import { showLoading, showMessage, hideLoading } from "../utils";

const ProductEditScreen = {
  after_render: () => {
    document
      .getElementById("create-product-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await createProduct({
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
          image: document.getElementById("image").value,
          category: document.getElementById("category").value,
          description: document.getElementById("description").value,
        });

        hideLoading();
        if(data.error){
          showMessage(data.error);
        } else {
          document.location.hash = '/productlist';
          console.log(data.image);
         
        }
      });

      document.getElementById('image-file')
      .addEventListener('change', async(e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        showLoading();
        const data = await uploadProductImage(formData);
        hideLoading();
        if(data.error){
          showMessage(data.error)
        } else {
          showMessage('Imagem adicionada com sucesso');
          document.getElementById('image').value = data.image;
          console.log(data.image);
        }
      })
  },

  render: async () => {
    return `
        <div class="content">
            <div>
                <a href="/#/productlist">Voltar aos produtos</a>
            </div>
            <div class="form-container">
                <form id="create-product-form">
                    <ul class="form-items">
                        <li>
                            <h1>Criar Produto</h1>
                        </li>
                        <li>
                            <label for="name">Nome</label>
                            <input type="text" name="name" id="name" />
                        </li>
                        <li>
                            <label for="price">Preço</label>
                            <input type="number" name="price" id="price" />
                        </li>
                        <li>
                            <label for="image">Imagem (680 x 830)</label>
                            <input type="text" name="image" id="image" />
                            <input type="file" name="image-file" id="image-file" />
                        </li>
                        <li>
                            <label for="category">Categoria</label>
                            <input type="text" name="category" id="category" />
                        </li>
                        <li>
                            <label for="description">Descrição</label>
                            <input type="text" name="description" id="description" />
                        </li>
                        <li>
                            <button type="submit" class="primary">Criar Produto</button>
                        </li>
                    </ul>
                </form>
            </div> 
        </div>
      `;
  },
};

export default ProductEditScreen;
