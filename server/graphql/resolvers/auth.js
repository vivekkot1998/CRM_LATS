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

    AgentIdentity: async (args, req) => {
        console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }

        return {
            userId: req.userId,
            message: "Authenticated Agent",
            statusCode: 1
        }
    }
}