import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../Footer/footer";
import './checkout.css';

const Checkout = () => {
  const location=useLocation();
  const user_ID=localStorage.getItem("userId");
  const { product } = location.state || {};
  const [billingDetails, setBillingDetails] = useState({
    country: '',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    apartment: '',
    stateCountry: '',
    postalZip: '',
    emailAddress: '',
    phone: '',
  });

  //const [products, setProducts] = useState(product ? [product] : []);

  const [products, setProducts] = useState(product ? [{ ...product, quantity: 1 }] : []);


  const [previousAddresses, setPreviousAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmedAddress, setConfirmedAddress] = useState(null);
  const [showError, setShowError] = useState(false); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [error,setError]=useState('');

  const navigate = useNavigate();



  const fetchPreviousAddresses = async () => {
    const user_id = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:8081/users/addresses/${user_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      const data = await response.json();
  
  
      // Set the previous addresses directly from data if it's an array
      if (Array.isArray(data)) {
        setPreviousAddresses(data);
      } else {
        console.error('Unexpected data structure:', data);
      }
  
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  
  
  useEffect(() => {
    fetchPreviousAddresses().then(() => {
    });
  }, [setPreviousAddresses]);
  
  

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = offer || 0; // Assuming product.discount is a percentage (e.g., 10 for 10%)
    
    // Calculate discount amount
    const discountAmount = (subtotal * discount) / 100;
    
    // Calculate total after applying discount
    const total = subtotal - discountAmount;
  
    return total;
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  
  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirmAddress = () => {
    if (selectedAddress) {
      setConfirmedAddress(selectedAddress);
      setBillingDetails({
        ...selectedAddress,
      });
      setShowError(false); // Hide error message if address is confirmed
    } else {
      setShowError(true); // Show error message if no address is selected
    }
  };

  const applyCoupon = () => {
    if (!coupon.trim()) {
        setError('Please enter a coupon code.');
      } else {
        setError('');
        // Logic to apply coupon can be added here
        setCoupon('');
        alert('Coupon applied successfully!');
      }
  };

  const handleAddNewAddress = async () => {
    const api="http://localhost:8081/users/";
    const user_id = user_ID;
    const { country, firstName, lastName, address_line1, address_line2, street, stateCountry, postalZip, emailAddress, phone } = billingDetails;

    try {
      const response = await fetch(`${api}checkoutAddress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id:user_id,
          country,
          firstName,
          lastName,
          address_line1,
          address_line2,
          street,
          stateCountry,
          postalZip,
          emailAddress,
          phone,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to add new address:', errorText);
        throw new Error('Failed to add new address');
      }
  
      // Fetch updated addresses
      await fetchPreviousAddresses();
      setConfirmedAddress(null);
    } catch (error) {
      console.error('Error adding new address:', error);
      // Handle the error (e.g., show an alert or error message to the user)
    }
  };
  

  const handleSubmit = () => {
    if (confirmedAddress === null) {
      setShowError(true); // Show error message if any required field is missing
      return;
    }
    setIsAnimating(true); // Trigger animation
    setTimeout(() => {
      navigate('/order-success');
    }, 5000);
  };

  const offer = product.available_offers ? product.available_offers.match(/\d+/)[0] : null;

console.log("pro",products);
  return (
    <div>
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="border p-4 rounded" role="alert">
                Returning customer? <a href="#">Click here</a> to login
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              {showError && (
                        <div className="alert alert-danger mt-3">
                          Please select and confirm a previous address or add a new address.
                        </div>
                      )}
              <div className="p-3 p-lg-5 border bg-white">
                {confirmedAddress ? (
                  <div className="border p-3 mb-3">
                    <h4 className="h6 mb-3">Confirmed Address</h4>
                    <p><strong>Country:</strong> {confirmedAddress.country}</p>
                    <p><strong>First Name:</strong> {confirmedAddress.first_name}</p>
                    <p><strong>Last Name:</strong> {confirmedAddress.last_name}</p>
                    <p><strong>Address Line 1:</strong> {confirmedAddress.address_line1}</p>
                    <p><strong>Address Line 2:</strong> {confirmedAddress.address_line2}</p>
                    <p><strong>Street:</strong> {confirmedAddress.street}</p>
                    <p><strong>State / Country:</strong> {confirmedAddress.state}</p>
                    <p><strong>Postal / Zip:</strong> {confirmedAddress.postalZip}</p>
                    <p><strong>Email Address:</strong> {confirmedAddress.emailAddress}</p>
                    <p><strong>Phone:</strong> {confirmedAddress.phone}</p>
                    <button className="btn btn-primary" onClick={() => setConfirmedAddress(null)}>Change Address</button>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="country" className="text-black">Country <span className="text-danger">*</span></label>
                      <select id="country" className="form-control" name="country" value={billingDetails.country} onChange={handleInputChange}>
                        <option value="">Select a country</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="algeria">Algeria</option>
                        <option value="afghanistan">Afghanistan</option>
                        <option value="ghana">Ghana</option>
                        <option value="albania">Albania</option>
                        <option value="bahrain">Bahrain</option>
                        <option value="colombia">Colombia</option>
                        <option value="dominican_republic">Dominican Republic</option>
                        <option value="india">India</option>
                      </select>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="text-black">First Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="firstName" name="firstName" value={billingDetails.firstName} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="text-black">Last Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={billingDetails.lastName} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="address_line1" className="text-black">Address Line 1 <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="address_line2" name="address_line1" value={billingDetails.address_line1} onChange={handleInputChange} placeholder="Street address" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="address_line2" className="text-black">Address Line 2 <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="address_line1" name="address_line2" value={billingDetails.address_line2} onChange={handleInputChange} placeholder="Street address" />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                    <label htmlFor="street" className="text-black">Street <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="street" name="street" value={billingDetails.street} onChange={handleInputChange} placeholder="Apartment, suite, unit, etc. (optional)" />
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="stateCountry" className="text-black">State <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="stateCountry" name="stateCountry" value={billingDetails.stateCountry} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="postalZip" className="text-black">Postal / Zip <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="postalZip" name="postalZip" value={billingDetails.postalZip} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailAddress" className="text-black">Email Address <span className="text-danger">*</span></label>
                      <input type="email" className="form-control" id="emailAddress" name="emailAddress" value={billingDetails.emailAddress} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="text-black">Phone <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="phone" name="phone" value={billingDetails.phone} onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-secondary mb-3" onClick={handleAddNewAddress}>Add New Address</button>
                      {previousAddresses.length > 0 ? (
                        <div className="mt-4">
                          <h4 className="h6 mb-3">Previous Addresses</h4>
                          {previousAddresses.map((address) => (
                            <div key={address.id} className="border p-3 mb-3">
                              <div className="form-check">
                                <input 
                                  className="form-check-input" 
                                  type="radio" 
                                  name="previousAddress" 
                                  id={`address-${address.id}`} 
                                  checked={selectedAddress === address} 
                                  onChange={() => handleAddressSelection(address)}
                                />
                                <label className="form-check-label" htmlFor={`address-${address.id}`}>
                                  <p className="mb-1"><strong>Country:</strong> {address.country}</p>
                                  <p className="mb-1"><strong>First Name:</strong> {address.first_name}</p>
                                  <p className="mb-1"><strong>Last Name:</strong> {address.last_name}</p>
                                  <p className="mb-1"><strong>Address Line 1:</strong> {address.address_line1}</p>
                                  <p className="mb-1"><strong>Address Line 2:</strong> {address.address_line2}</p>
                                  <p className="mb-1"><strong>Street:</strong> {address.street}</p>
                                  <p className="mb-1"><strong>State / Country:</strong> {address.state}</p>
                                  <p className="mb-1"><strong>Postal / Zip:</strong> {address.postalZip}</p>
                                  <p className="mb-1"><strong>Email Address:</strong> {address.emailAddress}</p>
                                  <p className="mb-1"><strong>Phone:</strong> {address.phone}</p>
                                </label>
                              </div>
                            </div>
                          ))}
                          <button className="btn btn-primary mt-3" onClick={handleConfirmAddress}>Confirm Address</button>
                        </div>
                      ):
                      (
                        <p>No previous addresses available.</p>
                      )}
                    </>
                  )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="border p-4 rounded">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-black">Product</th>
                        <th className="text-black">Price</th>
                        <th className="text-black">Quantity</th>
                        <th className="text-black">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="text-black">{product.Name}</td>
                          <td className="text-black">Rs. {product.price}</td>
                          <td className="text-black">{product.quantity}</td>
                          <td className="text-black">Rs. {product.price * product.quantity}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="text-black font-weight-bold" colSpan="3"><strong>Subtotal</strong></td>
                        <td className="text-black"><strong>Rs. {calculateSubtotal()}</strong></td>
                      </tr>
                      <tr>
                        <td className="text-black font-weight-bold" colSpan="3"><strong>Discount</strong></td>
                        <td className="text-black"><strong>- {offer}%</strong></td>
                      </tr>
                      <tr>
                        <td className="text-black font-weight-bold" colSpan="3"><strong>Order Total</strong></td>
                        <td className="text-black font-weight-bold"><strong>Rs. {calculateTotal()}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                  <div className="col-md-12">
                    <label className="text-black h4" htmlFor="coupon">Coupon</label>
                    <p>Enter your coupon code if you have one.</p>
                  </div>
                  <div className="col-md-8 mb-3 mb-md-0">
                    <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-black" onClick={applyCoupon}>Apply Coupon</button>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                </div>
                  
                  <div className="border p-3 mb-3">
                    <h3 className="h6 mb-0">
                      <a className="d-block" data-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">
                        Direct Bank Transfer
                      </a>
                    </h3>
                    <div className="collapse" id="collapsebank">
                      <div className="py-2">
                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border p-3 mb-3">
                    <h3 className="h6 mb-0">
                      <a className="d-block" data-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque">
                        Cheque Payment
                      </a>
                    </h3>
                    <div className="collapse" id="collapsecheque">
                      <div className="py-2">
                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="border p-3 mb-5">
                    <h3 className="h6 mb-0">
                      <a className="d-block" data-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">
                        PayPal
                      </a>
                    </h3>
                    <div className="collapse" id="collapsepaypal">
                      <div className="py-2">
                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                  <button
                  className={`btn btn-primary btn-lg btn-block place-order-button ${isAnimating ? 'hide-button' : ''}`}
                  onClick={handleSubmit}
                  disabled={isAnimating}
                >
                  Place Order
                </button>
                {isAnimating && <div className="vehicle-animation"></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
