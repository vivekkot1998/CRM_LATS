const { buildSchema } = require('graphql');

module.exports = buildSchema(`

scalar DateTime
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
    notes: CompanyNotesConnection
}
type CompanyNote {
    id: ID!
    note: String!
    createdBy: User!
    company: Company!
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
type CompanyConnection{
    pageInfo: OffsetPageInfo!
    nodes: [Company!]!
    totalCount: Int!
}
type CompanyNotesConnection {
    pageInfo: OffsetPageInfo!
    nodes: [CompanyNote!]!
    totalCount: Int!
}
type  ContactsConnection{
    totalCount: Int!
}
type DealConnection {
    pageInfo: OffsetPageInfo!
    nodes: [Deal!]!
    totalCount: Int!
}
type EventConnection {
    pageInfo: OffsetPageInfo!
    nodes: [Event!]!
    totalCount: Int!
}
type CompanyNoteConnection {
    pageInfo: OffsetPageInfo!
    nodes: [CompanyNote!]!
    totalCount: Int!
}
type DealStage {
    id: ID!
    title: String!
}
type Deal {
    id: ID!
    title: String!
    value: Float
    stageId: ID
    dealOwnerId: ID!
    companyId: ID!
    createdAt: DateTime
    updatedAt: DateTime
    createdBy: User!
    updatedBy: User
    company: Company!
    stage: DealStage
    dealOwner: User!
}
type DealStageConnection {
    pageInfo: OffsetPageInfo!
    nodes: [DealStage!]!
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
input CompanyNoteFilter {
    company: CompanyNoteFilterCompanyFilter
}
input CompanyNoteFilterCompanyFilter{
    id: IDFilterComparison
}
input IDFilterComparison {
    eq:ID
}
input CompanyNoteCreateInput {
    note: String!
    companyId: ID!
}
input CreateOneCompanyNoteInput {
    companyNote: CompanyNoteCreateInput!
}
input CreateOneDealStageInput {
    dealStage: DealStageCreateInput!
}
input DealStageCreateInput {
    title: String!
}
input DealCreateInput {
    title: String!
    value: Float
    companyId: ID!
    stageId: ID
    dealOwnerId: ID!
}
input CreateOneDealInput {
    deal: DealCreateInput!
}
input DealUpdateInput {
    title: String
    value: Float
    companyId: ID
    stageId: ID
    dealOwnerId: ID
}
input UpdateOneDealInput{
    id: ID!
    update: DealUpdateInput!
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
    me: User!
    users: UserConnection!
    company(id: ID!): Company!
    companies: CompanyConnection!
    companyNotes(filter: CompanyNoteFilter = {}): CompanyNoteConnection!
    dealStages: DealStageConnection!
    contacts: ContactsConnection!
    deals: DealConnection!
    deal(id: ID!): Deal!
    events: EventConnection! 
}

type RootMutation {
    createOneUser(input: CreateOneUserInput!): User!
    login(loginInput: LoginInput!): AuthResponse!
    createAgentLogin(agentInput: AgentInput): Agent
    createOneCompany(input: CreateOneCompanyInput!): Company!
    updateOneCompany(input: UpdateOneCompanyInput!): Company!
    createOneCompanyNote(input: CreateOneCompanyNoteInput!): CompanyNote!
    createOneDealStage(input: CreateOneDealStageInput!): DealStage!
    createOneDeal(input: CreateOneDealInput!): Deal!
    updateOneDeal(input: UpdateOneDealInput!): Deal!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)