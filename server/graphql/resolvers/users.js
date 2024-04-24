module.exports = {

    users: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try{

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