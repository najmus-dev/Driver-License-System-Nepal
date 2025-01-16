// const mongoose = require('mongoose');

// const licenseSchema = new mongoose.Schema({
//     dlno: String,
//     name: String,
//     dob: String,
//     fatherName: String,
//     address: String,
//     licenseOffice: String,
//     citizenshipNo: String,
//     passportNo: String,
//     contactNo: String,
//     category: String,
//     bloodGroup: String,
//     issuedDate: String,
//     expiryDate: String,
//     status: { type: String, default: 'Valid' }
// });

// const License = mongoose.model('License', licenseSchema);

// module.exports = License;
const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    dlno: {
        type: String,
        required: [true, 'DL number is required'],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
    },
    fatherName: {
        type: String,
        required: [true, 'Father’s name is required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    licenseOffice: {
        type: String,
        required: [true, 'License office is required'],
        trim: true,
    },
    citizenshipNo: {
        type: String,
        required: true,
        trim: true,
    },
    passportNo: {
        type: String,
        trim: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'License category is required'],
        trim: true,
    },
    bloodGroup: {
        type: String,
        trim: true,
    },
    issuedDate: {
        type: Date,
        required: [true, 'Issued date is required'],
    },
    expiryDate: {
        type: Date,
        required: [true, 'Expiry date is required'],
    },
    status: {
        type: String,
        enum: ['Valid', 'Suspended', 'Expired'],
        default: 'Valid',
    },
}, { timestamps: true });

const License = mongoose.model('License', licenseSchema);

module.exports = License;
