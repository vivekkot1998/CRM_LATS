const authResolver = require('./auth');
const dashboardResolver = require('./dashboard');

const rootResolver = {
    ...authResolver,
    ...dashboardResolver
};

module.exports = rootResolver;