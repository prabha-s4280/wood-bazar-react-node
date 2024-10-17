import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tiny-slider/dist/tiny-slider.css';
import { tns } from 'tiny-slider/src/tiny-slider';
import Footer from "../Footer/footer";
import sofa_4_seater from '../Products/Images/4-seater-wooden-sofa-set.jpg';
import crossIcon from '../Products/Images/cross.svg';
import HookImg from '../Products/Images/Hooker-Trilogy-chest.jpg';
import teakCot2 from '../Products/Images/teak-wood-double-cot-bed.jpg';
import './home.css';
import author1 from './Images/David_Hicks.jpg';
import chairImg from './Images/img-grid-1.jpg';
import doors from './Images/img-grid-2.jpg';
import sofaImg from './Images/img-grid-3.jpg';
import author2 from './Images/lorn.jfif';
const Homepage = () => {
  // Define the top 3 products
  const topProducts = [
    {
      item_id: 12,
      name: '4 seater Wooden Sofa Set',
      image: sofa_4_seater,
      description: 'Experience comfort and elegance with our 4-Seater Teak Wooden Sofa Set, crafted from high-quality teak wood.',
      price: '25,000/-',
    },
    {
      item_id: 13,
      name: '3*3 Wardrobe',
      image: HookImg,
      description: 'Enhance your bedroom with our wooden wardrobe, crafted from premium wood for durability and timeless elegance.',
      price: '16,000/-',
    },
    {
      item_id: 14,
      name: '6*6 Double Cot',
      image: teakCot2,
      description: 'Experience luxury and durability with our 6x6 teak double cot, crafted from high-quality teak wood for a stylish and sturdy addition to your bedroom.',
      price: '56,000/-',
    },
  ];

  useEffect(() => {
    const slider = tns({
      container: '.testimonial-slider',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      autoplayTimeout: 3000, // 5 seconds
      controls: false,
      controlsContainer: '#testimonial-nav',
      nav: true,
      navPosition: 'bottom',
      autoplayButtonOutput: false,
      mouseDrag: true,
    });

    return () => {
      slider.destroy(); // Cleanup on unmount
    };
  }, []);

  const navigate=useNavigate();

  const redirectToCart = () => {
    navigate('/shop'); // Redirect to cart page
  };

  return (
    <div>
      <div className="we-help-section">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-7 mb-5 mb-lg-0">
              <div className="imgs-grid">
                <div className="grid grid-1">
                  <img src={doors} alt="Modern Interior Design 1" />
                </div>
                <div className="grid grid-2">
                  <img src={chairImg} alt="Modern Interior Design 2" />
                </div>
                <div className="grid grid-3">
                  <img src={sofaImg} alt="Modern Interior Design 3" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 ps-lg-5">
              <h2 className="section-title mb-4">We Help You Make Modern <br /> Interior Design</h2>
              <p>Our team is dedicated to bringing your vision to life with contemporary interior design solutions. We blend innovative ideas with practical functionality to create stylish spaces that perfectly reflect your personal taste. Whether you're revamping a single room or your entire home, we provide expert guidance to ensure every detail enhances your modern living experience.</p>
              <ul className="list-unstyled custom-list my-4">
                <li>Creating Stylish Spaces, One Room at a Time</li>
                <li>Bringing Your Vision to Life with Modern Design</li>
                <li>Elevating Your Space with Contemporary Design</li>
                <li>Innovative Solutions for Stylish Interiors</li>
              </ul>
              <p><Link to="/shop" className="btn">Explore</Link></p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Section */}
      <div className="product-section">
  <div className="container">
    <div className="row">

      {/* Column 1 */}
      <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
        <h2 className="mb-4 section-title">Crafted with excellent <br /> material.</h2>
        <p className="mb-4">
          Our designs are meticulously crafted using only the highest quality materials, ensuring both durability and elegance. We prioritize premium craftsmanship in every detail, from selection to execution, to deliver products that not only look exceptional but also stand the test of time. Trust us to enhance your space with superior materials that blend style and strength seamlessly.
        </p>
        <p>
          <Link to="/shop" className="btn btn-primary">Explore</Link>
        </p>
      </div>

      {/* Dynamic Product Columns */}
      {topProducts.map((product) => (
        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={product.item_id}>
          <div className="product-item">
            <Link to={`http://localhost:3000/product/${product.item_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid product-thumbnail"
              />
              <h3 className="product-title">{product.name}</h3>
              <strong className="product-price">{product.price}</strong>
            </Link>
            <button className="btn-view">View Details</button>
            <span className="icon-cross" onClick={redirectToCart}>
              <img src={crossIcon} className="img-fluid" alt="Cross icon" />
            </span>
          </div>
        </div>
      ))}

    </div>
  </div>
</div>

      <div className="testimonial-section">
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="testimonial-slider-wrap text-center">
                <div className="testimonial-slider">
                  <div className="item">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mx-auto">
                        <div className="testimonial-block text-center">
                          <blockquote className="mb-5">
                            <p>&ldquo;The best rooms have something to say about the people who live in them.&rdquo;</p>
                          </blockquote>

                          <div className="author-info">
                            <div className="author-pic">
                              <img src={author1} alt="Maria Jones" className="img-fluid" />
                            </div>
                            <h3 className="font-weight-bold">David Hicks</h3>
                            <span className="position d-block mb-3 author-pic img">an English interior decorator and designer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mx-auto">
                        <div className="testimonial-block text-center">
                          <blockquote className="mb-5">
                            <p>&ldquo;Simplicity is the ultimate sophistication.&rdquo;</p>
                          </blockquote>

                          <div className="author-info">
                            <div className="author-pic">
                              <img src={author2} alt="Maria Jones" className="img-fluid" />
                            </div>
                            <h3 className="font-weight-bold">Leonardo da Vinci</h3>
                            <span className="position d-block mb-3">an Italian polymath of the High Renaissance</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mx-auto">
                        <div className="testimonial-block text-center">
                          <blockquote className="mb-5">
                            <p>&ldquo;The best rooms have something to say about the people who live in them.&rdquo;</p>
                          </blockquote>

                          <div className="author-info">
                            <div className="author-pic">
                              <img src={author1} alt="Maria Jones" className="img-fluid" />
                            </div>
                            <h3 className="font-weight-bold">David Hicks</h3>
                            <span className="position d-block mb-3 author-pic img">an English interior decorator and designer</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mx-auto">
                        <div className="testimonial-block text-center">
                          <blockquote className="mb-5">
                            <p>&ldquo;Simplicity is the ultimate sophistication.&rdquo;</p>
                          </blockquote>

                          <div className="author-info">
                            <div className="author-pic">
                              <img src={author2} alt="Maria Jones" className="img-fluid" />
                            </div>
                            <h3 className="font-weight-bold">Leonardo da Vinci</h3>
                            <span className="position d-block mb-3">an Italian polymath of the High Renaissance</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
}

export default Homepage;
