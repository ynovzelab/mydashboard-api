const express = require('express');
const salesJson = require('./data/sales.json');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const secret = 'N4ZfP3IwJI20n8fKH8ETsk3agOWL2DuzwU567qL86E8JMPKVIhcDHCF0DY_FcX_XAMi7RtXaiBY94M6v9-FRKw';

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/sales', (req, res) => {
    // token = req.headers.authorization;
    // if (!token) {
    //     return res.status(403).send({
    //         data: 'A token is required for authentication',
    //         success: false
    //     });
    // }
    // token= token.replace('Bearer ', '');
    // try {
    //     jwt.verify(token, secret);
    // } catch (err) {
    //     return res.status(401).send({
    //         error: 'Invalid Token',
    //         success: false
    //     });
    // }
    res.json({
        data: salesJson,
        success: true
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = { name: "Max" };

    if (!email || !password) {
        return res.status(400).send({
            error: 'Email and password are required',
            success: false
        });
    }

    if (email === 'user@ynov.com' && password === 'jhG6P8HrRopmvZqNbKUhAg') {
        const token = jwt.sign(user, secret, { expiresIn: '4h' });
        res.json({
            token: token,
            success: true
        });
    } else {
        res.status(401).send({
            error: 'Invalid username or password',
            success: false
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
