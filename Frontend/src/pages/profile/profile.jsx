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
    home_address: true,
    phone_number: true,
    date_of_birth: true,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState({});
  const dateOfBirth = new Date(formData.date_of_birth);
  const year = dateOfBirth.getFullYear();
  const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0'); 
  const day = dateOfBirth.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/profile/2'); // replace '123' with the actual patient_id
        const data = await response.json();
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
  };

  const handleCancel = () => {
    if (isEditing) {
      setFormData(savedData);
    }
    toggleEditing();
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} style={{ transform: 'scale(0.87)', marginTop: '-120px' }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom style={{ color: '#7B9B69', fontSize: '40px', fontWeight: '800', fontFamily: 'Times New Roman', transform: 'translateY(60px)' }}>
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
                  transform: 'translateY(800px)',
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
                  transform: 'translateY(800px)',
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
            {requiredFields.lastName && !formData.lastName && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
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
            {requiredFields.dateOfBirth && !formData.dateOfBirth && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="dob"
                  name="dateOfBirth"
                  placeholder="2001/05/20"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formattedDate}
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
                  value={formData.home_address}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
              </div>
            ) : (
              <span style={{ color: '#7B9B69', fontSize: '14px', fontWeight: '700' }}>
                {formData.home_address}
              </span>
            )}
          </div>
          <br />
          <div>
            <span style={{ color: 'gray' }}>Phone number</span>
            {requiredFields.phoneNumber && !formData.phoneNumber && (
              <span style={{ color: 'red' }}> *</span>
            )}
            <br />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="123-456-7890"
                  value={formData.phone_number}
                  onChange={handleChange}
                  style={{
                    borderBottom: '2px solid #7B9B69',
                    width: '230px',
                  }}
                />
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