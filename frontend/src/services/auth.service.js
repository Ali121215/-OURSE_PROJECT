import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8082/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getUserById(userId){
    return axios.get(API_URL + userId)
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  adminUpdateUser(userId, user){
    return axios.put(API_URL + "admin-update-user/" + userId, user, { headers: authHeader() })
  }

  managerUpdateUser(userId, user){
    return axios.put(API_URL + "manager-update-user/" + userId, user, { headers: authHeader() })
  }

  userUpdateUser(userId, user){
    return axios.put(API_URL + "user-update-user/" + userId, user)
  }

  deleteUser(userId){
    return axios.delete(API_URL + userId, { headers: authHeader() });
  }

  userRequest(userId, request){
    return axios.put(API_URL + "user-request-role/" + userId, request)
  }
  
}

export default new AuthService();
