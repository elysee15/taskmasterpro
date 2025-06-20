import Axios, { AxiosError } from "axios";
import { env } from "config/env";

export const apiClient = Axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     // let message;
//     // const status = error.response?.status || error.status;
//     // switch (status) {
//     //   case 401:
//     //     message = "Vous devez être connecté pour effectuer cette action.";
//     //     break;
//     //   case 403:
//     //     message = "Vous n'avez pas la permission d'effectuer cette action.";
//     //     break;
//     //   case 404:
//     //     message = "La ressource demandée n'a pas été trouvée.";
//     //     break;
//     //   default:
//     //     message = "Une erreur inconnue est survenue, veuillez réessayer.";
//     //     break;
//     // }
//     // console.error(error);
//     return Promise.reject(error);
//   }
// );
