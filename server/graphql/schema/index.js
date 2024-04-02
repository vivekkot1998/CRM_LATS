const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Agent {
    _id: ID!
    userId: String!
    password: String
    token: String!
}
type AuthAgentData {
    userId: String!
    message: String!
    statusCode: Int!
    name:String
    email: String
    phone: String
    jobTitle: String
    avatarUrl: String
}
type Event {
    id: ID!
    title: String!
    color:String!
    startDate: String!
    endDate: String!
}
type  CompanyConnection{
    totalCount: Int!
}
type  ContactsConnection{
    totalCount: Int!
}
type  DealsConnection{
    totalCount: Int!
}
type EventConnection {
    pageInfo: OffsetPageInfo!
    nodes: [Event!]!
    totalCount: Int!
}
type OffsetPageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
}

input AgentInput {
    userId: String!
    password: String!
}
input TokenInput {
    token: String!
}


type RootQuery {
    AgentIdentity: AuthAgentData!
    companies: CompanyConnection!
    contacts: ContactsConnection!
    deals: DealsConnection!
    events: EventConnection! 
}

type RootMutation {
    createAgentLogin(agentInput: AgentInput): Agent
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)