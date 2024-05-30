export function searchImages(query) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '44038258-5ed49f7c308af682a7282867b',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });

    const url = `${BASE_URL}?${params}`;

    return fetch(url)
        .then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    })
}

