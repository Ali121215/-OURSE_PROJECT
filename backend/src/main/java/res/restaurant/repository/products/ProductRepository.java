package vietnam.restaurant.repository.products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vietnam.restaurant.models.products.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
