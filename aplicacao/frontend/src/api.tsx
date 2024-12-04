import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response, // Apenas retorna a resposta caso não haja erro
  (error) => {
    console.error("Erro na requisição", error);
    return Promise.reject(error);
  }
);

export default api;
