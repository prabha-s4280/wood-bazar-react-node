import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating-stars-component';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/footer';
import './productDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  const navigate = useNavigate();
  const userID = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProductDetails = async () => {
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8081/product/${id}`);
        setProduct(response.data);
        localStorage.setItem('prodId', id);

        // Fetch reviews after fetching the product
        try {
          const reviewsResponse = await axios.get(`http://localhost:8081/product/${id}/reviews`);
          setReviews(reviewsResponse.data);

          const totalRating = reviewsResponse.data.reduce((acc, review) => acc + review.rating, 0);
          const average = reviewsResponse.data.length > 0 ? (totalRating / reviewsResponse.data.length).toFixed(1) : 0;
          console.log('average',average)
          setAverageRating(parseFloat(average));

        } catch (reviewError) {
          console.error('Error fetching reviews:', reviewError);
          setReviews([]); // Set reviews to an empty array if there's an error
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.response?.data?.message || 'Something went wrong!');
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      console.error('Product ID is not defined');
    }
  }, [id]);

  useEffect(() => {
    // Recalculate average rating when reviews are updated
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
    setAverageRating(parseFloat(average));
  }, [reviews]);

  const handleAddReview = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/product/${id}/add-review`, {
        user_id: userID,
        rating: rating,
        review_text: reviewText
      });

      toast.success('Review added successfully!');
      setReviews(response.data.reviews);

      
      
      // Clear form fields
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

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

  const handleBuy = (product) => {
    navigate('/checkout', { state: { product } });
  };

  const offer = product.available_offers ? product.available_offers.match(/\d+/)[0] : null;


  return (
    <div>
      <div className="product-details-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <img
                src={`http://localhost:8081${product.Img_file}`}
                alt={product.Name}
                className="img-fluid product-image"
              />
            </div>
            <div className="col-12 col-md-6">
              <h1 className="product-name">{product.Name}</h1>
              <p className="product-description">{product.prod_desc}</p>
              <div className="price-section">
                {product.available_offers && offer > 0 ? (
                  <>
                    <strong className="original-price">{product.price}/-</strong>
                    <strong className="discounted-price">
                      {(product.price - (product.price * (Number(offer) / 100))).toFixed(2)}/-
                    </strong>
                  </>
                ) : (
                  <strong className="product-price">{product.price}/-</strong>
                )}
              </div>
              
              <p className="product-discount">Discount: {offer}% off</p>
              <p className="delivery-time">Delivery Time: {product.delivery_date}</p>
              <p className="warranty-time">Warranty: {product.warranty_months} months</p>
              <h3>Highlights</h3>
              <ul className="product-highlights">
                {product.highlights.split(',').map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
              <h3>Rating: {averageRating}</h3>
              <StarRatings 
                  rating={Number(averageRating)} 
                  starRatedColor="yellow"
                  numberOfStars={5} 
                  name='rating'
                  starDimension='30px'
                  starSpacing='5px'
                />
              <div className="action-buttons">
                <button className="btn-buy" onClick={() => handleBuy(product)}>Buy</button>
                <button className="btn-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
              <ToastContainer />
              <h3>Ratings and Reviews</h3>
              <div className="rating-section">
                {reviews.length > 0 ? (
                  <div className="reviews-list">
                    {reviews.map((review, index) => (
                      <div key={index} className="review-item border p-3 mb-3">
                        <div className="review-header d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faUser} className="user-icon mr-2" />
                          <p><strong>{review.user_name}</strong></p>
                        </div>
                        <StarRatings 
                          rating={review.rating}
                          starRatedColor='yellow'
                          starDimension='20px'
                          name='ratings'
                          starSpacing='5px'
                          numberOfStars={5}
                        />
                        <p>{review.review_text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews found</p>
                )}
                <p className="product-reviews">{product.reviews}</p>
              </div>
              <div className="add-review-section">
                <h3>Add Your Review</h3>
                <div className="form-group">
                  <label htmlFor="rating">Rating:</label>
                  <Rating 
                      id="rating" 
                      count={5} 
                      size={30} 
                      value={rating} 
                      onChange={(newRating) => setRating(newRating)} 
                      isHalf={true} 
                      activeColor="#ffd700" 
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="reviewText">Review:</label>
                  <textarea
                      id="reviewText"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows="4"
                      className="form-control"
                    />
                </div>
                <button className="btn-submit-review" onClick={handleAddReview}>Submit Review</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
