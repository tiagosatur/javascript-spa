import { getHeadersOptions, endpoints } from '../../services'

/* 
* Pagination requirements:
* load on first page
* able to navigate to page numbers
* able to go to the next/prev pages
* Limit of 10 items per page
* calculate the max page number based on max items perpage
*/
function Pagination(fetchedData) {
    const prevButton = document.getElementById('pagination-prev-button');
    const nextButton = document.getElementById('pagination-prev-button');
    const clickPageNumber = document.querySelectorAll('.clickPageNumber');

    const currentPage = 1;
    const recordsPerPage = 4;

    this.init = function() {
        changePage(1);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
    }

    let addEventListeners = function() {
        addEventListener('click', prevButton);
        addEventListener('click', nextButton);
    }

    /* let selectedPage = function()  {
        let pageNumber = document.getElementById('pagination__page-list').getElementsByClassName('clickPageNumber')

        for(let i = 0; i < pageNumber.length; i++) {
            if(i == currentPage -1) {
                pageNumber[i].style.opacity = '1.0'
            } else {
                pageNumber[i].style.opacity = '0.5';
            }
        }
    } */

    let numOfPages = function() {
        return Math.ceil(fetchedData.length / recordsPerPage)
    }

    let changePage = function(page) {
        const collectionList = document.getElementById('character__list');

        if(page < 1) {
            page =1;
        }

        collectionList.innerHTML = '';

        for(let i = (page -1) * recordsPerPage; i < (page * recordsPerPage) && i < fetchedData.length; i++) {
            collectionList.innerHTML += `
                <div class='objectBlock'>
                    ${fetchedData[i].adName}
                </div>
            `;
        }
    }

    
}

let getPostList = async() => {
    
    try {
        const response = await fetch(
            `${endpoints.charactersCollection}?page[limit]=4&page[offset]=0`, 
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
                <ul id='character__list' class='character__list' style='display: flex; flex-wrap: wrap; list-style: none;'>
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
                                    <!--<img style='width: 100%; height: auto;' src='${ imageURL }' />-->
                                    <h3>${ name }</h3>
                                    <p style='height: 90px; overflow: hidden'>${ description }</p>
                                </a>
                            </li>
                        `
                    }
                    ).join('\n')
                }
                </ul>
                <div class="pagination">
                    <button id='pagination-prev-button' class='button button__prev'>Prev</button>
                    <ul id='pagination__page-list' class="pagination__page-list">
                    <li class="pagination__item" >
                        <a class="pagination__link" href='#'>1</a>
                    </li>
                    <li class="pagination__item" >
                        <a class="pagination__link" href='#'>2</a>
                    </li>
                    <li class="pagination__item" >
                        <a class="pagination__link" href='#'>3</a>
                    </li>
                    </ul>
                    <button id='pagination-next-button' class='button button__next'>Prev</button>
                </div>
            </section>
        `
        return view;
    },
    after_render: async () => {},
}

export default Home;