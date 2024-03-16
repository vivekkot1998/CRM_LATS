const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Agent {
    userId: String!
    password: String!
}

type RootQuery {
    checkAgentForLogin: 
}
type RootMutation {

}

`)