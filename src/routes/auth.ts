import {Router} from 'express'
import { login, register, getRole} from '../controllers/auth.js'
import { sanitizeUserInput } from '../middlewares/sanitizeInput.js';
import { validateJwt } from '../middlewares/session.js';

const router = Router();

router.post('/login', login);
router.post('/register', sanitizeUserInput, register);
router.get('/role', validateJwt, getRole);

export default router;