const axios = require('axios');
const agent = require('../../models/agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports = {

    createAgentLogin: async args => {
        try{
            const apiResponse = await axios.get('http://192.168.2.200//agc/api.php?source=test&user='+ args.agentInput.userId +'&pass='+ args.agentInput.password +'&function=webserver');
            
            if(apiResponse.data.startsWith('ERROR')){
                throw new Error('login error'+ apiResponse.data);
            }else{
                const token = jwt.sign(
                    {
                        userId: args.agentInput.userId
                    },
                    'somesupersecretkey',
                    {
                        expiresIn: '1h'
                    }
                );
    
                const hashedPassword = await bcrypt.hash(args.agentInput.password, 12);
                // const agent = agent({
                //     userId: args.agentInput.userId,
                //     password: hashedPassword
                // });
                // const result = await agent.save();
                return { password: hashedPassword, userId: args.agentInput.userId, token: token, tokenExpiration: 1}
            }

           
        } catch (err) {
            throw err;
        }
    },

    login: async({userid, password}) => {
        const apiResponse = await axios.get('http://192.168.2.200//agc/api.php?source=test&user='+ userid +'&pass='+ password +'&function=webserver');
        if(apiResponse.data.startsWith('ERROR')){
            throw new Error('login error'+ apiResponse.data);
        }
        return {
            userId: userid,
            message: "login done",
            statusCode: 1
        }
    }
}