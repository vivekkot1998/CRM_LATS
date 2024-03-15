const axios = require('axios');
User = require("../models/user-model");

const home = async(req, res) => {
    try{
        res.status(200).json({message: "Welcome to Home"});    
    }catch(error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try{
       // console.log(req.body);
        User = req.body;
        
        //const userCreated = await User.create({username, password});

        //res.status(200).json({message: "Login Successful", username: username, password: password});

        const apiResponse = await axios.get('http://192.168.2.200//agc/api.php?source=test&user='+ User.username +'&pass='+ User.password +'&function=webserver');

        // res.status(200).json({message: apiResponse.data, api: 'http://192.168.2.200//agc/api.php?source=test&user='+ username +'&pass='+ password +'&function=webserver'});
        if(apiResponse.data.startsWith('ERROR')){
            res.status(401).json({message: "login error", statusCode: 0});
        }else{
            res.status(200).json({message: "login done", statusCode: 1});
        }
    }catch(error){
        res.status(500).json({message: error+"Internal error"});
    }
};

module.exports = {home, login};