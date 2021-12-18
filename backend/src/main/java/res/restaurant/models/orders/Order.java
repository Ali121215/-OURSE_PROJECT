package vietnam.restaurant.models.orders;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import vietnam.restaurant.models.users.User;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total", nullable = false)
    private Float total;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20, nullable = false)
    private EOrderStatus status;

    private String note;

    @Column(name = "created_on", nullable = false)
    private String createdOn;

    @Column(name = "updated_on")
    private String updatedOn;

    @Column(name = "position")
    private Long position;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id")
    private User user;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
//    private Set<OrderProduct> orderProducts = new HashSet<>();

    public Order() {
    }

    public Order(EOrderStatus status, String note, String createdOn, Long position) {
        this.status = status;
        this.note = note;
        this.createdOn = createdOn;
        this.position = position;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public EOrderStatus getStatus() {
        return status;
    }

    public void setStatus(EOrderStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public String getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(String updatedOn) {
        this.updatedOn = updatedOn;
    }

    public Long getPosition() {
        return position;
    }

    public void setPosition(Long table) {
        this.position = position;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
//
//    public Set<OrderProduct> getOrderProducts() {
//        return orderProducts;
//    }
//
//    public void setOrderProducts(Set<OrderProduct> orderProducts) {
//        this.orderProducts = orderProducts;
//    }
}
