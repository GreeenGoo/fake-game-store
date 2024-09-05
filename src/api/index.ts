import axios from 'axios'

const isDevelopment = import.meta.env.MODE === 'development'
let baseURL = 'https://fs18-java-backend-uladzislau-krukouski.onrender.com/api/v1'

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = 'http://localhost:5125/api/v1'
}

const api = axios.create({
  baseURL
})

// use this to handle errors gracefully
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 500) {
//       throw new Error(error.response.data)
//     }
//   }
// )

export const getGameById = async (id: string) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching game data');
  }
};

export default api
