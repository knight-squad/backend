
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



