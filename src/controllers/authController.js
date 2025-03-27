
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require('bcryptjs');

const authController = {
    register: async (req, res) => {

        const { username, email, password } = req.body;
        try {
            const existingUser = await User.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const user = await User.createUser(username, email, password);
            const token = await generateToken(user.username);
            res.status(201).send({token});
        } catch(e) {
            res.status(400).json({error: e.message})
        }
    },
    
    login: async (req, res) => {
        
        const { email, password } = req.body;
    
        try {
            const user = await User.findUserByEmail(email);
            console.log(user);
            
                if(!user) {
                    return res.status(404).send({error: "User not found"})
                }
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({error: "Wrong password"});
            }
            const token = generateToken(user.username);
            res.status(200).json({token});
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
}

module.exports = authController;