const referralModel = require('../Model/referralModel');

async function createReferral(req, res) {
    const { email, wallet } = req.query;

    const result = await referralModel.createReferral(email, wallet);

    if (result.error) {

        res.status(400).json({ error: result.error, existingDocument: result.existingDocument });
    } else {
        res.status(200).json(result);
    }
}

async function checkReferralCode(req, res) {
    const { referralCode } = req.query;

    const result = await referralModel.checkReferralCode(referralCode);

    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(200).json(result);
    }
}


async function loginReferral(req, res) {
    const { email, referralCode, wallet } = req.query;

    const result = await referralModel.loginReferral(email, referralCode, wallet);

    if (result.error) {
        res.status(400).json({ error: result.error });
    } else {
        res.status(200).json(result);
    }
}

async function checkEmail(req, res) {
    const { email } = req.query;

    const result = await referralModel.checkEmail(email);

    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(200).json(result);
    }
}

module.exports = {
    createReferral,
    checkReferralCode,
    loginReferral,
    checkEmail,
};
