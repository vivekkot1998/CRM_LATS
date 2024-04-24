const Company = require("../../models/company");
const User = require('../../models/user');

module.exports={
    createOneCompany: async (args, req) => {
        //console.log(req.userId);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        // console.log(args);
        // console.log(req);
        //const user = await User.findOne({id: req.userId});
        // console.log(user);
        const company = new Company({
            name: args.input.company.name,
            avatarUrl: "NA",
            salesOwner: req.userId
        })
        // console.log(company);
        // console.log(req.userId);
        
        let companie;
         try{
          const result = await company.save()
              //companie = result;
              //console.log(result);
            const salesOwner = await User.findById(req.userId);
            //console.log(salesOwner);
            if (!salesOwner){
                throw new Error('Sales Owner does not exists');
            }
            let companiesArr=[];
            const companies1 = await Company.find({salesOwner: req.userId});
                companies1.map(company => {
                     //console.log(company);
                companiesArr.push(company);
                //console.log(companiesArr.length);
            })
            //companiesArr.push(company)
            salesOwner.companies = {
                totalCount: companiesArr.length,
                nodes: companiesArr
            } 
            await salesOwner.save();
            return result;
         }catch(err){
             throw err;
         }
        
        //console.log(...result._doc);
        //return {...result._doc, _id: result.id};
        
    },

    companies: async (args, req) => {
        //console.log(req);
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try{
            let companiesArr=[];
            const companies1 = await Company.find();
                companies1.map(company => {
                     //console.log(company);
                companiesArr.push(company);
                //console.log(companiesArr.length);
            })
            const companies= {
                totalCount: companiesArr.length,
                nodes: companiesArr
            }
        
                return companies
        } catch (err) {
            throw err;
        }
        
        
    },

    updateOneCompany: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }

        
    }
}