package vietnam.restaurant.repository.orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vietnam.restaurant.models.orders.Order;
import vietnam.restaurant.models.orders.OrderProduct;
import vietnam.restaurant.models.orders.OrderProductKey;

import java.util.Optional;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, OrderProductKey> {

}
