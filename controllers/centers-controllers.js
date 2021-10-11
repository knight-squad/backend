const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Center = require('../models/center');


// Create center => /centers/new
exports.createCenter = async (req, res, next) => {

    const center = await Center.create(req.body);

    res.status(201).json({
        success: true,
        center
    })
}

// Get all centers => /centers
exports.getCenters = async (req, res, next) => {

    const centers = await Center.findAll();

    res.status(200).json({
        success: true,
        count: centers.length,
        centers
    })
}

// Get single center details => /centers/:centerId
exports.getSingleCenter = async (req, res, next) => {

    const center = await Center.findByPk(req.params.centerId);

    if (!center) {
        return next(new HttpError('Center not found', 404));
    }

    res.status(200).json({
        success: true,
        center
    })
}

// Update product => /centers/update/:centerId
// exports.updateCenter = async (req, res, next) => {

//     const id = req.params.id;

//     Tutorial.update(req.body, {
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Tutorial was updated successfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Tutorial with id=" + id
//             });
//         });
// };

// Delete center => /centers/delete/:centerId
exports.deleteCenter = async (req, res, next) => {

    const centerId = req.params.centerId;

    Center.destroy({
        where: { centerId: centerId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Center was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Center with centerId=${centerId}. Maybe Center was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Center with centerId=" + centerId
            });
        });
};

// let center = await Center.findByPk(req.params.centerId);

// if (!center) {
//     return next(new HttpError('Center not found',404));
// }

// product = await Center.update(req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false
// })

// res.status(200).json({
//     success: true,
//     center
// })

