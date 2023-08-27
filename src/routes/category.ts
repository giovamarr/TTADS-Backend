import {Router} from 'express'
import {getAllCategories, getOneCategory, addCategory, editCategory, deleteCategory} from '../controllers/category.js'

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getOneCategory);
router.post('/', addCategory);
router.put('/:id', editCategory);
router.delete('/:id', deleteCategory);

export default router;