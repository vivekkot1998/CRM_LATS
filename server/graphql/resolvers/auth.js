const axios = require('axios');
const agent = require('../../models/agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');



module.exports = {

    createOneUser: async(args,req) => {
        //console.log(args);
        try{
            const existingUser = await User.findOne({ id: args.input.user.id});
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt
                .hash(args.input.user.password, 12);
            const user = new User({
                name: args.input.user.name,
                id: args.input.user.id,
                password: hashedPassword,
                avatarUrl: "NA",
                role: args.input.user.role,
                companies: {
                    totalCount: 0,
                    nodes: []
                }
            })
            //console.log(user);
            const result = await user.save();
            //console.log(result.id);
            return { ...result._doc};
            //return result;
        }catch(err){
            throw err;
        }
    },

    // createAgentLogin: async args => {
    //     try{
    //         const apiResponse = await axios.get('http://192.168.2.200//agc/api.php?source=test&user='+ args.agentInput.userId +'&pass='+ args.agentInput.password +'&function=webserver');
            
    //         if(apiResponse.data.startsWith('ERROR')){
    //             throw new Error('login error'+ apiResponse.data);
    //         }else{
    //             const token = jwt.sign(
    //                 {
    //                     userId: args.agentInput.userId
    //                 },
    //                 'somesupersecretkey',
    //                 // {
    //                 //     expiresIn: '1h'
    //                 // }
    //             );
    
    //             const hashedPassword = await bcrypt.hash(args.agentInput.password, 12);
    //             // const agent = agent({
    //             //     userId: args.agentInput.userId,
    //             //     password: hashedPassword
    //             // });
    //             // const result = await agent.save();
    //             //return { password: hashedPassword, userId: args.agentInput.userId, token: token, tokenExpiration: 1}
    //             return { password: hashedPassword, userId: args.agentInput.userId, token: token}

    //         }

           
    //     } catch (err) {
    //         throw err;
    //     }
    // },

    login: async args => {
        //console.log(args.loginInput.id);
        //console.log(args.loginInput.password);
        const user = await User.findOne({id: args.loginInput.id});
        if(!user) {
            throw new Error('User does not exists!');
        }
        const isEqual = await bcrypt.compare(args.loginInput.password, user.password);
       if(!isEqual){
        throw new Error('Password is not correct!');
       }
        //console.log(user._id);//new ObjectId('6626a6fa587a0095f00bd167')
        const objectId = (user._id).toString(); //6626a6fa587a0095f00bd167
        //console.log(objectId);
        
        try{
            const token = jwt.sign(
                {
                    userId: objectId
                },
                'somesupersecretkey',
                // {
                //     expiresIn: '1h'
                // }
            );
            //const hashedPassword = await bcrypt.hash(args.agentInput.password, 12);
            return {
                accessToken: token,
                user: user, 
            }

        } catch (err) {
            throw err;
        }
     },

    AgentIdentity: async (args, req) => {
        //console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }

        return {
            userId: req.userId,
            message: "Authenticated Agent",
            statusCode: 1,
            name: "Vivek Kothari",
            email: "vivek@test.com",
            phone: "1234567890",
            jobTitle: "Developer",
            avatarUrl: "NA"
        }
    }
}