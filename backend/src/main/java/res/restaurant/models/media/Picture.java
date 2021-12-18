package vietnam.restaurant.models.media;

import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import vietnam.restaurant.models.products.Product;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Set;

@Entity
@Table(name = "pictures")
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "picture", nullable = false)
    @Lob
    private byte[] picture;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "picture")
//    private Set<Product> products;

    public Picture() {
    }

    public Picture(byte[] picture, String type) {
        this.picture = picture;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

//    public Set<Product> getProducts() {
//        return products;
//    }
//
//    public void setProducts(Set<Product> products) {
//        this.products = products;
//    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
