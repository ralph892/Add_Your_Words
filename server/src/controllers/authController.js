import connectDB from "../config/connectDB.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (email) => {
    return jwt.sign({ email }, 'myProject secret', {
        expiresIn: maxAge
    });
}

export const handleSignUp = async (req, res) => {
    return res.send('sign up');
};

export const handleCreateUser = async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const [existEmail, fields] = await connectDB.execute('SELECT email from users where email = ?', [email]);

    if (existEmail.length === 0) {
        try {
            await connectDB.execute('INSERT INTO users values (?,?)', [email, hashPassword]);
            const token = createToken(email);
            res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
            return res.status(201).json({ message: '' });
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    else {
        return res.status(200).json({ error: 'this email has already registered' });
    }
};

export const handleLogin = async (req, res) => {
    const user = req.body;

    const [rows, fields] = await connectDB.execute('SELECT password from users where email = ?', [user.email]);

    if (rows.length !== 0) {
        const existPassword = rows[0].password;

        const auth = await bcrypt.compare(user.password, existPassword);

        if (auth) {
            const token = createToken(user.email);
            res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true, secure: true, overwrite: true });
            return res.status(200).json({ data: user });
        }
        else {
            return res.status(201).json({ error: 'the password is not true' })
        }
    }
    else {
        return res.status(201).json({ error: 'this email has not registered yet' });
    }
};

export const handleAuthenticated = (req, res) => {
    const token = req.cookies.jwt;

    // check json web token is exits and is verified
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        jwt.verify(token, 'myProject secret', (err, decode) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            else {
                return res.status(200).json({ decode });
            }
        })
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export const handleLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, path: '/' });
    return res.status(200).json({ message: 'clear cookie' });
}
