const Company = require('../../models/company');
const User = require('../../models/user');
const CompanyNote = require('../../models/companyNote');
const Deal = require('../../models/deal');
const DealStage = require('../../models/dealStage');

// const { dateToString } = require('../../helpers/date');

const companyNodes = async companyIds => {
    //console.log("here4");
    try{
        const companies = await Company.find({_id: {$in: companyIds}})
        return companies.map(company => {
            return transformCompany(company);
        });
    } catch (err) {
        throw err;
    }
};

const company = async compnayID => {
    //  console.log(compnayID);
    try{
        const company = await Company.findById(compnayID);
        //console.log(company._doc.deals);
        //return transformCompany(Company);
        return {
            ...company._doc, 
            // _id: company.id,
            salesOwner: user.bind(this, company.salesOwner), 
            notes: companyCompanyNotesConnection.bind(this, company._doc.notes),
            deals: companyCompanyDealsConnection.bind(this, company._doc.deals)
        };
    }catch (err) {
        throw err;
    }
}

const companyCompanyDealsConnection = async deals => {
    //console.log(deals);
    return {
        totalCount: deals.totalCount,
        nodes: companyDeals.bind(this, deals.nodes)
    }
}

const companyDeals = async dealsIds => {
    try{
        const deals = await Deal.find({_id: {$in: dealsIds}}) 
        return deals.map(deal => {
            return transformDeal(deal);
        });
    }catch(err) {
        throw err;
    }
}

const companyCompanyNotesConnection = async notes => {
    //console.log("here3");
    return {
        // ...companies._doc,
        totalCount: notes.totalCount,
        nodes: companyNotes.bind(this, notes.nodes)
    }
}

const companyNotes = async companyNotesIds => {
    try{
        const companyNotes = await CompanyNote.find({_id: {$in: companyNotesIds}}) 
        return companyNotes.map(companyNote => {
            return transformCompanyNote(companyNote);
        });
    }catch(err) {
        throw err;
    }
}

const userCompanyConnection = async companies => {
    //console.log("here3");
    return {
        // ...companies._doc,
        totalCount: companies.totalCount,
        nodes: companyNodes.bind(this, companies.nodes)
    }
}

const user = async userID => {
    // console.log("here2");
    // console.log(userID);
    try{
        const user = await User.findById(userID)
        //console.log(user);
        return {
            ...user._doc, 
            // _id: user.id, 
            companies: userCompanyConnection.bind(this, user._doc.companies)
        };
    } catch (err) {
        throw err;
    }
};

const dealStage = async stageId => {
    // console.log(stageId);
    const stage = await DealStage.findById(stageId);

    if(stage != null){
        //console.log(stage);
        return {
            id: stage.id,
            title: stage.title
        }
    }else{
        // return {
        //     id: null,
        //     title: "Unassigned"
        // }
        return null
    }
   
}

const transformCompany = company => {
    //console.log("here5");
    //console.log("here:",company._doc);
    return {
        ...company._doc, 
        //_id: company.id, 
        // date: dateToString(company._doc.date),
        salesOwner: user.bind(this, company.salesOwner),
    };
};
const transformUser = user => {
    return {
        ...user._doc,
        companies: userCompanyConnection.bind(this,user._doc.companies)
    };
}
const transformCompanyNote = companyNote => {
    // console.log("here1");
    //console.log("here:",companyNote._doc);
    return {
        ...companyNote._doc, 
        //_id: companyNote.id, 
        // date: dateToString(company._doc.date),
        createdBy: user.bind(this, companyNote.createdBy),
        company: company.bind(this, companyNote.company)
    };
};

const transformDeal = deal => {
    // console.log("here1");
    //console.log("here:",companyNote._doc);
    return {
        ...deal._doc, 
        //_id: companyNote.id, 
        // date: dateToString(company._doc.date),
        stage: dealStage.bind(this, deal.stage),
        company: company.bind(this, deal.company),
        dealOwner: user.bind(this, deal.dealOwner)
    };
};



exports.transformCompany = transformCompany;
exports.transformCompanyNote = transformCompanyNote;
exports.transformUser = transformUser;
exports.transformDeal = transformDeal
