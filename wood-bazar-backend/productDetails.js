const express = require('express');
const router = express.Router();

router.post('/productDetails', async (req, res) => {
    try {
        const { productDetails } = req.body;

        const insertQuery = `
            INSERT INTO ProductDetails 
            (Prod_Id, available_offers, discount, delivery_date, warranty_months, highlights, ratings, reviews)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        for (const detail of productDetails) {
            await DB.run(insertQuery, [
                detail.Prod_Id,
                detail.available_offers,
                detail.discount,
                detail.delivery_date,
                detail.warranty_months,
                detail.highlights,
                detail.ratings,
                detail.reviews,
            ]);
        }

        res.send({ success: true, message: 'Product details added successfully!' });
    } catch (error) {
        console.error('Error adding product details:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
