const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = {
    companies: async (args, req) => {
        //console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        const companies= {
            totalCount: 1
        }

        return companies
        
    },
    contacts: async (args, req) => {
        //console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        const contacts= {
            totalCount: 1
        }

        return contacts
        
    },
    deals: async (args, req) => {
        //console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        const deals= {
            totalCount: 1
        }

        return deals
        
    },
    events: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        const events = {
            totalCount: 1,
            nodes: [{
                id: 1,
                title: "Monthly Team Performance Review",
                color: "#1677FF",
                startDate: "2024-04-25T10:30:00.269Z",
                endDate: "2024-04-25T11:30:00.269Z"
              },
              {
                id: 2,
                title: "Annual Company Picnic",
                color: "#2F54EB",
                startDate: "2024-05-10T16:00:00.572Z",
                endDate: "2024-05-10T17:00:00.572Z"
              },
              {
                id: 3,
                title: "TechCon 2023 - Shaping the Future",
                color: "#2F54EB",
                startDate: "2024-04-16T11:00:00.686Z",
                endDate: "2024-04-16T12:00:00.686Z"
              },
              {
                id: 4,
                title: "Cross-Department Collaboration Meeting",
                color: "#8BBB11",
                startDate: "2024-04-01T16:00:00.633Z",
                endDate: "2024-04-01T17:00:00.633Z"
              },
              {
                id: 5,
                title: "Annual Company Picnic",
                color: "#1677FF",
                startDate: "2024-04-04T00:00:00.000Z",
                endDate: "2024-04-05T23:59:59.999Z"
              }
        ]
        }
        return events
    }
}