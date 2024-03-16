const axios = require('axios');

module.exports = {

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