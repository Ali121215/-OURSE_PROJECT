import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8082/api/products/";

class ProductService {
    getAllProducts(){
        return axios.get(API_URL + "all");
    }

    getAllProductsByCategory(categoryId){
        return axios.get(API_URL + "all/" + categoryId);
    }
    
    getProductById(id){
        return axios.get(API_URL + id);
    }

    addNewProduct(request) {
        return axios.post(API_URL + "add", request, { headers: authHeader() });
    }

    updateProduct(id, request) {
        return axios.put(API_URL + "edit/"+ id, request, { headers: authHeader() });
    }
   
    deleteProduct(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }

    uploadPicture(formData){
        return axios.post(API_URL + "picture/upload", formData, { headers: authHeader() });
    }
}
export default new ProductService();