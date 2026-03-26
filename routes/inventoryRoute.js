// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/") // Added for error handling middleware

// Route to build inventory by classification view (Task 2: Wrapped in error handler)
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory detail view (Task 1)
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInvId));

// Route to trigger an intentional 500 error (Task 3)
router.get("/trigger-error", utilities.handleErrors(invController.triggerError));

module.exports = router;