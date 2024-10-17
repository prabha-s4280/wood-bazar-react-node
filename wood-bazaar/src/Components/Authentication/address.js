// src/Components/Profile/EditAddress.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditAddress = ({ userId, onAddressUpdated }) => {
    const [addressDetails, setAddressDetails] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    });

    const navigate = useNavigate();
    const api = "http://localhost:8081";

    const handleChange = (e) => {
        setAddressDetails({
            ...addressDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${api}/userAddresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    ...addressDetails
                }),
            });

            if (response.ok) {
                onAddressUpdated(); // Callback to update the profile page
                navigate('/profile'); // Redirect back to the profile page
            } else {
                console.error('Failed to update address');
            }
        } catch (err) {
            console.error('Error updating address:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="address_line1"
                value={addressDetails.address_line1}
                onChange={handleChange}
                placeholder="Address Line 1"
                required
            />
            <input
                type="text"
                name="address_line2"
                value={addressDetails.address_line2}
                onChange={handleChange}
                placeholder="Address Line 2"
            />
            <input
                type="text"
                name="city"
                value={addressDetails.city}
                onChange={handleChange}
                placeholder="City"
                required
            />
            <input
                type="text"
                name="state"
                value={addressDetails.state}
                onChange={handleChange}
                placeholder="State"
                required
            />
            <input
                type="text"
                name="postal_code"
                value={addressDetails.postal_code}
                onChange={handleChange}
                placeholder="Postal Code"
                required
            />
            <input
                type="text"
                name="country"
                value={addressDetails.country}
                onChange={handleChange}
                placeholder="Country"
                required
            />
            <button type="submit">Save Address</button>
        </form>
    );
};

export default EditAddress;
