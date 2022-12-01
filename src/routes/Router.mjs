import express from "express";
import HomeController from "../controllers/HomeController.mjs";
import ExceptionController from "../controllers/ExceptionController.mjs";
import APIController from "../controllers/APIController.mjs";
import UserController from "../controllers/UserController.mjs";
import AnomalyController from "../controllers/AnomalyController.mjs";
import {authenticate, ensureAuthenticatedWithRoles, ensureNotAuthenticated} from "../middlewares/auth_middlewares.mjs";
import roles from "../role/roles.js";

const router = express.Router()

router.get("/", ensureNotAuthenticated, HomeController.view)
router.get("/dashboard", ensureAuthenticatedWithRoles(roles.ALL), UserController.showDashBoard)
router.get("/login", ensureNotAuthenticated, UserController.loginForm)
router.get("/qr_code",ensureAuthenticatedWithRoles(roles.MAINTAINER),UserController.generateQRCode)
router.get("/logout", ensureAuthenticatedWithRoles(roles.ALL), UserController.logout)
router.post('/login', ensureNotAuthenticated,authenticate, UserController.login)
router.post("/", ensureNotAuthenticated, AnomalyController.addTicket)
router.post("/qr_code",ensureAuthenticatedWithRoles(roles.MAINTAINER),UserController.generateQRCode)

// api
router.get("/api/resources", APIController.getResources)
router.get("/api/locations", APIController.getLocations)
router.post("/api/resources", ensureAuthenticatedWithRoles(roles.MAINTAINER), APIController.addResource)
router.post("/api/locations", ensureAuthenticatedWithRoles(roles.MAINTAINER), APIController.addLocation)
router.post("/api/maintainer", ensureAuthenticatedWithRoles(roles.ADMIN), APIController.addMaintainer)
router.post('/api/anomaly/:id([1-9][0-9]{0,})', ensureAuthenticatedWithRoles(roles.MAINTAINER), AnomalyController.closeTicket)
router.delete("/api/maintainer/:id([1-9][0-9]{0,})", ensureAuthenticatedWithRoles(roles.ADMIN), APIController.deleteMaintainer)

// 404 Error Page
router.use(ExceptionController.page404)

export default router