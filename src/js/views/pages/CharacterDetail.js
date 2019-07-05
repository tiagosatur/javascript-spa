import { utils, getHeadersOptions, endpoints } from '../../services'

let getPost = async (id) => {
    try {
        const response = await fetch(`${endpoints.charactersCollection}/${id}`, getHeadersOptions);
        const json = await response.json();
        console.log('json', json);
        return json;
    } catch(err) {
        console.log('Error getting posts', err);
    }
};


let CharacterDetail = {
    render: async () => {
        let request = utils.parseRequestURL();
        let post = await getPost(request.id);
        const {
            data: {
                id,
                attributes: {
                    description,
                    name,
                    image: { original: imageURL }
                }
            }
        } = post;

        let view = `
        <section class="section">
            <h1> Id : ${id}</h1>
            <img src='${imageURL}' />
            <p> Name : ${name} </p>
            <p> Description : ${description} </p>
            <p> Post Author : ${name} </p>
        </section>
        `;
        return view;
    },
    after_render: async () => {},
}

export default CharacterDetail;