import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Avatar, IconButton, Button } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PersonIcon from '@mui/icons-material/Person';
import './profile.css';

const Profile = () => {
  const requiredFields = {
    first_name: true,
    last_name: true,
    email: true,
    address: true,
    phone_number: true,
    date_of_birth: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
 
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // For testing purposes, set patient_id to 3 until the JVT token is implemented
        const response = await fetch('/profile/2'); 
        const data = await response.json();
        // Assume that data.date_of_birth is the date string
        const parsedDate = new Date(data.date_of_birth);
        // Extract the date portion
        const dateOnly = parsedDate.toISOString().split('T')[0];
        // Update the formData
        data.date_of_birth = dateOnly;

        setFormData(data);
        setSavedData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSave = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(`/profile/${formData.patient_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSavedData(formData);
          toggleEditing();
        } else {
          console.error('Error saving profile changes:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving profile changes:', error);
      }
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setFormData(savedData);
    }
    toggleEditing();
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const validateForm = () => {
    const errors = {};

    // Validate phone number
    if (!isPhoneNumberValid(formData.phone_number)) {
      errors.phone_number = 'Invalid phone number';
    }

    // Validate email
    if (!isEmailValid(formData.email)) {
      errors.email = 'Invalid email address';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} style={{  marginTop: '-110px', transform: 'scale(0.87)' }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: '#7B9B69', fontSize: '35px', fontWeight: '800', fontFamily: 'Times New Roman', transform: 'translateY(60px)'}}>
            Hi, {formData.first_name}!
          </Typography>
          <Typography variant="h4" gutterBottom>
            <Avatar sx={{ width: 150, height: 150, backgroundColor: '#7B9B69', borderRadius: '10%', transform: 'translateY(60px)' }}>
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          
          <Box mt={4} display="flex" justifyContent="left">
            {isEditing ? (
              <>
                <Button onClick={handleSave} style={{
                  border: '1px solid #7B9B69',
                  color: 'white',
                  backgroundColor: '#7B9B69',
                  borderRadius: '25px',
                  padding: '8px 15px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transform: 'translateY(750px)',
                  fontSize: '15px',
                
                }}>
                  Save Changes
                </Button>
                <Button onClick={handleCancel} style={{
                  border: '1px solid #7B9B69',
                  color: '#7B9B69',
                  backgroundColor: 'white',
                  borderRadius: '25px',
                  padding: '0px 15px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transform: 'translateY(752px)',
                  fontSize: '15px',
                  marginLeft: '12px',
                }}>
                  Cancel
                </Button>
              </>
            ) : (
              <IconButton color="primary" aria-label="edit" onClick={toggleEditing} sx={{ color: 'green', fontSize: '17px', fontWeight: '700', transform: 'translateX(-7px)' }}>
                <span style={{ color: '#7B9B69' }}>Patient details</span>
                <EditTwoToneIcon sx={{ color: '#7B9B69', fontSize: '20px' }} />
              </IconButton>
            )}
          </Box>
          <div>
            <span style={{ color: 'gray' }}>First name</span>
            {requiredFields.first_name && !formData.first_name && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.first_name}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Last name</span>
            {requiredFields.last_name && !formData.last_name && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  placeholder="Doe"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.last_name}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Gender</span><br />
            {isEditing ? (
              <div>
                <button
                  type="button"
                  style={{
                    border: '1px solid #7B9B69',
                    color: formData.gender === 'Male' ? 'white' : '#7B9B69',
                    backgroundColor: formData.gender === 'Male' ? '#7B9B69' : 'white',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Male' })}
                >
                  Male
                </button>
                <button
                  type="button"
                  style={{
                    border: '1px solid #7B9B69',
                    color: formData.gender === 'Female' ? 'white' : '#7B9B69',
                    backgroundColor: formData.gender === 'Female' ? '#7B9B69' : 'white',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Female' })}
                >
                  Female
                </button>
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>{formData.gender}</span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Date of Birth</span>
            {requiredFields.date_of_birth && !formData.date_of_birth && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="date"
                  id="dob"
                  name='date_of_birth'
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
                
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.date_of_birth}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Email</span>
            {requiredFields.email && !formData.email && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="johndoe@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
                {validationErrors.email && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{validationErrors.email}</span>
                )}
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.email}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Home address</span>
            {requiredFields.address && !formData.address && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="1 Smith Road"
                  value={formData.address}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.address}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Phone number</span>
            {requiredFields.phone_number && !formData.phone_number && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phone_number"
                  placeholder="123-456-7890"
                  value={formData.phone_number}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
                {validationErrors.phone_number && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{validationErrors.phone_number}</span>
                )}
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.phone_number}
              </span>
            )}
          </div>
          <div className={`green-square ${isEditing ? 'editing' : ''}`}></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;