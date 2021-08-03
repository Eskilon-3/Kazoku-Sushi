import { createOrder } from "../api";
import CheckoutSteps from "../components/CheckoutSteps";
import { cleanCart, getCartItems, getPayment, getShipping } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0){
        document.location.hash = '/cart';
    }

    const shipping = getShipping();
    if(!shipping.address){
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash  = '/payment';
    }

    const itemsPrice = orderItems.reduce((a,c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100? 0: 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100)/100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }
}

const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById("placeorder-button")
        .addEventListener('click', async() => {
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);
            hideLoading();
    
            if(data.error){
                showMessage(data.error);
            } else {
                cleanCart();
                document.location.hash = `/order/${data.order._id}`;
            }
        });
       
    },

    render: () => {
        const {
            orderItems,
            shipping,
            payment,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice, } = convertCartToOrder();
            return `
                <div>
                    ${CheckoutSteps.render({step1: true, step2: true, step3: true, step4: true,})}
                    <div class="order">
                        <div class="order-info"> 
                            <div>
                                <h2>Expedição</h2>
                                <div>
                                    ${shipping.address}, ${shipping.city}, ${shipping.postalCode}
                                </div>
                            </div>
                                <div>
                                    <h2>Pagamento</h2>
                                        <div>
                                        Método de pagamento: ${payment.paymentMethod}
                                        </div>  
                                </div>
                                    <div>
                                        <ul class="cart-list-container">
                                                <li>
                                                    <h2>Carrinho de compras</h2>
                                                        <div>Preço</div>
                                                </li>
                                                ${
                                                    orderItems.map(item => `
                                                    <li>
                                                        <div class="cart-image">
                                                            <img src="${item.image}" alt="${item.name}"/>
                                                        </div>
                                                        <div class="cart-name">
                                                            <div>
                                                                <a href="/#/product/${item.product}">${item.name}</a>
                                                            </div>
                                                            <div>Quantidade: ${item.qty} </div>
                                                        </div>
                                                        <div class="class-price"> R$${item.price}</div>
                                                    </li>

                                                    `)
                                                }
                                        </ul>
                                    </div>
                        </div>

                        <div class="order-action">
                                <ul>
                                  <li>
                                    <h2>Resumo do Pedido</h2>
                                  </li>
                                  <li> <div>Itens</div> <div>R$${itemsPrice}</div></li>
                                  <li> <div>Expedição</div> <div>R$${shippingPrice}</div></li>
                                  <li> <div>Taxa</div> <div>R$${taxPrice}</div></li>
                                  <li class="total"> <div>Pedido Total</div> <div>R$${totalPrice}</div></li>
                                  <li>
                                  <button id="placeorder-button" class="primary fw">Enviar Pedido</button>
                                   
                        </div>
                    </div>  
                </div>      

            `;
        
    },
};

export default PlaceOrderScreen;