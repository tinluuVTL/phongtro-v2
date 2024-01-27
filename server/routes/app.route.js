const router = require("express").Router()
const ctrls = require("../controllers/app.controller")
const {
  verifyToken,
  isManager,
} = require("../middlewares/verifyToken.middleware")

router.get("/roles", ctrls.getRoles)
router.get("/catalogs", ctrls.getCatalogs)
router.get(
  "/dashboard/manager",
  verifyToken,
  isManager,
  ctrls.getDashboardManager
)

module.exports = router
