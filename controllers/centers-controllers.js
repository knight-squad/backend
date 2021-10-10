
const HttpError = require('../models/http-error');
const Center = require('../models/center')


// Create center => /centers/new
exports.createCenter = async(req, res, next) => {

    const center = await Center.create(req.body);

    res.status(201).json({
        success: true,
        center
    })
}

// Get all centers => /centers
exports.getCenters = async(req, res, next) => {

    const centers = await Center.findAll();

    res.status(200).json({
        success: true,
        count: centers.length,
        centers
    })
}

// Get single center details = /centers/center/:id



