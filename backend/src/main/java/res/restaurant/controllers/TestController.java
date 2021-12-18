package vietnam.restaurant.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vietnam.restaurant.loaders.requests.OrderRequest;
import vietnam.restaurant.loaders.requests.ProductRequest;
import vietnam.restaurant.loaders.responses.MessageResponse;
import vietnam.restaurant.models.orders.EOrderStatus;
import vietnam.restaurant.models.orders.Order;
import vietnam.restaurant.models.orders.OrderProduct;
import vietnam.restaurant.models.orders.OrderProductKey;
import vietnam.restaurant.models.users.User;
import vietnam.restaurant.repository.orders.OrderProductRepository;
import vietnam.restaurant.repository.orders.OrderRepository;
import vietnam.restaurant.repository.users.UserRepository;

import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date date = new Date();

    @Autowired
    private UserRepository userRepository;

    @Autowired
	private OrderRepository orderRepository;

    @Autowired
	private OrderProductRepository orderProductRepository;

	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@GetMapping("/user")
	@PreAuthorize("hasRole('USER') or hasRole('WAITER') or " +
			"hasRole('CASHIER') or hasRole('CHEF') or " +
			"hasRole('MANAGER') or hasRole('ADMIN')")
	public String getRequestRole() {
		return "Request Role";
	}
	
	@GetMapping("/orderByUser/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('WAITER') or " +
			"hasRole('CASHIER') or hasRole('CHEF') or " +
			"hasRole('MANAGER') or hasRole('ADMIN')")
	public List<OrderProduct> getOrderByUserId(@PathVariable Long id) {
		return orderProductRepository.findAll().stream()
				.filter(orderProduct -> orderProduct.getOrder().getUser().getId().equals(id))
				.collect(Collectors.toList());
	}

	@PutMapping("/requestCancel/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('WAITER') or " +
			"hasRole('CASHIER') or hasRole('CHEF') or " +
			"hasRole('MANAGER') or hasRole('ADMIN')")
	public ResponseEntity<?> requestCancel(@PathVariable Long id, @RequestBody OrderRequest orderRequest){
		var order = orderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Product not found."));
		order.setUpdatedOn(formatter.format(date));
		order.setStatus(EOrderStatus.CANCEL);
		order.setNote(orderRequest.getNote());
		orderRepository.save(order);

		return ResponseEntity.ok(new MessageResponse("Order updated successfully!"));
	}

	@GetMapping("/waiter")
	@PreAuthorize("hasRole('WAITER') or hasRole('ADMIN')")
	public List<OrderProduct> getOrderCooked() {
		return orderProductRepository.findAll().stream()
				.filter(orderProduct -> orderProduct.getOrder().getStatus() == EOrderStatus.COOKED)
				.collect(Collectors.toList());
	}

	@PutMapping("/served/{id}")
	@PreAuthorize("hasRole('WAITER') or hasRole('ADMIN')")
	public ResponseEntity<?> served(@PathVariable Long id){
		var order = orderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Product not found."));
		order.setUpdatedOn(formatter.format(date));
		order.setStatus(EOrderStatus.SERVED);
		orderRepository.save(order);

		return ResponseEntity.ok(new MessageResponse("Order updated successfully!"));
	}

    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasRole('CHEF') or hasRole('ADMIN')")
    public ResponseEntity<?> cancel(@PathVariable Long id, @RequestBody OrderRequest orderRequest){
        var order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Product not found."));
        order.setUpdatedOn(formatter.format(date));
        order.setStatus(EOrderStatus.CANCELED);
        order.setNote(orderRequest.getNote());
        orderRepository.save(order);

        return ResponseEntity.ok(new MessageResponse("Order updated successfully!"));
    }

	@GetMapping("/cashier")
	@PreAuthorize("hasRole('CASHIER') or hasRole('ADMIN')")
	public List<OrderProduct> getOrderServed() {
		return orderProductRepository.findAll().stream()
				.filter(orderProduct -> orderProduct.getOrder().getStatus() == EOrderStatus.SERVED)
				.collect(Collectors.toList());
	}

	@PutMapping("/paid/{id}")
	@PreAuthorize("hasRole('CASHIER') or hasRole('ADMIN')")
	public ResponseEntity<?> paid(@PathVariable Long id){
		var order = orderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Order not found."));
		order.setUpdatedOn(formatter.format(date));
		order.setStatus(EOrderStatus.PAID);
		orderRepository.save(order);

		return ResponseEntity.ok(new MessageResponse("Order updated successfully!"));
	}

	@GetMapping("/chef")
	@PreAuthorize("hasRole('CHEF') or hasRole('ADMIN')")
	public List<OrderProduct> getOrderPlaced(){
		return orderProductRepository.findAll().stream()
				.filter(orderProduct -> orderProduct.getOrder().getStatus() == EOrderStatus.PLACED || orderProduct.getOrder().getStatus() == EOrderStatus.CANCEL)
				.collect(Collectors.toList());
	}

	@PutMapping("/cooked/{id}")
	@PreAuthorize("hasRole('CHEF') or hasRole('ADMIN')")
	public ResponseEntity<?> cooked(@PathVariable Long id){
		var order = orderRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Error: Order not found."));
		order.setUpdatedOn(formatter.format(date));
		order.setStatus(EOrderStatus.COOKED);
		orderRepository.save(order);

		return ResponseEntity.ok(new MessageResponse("Order updated successfully!"));
	}

	@GetMapping("/manager")
	@PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
	public List<User> getAllUser(){
	    return userRepository.findAll();
    }

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}
