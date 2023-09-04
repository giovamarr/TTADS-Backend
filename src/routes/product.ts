import {Router} from 'express'
import {getAllProducts,getProductsByCategory,  getOneProduct, addProduct, editProduct, deleteProduct} from '../controllers/product.js'
import { validateAdmin } from '../middlewares/permission.js';
import { sanitizeProductInput } from '../middlewares/sanitizeInput.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/:id', getOneProduct);
router.post('/', validateAdmin, sanitizeProductInput, addProduct);
router.put('/:id', validateAdmin, sanitizeProductInput, editProduct);
router.delete('/:id', validateAdmin, deleteProduct);

export default router;