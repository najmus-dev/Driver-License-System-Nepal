// const express = require('express');
// const { verifyLicense, addLicense } = require('../controllers/licenseController');
// const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// const router = express.Router();

// router.post('/verify', verifyLicense);
// // Admin-only route to add licenses
// router.post('/add', authenticateToken, authorizeAdmin, addLicense);


// module.exports = router;
const express = require('express');
const { verifyLicense, addLicense, editLicense, deleteLicense, getAllLicenses, getLicenseById } = require('../controllers/licenseController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Verify a license
router.post('/verify', verifyLicense);

// Add a license (Admin-only)
router.post('/add', authenticateToken, authorizeAdmin, addLicense);

// Get all licenses (Admin-only)
router.get('/all', authenticateToken, authorizeAdmin, getAllLicenses);

router.get('/license/:id', authenticateToken, authorizeAdmin, getLicenseById);

// Edit a license (Admin-only)
router.put('/edit/:id', authenticateToken, authorizeAdmin, editLicense);

// Delete a license (Admin-only)
router.delete('/delete/:id', authenticateToken, authorizeAdmin, deleteLicense);

module.exports = router;
