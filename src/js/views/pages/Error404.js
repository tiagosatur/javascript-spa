let Error404 = {
    render: async () => {
        let view = `
            <h1>Error 404</h1>
        `;
        return view;
    },
    after_render: async () => {},
}

export default Error404;