import { getProduct } from "../api";
import Rating from "../components/rating";
import { hideLoading, parseRequestUrl, showLoading } from "../utils";

const ProductScreen = {
    after_render: ()=>{
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click',
            ()=> {
                document.location.hash = `/cart/${request.id}`;
            }
        )
    },
    render: async ()=>{
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        if(product.error){
            return (`<div>${product.error}</div>`)
        }
        hideLoading();
        return `
            <div class="content">
                <div class="back-to-result">
                    <a href="/#/">Retonar a homepage</a>
                </div>
                <div class="details">
                    <div class="details-image">
                        <img src = "${product.image}" alt="${product.name}"/>
                    </div>
                    <div class="details-info">
                     <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({value: product.rating, 
                                                    text: `${product.numReviews} reviews`})}
                        </li>
                        <li>
                            Preço: <strong>R$${product.price}</strong>
                        </li>

                        <li>
                            Descrição: <strong>${product.description}</strong>
                        </li>
                        
                      </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>
                                Preço: R$${product.price}
                            </li>
                                

                            <li>
                                <button id="add-button" class="fw primary">Adicionar ao carrinho</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },
};

export default ProductScreen;