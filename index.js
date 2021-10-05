const express = require("express");
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const sequelize = require('./database');



const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const User = require('./models/user');
const Center = require('./models/center');
const app = express();

app.use(bodyParser.json());//

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

//ROUTES
app.use("/auth", userRoutes);



// ERROR HANDLING
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });

//Relations
// User.belongsTo(Center); //1U --> 1C, 1C --> MU
// Center.hasMany(User);



//CONNECTING MYSQL & SYNCING MODELS
// sequelize.sync()
// sequelize.sync({force:true})

// app.listen(port)
// console.log("app is listening on " + port)

sequelize
  // .sync({force:true})
  .sync()
  .then((sresults) => {
    // console.log(results);
    app.listen(port);
    console.log("app is listening on " + port)
  })
  .catch((err) => {
    console.log(err);
  });