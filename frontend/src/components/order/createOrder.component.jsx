import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import productService from "../../services/product.service";
import orderService from "../../services/order.service";
import authService from "../../services/auth.service";
import categoryService from "../../services/category.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vposition = value => {
  if (value === null) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class createOrder extends Component {
  constructor(props) {
    super(props);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    // this.onChangeNote = this.onChangeNote.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      user: authService.getCurrentUser(),
      products: [],
      product_ids: [],
      quantities: [],
      position: 0,
      note: "",
      successful: false,
      message: "",
      listCategories: [],
      listProduct: [],
      listSearch: [],
      showSearchProduct: false,
      showListProduct: false
    };
  }

  componentDidMount() {
    productService.getAllProducts().then(
      response => {
        this.setState({
          products: response.data,
          content: "New Order"
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
    categoryService.getAllCategories().then(
      response => {
        this.setState({
          listCategories: response.data
        });
      },
      error => {}
    );
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  // onChangeNote(e) {
  //   this.setState({
  //     note: e.target.value
  //   });
  // }

  addProduct(product){
    if (!this.state.listProduct.find(item => item.id === product.id)){
      this.state.listProduct.push(product)
      this.setState({showListProduct: true})
    }
  }

  deleteProduct(id){
    let list = this.state.listProduct.filter(product => product.id !== id);
    this.setState({listProduct: list});

    let index = this.state.product_ids.indexOf(id.toString());

    this.state.product_ids.splice(index, 1);
    this.state.quantities.splice(index, 1);
  }

  onChangeCategory = event => {
    let category_id = event.target.value;
    
    productService.getAllProducts().then(
      response => {
        this.setState({listSearch: response.data.filter(product => product.categoryId === parseInt(category_id)),
                      showSearchProduct: true});
      });

    
  }

  onChangeQuantity = event => {

    let quantities = [...this.state.quantities, event.target.value];
    let product_ids = [...this.state.product_ids, event.target.id];

      if (this.state.product_ids.includes(event.target.id)){
        let id = this.state.product_ids.indexOf(event.target.id);
        quantities.splice(id, 1);
        product_ids.splice(id,1);
      }
      this.setState({
        quantities: quantities,
        product_ids: product_ids
      });
  }

  handlePlaceOrder(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        let orderRequest = {user_id: this.state.user.id,
                            position: this.state.position,
                            note: this.state.note,
                            product_ids: this.state.product_ids,
                            quantities: this.state.quantities}

        var result = window.confirm("Want to place this order?");
        if (result) {
          orderService.placeOrder(orderRequest).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
              this.props.history.push('/user');
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
  }

  render() {
    return (
      <div className="jumbotron" >
        {!this.state.user ? (
        <div style={{marginTop: "50px"}}>
          <h3>Please Log In</h3>
        </div>
        ):(
        <div className="card col-8" style={{marginTop: "50px"}}>
          <h3>New order</h3>
          <Form
            onSubmit={this.handlePlaceOrder}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>

                  {/* <div className="col-sm">
                    <label htmlFor="note">Note</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="note"
                      value={this.state.note}
                      onChange={this.onChangeNote}
                    />
                  </div> */}
              
                <div className="row form-group">

                    <div className="col-sm-3 form-group">
                      <div className="row">
                        <label htmlFor="position">Table №</label>
                        <Input
                          type="number"
                          className="form-control"
                          name="position"
                          value={this.state.position}
                          onChange={this.onChangePosition}
                          validations={[required, vposition]}
                        />
                      </div>

                      <div className="row">
                        <label htmlFor="parentId">Category</label>
                        <select
                          className="form-control"
                          name="category"
                          onChange={this.onChangeCategory}
                        >
                        {
                          this.state.listCategories.map(item =>{
                            return (
                            <option key={item.id} value={item.id}>{item.name}</option>
                            )
                          })
                        }
                        </select>
                    
                    { this.state.showSearchProduct &&
                      <table className = "table table-striped table-bordered">
                            <tbody>
                                {
                                    this.state.listSearch.map(product =>                     
                                      <tr key = {product.id}>
                                             <td> {product.name} </td>                                    
                                             <td>
                                                <button type="button" onClick={ () => this.addProduct(product)} className="btn btn-primary">Add </button>                                                     
                                             </td>
                                      </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    }
                    </div>
                      
                  </div>

                  

                  
                <div className="col-sm">
                  <label htmlFor="quantities">Products</label>
                  <table className = "table table-striped table-bordered">
                    <thead>
                      <tr>
                      <th>Name</th>
                      <th>Quantities</th>
                      <th>Actions</th>
                      </tr>
                    </thead>
                    {this.state.showListProduct &&
                    <tbody>
                      {this.state.listProduct.map(product => 
                      <tr key = {product.id}>
                        <td>{product.name}</td>
                        <td>
                        <Input
                          type="number"
                          className="form-control"
                          name="quantity"
                          id = {product.id}
                          onChange={this.onChangeQuantity}
                        />
                        {product.price}$ / 1 {product.unit}</td>
                        <td>
                          <button onClick={ () => this.deleteProduct(product.id)} className="btn btn-danger">Delete </button>    
                        </td>
                      </tr>
                      )}
                    </tbody>
                    }
                  </table>
                </div>
                

                </div>
              
                <div className="form-group">
                  <button  className="btn btn-primary btn-block">Place Order</button>
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
                  <h4 style={{textAlign: "center"}}>{this.state.message}</h4>
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
        )}
      </div>
    );
  }
}
