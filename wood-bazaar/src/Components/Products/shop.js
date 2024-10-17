import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/footer';
import crossIcon from './Images/cross.svg';

import './shop.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userID=localStorage.getItem("userId");

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const response = await axios.get('http://localhost:8081/products/');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Something went wrong!');
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // Replace '/api/cart/add' with your actual endpoint
      await axios.post('http://localhost:8081/addtoCart', {
        user_Id:userID,
        prodId: product.Prod_Id,
        quantity: 1, // Default quantity, you can modify this if needed
      });
      toast.success(`${product.Name} added to cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart');
    }
  };

  return (
    <div>
      <div className="product-section">
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div className="col-12 col-md-4 col-lg-3 mb-5" key={product.item_id}>
                <div className="product-item">
                  <img
                    src={`http://localhost:8081${product.Img_file}`}
                    alt={product.Name}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.Name}</h3>
                  <p className="product-desc">{product.prod_desc}</p>
                  <strong className="product-price">{product.price}/-</strong>
                  <button className="btn-view" onClick={() => navigate(`/product/${product.Prod_Id}`)}>View Details</button>
                  <span className="icon-cross" onClick={() => handleAddToCart(product)}>
                    <img src={crossIcon} className="img-fluid" alt="Cross icon" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
