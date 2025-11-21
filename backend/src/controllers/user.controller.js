import {User} from "../models/user.model.js"

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        
        console.log("Received data:", {username, email, password});

        // Basic validation
        if(!username || !email || !password){
            console.log("Validation failed - missing fields");
            return res.status(400).json({
                message: "All fields are required",
                received: {username, email, password}
            });
        }

        // Check if user exists
        const existing = await User.findOne({
            email: email.toLowerCase()
        });
        
        if(existing){
            console.log("User already exists");
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        console.log("Creating user...");
        
        // Create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password
        });

        console.log("User created successfully:", user._id);

        return res.status(201).json({
            message: "User registered",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const loginUser = async(req ,res)=>{
    try {
        // checking if the user already exists

        const {email , password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        //compare the passwords 
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {return res.status(400).json({
            message: "Invalid password"
        })}
        res.status(200).json({
            message:"User logged in",
            user:{
                id: user.id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
} 

const logoutUser = async(req ,res)=>{
    try {
    const {email} = req.body ;
    const user = await User.findOne({
        email
    });

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "Logout successful"
    })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        });
    }

    
}

export { registerUser, loginUser ,logoutUser };
