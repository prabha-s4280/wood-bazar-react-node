import Footer from "../Footer/footer";
import aboutImage from './Images/about-us.jpg';
import bagImg from './Images/bag.svg';
import ceoImg from './Images/ceo-1.jpg';
import JaneImg from './Images/person_1.jpg';
import JohnImg from './Images/person_2.jpg';
import person3 from './Images/person_3.jpg';
import person4 from './Images/person_4.jpg';
import returnImg from './Images/return.svg';
import support from './Images/support.svg';
import truck from './Images/truck.svg';
import './about.css';

const team=[
  {
    name: 'John Doe',
    position: 'CEO & Founder',
    description: 'John is the visionary behind WoodBazar and leads the team with a passion for design and innovation.',
    image: JohnImg,
  },
  {
    name: 'Jane Smith',
    position: 'Chief Designer',
    description: 'Jane oversees all design projects, ensuring they meet our high standards for quality and style.',
    image: JaneImg,
  },
  {
    name: 'John Doe',
    position: 'CEO & Founder',
    description: 'John is the visionary behind WoodBazar and leads the team with a passion for design and innovation.',
    image: person3,
  },
  {
    name: 'Jane Smith',
    position: 'Chief Designer',
    description: 'Jane oversees all design projects, ensuring they meet our high standards for quality and style.',
    image: person4,
  },
  {
    name: 'John Doe',
    position: 'CEO & Founder',
    description: 'John is the visionary behind WoodBazar and leads the team with a passion for design and innovation.',
    image: ceoImg,
  },
  {
    name: 'Jane Smith',
    position: 'Chief Designer',
    description: 'Jane oversees all design projects, ensuring they meet our high standards for quality and style.',
    image: JohnImg,
  },
]

const About=()=>{
    return(
        <div>
            <div className="about-us-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>
                Welcome to Wood Bazar, your premier destination for handcrafted furniture made from the finest teak wood. Our commitment to quality and craftsmanship ensures that every piece of furniture we offer is unique, durable, and designed to enhance your living space.
              </p>
              <p>
                At Wood Bazar, we take pride in our heritage of woodworking and our dedication to sustainability. Our skilled artisans use traditional techniques combined with modern innovations to create timeless furniture that reflects both elegance and functionality.
              </p>
              <p>
                Our mission is to provide our customers with exceptional products and unparalleled service. We believe that furniture should not only be beautiful but also a reflection of your personal style and comfort. Whether you’re looking for a statement piece or custom-made furniture to fit your needs, we’re here to help you find exactly what you’re looking for.
              </p>
              <p>
                Thank you for choosing Wood Bazar. We look forward to helping you transform your home with our exquisite teak wood furniture.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image">
              <img src={aboutImage} alt="Wood Bazar Furniture" className="img-fluid" />
            </div>
          </div>
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
                    <img src={bagImg} alt="Easy to Shop" className="img-fluid" />
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
                    <img src={returnImg} alt="Hassle Free Returns" className="img-fluid" />
                  </div>
                  <h3>Hassle Free Returns</h3>
                  <p>Experience the ease of hassle-free returns. At Wood Bazar, we make returning items simple and straightforward, so you can shop with confidence.</p>
                </div>
              </div>
            </div>
            <div className="container text-center my-5">
            <h2 className="mb-4">Our Team</h2>
          <div className="team col-md-12">
            <div className="row">
            {team.map((member, index) => (
              <div key={index} className="team-member col-12 col-md-6 col-lg-4 mb-4">
                <div className="card">
                <img src={member.image} alt={member.name} className="card-img-top"/>
                <div className="card-body">
                <h3 className="card-title">{member.name}</h3>
                <p className="card-text">{member.position}</p>
                <p className="card-text">{member.description}</p> 
                </div>
                </div>
              </div>
            ))}
            </div>
          </div>
            </div>
        </div>
      </div>
    </div>
            <Footer />
        </div>
    )
};

export default About;