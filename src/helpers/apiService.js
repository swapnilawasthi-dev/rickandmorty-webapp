import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const apiService = async (type,query) =>  {
    try {
      const response = await axios.get(`${BASE_URL}/${type}/${query? '?'+query : ''}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  }

export default apiService;