import Footer from "../Footer/footer";
import bag from './Images/bag.svg';
import bedImage from './Images/bed-image.jpg';
import returnImage from './Images/return.svg';
import support from './Images/support.svg';
import truck from './Images/truck.svg';

import './services.css';

const Services=()=>{
    return(
        <div>
            <div className="why-choose-section">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6">
            <h2 className="section-title">Why Choose Us</h2>
            <p>We use only the finest teak wood, known for its durability, rich color, and natural resistance to decay and pests.Teak wood's natural strength and resilience ensure that our furniture stands the test of time, providing lasting beauty and functionality.</p>
            <div className="row my-5">
              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={truck} alt="Fast & Free Shipping" className="img-fluid" />
                  </div>
                  <h3>Fast Shipping</h3>
                  <p>Enjoy our fast shipping service, ensuring your exquisite teak wood furniture arrives promptly and safely at your doorstep</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={bag} alt="Easy to Shop" className="img-fluid" />
                  </div>
                  <h3>Easy to Shop</h3>
                  <p>Our user-friendly platform makes it effortless to explore and purchase handcrafted furniture, tailored to your taste and needs.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={support} alt="24/7 Support" className="img-fluid" />
                  </div>
                  <h3>24/7 Support</h3>
                  <p>At Wood Bazar, we believe in being there for our customers whenever they need us. Our support team is available 24/7 to help.</p>
                </div>
              </div>

              <div className="col-6 col-md-6">
                <div className="feature">
                  <div className="icon">
                    <img src={returnImage} alt="Hassle Free Returns" className="img-fluid" />
                  </div>
                  <h3>Hassle Free Returns</h3>
                  <p>Experience the ease of hassle-free returns. At Wood Bazar, we make returning items simple and straightforward, so you can shop with confidence.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="img-wrap">
              <img src={bedImage} alt="Why Choose Us" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
            <Footer />
        </div>
    )
};

export default Services;