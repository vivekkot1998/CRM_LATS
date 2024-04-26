
const User = require('../../models/user');

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
                   usersArr.push(user);
              //console.log(usersArr.length);
          })
          const users= {
              totalCount: usersArr.length,
              nodes: usersArr
          }
          //console.log(users);
              return users
        }catch(err){
          throw err;
        }
        // const users = {
        //     totalCount: 3,
        // //     nodes: [{
        // //         "id": "1",
        // //         "name": "Admin User",
        // //         "avatarUrl": null
        // //       },
        // //       {
        // //         "id": "2",
        // //         "name": "Agent User",
        // //         "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/1.jpg"
        // //       },
        // //       {
        // //         "id": "3",
        // //         "name": "Dev User",
        // //         "avatarUrl": "https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/2.jpg"
        // //       }
        // // ]
        //     nodes: ,
        // }
        // return users
    }
}