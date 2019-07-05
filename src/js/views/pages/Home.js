import { getHeadersOptions, endpoints } from '../../services'

/* 
* Pagination requirements:
* load on first page
* able to navigate to page numbers
* able to go to the next/prev pages
* Limit of 10 items per page
* calculate the max page number based on max items perpage
*/


let getPostList = async() => {
    try {
        const response = await fetch(
            `${endpoints.charactersCollection}?page[limit]=20&page[offset]=20`, 
            getHeadersOptions
            );
        const json = await response.json();
        console.log('json', json);
        return json;
    } catch(err) {
        console.log('Error getting posts', err);
    }
};

let Home = {
    render: async () => {
        let posts = await getPostList();
        let view = `
            <section>
                <h1>Home</h1>
                <ul style='display: flex; flex-wrap: wrap; list-style: none;'>
                ${
                    posts.data.map(post => {
                        const {
                            id,
                            attributes: {
                                image: { original: imageURL },
                                name,
                                description
                            }
                        } = post;

                        return `
                            <li style='max-width: 20%; padding: 8px;'>
                                <a href='#/character/${ id }' style='text-decoration: none;'>
                                    <img style='width: 100%; height: auto;' src='${ imageURL }' />
                                    <h3>${ name }</h3>
                                    <p style='height: 90px; overflow: hidden'>${ description }</p>
                                </a>
                            </li>
                        `
                    }
                    ).join('\n')
                }
                </ul>
            </section>
        `
        return view;
    },
    after_render: async () => {},
}

export default Home;