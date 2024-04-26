const Company = require("../../models/company");
const User = require('../../models/user');
const { transformCompany } = require('./merge');

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
        let allCompany=[];
        const companyAll = await Company.find();
            companyAll.map(company => {
                allCompany.push(company);
            })
        const company = new Company({
            id: allCompany.length + 1,
            name: args.input.company.name,
            avatarUrl: "NA",
            salesOwner: req.userId
        })
        // console.log(company);
        // console.log(req.userId);
        
        let companie;
         try{
          const result = await company.save()
              companie = transformCompany(result);
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
            return companie;
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
                companiesArr.push(transformCompany(company));
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

    company: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        //console.log(args);
        try{
            const companyBeingSearched = await Company.find({id: args.id});
             //console.log(companyBeingSearched);
            return transformCompany(companyBeingSearched[0]);
        }catch(err){
            throw err;
        }
        

    },

    updateOneCompany: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        //console.log(args);

        const companyToUpdate = await Company.find({id: args.input.id});
        //console.log(companyToUpdate[0]);
        if(args.input.update.name){
            companyToUpdate[0].name = args.input.update.name;
        }
        if(args.input.update.address){
            companyToUpdate[0].address = args.input.update.address;
        }
        if(args.input.update.address1){
            companyToUpdate[0].address1 = args.input.update.address1;
        }
        if(args.input.update.address2){
            companyToUpdate[0].address2 = args.input.update.address2;
        }
        if(args.input.update.city){
            companyToUpdate[0].city = args.input.update.city;
        }
        if(args.input.update.country){
            companyToUpdate[0].country = args.input.update.country;
        }
        if(args.input.update.postcode){
            companyToUpdate[0].postcode = args.input.update.postcode;
        }
        if(args.input.update.phoneNumber){
            companyToUpdate[0].phoneNumber = args.input.update.phoneNumber;
        }

        companyToUpdate[0].save();
         //console.log(companyToUpdate[0]);

       return transformCompany(companyToUpdate[0]);
    }
}