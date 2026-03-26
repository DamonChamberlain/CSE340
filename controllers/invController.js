const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Build inventory item detail view (Task 1)
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryById(inv_id)
  
  if (data && data.length > 0) {
    const vehicle = data[0]
    const itemHTML = await utilities.buildInventoryItemHTML(vehicle)
    let nav = await utilities.getNav()
    
    // Title includes Year, Make, and Model per requirements
    const title = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`
    
    res.render("./inventory/detail", {
      title: title,
      nav,
      itemHTML,
    })
  } else {
    // Pass to error handler if vehicle doesn't exist
    const err = new Error("Vehicle not found")
    err.status = 404
    next(err)
  }
}

/* ***************************
 * Intentional Error Generation (Task 3)
 * ************************** */
invCont.triggerError = async function (req, res, next) {
  // Throwing an error here to be caught by the utility error handler
  throw new Error("This is an intentional 500-type error for testing purposes.")
}

module.exports = invCont