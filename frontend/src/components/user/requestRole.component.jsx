import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthService.getCurrentUser(),
      content: "",
      role: [],
      successful: false,
      message: "",
      listRole: ["Manager", "Waiter", "Cashier", "Chef"]
    };
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    UserService.getRequestRole().then(
      response => {
        this.setState({
          content: response.data
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
          this.props.history.push('/profile');
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
          {this.state.content === "Request Role" ? (
            <div className="card" style={{width: "20rem"}}>
              <h3>{this.state.content}</h3>
              <Form
                onSubmit={this.handleRequest}
                ref={c => {
                  this.form = c;
                }}
              >
                    <div className="form-group">
                        <label>Select roles:</label>
                        <div className="custom-control custom-checkbox" >
                            {   this.state.listRole.map(role => {
                                    return (
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" key={role} id={role} value={role} onChange={this.handleCheckboxChange} />
                                            <label className="custom-control-label" htmlFor={role}>{role}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Request</button>
                    </div>

                {this.state.message && (
                  <div className="form-group">
                    <div
                      className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
              </Form>
          </div>
          ):(
            <h3>{this.state.content}</h3>
          )
          }
      </div>
    );
  }
}