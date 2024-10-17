const express = require('express');
const app = express();
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const { get } = require('http');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;



app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dbPath = path.join(__dirname, "data.db");
let DB = null;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const initializeDBandServer = async () => {
    try {
        DB = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(8081, () => {
            console.log("Server Started at http://localhost:8081");
        });
    } catch (e) {
        console.log(`ERROR: ${e.message}`);
        process.exit(1);
    };
};

initializeDBandServer();

// Get all products
app.get('/products/', async (req, res) => {
    try {
        const getProducts = `
            SELECT 
                *
            FROM
                Products;`;
        const products = await DB.all(getProducts);
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Post multiple products with associated images
app.post('/products', upload.array('Img_file', 20), async (req, res) => {
    try {
        const products = JSON.parse(req.body.products); // Parse the JSON string from the form data
        const files = req.files;

        if (!files || files.length !== products.length) {
            return res.status(400).json({ error: "Number of images doesn't match number of products." });
        }

        for (let i = 0; i < products.length; i++) {
            const { Name, prod_desc, price, any_offer, discount } = products[i];
            const Img_file = files[i] ? `/uploads/${files[i].filename}` : null;

            if (!Img_file) {
                return res.status(400).json({ error: "Image file is required for each product." });
            }

            await DB.run(
                `INSERT INTO Products (Name, Img_file, prod_desc, price, any_offer, discount)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [Name, Img_file, prod_desc, parseInt(price), any_offer === "true", parseInt(discount)]
            );
        }

        res.status(201).json({ message: 'Products created successfully' });
    } catch (e) {
        console.log('Error:', e.message);
        res.status(500).json({ error: e.message });
    }
});

//get product details by Id

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const getProductQuery = `
      SELECT p.Prod_Id,p.Img_file, p.Name, p.price, p.prod_desc,pd.available_offers, 
             pd.delivery_date, pd.warranty_months, pd.highlights, pd.ratings, pd.reviews
      FROM Products p
      JOIN ProductDetails pd ON p.Prod_Id = pd.Prod_Id
      WHERE p.Prod_Id = ?;
    `;
    try {
      const product = await DB.get(getProductQuery, [id]);
      res.send(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Server error');
    }
  });
  

  // POST endpoint to add product details
  app.post('/details', async (req, res) => {
    try {
        const prodDetails = req.body;

        const addDetailsQuery = `
        INSERT INTO ProductDetails 
        (item_Id, Prod_Id, available_offers, warranty_months, delivery_date, highlights, ratings, reviews)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        for (const detail of prodDetails) {
            const {
                item_Id,
                Prod_id,
                available_offers,
                warranty_months,
                delivery_date,
                highlights,
                rating,       // Changed from `ratings` to `rating` to match the request body
                review,       // Changed from `reviews` to `review` to match the request body
            } = detail;

            await DB.run(addDetailsQuery, [
                item_Id,
                Prod_id,
                available_offers,
                warranty_months,
                delivery_date,
                highlights,
                rating,        // Pass `rating` here
                review,        // Pass `review` here
            ]);
        }

        res.send({ success: true, message: 'Product details added successfully!' });
    } catch (error) {
        console.error('Error adding product details:', error);
        res.status(500).send('Server error');
    }
});


//get the all product details

app.get('/details', async (req, res) => {
    try {
        const getAllDetailsQuery = `SELECT * FROM ProductDetails;`;
        const details = await DB.all(getAllDetailsQuery);
        res.json(details);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Server error');
    }
});

// user registration
// User registration
app.post("/register", async (req, res) => {
    const { user_name, email, password, first_name, last_name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await DB.run(`
            INSERT INTO Users (user_name, email, password, first_name, last_name)
            VALUES (?, ?, ?, ?, ?)`,
            [user_name, email, hashedPassword, first_name, last_name]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

//user login


// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await DB.get('SELECT * FROM Users WHERE email = ?', [email]);
        
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ user_id: user.user_id }, jwtSecretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token,user_id: user.user_id, user_name:user.user_name });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get registered users

app.get('/register',async (req,res)=>{
    try {
        const getAllUsers = `SELECT * FROM Users;`;
        const details = await DB.all(getAllUsers);
        res.json(details);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Server error');
    }
})


// Get user details by email
app.get('/user/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const getUserQuery = `
            SELECT user_name, email, first_name, last_name
            FROM Users
            WHERE email = ?;
        `;
        const user = await DB.get(getUserQuery, [email]);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// get user profile

app.get('/userDetails/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log('Fetching user details for user_id:', user_id);
        
        const getUserDetails = `
            SELECT Users.user_id, Users.user_name, Users.email, Users.first_name, Users.last_name,
                   UserAddresses.address_line1, UserAddresses.address_line2, UserAddresses.city,
                   UserAddresses.state, UserAddresses.postal_code, UserAddresses.country
            FROM Users
            LEFT JOIN UserAddresses ON Users.user_id = UserAddresses.user_id
            WHERE Users.user_id = ?;`;

        const user = await DB.get(getUserDetails, [user_id]);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Add or Update Address API
app.post('/userAddresses', async (req, res) => {
    const { user_id, address_line1, address_line2, city, state, postal_code, country } = req.body;

    try {
        // Check if an address already exists for the user
        const addressExistsQuery = 'SELECT COUNT(*) AS count FROM UserAddresses WHERE user_id = ?';
        const { count } = await DB.get(addressExistsQuery, [user_id]);

        let result;

        if (count > 0) {
            // Update the existing address
            const updateAddressQuery = `
                UPDATE UserAddresses
                SET address_line1 = ?, address_line2 = ?, city = ?, state = ?, postal_code = ?, country = ?, created_at = datetime('now')
                WHERE user_id = ?;
            `;
            result = await DB.run(updateAddressQuery, [address_line1, address_line2, city, state, postal_code, country, user_id]);
        } else {
            // Insert a new address
            const insertAddressQuery = `
                INSERT INTO UserAddresses (user_id, address_line1, address_line2, city, state, postal_code, country, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'));
            `;
            result = await DB.run(insertAddressQuery, [user_id, address_line1, address_line2, city, state, postal_code, country]);
        }

        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Failed to update address' });
    }
});


// post checkout address

app.post("/users/checkoutAddress", async (req, res) => {
    const { user_id, country, firstName, lastName, address_line1, address_line2, street, stateCountry, postalZip, phone, emailAddress } = req.body;
    
    // Check for missing fields
    if (!user_id || !country || !firstName || !lastName || !address_line1 || !street|| !stateCountry || !postalZip || !phone || !emailAddress) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const toPostAddress = `
        INSERT INTO BuyAddresses (user_id, country, first_name, last_name, address_line1, address_line2, street, state, postal_code, phone_number, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    DB.run(toPostAddress, [user_id, country, firstName, lastName, address_line1, address_line2, street, stateCountry, postalZip, phone, emailAddress], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ address_id: this.lastID });
    });
});



// get checkout addresses


// GET endpoint to fetch addresses by user ID
app.get('/users/addresses/:user_Id', async (req, res) => {
    const { user_Id } = req.params;
    try {
        const getCheckoutAddressQuery = `
            SELECT * FROM BuyAddresses WHERE user_id = ?;
        `;
        const checkoutAddress=await DB.all(getCheckoutAddressQuery,[user_Id]);
        res.json(checkoutAddress);
    } catch (err) {
        console.error('Error fetching previous addresses:', error);
        res.status(500).json({ message: 'Failed to fetch addresses' });}
});


// to add item to cart

app.post("/addtoCart", async (req, res) => {
    const { user_Id, prodId, quantity } = req.body;
    
    console.log('Request Body:', { user_Id, prodId, quantity }); // Log request body for debugging
    
    const addedAt = new Date();
    try {
        await DB.run('INSERT INTO Cart (user_id, prod_id, quantity, added_at) VALUES (?, ?, ?, ?)', [user_Id, prodId, quantity, addedAt]);
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error); // Log error for debugging
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});


// get cart items by user Id


app.get('/cartItems/:userId',async (req,res)=>{
    const userId=req.params.userId;
    try {
        const cartItems = await DB.all(`
            SELECT Cart.cart_id, Cart.quantity,Cart.Prod_id, Products.name, Products.price, Products.img_file, Products.discount
            FROM Cart
            JOIN Products ON Cart.Prod_id = Products.Prod_Id
            WHERE Cart.user_id = ?`,[userId]);

            if (cartItems.length === 0) {
                return res.status(404).json({ error: 'No items found for this user' });
            }
            
          res.json(cartItems);
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ error: 'Failed to retrieve cart items' });
    }
    });

// Remove item from cart
app.delete('/removeItem/:id', async (req, res) => {
    const { id } = req.params;
    try {
    await DB.run('DELETE FROM Cart WHERE cart_id = ?', [id]);
    res.json({ message: 'Item removed from cart' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});


// Update cart item quantity API
app.put('/updateCart/:cart_id', (req, res) => {
    const cart_id = req.params.cart_id;
    const { quantity } = req.body;
  
    // Ensure quantity is valid
    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than zero' });
    }
  
    // SQL query to update the quantity in the cart
    const query = `UPDATE Cart SET quantity = ? WHERE cart_id = ?`;
  
    DB.run(query, [quantity, cart_id], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update cart' });
      }
  
      res.status(200).json({ message: 'Cart updated successfully!' });
    });
  });

// delete an item from cart

  app.delete('/removeItem/:cart_id', (req, res) => {
    const cart_id = req.params.cart_id;
  
    const query = `DELETE FROM Cart WHERE cart_id = ?`;
  
    DB.run(query, [cart_id], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to remove item from cart' });
      }
  
      res.status(200).json({ message: 'Item removed successfully!' });
    });
  });


  // add rating and review

