const {users} = require("../database/connection")
const bcrypt= require ("bcrypt")
const jwt = require ("jsonwebtoken")
require("dotenv").config()
const registerAuthor = async (req,res)=>{
    try {
        const {userName,email,password,phone}=req.body
        if(!userName|| !email ||!password ||!phone){
            return res.status(400).json({
                message:"All fields required"
            })
        }
        // check if email is already used 
        const existingUser = await users.findOne({where:{email}})
        if(existingUser){
            return res.status(409).json({message:"Email Already Registered !!"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        // Use bcrypt to securely hash the plain-text password.
// 'password' is the user's input (string).
// The second argument '10' is the salt rounds — it controls how many times the hashing process is repeated,  
// making the hash harder to crack (higher number = more secure but slower).
// 'await' waits until the hashing is done (because bcrypt.hash is asynchronous).
// The result (hashed password string) is stored in 'hashedPassword'.

await users.create({
    userName,
    email,
    password:hashedPassword,
    phone,
    role :"Author",
    // corrent timestamp haru ko lagi , diyeko ← trailing comma here
})
res.status(201).json({message:"User Registered successfully!!"})

 }catch (error){
    console.error("Registration error!!::",error)
    res.status(500).json({message:"User Registration failed(server error) "})
 }


}
const loginAuthor = async(req,res)=>{

try {
    const {email ,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"please provide email and password"})
    }
    const user = await users.findOne({where:{email}})
    if(!user){
        return res.status(400).json({message:"user not registered"})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(401).jsom({message:"Invalid email or password"})
    }

    // generate tokan
    const token = jwt.sign(
       {id:user.id},
       process.env.JWT_SECRET,{
        expiresIn:"30d"
       }
    )
    res.status(200).json({
        message : "login sucessfull!!",
        token,
        user:{
            id:user.id,
            userName:user.userName,
            email:user.email,
            role:user.role,

        
        },
    })
}catch (error){
    res.status(500).jsom({message :"Server error unable to login"})
}

}

module.exports ={registerAuthor,loginAuthor}

