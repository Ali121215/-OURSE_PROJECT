package vietnam.restaurant.loaders.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.multipart.MultipartFile;
import vietnam.restaurant.models.media.Picture;
import vietnam.restaurant.models.products.EUnit;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.io.IOException;

public class ProductRequest {
    @NotBlank
    String name;

    String sku;

    @NotNull
    float price;

    @Enumerated(EnumType.STRING)
    EUnit unit;

    @JsonProperty
    @NotNull
    boolean isShowOnHomepage;

    @JsonProperty
    @NotNull
    boolean isEnteredPrice;

    Long pictureId;

    Long categoryId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public boolean isShowOnHomepage() {
        return isShowOnHomepage;
    }

    public void setShowOnHomepage(boolean showOnHomepage) {
        isShowOnHomepage = showOnHomepage;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public boolean isEnteredPrice() {
        return isEnteredPrice;
    }

    public void setEnteredPrice(boolean enteredPrice) {
        isEnteredPrice = enteredPrice;
    }

    public EUnit getUnit() {
        return unit;
    }

    public void setUnit(EUnit unit) {
        this.unit = unit;
    }

    public Long getPictureId() {
        return pictureId;
    }

    public void setPictureId(Long pictureId) {
        this.pictureId = pictureId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
