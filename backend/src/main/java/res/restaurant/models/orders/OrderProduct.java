package vietnam.restaurant.models.orders;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import vietnam.restaurant.models.products.Product;

import javax.persistence.*;

@Entity
@Table(name = "order_products")
public class OrderProduct {

    @EmbeddedId
    private OrderProductKey id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "sell_price", nullable = false)
    private Float sellPrice;

    @Column(name = "quantity", nullable = false)
    private Float quantity;

    public OrderProduct() {
    }

    public OrderProduct(OrderProductKey id, Order order, Product product, Float sellPrice, Float quantity) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.sellPrice = sellPrice;
        this.quantity = quantity;
    }

    public OrderProductKey getId() {
        return id;
    }

    public void setId(OrderProductKey id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Float getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(Float sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Float getQuantity() {
        return quantity;
    }

    public void setQuantity(Float quantity) {
        this.quantity = quantity;
    }
}
