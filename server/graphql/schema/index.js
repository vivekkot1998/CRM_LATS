const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Agent {
    _id: ID!
    userId: String!
    password: String
    token: String!
    tokenExpiration: Int!
}
type AuthAgentData {
    userId: String!
    message: String!
    statusCode: Int!
}
input AgentInput {
    userId: String!
    password: String!
}

type RootQuery {
   
    login(userid: String!, password: String!): AuthAgentData!
}

type RootMutation {
    createAgentLogin(agentInput: AgentInput): Agent
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)