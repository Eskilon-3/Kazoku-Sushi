import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";


const RegisterScreen = {
    after_render: () => {
        document.getElementById("register-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            showLoading();
            console.log("aqui");
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            } else{
                setUserInfo(data);
                console.log("cheguei aqui");
                redirectUser();
            }
        })
    },

    render: () => {
        if(getUserInfo().name) {
            redirectUser();
        }
        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Cadastro</h1>
                    </li>

                    <li>
                        <label for="name">Nome</label>
                        <input type="name" name="name" id="name"/>
                    </li>

                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email"/>
                    </li>

                    <li>
                        <label for="password">Senha</label>
                        <input type="password" name="password" id="password"/>
                    </li>

                    <li>
                        <label for="repassword">Digite a senha novamente</label>
                        <input type="password" name="repassword" id="repassword"/>
                    </li>

                    <li>
                        <button type="submit" class="primary">Cadastrar</button>
                    </li>

                    <li>
                        <div>
                            Já tem uma conta?
                            <a href="/#/signin">Login</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `
    },
};

export default RegisterScreen;