import axios from 'axios';

const productDetails = [
    {
        prod_id: 1,
        Description: 'Detailed description of Product 1',
        Price: 29.99,
        Available_Offers: '10% off',
        Discounts: '5%',
        Highlights: 'High quality, Durable',
        Warranty_in_months: 12,
        Delivery_time: '5 days',
        Rating: 4.5,
        Review: 'Great product!'
    },
    {
        prod_id: 2,
        Description: 'Detailed description of Product 2',
        Price: 149.99,
        Available_Offers: '15% off',
        Discounts: '10%',
        Highlights: 'Durable, Reliable',
        Warranty_in_months: 24,
        Delivery_time: '3 days',
        Rating: 4.8,
        Review: 'Excellent value for money!'
    }
];

axios.post('http://localhost:8081/details', productDetails, {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});
