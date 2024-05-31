

import axios from 'axios';


export async function searchImages(query, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '44038258-5ed49f7c308af682a7282867b',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 15,
        page: page,
    });

    const url = `${BASE_URL}?${params}`;
    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

