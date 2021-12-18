import React, { Component } from "react";
import userService from "../../services/user.service";

import UserService from "../../services/user.service";

export default class BoardWaiter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      content:''
    };
  }

  componentDidMount() {
    UserService.getWaiterBoard().then(
      response => {
        this.setState({
          orders: response.data,
          content: "Waiter"
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

  servedOrder(id){
    var result = window.confirm("Is this dish served?");
    if (result) {
    userService.servedOrder(id);
    window.location.reload();
    }
  }

  placeOrder(){
    this.props.history.push('/order/add');
  }

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Waiter" ? (
              <div className = "card" style={{width: "60rem"}}>                    
                            <h3>{this.state.content}</h3>
                  <button onClick={ () => this.placeOrder()} className="btn btn-primary">New order</button> 

                  <table className = "table table-striped table-bordered">
                      <thead>
                          <tr>
                              <th> Table</th>
                              <th> Created On</th>
                              <th> Cooked At</th>
                              <th> Product</th>
                              <th> Quantity</th>
                              <th> Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              this.state.orders.map(order =>                     
                                <tr key = {order.order.id}>
                                        <td> {order.order.position} </td>   
                                        <td> {order.order.createdOn}</td>
                                        <td> {order.order.updatedOn}</td>
                                        <td> {order.product.name}</td>
                                        <td> {order.quantity} {order.product.unit}</td>                                     
                                        <td>
                                          <button onClick={ () => this.servedOrder(order.order.id)} className="btn btn-success">Served </button>                                                     
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
