const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const htmlLayout = (body) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Instasafe Mock Enterprise</title>
</head>
<body>
    ${body}
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(htmlLayout(`
        <div id="login-container">
            <input type="text" aria-label="Email" id="email" />
            <input type="password" aria-label="Password" id="password" />
            <button type="button" aria-label="Sign in" onclick="document.getElementById('otp-container').style.display='block';">Sign in</button>
        </div>
        <div id="otp-container" style="display:none;">
            <input type="text" aria-label="OTP" id="otp" />
            <button type="button" aria-label="Verify" onclick="window.location.href='/dashboard'">Verify</button>
        </div>
    `));
});

app.get('/dashboard', (req, res) => {
    res.send(htmlLayout(`
        <h1>Dashboard</h1>
        <nav>
            <a href="/devices" aria-label="Devices Link">Devices</a>
            <a href="/policies" aria-label="Policies Link">Policies</a>
        </nav>
        <button aria-label="Logout" onclick="window.location.href='/'">Logout</button>
    `));
});

app.get('/devices', (req, res) => {
    res.send(htmlLayout(`
        <h1>Devices Management</h1>
        <button type="button" aria-label="Enroll Device" onclick="document.getElementById('enroll-wizard').style.display='block';">Enroll Device</button>
        <div id="enroll-wizard" style="display:none;">
            <input type="text" aria-label="Device Name" id="dev-name" />
            <button type="button" aria-label="Confirm Enrolment" onclick="window.location.href='/devices?enrolled=true'">Confirm Enrolment</button>
        </div>
        <ul id="device-list">
            ${req.query.enrolled === 'true' ? '<li><a href="/devices/details" aria-label="Device Details">Corporate-Laptop</a></li>' : ''}
        </ul>
    `));
});

app.get('/devices/details', (req, res) => {
    res.send(htmlLayout(`
        <h1>Device Details</h1>
        <p>Device: Corporate-Laptop</p>
        <p id="policy-status">${req.query.policy ? req.query.policy : 'No Policy Assigned'}</p>
    `));
});

app.get('/policies', (req, res) => {
    res.send(htmlLayout(`
        <h1>Policy Assignment</h1>
        <select aria-label="Select Device" id="policy-device">
            <option value="corporate-laptop">Corporate-Laptop</option>
        </select>
        <select aria-label="Select Policy" id="policy-type">
            <option value="Zero-Trust-Policy">Zero-Trust-Policy</option>
        </select>
        <button type="button" aria-label="Assign Policy" onclick="window.location.href='/devices/details?policy=Zero-Trust-Policy'">Assign Policy</button>
    `));
});

app.listen(port, () => {
    console.log('Mock server active on port 3000');
});