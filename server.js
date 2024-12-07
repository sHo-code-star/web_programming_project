// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create an Express application
const app = express();

// Set the port for the server to listen on
const PORT = 3000;

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src/styles')));

// Serve HTML files for specific routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname,  'course.html'));
});

app.get('/teachers', (req, res) => {
    res.sendFile(path.join(__dirname,  'teachers.html'));
});

app.get('/notice', (req, res) => {
    res.sendFile(path.join(__dirname,  'notice.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,  'contactUs.html'));
});

// Handle POST request to save form data and send an email
app.post('/submit-form', (req, res) => {
    const { fullName, email, department, phone, message } = req.body;

    const studentData = `Full Name: ${fullName}\nEmail: ${email}\nDepartment: ${department}\nPhone: ${phone}\nMessage: ${message}\n\n`;

    // Save the data to a file on the server
    fs.appendFile('students_data.txt', studentData, (err) => {
        if (err) {
            console.log('Error saving data:', err);
            res.status(500).send('Server Error');
        } else {
            console.log('Data saved to file.');

            // Send email to admin
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Change to your email service if needed
                auth: {
                    user: 'your-email@gmail.com', // Replace with your email
                    pass: 'your-email-password' // Replace with your email password
                }
            });

            const mailOptions = {
                from: 'your-email@gmail.com', // Replace with your email
                to: 'admin@metrouni.edu', // Admin email
                subject: 'New Contact Form Submission',
                text: `New message from ${fullName}:\n\n${message}\n\nContact Info:\nEmail: ${email}\nPhone: ${phone}\nDepartment: ${department}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    res.status(500).send('Error sending email');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send('Form submitted successfully');
                }
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});