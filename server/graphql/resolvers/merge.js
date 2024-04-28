const Company = require('../../models/company');
const User = require('../../models/user');
const CompanyNote = require('../../models/companyNote');

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
    try{
        const company = await Company.findById(compnayID);
        //return transformCompany(Company);
        return {
            ...company._doc, 
            // _id: company.id,
            salesOwner: user.bind(this, company.salesOwner), 
            notes: companyCompanyNotesConnection.bind(this, company._doc.notes)
        };
    }catch (err) {
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
        company: company.bind(this, deal.company),
        dealOwner: user.bind(this, deal.dealOwner)
    };
};



exports.transformCompany = transformCompany;
exports.transformCompanyNote = transformCompanyNote;
exports.transformUser = transformUser;
exports.transformDeal = transformDeal
