import DashboardMenu from "../components/DashboardMenu";
import { getOrders, deleteOrder } from "../api";
import { showLoading, hideLoading, rerender, showMessage } from "../utils";

const OrderListScreen = {
  after_render: () => {
    const deleteButtons = document.getElementsByClassName("delete-button");
    Array.from(deleteButtons).forEach((deletebutton) => {
      deletebutton.addEventListener("click", async () => {
        if (confirm("Tem certeza que deseja deletar este pedido?")) {
          showLoading();
          const data = await deleteOrder(deletebutton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen);
          }
          hideLoading();
        }
      });
    });

    const editButtons = document.getElementsByClassName("edit-button");
    Array.from(editButtons).forEach((editbutton) => {
      editbutton.addEventListener("click", async () => {
        document.location.hash = `/order/${editbutton.id}`;
      });
    });
  },

  render: async () => {
    const orders = await getOrders();
    if (orders === 'undefined'){
      return ` <div> Sem Pedidos</div>`
    }
    return `
        <div class="dashboard">
        ${DashboardMenu.render({ selected: "order" })}
        <div class="dashboard-content">
          <h1>Pedidos</h1> 
          
          <div class="order-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATA</th>
                        <th>TOTAL</th>
                        <th>USUÁRIO</th>
                        <th>PAGO EM</th>
                        <th>ENTREGUE EM</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders
                      .map(
                        (order) => `
                        <tr>
                          <td>${order._id}</td>
                          <td>${order.createdAt}</td>
                          <td>${order.totalPrice}</td>
                          <td>${order.user.name}</td>
                          <td>${order.paidAt || "Não"}</td>
                          <td>${order.deliveredAt || "Não"}</td>
                          <td>
                            <button id="${
                              order._id
                            }" class="edit-button">Editar</button>
                           
                          </td>
                          <td>
                          <button id="${
                            order._id
                          }" class="delete-button">Deletar</button>
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

export default OrderListScreen;
