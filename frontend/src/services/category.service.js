import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8082/api/categories/";

class CategoryService {
    getAllCategories(){
        return axios.get(API_URL + "all");
    }

    getListParent(id){
        return axios.get(API_URL + "all/" + id)
    }

    getCategoryById(id){
        return axios.get(API_URL + id);
    }

    addNewCategory(request) {
        return axios.post(API_URL + "add", request, { headers: authHeader() });
    }

    updateCategory(id, request) {
        return axios.put(API_URL + "edit/"+ id, request, { headers: authHeader() });
    }
   
    deleteCategory(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }
}
export default new CategoryService();