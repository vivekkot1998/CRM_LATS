const authResolver = require('./auth');
const dashboardResolver = require('./dashboard');
const usersResolver = require('./users');
const companyResolver = require('./company');

const rootResolver = {
    ...authResolver,
    ...dashboardResolver,
    ...usersResolver,
    ...companyResolver
};

module.exports = rootResolver;