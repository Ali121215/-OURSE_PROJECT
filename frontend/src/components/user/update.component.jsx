import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
        id: parseInt(this.props.match.params.id),
      username: "",
      email: "",
      password: "",
      currentRole:[],
      userRequestRoles: "",
      role: [],
      successful: false,
      message: "",
      currentUser: AuthService.getCurrentUser(),
      editInfo: false,
      editRole: false,
      listRole: ["Admin", "Manager", "Waiter", "Cashier", "Chef", "User"]
    };
  }

  componentDidMount(){
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    AuthService.getUserById(this.state.id).then(res =>{
        let userUpdate = res.data;
        this.setState({ currentUser: currentUser, userReady: true })

        this.setState({username: userUpdate.username,
                        email: userUpdate.email,
                        currentRole: userUpdate.roles.map(role => role.name),
                        userRequestRoles: userUpdate.userRequest
                      })
    })
    this.setState({editInfo: (currentUser.roles.includes("ROLE_ADMIN") || (currentUser.id === this.state.id))? true:false});
    this.setState({editRole: (currentUser.roles.includes("ROLE_ADMIN") || (currentUser.roles.includes("ROLE_MANAGER")))? true:false});
    if (!currentUser.roles.includes("ROLE_ADMIN")) {this.state.listRole.shift()}
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleCheckboxChange = (event) => {
      let roles = [...this.state.role, event.target.id];
      if (this.state.role.includes(event.target.id)) {
        roles = roles.filter(role => role !== event.target.id);
      } 
      this.setState({
        role: roles
      });
    //console.log(this.state.role);
  }

  handleUpdate(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      let user = {username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role}
      if (this.state.editInfo && this.state.editRole) {
        AuthService.adminUpdateUser(this.state.id, user).then(
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
      } else if (this.state.editRole){
        AuthService.managerUpdateUser(this.state.id, user).then(
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
      } else {
        AuthService.userUpdateUser(this.state.id, user).then(
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
      if (this.state.currentUser.id === this.state.id) {
        AuthService.logout();
        this.props.history.push('/login');
      }
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container" style={{marginTop:"70px"}}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleUpdate}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div> 
                {this.state.editInfo &&
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>
                }

                {!this.state.editInfo && 
                  <div>
                    <p>
                      <strong>User:</strong>{" "}
                      {this.state.username}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {this.state.email}
                    </p>    
                  </div>
                }
                <p>
                  <strong>Current Roles:</strong>{" "}
                  {this.state.currentRole.map(role => <div>{role}</div>)}
                </p>
                {this.state.editRole &&
                <div className="form-group">
                  {this.state.userRequestRoles !== null &&
                  <p>
                    <strong>User Request Roles:</strong>{" "}
                    {this.state.userRequestRoles}
                  </p>
                  }
                    <label>Select roles:</label>
                    <div className="custom-control custom-checkbox" >
                        {   this.state.listRole.map(role => {
                                return (
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id={role} value={role} onChange={this.handleCheckboxChange} />
                                        <label className="custom-control-label" htmlFor={role}>{role}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                }

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Update</button>
                </div>
              </div>
            )}

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
      </div>
    );
  }
}
