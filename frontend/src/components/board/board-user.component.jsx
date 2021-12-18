import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";

import UserService from "../../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthService.getCurrentUser(),
      content: "",
      orders: [],
      role: [],
      successful: false,
      message: "",
      listRole: ["Manager", "Waiter", "Cashier", "Chef"]
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    UserService.getUserBoard(this.state.user.id).then(
      response => {
        this.setState({
          orders: response.data,
          content: "Your Orders"
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

  requestCancel(id){
    var result = window.prompt("Why do you want to cancel this order?");
    if (result) {
      let order = {note: result}
    userService.requestCancel(id, order);
    window.location.reload();
    }
  }

  handleCheckboxChange = (event) => {
    let roles = [...this.state.role, event.target.id];
    if (this.state.role.includes(event.target.id)) {
      roles = roles.filter(role => role !== event.target.id);
    } 
    this.setState({
      role: roles
    });
  }

  handleRequest(e){
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    if (this.checkBtn.context._errors.length === 0) {
      let request = {userRequest: this.state.role.join()};

        AuthService.userRequest(this.state.user.id, request).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
          error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
    }
      
  }
  

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Your Orders" ? (
          //   <div className="card" style={{width: "20rem"}}>
          //     <h3>{this.state.content}</h3>
          //     <Form
          //       onSubmit={this.handleRequest}
          //       ref={c => {
          //         this.form = c;
          //       }}
          //     >
          //           <div className="form-group">
          //               <label>Select roles:</label>
          //               <div className="custom-control custom-checkbox" >
          //                   {   this.state.listRole.map(role => {
          //                           return (
          //                               <div className="custom-control custom-checkbox">
          //                                   <input type="checkbox" className="custom-control-input" key={role} id={role} value={role} onChange={this.handleCheckboxChange} />
          //                                   <label className="custom-control-label" htmlFor={role}>{role}</label>
          //                               </div>
          //                           )
          //                       })
          //                   }
          //               </div>
          //           </div>

          //           <div className="form-group">
          //             <button className="btn btn-primary btn-block">Request</button>
          //           </div>

          //       {this.state.message && (
          //         <div className="form-group">
          //           <div
          //             className={
          //               this.state.successful
          //                 ? "alert alert-success"
          //                 : "alert alert-danger"
          //             }
          //             role="alert"
          //           >
          //             {this.state.message}
          //           </div>
          //         </div>
          //       )}
          //       <CheckButton
          //         style={{ display: "none" }}
          //         ref={c => {
          //           this.checkBtn = c;
          //         }}
          //       />
          //     </Form>
          // </div>
          <div className="card">
                   <h3>{this.state.content}</h3>
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Table</th>
                                    <th> Created On</th>
                                    <th> Update At</th>
                                    <th> Product</th>
                                    <th> Quantity</th>
                                    <th> Total</th>
                                    <th> Status</th>
                                    <th> Note</th>
                                    <th> Cancel?</th>
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
                                             <td> {order.order.total}$</td>
                                             <td> {order.order.status}</td>   
                                             <td> {order.order.note}</td>
                                             <td>
                                             {order.order.status === "PLACED" &&
                                                <button onClick={ () => this.requestCancel(order.order.id)} className="btn btn-danger">Cancel </button> 
                                              }                                                    
                                             </td>                                                             
                                      </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    
                 </div>
          ):(
            <h3>{this.state.content}</h3>
          )
          }
      </div>
    );
  }
}
