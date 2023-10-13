import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import './signUp.css'

export default function SignUp() {
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
                name="first-name"
                type="text"
                placeholder="Your First Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last-name"
                type="text"
                placeholder="Your Last Name"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input name="dob" type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                type="text"
                placeholder="Your Address"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input
                name="postal-code"
                type="text"
                placeholder="Your Postal Code"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone-number"
                type="text"
                placeholder="Your Phone Number"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="johndoe@email.com"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Your Password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                name="reenter-password"
                type="password"
                placeholder="Re-enter Your Password"
              />
            </FormControl>

            <Button sx={{ mt: 1 }}>Sign Up</Button>
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