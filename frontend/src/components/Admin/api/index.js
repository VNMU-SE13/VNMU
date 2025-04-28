// import axios from "axios";

// const BASE_URL = "http://localhost:5246/api/";

// export const ENDPIONTS = {
//   CategoryArtifact: "CategoryArtifact",
//   Artifact: "Artifact",
//   Museum: "Museum",
//   User: "User",
//   Role: "Role",
//   Historical: "Historical",
//   CategoryHistorical: "CategoryHistorical",
//   Figure: "Figure",
//   CategoryFigure: "CategoryFigure",
//   Event: "Event",
//   Blog: "Blog",
//   Apply: "Apply",
//   Report: "Report",
//   CategoryProduct: "CategoryProduct",
//   Product: "Product",
//   Quiz: "Quiz",
//   Question: "Question",
//   Answer: "Answer",
// };

// export const createAPIEndpoint = (endpoint) => {
//   let url = BASE_URL + endpoint + "/";

//   return {
//     fetchAll: () => axios.get(url),
//     fetchById: (id) => axios.get(url + id),
//     create: (newRecord) => {
//       if (
//         (endpoint === ENDPIONTS.Artifact || endpoint === ENDPIONTS.Event) &&
//         newRecord instanceof FormData
//       ) {
//         return axios.post(url, newRecord, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       return axios.post(url, newRecord);
//     },
//     update: (id, updatedRecord) => {
//       // Xử lý riêng cho cập nhật Role
//       if (endpoint === ENDPIONTS.User && updatedRecord.newRole) {
//         return axios.put(`${BASE_URL}User/updateRole`, updatedRecord);
//       }
//       return axios.put(url + id, updatedRecord);
//     },
//     delete: (id) => axios.delete(url + id),

//     lockUser: (userId) => axios.post(`${BASE_URL}User/lock/${userId}`),
//     unlockUser: (userId) => axios.post(`${BASE_URL}User/unlock/${userId}`),
//   };
// };
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/";

export const ENDPIONTS = {
  CategoryArtifact: "CategoryArtifact",
  Artifact: "Artifact",
  Museum: "Museum",
  User: "User",
  Role: "Role",
  Historical: "Historical",
  CategoryHistorical: "CategoryHistorical",
  Figure: "Figure",
  CategoryFigure: "CategoryFigure",
  Event: "Event",
  Blog: "Blog",
  Apply: "Apply",
  Report: "Report",
  CategoryProduct: "CategoryProduct",
  Product: "Product",
  Quiz: "Quiz",
  Question: "Question",
  Answer: "Answer",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => {
      if (
        (endpoint === ENDPIONTS.Artifact || endpoint === ENDPIONTS.Event) &&
        newRecord instanceof FormData
      ) {
        return axios.post(url, newRecord, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      return axios.post(url, newRecord);
    },
    update: (id, updatedRecord) => {
      if (
        (endpoint === ENDPIONTS.Artifact || endpoint === ENDPIONTS.Event) &&
        updatedRecord instanceof FormData
      ) {
        return axios.put(url + id, updatedRecord, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      if (endpoint === ENDPIONTS.User && updatedRecord.newRole) {
        return axios.put(`${BASE_URL}User/updateRole`, updatedRecord);
      }
      return axios.put(url + id, updatedRecord);
    },
    delete: (id) => axios.delete(url + id),

    lockUser: (userId) => axios.post(`${BASE_URL}User/lock/${userId}`),
    unlockUser: (userId) => axios.post(`${BASE_URL}User/unlock/${userId}`),
  };
};
