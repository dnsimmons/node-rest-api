const CompanyModel = require('../models/company.model');

/**
 * Handles a HTTP GET request.
 * Fetches a list of company documents from the database.
 */
exports.index = async (req, res) => {
    try{
        const result = await CompanyModel.find().limit(10);
        res.status(200).json({status: 200, data: result});
    } catch(err) {
        res.status(500).json({status: 500, data: err})
    }
};

/**
 * Handles a HTTP GET request with parameter.
 * Fetches a company document from the database by _id.
 */
exports.show = async (req, res) => {
    try{
        const result = await CompanyModel.findById(req.params.companyId);
        res.status(200).json({status: 200, data: result});
    } catch(err) {
        res.status(500).json({status: 500, data: err})
    }
};

/**
 * Handles a HTTP POST request.
 * Stores a company document in the database.
 */
exports.store = async (req, res) => {
    const Contact = new CompanyModel({
        name: req.body.name,
        industry: req.body.industry
    });
    try{
        const result = await Contact.save();
        res.status(201).json({status: 201, data: result});
    } catch(err) {
        res.status(500).json({status: 500, data: err})
    }
};

/**
 * Handles a HTTP PATCH request with parameter.
 * Updates a company document in the database by _id.
 */
exports.update = async (req, res) => {
    try{
        const data = {
            name: req.body.name,
            industry: req.body.industry,
            updated: Date.now()
        };
        const result = await CompanyModel.updateOne({_id: req.params.companyId}, {$set: data});
        res.status(200).json({status: 200, data: result});
    } catch(err) {
        res.status(500).json({status: 500, data: err})
    }
};

/**
 * Handles a HTTP DELETE request with parameter.
 * Deletes a company document from the database by _id.
 */
exports.destroy = async (req, res) => {
    try{
        const result = await CompanyModel.remove({_id: req.params.companyId});
        res.status(200).json({status: 200, data: result});
    } catch(err) {
        res.status(500).json({status: 500, data: err})
    }
};
