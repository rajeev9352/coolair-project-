import express from 'express';
import { saveContact, getAllContacts } from '../controllers/contactController';
const router = express.Router();

router.post('/', saveContact);
router.get('/', getAllContacts);

export default router;
