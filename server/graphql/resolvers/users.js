
const User = require('../../models/user');
const { transformUser } = require('./merge');

module.exports = {

    users: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try{
          let usersArr=[];
          const users1 = await User.find();
              users1.map(user => {
                   //console.log(user);
                   usersArr.push(transformUser(user));
              //console.log(usersArr.length);
          })
          const users= {
              totalCount: usersArr.length,
              nodes: usersArr
          }
          //console.log(users.nodes[0].companies);
              return users
        }catch(err){
          throw err;
        }
    }
}