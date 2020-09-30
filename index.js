const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Bring in the app constants

const { DB, PORT } = require("./config");

// initalize the application 
const app = exp();

// Middelwares
app.use(cors());
app.use(bp.json());

// User Router Middleware
app.use('/api/users', require('./routes/users'))

const startApp = async () => {
 try {
// connection with DB
 	 await connect(DB, { 
	useFindAndModify: true, 
	useUnifiedTopology: true, 
	useNewUrlParser: true 
});
 	 success({ 
   message: `Successfully connected with the Database \n${DB}`, 
   badge: true 
 });

// Start Listening for the  server on PORT
app.listen(PORT, () =>
 success({ message: `Server started on PORT ${PORT}`, badge: true })
);
} catch(err){
	error({ 
   message: `Unable to connect with Database \n${err}`, 
   badge: true 
  });
	startApp();
 }
};

startApp();

