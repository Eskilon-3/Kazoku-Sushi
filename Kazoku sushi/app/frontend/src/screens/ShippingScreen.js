import CheckoutSteps from "../components/CheckoutSteps";
import { getUserInfo, getShipping, setShipping } from "../localStorage";
import {showMessage} from "../utils";



const ShippingScreen = {
    after_render: () => {
        
        document.getElementById("shipping-form")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const endereco = document.getElementById('address').value
            const cidade = document.getElementById('city').value
            const codigopsotal = document.getElementById('postalCode').value
            
            let regex = /\d/
            console.log(typeof cidade);
            console.log(typeof endereco);
            console.log(typeof codigopsotal);

            if(endereco === '' || cidade === '' || codigopsotal  === '') {
                    showMessage('Preencha todos os campos');
                }
                else {
                    if(regex.test(cidade)){
                        showMessage('Não é permitido números no campo de cidade');
                        
                        return
                    } 
                     if(codigopsotal.length < 8) {
                        showMessage('Codigo postal tem que ter no mínimo 8 números');
                        console.log('chegou');
                        return
                    } 
                    setShipping({
                        address: document.getElementById('address').value,
                        city: document.getElementById('city').value,
                        postalCode: document.getElementById('postalCode').value,
                    })
                    document.location.hash = '/payment';
                }
            
           
        });
    },

    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }
        const { address, city, postalCode} = getShipping();
        return `
        ${CheckoutSteps.render({ step1: true, step2: true })}
        <div class="form-container">
            <form id="shipping-form">
                <ul class="form-items">
                    <li>
                        <h1>Expedição</h1>
                    </li>

                    <li>
                        <label for="address">Endereço</label>
                        <input type="text" name="address" id="address" value = "${address}"/>
                    </li>

                    <li>
                        <label for="city">Cidade</label>
                        <input type="text" name="city" id="city" value = "${city}"/>
                    </li>

                    <li>
                        <label for="postalCode">Código Postal</label>
                        <input type="number" name="postalCode" id="postalCode" value = "${postalCode}"/>
                    </li>

                    <li>
                        <button type="submit" class="primary">Continuar</button>
                    </li>

                </ul>
            </form>
        </div>
        `;
    },
};

export default  ShippingScreen;   