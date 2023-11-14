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
