const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        
        const { name, email, picture, sub } = payload;

        const tempUser = {
            id: sub, 
            name,
            email,
            image: picture,
            role: 'Student' 
        };
        const appToken = jwt.sign(
            { id: tempUser.id, role: tempUser.role },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        console.log(`User ${name} verified via Google.`);

        res.status(200).json({
            message: "Success (Database skipped)",
            token: appToken,
            user: tempUser
        });

    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ message: "Invalid Google Token" });
    }
};