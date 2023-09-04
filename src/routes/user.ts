import {Router} from 'express'
import { getAllUsers } from '../controllers/user.js';
import { validateAdmin } from '../middlewares/permission.js';

const router = Router();

router.get('/', validateAdmin, getAllUsers);
// router.get('/one/:id', getOneSale);
// router.get('/user', getSalesByUser);
// router.get('/product/:id', getSalesByProduct);
// router.post('/',  addSale);
// router.put('/:id', editSale);
// router.delete('/:id', deleteSale);

export default router;