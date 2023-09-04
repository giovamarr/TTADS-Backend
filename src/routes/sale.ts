import {Router} from 'express'
import {getAllSales, getOneSale, getSalesByUser, getSalesByProduct, addSale, editSale, deleteSale} from '../controllers/sale.js'
import { validateAdmin } from '../middlewares/permission.js';

const router = Router();

router.get('/', getAllSales);
router.get('/one/:id', getOneSale);
router.get('/user', getSalesByUser);
router.get('/product/:id', getSalesByProduct);
router.post('/',  addSale);
router.put('/:id', validateAdmin, editSale);
router.delete('/:id', validateAdmin, deleteSale);

export default router;