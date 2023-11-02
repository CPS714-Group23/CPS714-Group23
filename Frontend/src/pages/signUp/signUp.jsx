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

  const [validationErrors, setValidationErrors] = useState({});

  const isFieldEmpty = (field) => {
    return field === '';
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isPhoneNumberValid = (phone) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const isDateOfBirthValid = (dateOfBirth) => {
    // You can add more comprehensive date validation logic here.
    // For simplicity, let's assume a basic pattern YYYY/MM/DD.
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    return datePattern.test(dateOfBirth);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const errors = {};

    // Validate phone number
    if (!isPhoneNumberValid(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (e.g., 123-456-7890)';
    }

    // Validate email
    if (!isEmailValid(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate date of birth
    if (!isDateOfBirthValid(formData.dateOfBirth)) {
      errors.dateOfBirth = 'Please enter a valid date of birth (e.g., YYYY/MM/DD)';
    }

    // Validate password
    if (!isPasswordValid(formData.password)) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Check if password matches with confirmed password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);

    // Return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ['firstName', 'lastName', 'gender', 'homeAddress', 'dateOfBirth', 'phone', 'email', 'password', 'confirmPassword'];
    const areRequiredFieldsFilled = requiredFields.every((field) => !isFieldEmpty(formData[field]));

    if (areRequiredFieldsFilled) {
      // Validate the form here
      if (validateForm()) {
        try {
          const response = await fetch('/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            // Form submission successful, you can handle success as needed
            console.log('Form submitted successfully');

            // Clear the form and validation errors
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
            setValidationErrors({});
          } else {
            console.error('Request failed with status:', response.status);
            // You can handle errors or display an error message to the user here
          }
        } catch (error) {
          console.error('Request error:', error);
          // Handle network or request errors here
        }
      }
    } else {
      // Handle required field validation errors
      const requiredFieldErrors = {};
      requiredFields.forEach((field) => {
        if (isFieldEmpty(formData[field])) {
          requiredFieldErrors[field] = 'This field is required';
        }
      });
      setValidationErrors(requiredFieldErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="grid-container">
      <div className="square"></div>
      <form onSubmit={handleSubmit}>
        <p style={{ textAlign: 'center', color: '#7B9B69', fontSize: '35px', marginTop: '23px', fontWeight: 'bold' }}>
          Welcome!
        </p>
        <div className="form-group">
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="firstName" style={{ color: '#7B9B69' }}>
                First name{isFieldEmpty(formData.firstName) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.firstName && <p style={{ color: 'red' }}>{validationErrors.firstName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" style={{ color: '#7B9B69' }}>
                Last name{isFieldEmpty(formData.lastName) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.lastName && <p style={{ color: 'red' }}>{validationErrors.lastName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="gender" style={{ color: '#7B9B69' }}>
                Gender{isFieldEmpty(formData.gender) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.gender && <p style={{ color: 'red' }}>{validationErrors.gender}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="homeAddress" style={{ color: '#7B9B69' }}>
                Home Address{isFieldEmpty(formData.homeAddress) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.homeAddress && <p style={{ color: 'red' }}>{validationErrors.homeAddress}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth" style={{ color: '#7B9B69' }}>
                Date of Birth{isFieldEmpty(formData.dateOfBirth) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.dateOfBirth && <p style={{ color: 'red' }}>{validationErrors.dateOfBirth}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="phone" style={{ color: '#7B9B69' }}>
                Phone{isFieldEmpty(formData.phone) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.phone && <p style={{ color: 'red' }}>{validationErrors.phone}</p>}
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="email" style={{ color: '#7B9B69' }}>
                Email{isFieldEmpty(formData.email) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.email && <p style={{ color: 'red' }}>{validationErrors.email}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>
            <div className="form-group">
              <label htmlFor="password" style={{ color: '#7B9B69' }}>
                Password{isFieldEmpty(formData.password) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.password && <p style={{ color: 'red' }}>{validationErrors.password}</p>}
            </div>
            <div className="form-group" style={{ marginRight: '80px' }}>
              <label htmlFor="confirmPassword" style={{ color: '#7B9B69' }}>
                Confirmed Password{isFieldEmpty(formData.confirmPassword) ? <span style={{ color: 'red' }}>*</span> : null}
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
              {validationErrors.confirmPassword && <p style={{ color: 'red' }}>{validationErrors.confirmPassword}</p>}
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
          <Link to="/login" style={{ color: '#7B9B69', fontSize: '12px' }}>
            Got an account? Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;