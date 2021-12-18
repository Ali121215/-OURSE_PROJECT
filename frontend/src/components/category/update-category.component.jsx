import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import CategoryService from "../../services/category.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vname = value => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be longer than 3 characters.
      </div>
    );
  }
};

export default class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.handleCategory = this.handleCategory.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeParent = this.onChangeParent.bind(this);

    this.state = {
      id: parseInt(this.props.match.params.id),
      name: "",
      parentId: 0,
      successful: false,
      message: "",
      listCategories: []
    };
  }

  componentDidMount(){    
    CategoryService.getListParent(this.state.id).then(
      response => {
        this.setState({
          listCategories: response.data
        });
      },
      error => {}
    );
    CategoryService.getCategoryById(this.state.id).then(
      response => {
        this.setState({
          name: response.data.name,
          parentId: response.data.parentId
        });
      },
      error => {
        this.props.history.push("/category");
        alert("Category not found");
      }
    );
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeParent(e) {
    this.setState({
      parentId: e.target.value
    });
  }

  handleCategory(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {      
      let categoryRequest = {
        name: this.state.name,
        parentId: this.state.parentId
      };  
      CategoryService.updateCategory(
        this.state.id,
        categoryRequest
      ).then(
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
        <div className="card card-container" style={{marginTop: "70px"}}>
        <h3>Update</h3>
          <Form
            onSubmit={this.handleCategory}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                    <label htmlFor="parentId">Parent Category</label>
                    <select
                      className="form-control"
                      name="parentId"
                      value={this.state.parentId}
                      onChange={this.onChangeParent}
                    >
                    {
                      this.state.listCategories.map(item =>{
                        return (                          
                        <option key={item.id} value={item.id}>{item.name}</option>
                        )
                      })
                    }
                    </select>
                </div>                

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Update Category</button>
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
