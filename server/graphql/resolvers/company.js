const Company = require("../../models/company");
const CompanyNote = require("../../models/companyNote");
const User = require('../../models/user');
const DealStage = require('../../models/dealStage');
const Deal = require('../../models/deal');

const { transformCompany } = require('./merge');
const { transformCompanyNote } = require('./merge');
const { transformDeal } = require('./merge');

module.exports={
    createOneCompany: async (args, req) => {
        
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        
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
                //console.log(companiesArr);
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
    },

    createOneCompanyNote: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        //console.log(args);
        const companyToAddNote = await Company.find({id: args.input.companyNote.companyId});
        //console.log((companyToAddNote[0]._id).toString());
        let allCompanyNotes = [];
        const companyNotesAll = await CompanyNote.find();
            companyNotesAll.map(companyNote => {
                allCompanyNotes.push(companyNote);
            })
        const companyNote = new CompanyNote({
            id: allCompanyNotes.length + 1,
            note: args.input.companyNote.note,
            createdBy: req.userId,
            company: (companyToAddNote[0]._id).toString()
        })

        //console.log(companyNote);
        let companieNote;
        try{
            const result = await companyNote.save();
                companieNote = transformCompanyNote(result);

            const company = await Company.findById(companyToAddNote[0]._id);
            //console.log(company);
            if (!company){
                throw new Error('Client does not exists');
            }
            let companyNotesArr=[];
            const companyNotes1 = await CompanyNote.find({company: companyToAddNote[0]._id});
                companyNotes1.map(note => {
                     //console.log(company);
                companyNotesArr.push(note);
                //console.log(companiesArr.length);
            })
            //companiesArr.push(company)
            company.notes = {
                totalCount: companyNotesArr.length,
                nodes: companyNotesArr
            } 
            //console.log(company);
            await company.save();
             //console.log(companieNote);
            return companieNote;
        }catch(err){
            throw err;
        }
     },

     companyNotes: async (args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try {
            const filterCompany = await Company.find({id: args.filter.company.id.eq })
            const companyNotes1 = filterCompany[0].notes.nodes
           const companyNotesArr = await Promise.all(companyNotes1.map(async (companyNote) => {
            const companyNotes2 = await CompanyNote.findById(companyNote);
            return transformCompanyNote(companyNotes2);
        }));

        //console.log(companyNotesArr);

        const companyNotes = {
            totalCount: companyNotesArr.length,
            nodes: companyNotesArr
        };
                return companyNotes 
        } catch (error) {
            throw error
        }
    },

    createOneDealStage: async (args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthneticated');
        }
        //console.log(args.input.dealStage.title);
        const allDealStages = [];
        const dealStagesAll = await DealStage.find();
            dealStagesAll.map(dealStage => {
                allDealStages.push(dealStage);
            })
        const dealStage = new DealStage({
            id: allDealStages.length + 1,
            title: args.input.dealStage.title
        })
        // console.log(dealStage);
        const result = await dealStage.save()
        return result;
        // return dealStage;
    },

    dealStages: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        try{
            let dealStagesArr=[];
            const dealStages1 = await DealStage.find();
                dealStages1.map(DealStage => {
                     //console.log(company);
                dealStagesArr.push(DealStage);
                //console.log(companiesArr.length);
            })
            const dealStages= {
                totalCount: dealStagesArr.length,
                nodes: dealStagesArr
            }
        
                return dealStages
        } catch (err) {
            throw err;
        }
    },

    createOneDeal: async(args, req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        //console.log(args);
        const allDeals = [];
       
            const dealsAll = await Deal.find();
                dealsAll.map(deal => {
                    allDeals.push(deal);
                })

            const companyBeingSearched = await Company.find({id: args.input.deal.companyId});
             //console.log(companyBeingSearched[0]);

            const dealOwnerBeingSearched = await User.find({id: args.input.deal.dealOwnerId}); 
                //console.log(dealOwnerBeingSearched[0]);

        const deal = new Deal({
            id: allDeals.length + 1,
            title: args.input.deal.title,
            value: args.input.deal.value,
            stageId: args.input.deal.stageId,
            companyId: args.input.deal.companyId,
            dealOwnerId: args.input.deal.dealOwnerId,
            company: companyBeingSearched[0],
            dealOwner: dealOwnerBeingSearched[0]
        })
         //console.log(deal);
        // const result = await deal.save()
        // return result;

        
        let dealToReturn;
         try{
          const result = await deal.save()
            dealToReturn = transformDeal(result);
              //console.log(result);
            const company = await Company.findById(companyBeingSearched[0]);
            
            if (!company){
                throw new Error('Client does not exists');
            }
            let dealsArr=[];
            const deals1 = await Deal.find({company: companyBeingSearched[0]});
                deals1.map(deal => {
                     
                     dealsArr.push(deal);
                
            })
            
            company.deals = {
                totalCount: dealsArr.length,
                nodes: dealsArr
            }
            await company.save();
            return dealToReturn;
         }catch(err){
             throw err;
         }
    },

    deals: async (args, req) => {
        //console.log(req);
        // if(!req.isAuth){
        //     throw new Error('Unauthenticated');
        // }
        // try {
        //     const filterCompany = await Company.find({id: args.filter.company.id.eq })
        //     const companyDeals1 = filterCompany[0].deals.nodes
        //    const companyDealsArr = await Promise.all(companyDeals1.map(async (companyDeal) => {
        //     const companyDeals2 = await Deal.findById(companyDeal);
        //     return transformDeal(companyDeals2);
        // }));

        // //console.log(companyNotesArr);

        // const companyDeals = {
        //     totalCount: companyDealsArr.length,
        //     nodes: companyDealsArr
        // };
        //         return companyDeals 
        // } catch (error) {
        //     throw error
        // }

        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
    
        try {
            let companyDealsArr = [];
    
            if (Object.keys(args.filter).length === 0) {
                // If filter is empty, fetch all deals
                const allDeals = await Deal.find();
                companyDealsArr = await Promise.all(allDeals.map(async (deal) => {
                    return transformDeal(deal);
                }));
            } else {
                // If filter is provided, apply filtering criteria
                const companyId = args.filter.company.id.eq;
                const filterCompany = await Company.find({ id: companyId });
                const companyDeals1 = filterCompany[0].deals.nodes;
    
                companyDealsArr = await Promise.all(companyDeals1.map(async (companyDeal) => {
                    const companyDealDoc = await Deal.findById(companyDeal);
                    return transformDeal(companyDealDoc);
                }));
            }
    
            const companyDeals = {
                totalCount: companyDealsArr.length,
                nodes: companyDealsArr
            };
    
            return companyDeals;
        } catch (error) {
            throw error;
        }
    },

    deal: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }
        //console.log(args);
        try{
            const dealBeingSearched = await Deal.find({id: args.id});
             //console.log(companyBeingSearched);
            return transformDeal(dealBeingSearched[0]);
        }catch(err){
            throw err;
        }
        

    },

    updateOneDeal: async(args,req) => {
        if(!req.isAuth){
            throw new Error('Unauthenticated');
        }

        //console.log(args);

        const dealToUpdate = await Deal.find({id: args.input.id});
        // console.log(dealToUpdate);

        if(args.input.update.title){
            dealToUpdate[0].title = args.input.update.title;
        }
        if(args.input.update.value){
            dealToUpdate[0].value = args.input.update.value;
        }
        if(args.input.update.companyId){
            dealToUpdate[0].companyId = args.input.update.companyId;
        }
        if(args.input.update.stageId){
            dealToUpdate[0].stageId = args.input.update.stageId;
        }
        if(args.input.update.dealOwnerId){
            dealToUpdate[0].dealOwnerId = args.input.update.dealOwnerId;
        }

        dealToUpdate[0].save();

        return transformDeal(dealToUpdate[0]);
    }
}