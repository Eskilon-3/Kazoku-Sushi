import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl, rerender } from "../utils";

const addToCart = (item, forceUpdate = false) =>{
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if(existItem){
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product? item : x);
        }
    } else {
        cartItems = [...cartItems, item];
    }
    
    setCartItems(cartItems);
    if(forceUpdate){
        rerender(CartScreen);
    }
    
}

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if(id === parseRequestUrl().id){
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }
}
const CartScreen = {
        after_render: ()=>{
            
           const deleteButtons = document.getElementsByClassName("delete-button");
            Array.from(deleteButtons).forEach(deleteButton => {
                deleteButton.addEventListener('click', ()=> {
                    removeFromCart(deleteButton.id);
                })
            });
            document.getElementById("checkout-button").addEventListener('click', ()=> {
                document.location.hash = '/signin';
            })
        },
        render: async ()=>{
            const request = parseRequestUrl();
            if(request.id){
                const product = await getProduct(request.id);
                addToCart({
                    product: product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    countInStock: product.countInStock,
                    qty: 1,
                });
                    
                
            }
            const cartItems = getCartItems();
            return `
            <div class="content cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Carrinho de compras</h3>
                            <div>Preço</div>
                        </li>
                        ${
                            cartItems.length === 0?
                            `<div>Carrinho está vazio. <a href="/#/">Vá comprar</a>`:
                            cartItems.map(item => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}" />
                                    </div>
                                    <div class="cart-name">
                                        <div>
                                            <a href="/#/product/${item.product}">
                                                ${item.name}
                                            </a>
                                        </div>

                                        <div>
                                            
                                            <button type="button" class="delete-button" id="${item.product}">
                                                Deletar
                                            </button>
                                        </div>
                                    </div>

                                    <div class="cart-price">
                                        $${item.price}
                                    </div>
                                </li>
                            `).join('\n')
                        }
                    </ul>
                </div>
                <div class="cart-action">
                    <h3>
                        Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} itens)
                        :
                        R$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </h3>
                    <button id="checkout-button" class="primary fw">
                        Proceder para o Checkout 
                    </button>
                </div>
            </div>`;
        },
};

export default CartScreen;