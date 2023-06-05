const express = require('express');
const app = express();
const referralController = require('./controllers/referralController');

app.use(express.json());

// Routes
app.post('/createReferral', referralController.createReferral);
app.get('/checkReferralCode', referralController.checkReferralCode);
app.post('/loginReferral', referralController.loginReferral);
app.post('/checkEmail', referralController.checkEmail);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
