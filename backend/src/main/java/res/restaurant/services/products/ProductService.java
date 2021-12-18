package vietnam.restaurant.services.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.ProductResponse;
import vietnam.restaurant.models.products.Category;
import vietnam.restaurant.models.products.Product;
import vietnam.restaurant.repository.media.PictureRepository;
import vietnam.restaurant.repository.products.CategoryRepository;
import vietnam.restaurant.repository.products.ProductRepository;
import vietnam.restaurant.services.media.PictureService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    PictureRepository pictureRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    PictureService pictureService;

    @Autowired
    CategoryService categoryService;

    public List<Product> getAllProductsByCategory(Category category){
        var listProducts = new ArrayList<Product>();
        productRepository.findAll().forEach(product -> {
            if(product.getCategory() == category)
                listProducts.add(product);
        });

        categoryService.getAllSubCategories(category).forEach(subCategory -> {
            listProducts.addAll(getAllProductsByCategory(subCategory));
        });

        return listProducts;
    }

    public Product convertRequestToProduct(Product prd, ProductRequest productRequest) {
        var product = new Product();
        if(prd != null) {
            product.setId(prd.getId());
            if(prd.getPicture() != null && prd.getPicture().getId() != productRequest.getPictureId()) {
                var pic = prd.getPicture();
                prd.setPicture(null);
                pictureRepository.delete(pic);
            }
        }
        product.setName(productRequest.getName());
        product.setSku(productRequest.getSku());
        product.setPrice(productRequest.getPrice());
        product.setUnit(productRequest.getUnit());
        product.setShowOnHomepage(productRequest.isShowOnHomepage());
        product.setEnteredPrice(productRequest.isEnteredPrice());
        //Picture
        if(productRequest.getPictureId() != null){
            var picture = pictureRepository.findById(productRequest.getPictureId())
                    .orElseThrow(() -> new RuntimeException("Error: Picture not found."));
            product.setPicture(picture);
        }
        if(productRequest.getCategoryId() != null && productRequest.getCategoryId() > 0){
            var category = categoryRepository.findById(productRequest.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Error: Category not found."));
            product.setCategory(category);
        }
        else {
            product.setCategory(null);
        }
        return product;
    }

    //Response
    public ProductResponse convertProductToResponse(Product product){
        var productResponse = new ProductResponse(product.getId(), product.getName(), product.getSku(),
                product.isShowOnHomepage(), product.getPrice(), product.isEnteredPrice(), product.getUnit());
        if(product.getPicture() != null){
            productResponse.setPictureId(product.getPicture().getId());
            productResponse.setPictureUri(pictureService.getPictureUrl(product.getPicture()));
        }
        if(product.getCategory() != null) {
            productResponse.setCategoryId(product.getCategory().getId());
        }
        else {
            productResponse.setCategoryId((long)0);
        }
        return productResponse;
    }
}
