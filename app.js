const dotenv     = require('dotenv/config');
const mongoose   = require('mongoose');
const express    = require('express');
const bodyparser = require('body-parser');
const cors       = require('cors');
const app        = express();

// CORS and body parser middleware
app.use(cors());
app.use(bodyparser.json());

// routing configs
const authRoutes      = require('./routes/auth');
const companiesRoutes = require('./routes/companies');
const contactsRoutes  = require('./routes/contacts');

// routing middleware (simple version example)
app.use('/contacts', contactsRoutes);

// apply routing configs to application (cooler version)
authRoutes.routesConfig(app);
companiesRoutes.routesConfig(app);

// database options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// database connection
mongoose.connect(process.env.DB_CONNECTION, options, (err) => {
    if(!err){
        console.log('Database Connected.')
    } else {
        console.log('Database Error.')
    }
});

// application server
app.listen(process.env.SERVER_PORT);