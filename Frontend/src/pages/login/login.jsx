import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import './login.css';

export default function Login() {
  return (
    <CssVarsProvider>
      <main>
        <div className="login-container">
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
                <b>Welcome Back!</b>
              </Typography>
              <Typography level="body-sm">Please log in to your account.</Typography>
            </div>
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
            <Button sx={{mt: 1, backgroundColor: 'rgb(77, 77, 180)', color: 'white'  }}>Log In</Button>
            <Typography
              endDecorator={<Link href="/signup">Don't have an account? Sign up here</Link>}
              fontSize="sm"
              sx={{ alignSelf: 'center' }}
            ></Typography>
          </Sheet>
        </div>
      </main>
    </CssVarsProvider>
  );
}