const headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
};

const methods = {
    get: 'GET',
    post: 'POST',
};

export const endpoints = {
    charactersCollection: `https://kitsu.io/api/edge/characters`,
}

export const getHeadersOptions = {
    method: methods.get,
    headers,
};