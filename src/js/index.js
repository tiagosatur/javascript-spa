import "core-js/stable";
import "regenerator-runtime/runtime";
import '../style/main.scss';

import { Home, About, CharacterDetail, Register, Error404 } from './views/pages';

import { utils } from './services'
import { Navbar, Footer } from "./views/components";

const routes = {
    '/'          : Home,
    '/about'     : About,
    '/character/:id'     : CharacterDetail,
    '/register'  : Register,
};

const router = async () => {
    const navbar = null  || document.getElementById('navbar_container')
    const content = null || document.getElementById('page_container');
    const footer = null  || document.getElementById('footer_container')

    let request = utils.parseRequestURL();

    let parsedURL = 
        (request.resource ? `/${request.resource}` : '/') + 
        (request.id ? `/:id` : '') +
        (request.verb ? `/${request.verb}` : '');
        
    let page = routes[parsedURL] ? routes[parsedURL] : Error404

    navbar.innerHTML = await Navbar.render();
    await Navbar.after_render();


    content.innerHTML = await page.render();
    await page.after_render();
    
    
    footer.innerHTML = await Footer.render();
    await Footer.after_render();
};

window.addEventListener('hashchange', router, false);

window.addEventListener('load', router);
