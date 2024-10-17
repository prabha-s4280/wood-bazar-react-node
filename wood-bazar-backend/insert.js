const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const formData = new FormData();

const products = JSON.stringify(
    [
              
    ]
);

formData.append('products', products);
formData.append('Img_file', fs.createReadStream('path/image_name.jpg'));  

axios.post('http://localhost:8081/products', formData, {
    headers: formData.getHeaders(),
})
.then(response => {
    console.log('Response:', response.data);
})
.catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
});
