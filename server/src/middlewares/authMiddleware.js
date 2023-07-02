import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const authUsers = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req);

    if (!token) {
        console.log('unauthorized');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    else {
        try {
            jwt.verify(token, secretKey, (err, decode) => {
                if (err) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                else {
                    next();
                }
            })
        } catch (error) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
};

export default authUsers;