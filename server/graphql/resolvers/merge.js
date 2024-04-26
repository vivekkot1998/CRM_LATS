const Company = require('../../models/company');
const User = require('../../models/user');
const CompanyNote = require('../../models/companyNote');

// const { dateToString } = require('../../helpers/date');

const companies = async companyIds => {
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
            _id: company.id, 
            notes: companyNotes.bind(this, company._doc.notes)
        };
    }catch (err) {
        throw err;
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
const user = async userID => {
    try{
        const user = await User.findById(userID)
        return {
            ...user._doc, 
            _id: user.id, 
            companies: companies.bind(this, user._doc.companies)
        };
    } catch (err) {
        throw err;
    }
};

const transformCompany = company => {
    return {
        ...company._doc, 
        _id: company.id, 
        // date: dateToString(company._doc.date),
        salesOwner: user.bind(this, company.salesOwner),
    };
};
const transformCompanyNote = companyNote => {
    return {
        ...companyNote._doc, 
        _id: companyNote.id, 
        // date: dateToString(company._doc.date),
        createdBy: user.bind(this, companyNote.createdBy),
        company: company.bind(this, companyNote.company)
    };
};

// const transformBooking = booking => {
//     return { 
//         ...booking._doc, 
//         _id: booking.id, 
//         user: user.bind(this, booking._doc.user),
//         event: singleEvent.bind(this, booking._doc.event),
//         createdAt: dateToString(booking._doc.createdAt),
//         updatedAt: dateToString(booking._doc.updatedAt)
//     };
// };


exports.transformCompany = transformCompany;
exports.transformCompanyNote = transformCompanyNote;
//exports.transformBooking = transformBooking;
//exports.user = user;
//exports.events = events;
//exports.singleEvent = singleEvent;