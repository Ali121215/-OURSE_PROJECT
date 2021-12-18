package vietnam.restaurant.loaders.requests;

import javax.validation.constraints.NotBlank;

public class CategoryRequest {
    @NotBlank
    String name;

    Long parentId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }
}
