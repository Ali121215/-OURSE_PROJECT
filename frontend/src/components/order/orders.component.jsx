import React, { Component } from "react";
import orderService from "../../services/order.service";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      content:''
    };
  }

  componentDidMount() {
    orderService.getAllOrder().then(
      response => {
        this.setState({
          orders: response.data.sort((a,b) => a.order.position - b.order.position),
          content: "Orders"
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  deleteOrder(id){
    var result = window.confirm("Want to delete?");
    if (result) {
        orderService.deleteOrder(id);
        window.location.reload();
    }
  }

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Orders" ? (
                 <div className = "card">
                   <h3>{this.state.content}</h3>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> User</th>
                                    <th> Table</th>
                                    <th> Created On</th>
                                    <th> Update At</th>
                                    <th> Product</th>
                                    <th> Quantity</th>
                                    <th> Total</th>
                                    <th> Status</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(order =>                     
                                      <tr key = {order.order.id}>
                                             <td> {order.order.user.username}</td>
                                             <td> {order.order.position} </td>   
                                             <td> {order.order.createdOn}</td>
                                             <td> {order.order.updatedOn}</td>
                                             <td> {order.product.name}</td>
                                             <td> {order.quantity} {order.product.unit}</td>  
                                             <td> {order.order.total}$</td>
                                             <td> {order.order.status}</td>                                   
                                             <td>
                                                <button onClick={ () => this.deleteOrder(order.id.orderId)} className="btn btn-danger">Delete </button>                                                     
                                             </td>
                                      </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    
                 </div>):(
                   <h3>{this.state.content}</h3>
                 )
            }
      </div>
    );
  }
}
