const express = require('express');
const config  = require('config');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(express.static(__dirname + './client/'));

app.use(express.json({ extended: true, limit: '50mb'} ));

app.use('/api/auth', require('./routes/auth.routes.js'));

app.use('/api/item', require('./routes/item.routes.js'));

app.use('/api/user', require('./routes/user.routes.js'));

// app.use('api/paypal', require('./routes/paypal.routes.js'));

app.use(cors());
app.use(fileUpload());



const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on ${PORT}`) );
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start();



