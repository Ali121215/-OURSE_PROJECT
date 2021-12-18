import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8082/api/orders/";

class OrderService {
    placeOrder(order){
        return axios.post(API_URL + 'add', order, { headers: authHeader() })
    }

    getAllOrder(){
        return axios.get(API_URL + 'all', { headers: authHeader() });
    }

    deleteOrder(id){
        return axios.delete(API_URL + id, { headers: authHeader() })
    }
}
export default new OrderService();