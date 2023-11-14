import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




// Email

const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    // Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shawnb.nimal22@gmail.com', // Replace with your Gmail address
            pass: 'dsph kztb wnab aspw' // Replace with your app-specific password
        }
    });

    // Set email options
    let mailOptions = {
        from: 'shawnb.nimal22@gmail.com', // Replace with your Gmail address
        to: to, // Recipient email
        subject: subject, // Email subject
        text: text, // Email body text
    };

    // Send email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Example usage
sendEmail('shawn.nimal@gmail.com', 'Hello', 'Hello from Node.js!');
