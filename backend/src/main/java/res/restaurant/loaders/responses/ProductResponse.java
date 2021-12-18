package vietnam.restaurant.loaders.responses;

import vietnam.restaurant.models.products.EUnit;

import java.net.URI;

public class ProductResponse {
    private Long id;

    private String name;

    private String sku;

    private boolean isShowOnHomepage;

    private Float price;

    private boolean isEnteredPrice;

    private EUnit unit;

    private Long pictureId;

    private Long categoryId;

    private String pictureUri;

    public ProductResponse() {
    }

    public ProductResponse(Long id, String name, String sku, boolean isShowOnHomepage, Float price, boolean isEnteredPrice, EUnit unit) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.isShowOnHomepage = isShowOnHomepage;
        this.price = price;
        this.isEnteredPrice = isEnteredPrice;
        this.unit = unit;
    }

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

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPictureUri() {
        return pictureUri;
    }

    public void setPictureUri(String pictureUri) {
        this.pictureUri = pictureUri;
    }
}
