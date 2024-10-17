import React from 'react';
import Footer from "../Footer/footer";
import './blog.css'; // Import CSS specific to the blog
import post1 from './Images/post-1.jpg';
import post2 from './Images/post-2.jpg';
import post3 from './Images/post-3.jpg';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "First Time Home Owner Ideas",
      author: "Kristin Watson",
      date: "Dec 19, 2021",
      image: post1, // Update this path according to your project structure
    },
    {
      id: 2,
      title: "How To Keep Your Furniture Clean",
      author: "Robert Fox",
      date: "Dec 15, 2021",
      image: post2, // Update this path according to your project structure
    },
    {
      id: 3,
      title: "Small Space Furniture Apartment Ideas",
      author: "Kristin Watson",
      date: "Dec 12, 2021",
      image: post3, // Update this path according to your project structure
    },
  ];

  return (
    <div>
      <div className="blog-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="section-title">Recent Blog</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <a href="#" className="more">View All Posts  &raquo;</a>
            </div>
          </div>
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                <div className="post-entry">
                  <a href="#" className="post-thumbnail">
                    <img src={post.image} alt={post.title} className="img-fluid" />
                  </a>
                  <div className="post-content-entry">
                    <h3><a href="#">{post.title}</a></h3>
                    <div className="meta">
                      <span>by <a href="#">{post.author}</a></span> <span>on {post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
