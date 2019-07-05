import { Home, About, CharacterDetail, Register, Error404 } from '../views/pages';

const utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        
        let r = url.split('/');
        let request = {
            resource : null,
            id: null,
            verb: null,
        }
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    },
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    routes: {
        '/'          : Home,
        '/about'     : About,
        '/character/:id' : CharacterDetail,
        '/register'  : Register,
    },
    onNavItemClick: function (pathName) {
        const content = null || document.getElementById('page_container');
        
        window.history.pushState(
          {}, 
          pathName,
          window.location.origin + pathName
        );
        content.innerHTML = this.routes[pathName];
    },

    
};


export default utils;