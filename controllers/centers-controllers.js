const HttpError = require('../models/http-error');
const Center = require('../models/center');
const Package = require('../models/package')

// Centers

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
        return next(new HttpError('Center was not found', 404));
    }

    res.status(200).json({
        success: true,
        center
    })
}

// Update center => /centers/update/:centerId
exports.updateCenter = async (req, res, next) => {

    const centerId = req.params.centerId;

    Center.update(req.body, {
        where: { centerId: centerId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Center was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update Center with centerId=${centerId}. Maybe Center was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Center with centerId=" + centerId
            });
        });
};

// Delete center => /centers/delete/:centerId
exports.deleteCenter = async (req, res, next) => {

    const center = await Center.findByPk(req.params.centerId);

    console.log(center)

    if (!center) {
        return next(new HttpError('Center was not found', 404));
    }

    await Center.destroy({
        where: { centerId: center.centerId }
    })

    res.status(200).json({
        success: true,
        message: 'Center was deleted successfully!'
    })
}


//Packages

// Create package => /centers/packages/new
exports.createPackage = async (req, res, next) => {

    const package = await Package.create(req.body);

    res.status(201).json({
        success: true,
        package
    })
}

// Get all packages => /centers/packages/all
exports.getPackages = async (req, res, next) => {

    const packages = await Package.findAll();

    res.status(200).json({
        success: true,
        count: packages.length,
        packages
    })
}

// Update package => /centers/packages/update/:packageId
exports.updatePackage = async (req, res, next) => {

    const packageId = req.params.packageId;

    Package.update(req.body, {
        where: { packageId: packageId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Package was updated successfully!"
                });
            } else {
                res.send({
                    message: `Cannot update Package with packageId=${packageId}. Maybe Package was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Package with packageId=" + packageId
            });
        });
};

// Delete package => /centers/packages/delete/:packageId
exports.deletePackage = async (req, res, next) => {

    const package = await Package.findByPk(req.params.packageId);

    console.log(package)

    if (!package) {
        return next(new HttpError('Package was not found', 404));
    }

    await Package.destroy({
        where: { packageId: package.packageId }
    })

    res.status(200).json({
        success: true,
        message: 'Package was deleted successfully!'
    })
}

// Add reservation => /reserve