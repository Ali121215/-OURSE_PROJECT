package vietnam.restaurant.loaders.responses;

import java.util.HashSet;
import java.util.List;

public class CategoryTreeItem {
    Long id;

    String name;

    int level;

    List<CategoryTreeItem> subCategories;

    CategoryTreeItem(){
    }

    public CategoryTreeItem(Long id, String name, int level) {
        this.id = id;
        this.name = name;
        this.level = level;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public List<CategoryTreeItem> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<CategoryTreeItem> subCategories) {
        this.subCategories = subCategories;
    }
}
