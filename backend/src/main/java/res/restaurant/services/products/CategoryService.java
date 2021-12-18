package vietnam.restaurant.services.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vietnam.restaurant.loaders.requests.CategoryRequest;
import vietnam.restaurant.loaders.responses.CategoryResponse;
import vietnam.restaurant.loaders.responses.CategoryItem;
import vietnam.restaurant.loaders.responses.CategoryTreeItem;
import vietnam.restaurant.models.products.Category;
import vietnam.restaurant.repository.products.CategoryRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllSubCategories(Category parent){
        var subList = new ArrayList<Category>();
        categoryRepository.findAll().forEach(category -> {
            if(category.getParentCategory() == parent)
                subList.add(category);
        });
        return subList;
    }

    public List<CategoryTreeItem> getTreeCategory(){
        //Level 0
        var tree = new ArrayList<CategoryTreeItem>();
        //Find sub item
        categoryRepository.findAll().forEach(category -> {
            if(category.getParentCategory() == null)
                tree.add(getAllSubTreeItem(category, 0));
        });
        return tree;
    }

    public CategoryTreeItem getAllSubTreeItem(Category item, int level){
        var treeItem = new CategoryTreeItem(item.getId(), item.getName(), level);
        // Get all sub item
        var subList = new ArrayList<CategoryTreeItem>();
        categoryRepository.findAll().forEach(category -> {
            if(category.getParentCategory() == item)
                subList.add(getAllSubTreeItem(category, level + 1));
        });
        treeItem.setSubCategories(subList);
        return treeItem;
    }

    public List<CategoryItem> getAllCategories(Long id){
        //Level 0
        var tree = new ArrayList<CategoryItem>();
        if (id != 0) {
            tree.add(new CategoryItem((long)0, "None", 0));
        }
        //Find sub item
        var treeCategory = getTreeCategory();
        treeCategory.forEach(item -> {
            if(item.getId() != id){
                tree.addAll(convertTreeToListItem(item, id));
            }
        });
        return tree;
    }

    List<CategoryItem> convertTreeToListItem(CategoryTreeItem treeItem, Long id){
        var listItem = new ArrayList<CategoryItem>();
        //Parent
        listItem.add(convertTreeToItem(treeItem));
        //Sub
        treeItem.getSubCategories().forEach(item -> {
            if(item.getId() != id){
                listItem.addAll(convertTreeToListItem(item, id));
            }
        });
        return listItem;
    }

    public CategoryItem convertTreeToItem(CategoryTreeItem item){
        if(item.getLevel() > 0) {
            return new CategoryItem(item.getId(),
                    "|" + "----".repeat(item.getLevel()) + "> " + item.getName(),
                    item.getLevel()
            );
        }
        else {
            return new CategoryItem(item.getId(), item.getName(), item.getLevel());
        }
    }

    public CategoryResponse convertCategoryToResponse(Category category){
        CategoryResponse categoryResponse = new CategoryResponse(category.getId(),
                category.getName());
        if(category.getParentCategory() != null) {
            categoryResponse.setParentId(category.getParentCategory().getId());
        }
        else {
            categoryResponse.setParentId((long) 0);
        }
        return categoryResponse;
    }

    public Category convertRequestToCategory(Category cat, CategoryRequest categoryRequest) {
        var category = new Category();
        if(cat != null)
            category.setId(cat.getId());
        //Set value
        category.setName(categoryRequest.getName());
        if(categoryRequest.getParentId() != null && categoryRequest.getParentId() > 0)
        {
            var parent = categoryRepository.findById(categoryRequest.getParentId())
                    .orElseThrow(() -> new RuntimeException("Error: Parent category not found."));
            category.setParentCategory(parent);
        }
        else{
            category.setParentCategory(null);
        }
        return category;
    }
}
