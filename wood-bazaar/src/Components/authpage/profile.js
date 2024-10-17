// src/Components/Profile/ProfilePage.js
import { faPen, faSave, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null); // Track which field is being edited
    const [editedValue, setEditedValue] = useState(''); // Track the edited value
    const [addressFields, setAddressFields] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
    });
    const navigate = useNavigate();
    const api = "http://localhost:8081";

    const fetchUserDetails = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate('/'); // Redirect if no userId is found
            return;
        }
        try {
            const response = await fetch(`${api}/userDetails/${userId}`);
            const data = await response.json();
            console.log('Fetched user details:', data);
            if (response.ok) {
                setUserDetails(data);
                // Set address fields if available
                setAddressFields({
                    address_line1: data.address_line1 || '',
                    address_line2: data.address_line2 || '',
                    city: data.city || '',
                    state: data.state || '',
                    postal_code: data.postal_code || '',
                    country: data.country || '',
                });
            } else {
                setError(data.error || 'Error fetching user details');
            }
        } catch (err) {
            console.error('Error fetching user details:', err);
            setError('Failed to fetch user details');
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [navigate]);

    const handleEditClick = (field, currentValue) => {
        setEditingField(field);
        setEditedValue(currentValue);
    };

    const handleSaveClick = async (field) => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        try {
            const updateData = { [field]: editedValue };
            const response = await fetch(`${api}/userDetails/${userId}`, {
                method: 'PUT', // Update the user details
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
    
            if (response.ok) {
                console.log('Update successful'); // Log success
                fetchUserDetails(); // Re-fetch user details after saving
                setEditingField(null); // Stop editing
            } else {
                console.error('Failed to update user details:', await response.text()); // Log error response
            }
        } catch (err) {
            console.error('Error updating user details:', err);
        }
    };

    const handleAddressSaveClick = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        try {
            const response = await fetch(`${api}/userAddresses`, {
                method: 'POST', // Add or update address details
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, ...addressFields }),
            });

            if (response.ok) {
                console.log('Address update successful'); // Log success
                fetchUserDetails(); // Re-fetch user details after saving
            } else {
                console.error('Failed to update address details:', await response.text()); // Log error response
            }
        } catch (err) {
            console.error('Error updating address details:', err);
        }
    };

    const handleInputChange = (e) => {
        setEditedValue(e.target.value);
    };

    const handleAddressInputChange = (e) => {
        setAddressFields({
            ...addressFields,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="profile-page">
            {error ? (
                <p className="error">{error}</p>
            ) : userDetails ? (
                <div className="profile-details">
                    <div className="profile-icon-container">
                        <div className="profile-icon">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <p className="user-name">{userDetails.user_name}</p>
                    </div>
                    {/* User Details */}
                    {['user_name', 'email', 'first_name', 'last_name'].map((field) => (
                        <div className="profile-item" key={field}>
                            <p><strong>{field.replace('_', ' ').toUpperCase()}:</strong></p>
                            {editingField === field ? (
                                <input
                                    type="text"
                                    value={editedValue}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{userDetails[field]}</p>
                            )}
                            <FontAwesomeIcon
                                icon={editingField === field ? faSave : faPen}
                                className="edit-icon"
                                onClick={() =>
                                    editingField === field
                                        ? handleSaveClick(field)
                                        : handleEditClick(field, userDetails[field])
                                }
                            />
                        </div>
                    ))}

                    <h3>Address Details</h3>
                    {['address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country'].map((field) => (
                        <div className="profile-item" key={field}>
                            <p><strong>{field.replace('_', ' ').toUpperCase()}:</strong></p>
                            {editingField === field ? (
                                <input
                                    type="text"
                                    name={field}
                                    value={addressFields[field]}
                                    onChange={handleAddressInputChange}
                                />
                            ) : (
                                <p>{addressFields[field] || 'Not Provided'}</p>
                            )}
                            <FontAwesomeIcon
                                icon={editingField === field ? faSave : faPen}
                                className="edit-icon"
                                onClick={() =>
                                    editingField === field
                                        ? handleAddressSaveClick()
                                        : handleEditClick(field, addressFields[field])
                                }
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default ProfilePage;