app.post('/product/:id/add-review',async(req,res)=>{
    const { id } = req.params; // product id
  const { user_id, rating, review_text } = req.body;
  const created_at = new Date().toISOString();

  try {
    const insertQuery = `
      INSERT INTO ReviewsAndRating (user_id, Prod_Id, rating, review_text, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    await DB.run(insertQuery, [user_id, id, rating, review_text, created_at]);

    const fetchReviewsQuery = `
      SELECT R.rating, R.review_text, U.user_name
      FROM ReviewsAndRating R
      JOIN Users U ON R.user_id = U.user_id
      WHERE R.Prod_Id = ?
      ORDER BY R.created_at DESC
    `;

    const updatedReviews = await DB.all(fetchReviewsQuery, [id]);

    res.status(200).json({ message: 'Review added successfully', reviews: updatedReviews });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// GET: Fetch all reviews for a specific product
app.get('/product/:id/reviews', async (req, res) => {
    const id=req.params.id; // product id
  
    try {
      const query = `
        SELECT R.rating, R.review_text, U.user_name
        FROM ReviewsAndRating R
        JOIN Users U ON R.user_id = U.user_id
        WHERE R.Prod_Id = ?
        ORDER BY R.created_at DESC
      `;
      const reviews = await DB.all(query, [id]);
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found' });
      }
  
      res.status(200).json(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });