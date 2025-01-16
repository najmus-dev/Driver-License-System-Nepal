
// const License = require('../Models/LicenseModel');

// const verifyLicense = async (req, res) => {
//     const { dlno } = req.body;
//     try {
//         const license = await License.findOne({ dlno });
//         if (license) {
//             res.status(200).json({ success: true, data: license });
//         } else {
//             res.status(404).json({ success: false, message: 'No Data Found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// const addLicense = async (req, res) => {
//     const { dlno } = req.body;

//     try {
//         // Check if a license with the same dlno already exists
//         const existingLicense = await License.findOne({ dlno });
//         if (existingLicense) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'License with this number already exists',
//             });
//         }

//         // If no existing license is found, create a new one
//         const newLicense = new License(req.body);
//         await newLicense.save();

//         res.status(201).json({
//             success: true,
//             message: 'License added successfully',
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server Error',
//         });
//     }
// };

// module.exports = { verifyLicense, addLicense };

const License = require('../Models/LicenseModel');

// Verify License
const verifyLicense = async (req, res) => {
    const { dlno } = req.body;
    try {
        const license = await License.findOne({ dlno });
        if (license) {
            res.status(200).json({ success: true, data: license });
        } else {
            res.status(404).json({ success: false, message: 'No Data Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Add License
const addLicense = async (req, res) => {
    try {
        const { dlno } = req.body;

        // Check if a license with the same dlno already exists
        const existingLicense = await License.findOne({ dlno });
        if (existingLicense) {
            return res.status(400).json({
                success: false,
                message: 'License with this number already exists',
            });
        }

        const newLicense = new License(req.body);
        await newLicense.save();

        res.status(201).json({
            success: true,
            message: 'License added successfully',
            data: newLicense,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


// Get All Licenses (Admin-only)
const getAllLicenses = async (req, res) => {
    try {
        const licenses = await License.find().sort({ createdAt: -1 }); // Sorted by newest first
        res.status(200).json({ success: true, data: licenses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


// Get License by ID
const getLicenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const license = await License.findById(id);
        
        if (!license) {
            return res.status(404).json({ success: false, message: 'License not found' });
        }

        res.status(200).json({ success: true, data: license });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};



// Edit License
const editLicense = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedLicense = await License.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedLicense) {
            return res.status(404).json({ success: false, message: 'License not found' });
        }

        res.status(200).json({
            success: true,
            message: 'License updated successfully',
            data: updatedLicense,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Delete License
const deleteLicense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLicense = await License.findByIdAndDelete(id);

        if (!deletedLicense) {
            return res.status(404).json({ success: false, message: 'License not found' });
        }

        res.status(200).json({
            success: true,
            message: 'License deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { verifyLicense, addLicense, editLicense, deleteLicense, getAllLicenses, getLicenseById };
