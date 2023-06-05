const referralCodes = require('referral-codes');
const { MongoClient } = require('mongodb');


const MONGO_URI = 'mongodb+srv://shahrozrehman:fZI2UkklKsfBuXPa@mangowallet.0btsqq2.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'MangoWalletData';
const COLLECTION_NAME = 'userData';

async function createReferral(email, wallet) {
    let client; // Declare the client variable outside the try-catch block
    try {
        client = await MongoClient.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const existingDocument = await collection.findOne({ email });
        if (existingDocument) {
            return {
                error: 'Email already exists',
                existingDocument
            };
        } else {
            const referralCode = referralCodes.generate({ length: 6, count: 1, dash: false })[0];
            await collection.insertOne({ email, wallet, referralCode });
            return { wallet, referralCode, email };
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return { error: 'Failed to connect to the database' };
    } finally {
        if (client) {
            client.close(); // Close the client connection if it exists
        }
    }
}



async function checkReferralCode(referralCode) {
    try {
        const client = await MongoClient.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const referralDocument = await collection.findOne({ referralCode: referralCode });

        if (referralDocument) {
            client.close();

            return { message: 'Referral code exists' };
        } else {
            return { message: 'Referral code does not exist' };
        }

        client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return { error: 'Failed to connect to the database' };
    }
}
// ...existing code...

async function loginReferral(email, referralCode, wallet) {
    try {
        const client = await MongoClient.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const referralDocument = await collection.findOne({ referralCode: referralCode });
        if (!referralDocument) {
            client.close();

            return { error: 'Invalid referral code' };
        } else {
            const childDocument = {
                email: email,
                wallet: wallet,
            };
            await collection.updateOne({ referralCode }, { $push: { children: childDocument } });
            return { message: 'User added as a child under the referral code' };
        }

        client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return { error: 'Failed to connect to the database' };
    }
}

async function checkEmail(email) {
    try {
        const client = await MongoClient.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const existingDocument = await collection.findOne({ email });

        if (existingDocument) {
            client.close();

            return { message: 'Email exists' };
        } else {
            return { message: 'Email does not exist' };
        }

        client.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return { error: 'Failed to connect to the database' };
    }
}

module.exports = {
    createReferral,
    checkReferralCode,
    loginReferral,
    checkEmail,
};
