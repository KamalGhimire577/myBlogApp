const express = require("express");
const app =express();



// Middleware: Parse incoming JSON requests
// hamile hamro backend rw frontent ko communication json format "key"="value" format ma garxam so tyo json lai bujhauna ko lagi 
app.use(express.json());
// imports routes
const authRoute = require("./routes/authRoute")
const adminRoute=require("./routes/authRoute")
// mount the auth rout at api/auth+/registeror login (for register and login)
app.use("/api/auth",authRoute);
app.use("/api/auth/admin",adminRoute)

// Start server
const port = 5999;
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})