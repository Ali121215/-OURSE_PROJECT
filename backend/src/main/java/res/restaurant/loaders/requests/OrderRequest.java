package vietnam.restaurant.loaders.requests;

import java.util.*;

public class OrderRequest{

    private Float total;

    private String note;

    private String createOn;

    private String updateOn;

    private Long position;

    private Long user_id;

    private String status;

    private List<Long> product_ids;

    private List<Float> quantities;

    public List<Long> getProduct_ids() {
        return product_ids;
    }

    public void setProduct_ids(List<Long> product_ids) {
        this.product_ids = product_ids;
    }

    public List<Float> getQuantities() {
        return quantities;
    }

    public void setQuantities(List<Float> quantities) {
        this.quantities = quantities;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getCreateOn() {
        return createOn;
    }

    public void setCreateOn(String createOn) {
        this.createOn = createOn;
    }

    public String getUpdateOn() {
        return updateOn;
    }

    public void setUpdateOn(String updateOn) {
        this.updateOn = updateOn;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long position) {
        this.position = position;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
