import React, { Component } from "react";
import authService from "../../services/auth.service";

import CategoryService from "../../services/category.service";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Categories: [],
      currentUser: authService.getCurrentUser(),
      content:''
    };
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount() {
    CategoryService.getAllCategories().then(
      response => {
        this.setState({
          Categories: response.data,
          content: "Category"
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

  updateCategory(id){
    this.props.history.push("/category/" + id);
  }

  deleteCategory(id){
    var result = window.confirm("Want to delete?");
    if (result) {
      CategoryService.deleteCategory(id).then(res => {
        this.setState({Categories: this.state.Categories.filter(item => item.id !== id)});
      })
    }
  }

  render() {
    return (
      <div className="jumbotron">
          {this.state.content === "Category" ? (
                <div className = "card" style={{width: "30rem"}}> 
                  <h3>{this.state.content}</h3>                  
                  <button className = "btn btn-primary" onClick = {() => this.props.history.push("/category/add")}>New Category</button>
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Categories.map(item =>
                                    <tr key = {item.id}>
                                            <td> {item.name} </td>   
                                            <td>
                                              <button onClick={ () => this.updateCategory(item.id)} className="btn btn-success">Update </button>                                            
                                              <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCategory(item.id)} className="btn btn-danger">Delete </button>
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
