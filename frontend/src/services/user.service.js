import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getRequestRole(){
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getUserBoard(id) {
    return axios.get(API_URL + 'orderByUser/' + id, { headers: authHeader() });
  }

  requestCancel(id, order){
    return axios.put(API_URL + "requestCancel/" + id, order, { headers: authHeader() })
  }

  getWaiterBoard(){
    return axios.get(API_URL + 'waiter', { headers: authHeader() });
  }

  servedOrder(id){
    return axios.put(API_URL + "served/" + id, id, { headers: authHeader() })
  }

  getCashierBoard(){
    return axios.get(API_URL + 'cashier', { headers: authHeader() });
  }

  paidOrder(id){
    return axios.put(API_URL + "paid/" + id, id, { headers: authHeader() })
  }

  getChefBoard(){
    return axios.get(API_URL + 'chef', { headers: authHeader() });
  }

  cookedOrder(id){
    return axios.put(API_URL + "cooked/" + id, id, { headers: authHeader() })
  }

  cancelOrder(id, order){
    return axios.put(API_URL + "cancel/" + id, order, { headers: authHeader() })
  }

  getManagerBoard() {
    return axios.get(API_URL + 'manager', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

}

export default new UserService();
