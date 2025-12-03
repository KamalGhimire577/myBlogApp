const express = require("express");
const app =express();



// Middleware: Parse incoming JSON requests
// hamile hamro backend rw frontent ko communication json format "key"="value" format ma garxam so tyo json lai bujhauna ko lagi 
app.use(express.json());
// imports routes
const authRoute = require("./routes/authRoute")
const adminAuthRoute=require("./routes/AdminRoute")
const blogRoute =require("./routes/blogPostRoute")
const commentRoute =require("./routes/cummentRoute")
const adminRoute =require("./routes/adminDashboardRoute")
// mount the auth rout at api/auth+/registeror login (for register and login)
app.use("/api/auth",authRoute);
app.use("/api/auth/admin",adminAuthRoute)
app.use("/api/blog",blogRoute)
app.use("/api/blog",commentRoute)
app.use("/api/admin",adminRoute)
// Start server
const port = 5999;
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})