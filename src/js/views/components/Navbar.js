import { utils } from '../../services';

let Navbar = {
    render: async () => {
        let view = `
            <section>
                <nav>
                    <ul>
                        <li><a href='#/'>Home</a></li>
                        <li><a href='#/about'>About</a></li>
                    </ul>
                </nav>
                
            </section>
        `
        return view;
    },
    after_render: async () => {},
}

export default Navbar;