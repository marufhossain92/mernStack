const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();

require("../db/conn");
require("../models/userSchema");

// Root
router.get("/", async (req, res) => {
    res.send("Hello World from auth!");
});

// Register an user
router.post("/register", async (req, res) => {
    // res.send(req.body);
    // console.log(req.body);
    const {name, email, phone, work, password, confirmPassword} = req.body;

    if(!name || !email || !phone || !work || !password || !confirmPassword){
        return res.status(422).json({error: "Please fill all the fields"});
    }

    User.findOne({email: email})
        .then((emailExist) => {
            if(emailExist){
                return res.status(422).json({error: "User already exist"});
            }

            const user = new User({name, email, phone, work, password, confirmPassword});

            user.save()
                .then(() => {
                    res.status(201).json({message: "User registered successfull!"});
                })
                .catch((err) => {
                    res.status(500).json({error: "Registration failed"});
                })
        })
        .catch(err => {console.log(err);});
});

module.exports = router;