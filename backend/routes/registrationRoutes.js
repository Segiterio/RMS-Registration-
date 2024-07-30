import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/registrationController.js';

router.route('/').post(registerUser);

export default router;
