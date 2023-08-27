import {Router} from 'express'
import {getAllProducts,getProductsByCategory,  getOneProduct, addProduct, editProduct, deleteProduct} from '../controllers/product.js'

const router = Router();

router.get('/', getAllProducts);
router.get('/category/:id', getProductsByCategory);
router.get('/:id', getOneProduct);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;