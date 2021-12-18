import React, { Component } from "react";
import userService from "../../services/user.service";

import UserService from "../../services/user.service";

export default class BoardCashier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      result_orders: [[]],
      content:''
    };

  }

  componentDidMount() {
    UserService.getCashierBoard().then(
      response => {
        this.setState({
          orders: response.data.sort((a,b) => a.order.position - b.order.position),
          content: "Cashier"
        });
        // let result = this.state.orders;
        // let orders = []
        // while (result.length !== 0){
        //   let cur_position = result[0].order.position;
        //   let chunk = result.filter(order => order.order.position === cur_position).length;
        //   orders.push(result.splice(0,chunk));
        // }
        // this.setState({result_orders: orders})
        // console.log(this.state.result_orders);
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

  paidOrder(id){
    var result = window.confirm("Is this order paid?");
    if (result) {
      userService.paidOrder(id);
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Cashier" ? (
                 <div className = "card" style={{width: "70rem"}}>
                        <h3>{this.state.content}</h3>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Table</th>
                                    <th> Created On</th>
                                    <th> Served At</th>
                                    <th> Product</th>
                                    <th> Price</th>
                                    <th> Quantity</th>
                                    <th> Total</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orders.map(order =>
                                      <tr key={order.order.id}>
                                             <td>{order.order.position}</td>
                                             <td> {order.order.createdOn}</td>
                                             <td> {order.order.updatedOn}</td>
                                             <td> {order.product.name}</td>
                                             <td> {order.product.price}$ / 1 {order.product.unit}</td>
                                             <td> {order.quantity} {order.product.unit}</td>
                                             <td> {order.order.total}$</td>
                                             <td>
                                                <button onClick={ () => this.paidOrder(order.order.id)} className="btn btn-success">Paid </button>                                            
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
