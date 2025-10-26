"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminController_2 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Apply auth middleware to all admin routes
router.use(authMiddleware_1.authenticateToken);
router.use(authMiddleware_1.requireAdmin);
// User management routes
router.get('/users', adminController_1.getAllUsers);
router.post('/users', adminController_1.createAdminUser);
router.delete('/users/:id', adminController_1.deleteUser);
// Contact management routes
router.get('/contacts', adminController_2.getAllContacts);
router.delete('/contacts/:id', adminController_2.deleteContact);
exports.default = router;
