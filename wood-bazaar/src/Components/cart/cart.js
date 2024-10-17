import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../Footer/footer";
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userID=localStorage.getItem("userId");

  const api="http://localhost:8081"

  useEffect(() => {
    const user_id=userID;
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${api}/cartItems/${user_id}`); // Adjust userId as needed
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };
    if (userID) {
      fetchCartItems();
    }
  },[userID]);


  const removeItem = async (id) => {
    const confirmed = window.confirm('Are you sure you want to remove this item from the cart?');
    if(confirmed){
      try {
        await axios.delete(`${api}/removeItem/${id}`);
        setCartItems(cartItems.filter(item => item.cart_id !== id));
      } catch (error) {
        console.error('Failed to remove item from cart', error);
      }
    }
  };


  const updateQuantity = (cart_id, newQuantity) => {
    setCartItems(cartItems.map(item => item.cart_id === cart_id ? { ...item, quantity: newQuantity } : item)
  );
  console.log(cart_id);
  };

  const updateCart = async () => {
    const confirmed = window.confirm('Are you sure you want to update the cart?');
    if(confirmed){
      try {
      const updatePromises = cartItems.map(async (item) => {
        return axios.put(`http://localhost:8081/updateCart/${item.cart_id}`, { quantity: item.quantity });
      });
  
      await Promise.all(updatePromises);
      alert('Cart updated successfully!');
    } catch (error) {
      console.error('Failed to update cart', error);
    }
  }
  };
  


 

  

  const redirectToShopping = () => {
    navigate('/shop'); // Redirect to the shopping page
  };
  
  return (
    <div>
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <form className="col-md-12">
              <div className="site-blocks-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.cart_id}>
                        <td className="product-thumbnail">
                          <Link to={`http://localhost:3000/product/${item.Prod_Id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <img src={`http://localhost:8081${item.Img_file}`} alt={item.Name} className="img-fluid" />
                          </Link>
                        </td>
                        <td className="product-name">
                          <Link to={`http://localhost:3000/product/${item.Prod_Id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h2 className="h5 text-black">{item.Name}</h2>
                          </Link>
                        </td>
                        <td>Rs {item.price.toFixed(2) || '0.00'}</td>
                        <td>
                          <div className="input-group mb-3 d-flex align-items-center quantity-container">
                            <div className="input-group-prepend">
                              <button className="btn btn-outline-black decrease" type="button" onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}>&minus;</button>
                            </div>
                            <input type="text" className="form-control text-center quantity-amount" value={item.quantity} readOnly />
                            <div className="input-group-append">
                              <button className="btn btn-outline-black increase" type="button" onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}>+</button>
                            </div>
                          </div>
                        </td>
                        <td>Rs {(item.price * item.quantity).toFixed(2) || '0.00'}</td>
                        <td>
                          <button type="button" className="btn btn-black btn-sm" onClick={() => removeItem(item.cart_id)}>X</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                <button className="btn btn-sm btn-block" onClick={updateCart}>Update Cart</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-sm btn-block" onClick={redirectToShopping}>Continue Shopping</button>
              </div>

                </div>
               
              </div>
              
            </div>
          </div>
        )}
        
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
