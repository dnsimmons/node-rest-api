const express = require('express');
const router  = express.Router();

const ContactModel = require('../models/contact.model');

/**
 * GET - Fetch a list of contact documents from the database.
 */
router.get('/', async (req, res) => {
    try{
        const result = await ContactModel.find().limit(10);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

/**
 * GET - Fetch a contact document from the database.
 */
router.get('/:contactId', async (req, res) => {
    try{
        const result = await ContactModel.findById(req.params.contactId);
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

/**
 * POST - Store a contact document in the database.
 */
router.post('/', async (req, res) => {
    const Contact = new ContactModel({
       name: req.body.name,
       email: req.body.email,
       phone: req.body.phone
    });
    try{
        const result = await Contact.save();
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

/**
 * POST - Update a contact document in the database.
 */
router.patch('/:contactId', async (req, res) => {
    try{
        const result = await ContactModel.updateOne({_id: req.params.contactId}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        });
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

/**
 * POST - Delete a contact document from the database.
 */
router.delete('/:contactId', async (req, res) => {
    try{
        const result = await ContactModel.remove({_id: req.params.contactId});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({message: err})
    }
});

module.exports = router;