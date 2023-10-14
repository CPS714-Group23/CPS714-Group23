import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import './signUp.css';

export default function SignUp() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    postalCode: '',
    country: '',
    stateProvince: '',
    phoneNumber: '',
    email: '',
    password: '',
    reenterPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState({ ...initialFormData });

  const validateField = (field, value) => {
    const validationRules = {
      firstName: { required: true },
      lastName: { required: true },
      dob: { required: true },
      address: { required: true },
      postalCode: {
        required: true,
        regex: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        errorMessage: 'Invalid postal code format (e.g., S3D 4T6)',
      },
      email: {
        required: true,
        regex: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        errorMessage: 'Invalid email address',
      },
      password: {
        required: true,
        regex: /.{8,}/,
        errorMessage: 'Password must be at least 8 characters long',
      },
      reenterPassword: { required: true },
      country: { required: true },
      stateProvince: { required: true },
      phoneNumber: {
        required: true,
        regex: /^\d{3}-\d{3}-\d{4}$/,
        errorMessage: 'Invalid phone number format (e.g., 456-454-4545)',
      },
    };

    if (validationRules[field].required && !value) {
      return `${field} is required`;
    }

    if (validationRules[field].regex && !validationRules[field].regex.test(value)) {
      return validationRules[field].errorMessage;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessages({
      ...errorMessages,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const newErrorMessages = { ...initialFormData };

    for (const field in formData) {
      const errorMessage = validateField(field, formData[field]);
      newErrorMessages[field] = errorMessage;
      if (errorMessage) {
        hasErrors = true;
      }
    }

    if (formData.password !== formData.reenterPassword) {
      newErrorMessages.reenterPassword = 'Passwords do not match';
      hasErrors = true;
    }

    setErrorMessages(newErrorMessages);

    if (!hasErrors) {
      console.log(formData);
    }
  };

  return (
    <CssVarsProvider>
      <main>
        <div className="signup-container">
          <Sheet
            sx={{
              width: 300,
              mx: 'auto',
              my: 7,
              py: 3,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'md',
              boxShadow: 'md',
            }}
            variant="outlined"
          >
            <div>
              <Typography level="h4" component="h1">
                <b>Welcome!</b>
              </Typography>
              <Typography level="body-sm">Sign up to get started.</Typography>
            </div>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                type="text"
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.firstName}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                type="text"
                placeholder="Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.lastName}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.dob}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                type="text"
                placeholder="Your Address"
                value={formData.address}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.address}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input
                name="postalCode"
                type="text"
                placeholder="Your Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.postalCode}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                name="country"
                type="text"
                placeholder="Your Country"
                value={formData.country}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.country}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>State/Province</FormLabel>
              <Input
                name="stateProvince"
                type="text"
                placeholder="Your State/Province"
                value={formData.stateProvince}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.stateProvince}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phoneNumber"
                type="text"
                placeholder="Your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.phoneNumber}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.email}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.password}</Typography>
            </FormControl>
            <FormControl>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                name="reenterPassword"
                type="password"
                placeholder="Re-enter Your Password"
                value={formData.reenterPassword}
                onChange={handleChange}
              />
              <Typography style={{ color: 'red' }} fontSize="sm">{errorMessages.reenterPassword}</Typography>
            </FormControl>
            <Button sx={{mt: 1, backgroundColor: 'rgb(77, 77, 180)', color: 'white'  }} onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography
              endDecorator={<Link href="/login">Already have an account?</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            ></Typography>
          </Sheet>
        </div>
      </main>
    </CssVarsProvider>
  );
}