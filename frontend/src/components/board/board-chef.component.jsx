import React, { Component } from "react";
import authService from "../../services/auth.service";
import userService from "../../services/user.service";

import UserService from "../../services/user.service";

export default class BoardChef extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      currentUser: authService.getCurrentUser(),
      content:''
    };

    this.cookedOrder = this.cookedOrder.bind(this);
  }

  componentDidMount() {
    UserService.getChefBoard().then(
      response => {
        this.setState({
          orders: response.data,
          content: "Chef"
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

  cookedOrder(id){
    var result = window.confirm("Is this dish done?");
    if (result) {
      userService.cookedOrder(id);
      window.location.reload();
    }
  }
  cancelOrder(id){
    var result = window.prompt("Why do you want to cancel this order?");
    if (result) {
      let order = {note: result}
    userService.cancelOrder(id, order);
    window.location.reload();
    }
  }

  acceptCancel(id){
    var result = window.confirm("Want to accept cancel this order?");
    if (result) {
      userService.cancelOrder(id);
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Chef" ?(
                 <div className = "card">
                   <h3>{this.state.content}</h3>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Table</th>
                                    <th> Placed At</th>
                                    <th> Product</th>
                                    <th> Quantity</th>
                                    <th> Status</th>
                                    <th> Note</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(order =>                     
                                      <tr key = {order.order.id}>
                                             <td> {order.order.position} </td>   
                                             <td> {order.order.createdOn}</td>
                                             <td> {order.product.name}</td>
                                             <td> {order.quantity} {order.product.unit}</td> 
                                             <td> {order.order.status}</td>  
                                             <td> {order.order.note}</td> 
                                             { order.order.status === "CANCEL"? (                                  
                                             <td>
                                              <button onClick={ () => this.acceptCancel(order.order.id)} className="btn btn-primary">Accept cancel </button>                                            
                                             </td>
                                             ):(
                                             <td>
                                              <button onClick={ () => this.cookedOrder(order.order.id)} className="btn btn-success">Cooked </button> 
                                              <button style={{marginLeft: "10px"}} onClick={ () => this.cancelOrder(order.order.id)} className="btn btn-danger">Cancel </button>                                           
                                             </td> 
                                             )
                                             }
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
