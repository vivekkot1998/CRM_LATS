const { buildSchema } = require('graphql');

module.exports = buildSchema(`


input EventFilter {
    startDate: String
}
type AuthResponse {
    accessToken: String!
    user: User!
}
type Agent {
    _id: ID
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
type User {
    id: String!
    name: String!
    password: String!
    avatarUrl: String
    role: Role!
    companies: UserCompaniesConnection
}
type Event {
    id: ID!
    title: String!
    color:String!
    startDate: String!
    endDate: String!
}
type CompanyDealsSumAggregate{
    value:Float
}
type CompanyDealsAggregateResponse{
    sum: CompanyDealsSumAggregate
}
type Company{
    id: ID!
    name: String!
    avatarUrl:String!
    salesOwner: User
    address: String
    address1: String
    address2: String
    city: String
    country: String
    postcode: String
    phoneNumber: String
}
type UserConnection {
    pageInfo: OffsetPageInfo!
    nodes: [User!]!
    totalCount: Int!
}
type UserCompaniesConnection {
    pageInfo: OffsetPageInfo!
    nodes: [Company!]!
    totalCount: Int!
}
type  CompanyConnection{
    pageInfo: OffsetPageInfo!
    nodes: [Company!]!
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

enum EventSortFields {
    id
    title
    description
    startDate
    endDate
    createdAt
    updatedAt
}
enum SortDirection {
    ASC
    DESC
}
enum SortNulls {
    NULLS_FIRST
    NULLS_LAST
}
enum Role {
    ADMIN
    AGENT
}
input CreateOneUserInput {
    user: UserCreateInput!
}
input UserCreateInput {
    name: String!
    id: String!
    password: String!
    role: Role!
}
input LoginInput {
    id: String!
    password: String!
}
input CompanyCreateInput {
    name: String!
}

input AgentInput {
    userId: String!
    password: String!
}
input TokenInput {
    token: String!
}
input CreateOneCompanyInput {
    company: CompanyCreateInput!
}
input CompanyUpdateInput {
    name: String
    salesOwnerId: ID
    address: String
    address1: String
    address2: String
    city: String
    country: String
    postcode: String
    phoneNumber: String
}
input UpdateOneCompanyInput { 
    id: ID!
    update: CompanyUpdateInput!
}
input OffsetPaging {
    limit: Int
    offset: Int
}
input EventSort {
    field: EventSortFields!
    direction: SortDirection!
    nulls: SortNulls
}

type RootQuery {
    AgentIdentity: AuthAgentData!
    users: UserConnection!
    company(id: ID!): Company!
    companies: CompanyConnection!
    contacts: ContactsConnection!
    deals: DealsConnection!
    events: EventConnection! 
}

type RootMutation {
    createOneUser(input: CreateOneUserInput!): User!
    login(loginInput: LoginInput!): AuthResponse!
    createAgentLogin(agentInput: AgentInput): Agent
    createOneCompany(input: CreateOneCompanyInput!): Company!
    updateOneCompany(input: UpdateOneCompanyInput!): Company!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)