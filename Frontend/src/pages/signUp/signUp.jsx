import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    homeAddress: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [requiredFields] = useState([
    'firstName', 'lastName', 'gender', 'homeAddress', 'dateOfBirth', 'phone', 'email', 'password', 'confirmPassword'
  ]);

  const isFieldEmpty = (field) => {
    return field === '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const areRequiredFieldsFilled = requiredFields.every(field => !isFieldEmpty(formData[field]));
  
    if (areRequiredFieldsFilled) {
      try {
        const response = await fetch('/signup', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), 
        });
  
        if (response.ok) {
         
          
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
  
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        homeAddress: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };
  

  return (
    <div className="grid-container">
      <div className="square"></div>
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: 'center', color: '#7B9B69', fontSize: '35px', marginTop: '23px', fontWeight: 'bold'}}>
          Welcome!
        </p>
        <div className="form-group">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="firstName" style={{ color: '#7B9B69' }}>
                First name{requiredFields.includes('firstName') && isFieldEmpty(formData.firstName) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: '#7B9B69' }}>
                Last name{requiredFields.includes('lastName') && isFieldEmpty(formData.lastName) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" style={{ color: '#7B9B69' }}>
                Gender{requiredFields.includes('gender') && isFieldEmpty(formData.gender) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '13px' }}>
                <button
                  type="button"
                  style={{
                    border: '1px solid #7B9B69',
                    color: formData.gender === 'Male' ? 'white' : '#7B9B69',
                    backgroundColor: formData.gender === 'Male' ? '#7B9B69' : 'white',
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
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
                    borderRadius: '15px',
                    padding: '5px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => setFormData({ ...formData, gender: 'Female' })}
                >
                  Female
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="homeAddress" style={{ color: '#7B9B69' }}>
                Home Address{requiredFields.includes('homeAddress') && isFieldEmpty(formData.homeAddress) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="homeAddress"
                name="homeAddress"
                placeholder="1 Smith Road"
                value={formData.homeAddress}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth" style={{ color: '#7B9B69' }}>
                Date of Birth{requiredFields.includes('dateOfBirth') && isFieldEmpty(formData.dateOfBirth) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="YYYY/MM/DD"
                value={formData.dateOfBirth}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="phone" style={{ color: '#7B9B69' }}>
                Phone{requiredFields.includes('phone') && isFieldEmpty(formData.phone) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="email" style={{ color: '#7B9B69' }}>
                Email{requiredFields.includes('email') && isFieldEmpty(formData.email) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="password" style={{ color: '#7B9B69' }}>
                Password{requiredFields.includes('password') && isFieldEmpty(formData.password) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="confirmPassword" style={{ color: '#7B9B69' }}>
                Confirmed Password{requiredFields.includes('confirmPassword') && isFieldEmpty(formData.confirmPassword) ? (
                  <span style={{ color: 'red' }}>*</span>
                ) : null}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  borderBottom: '2px solid #7B9B69',
                }}
              />
            </div>
          </div>
        </div>
        <button
          className="submit"
          type="submit"
          style={{
            width: '40%',
            color: 'white',
            backgroundColor: '#7B9B69',
            borderRadius: '15px',
            padding: '8px 20px',
            margin: 'auto',
            display: 'block',
            marginTop: '16px',
          }}
        >
          Register
        </button>
        <p className="link" style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ color: '#7B9B69', fontSize: '12px'  }}>
            Got an account? Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;