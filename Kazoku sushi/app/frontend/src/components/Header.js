import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const {name, isAdmin} = getUserInfo();
    return `<div class="brand">
        <a href="/#/">Kazoku sushi</a>
    </div>

    <div>
    ${name ? `<a href="/#/profile">${name}</a>`: `<a href="/#/signin">Login</a>`}
        
        <a href="/#/cart">Carrinho</a>
        ${isAdmin? `<a href="/#/dashboard">Dashboard</a>`: ''}
    </div>`;
  },

  after_render: () => {},
};

export default Header;
