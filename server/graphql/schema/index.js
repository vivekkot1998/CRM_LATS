//  const { buildSchema } = require('graphql');

// module.exports = buildSchema(`

// type AuthAgentData {
//     userId: String!
//     message: String!
//     statusCode: Int!
// }


// type RootQuery {
    
//     login(userid: String!, password: String!): AuthAgentData!
// }
// type RootMutation {
    
// }


// schema {
//     query: RootQuery
//     mutation: RootMutation
// }
// `)
const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type AuthAgentData {
    userId: String!
    message: String!
    statusCode: Int!
}

type RootQuery {
   
    login(userid: String!, password: String!): AuthAgentData!
}

schema {
    query: RootQuery
}
`)