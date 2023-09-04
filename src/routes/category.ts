import {Router} from 'express'
import {getAllCategories, getOneCategory, addCategory, editCategory, deleteCategory} from '../controllers/category.js'
import { validateAdmin } from '../middlewares/permission.js';
import { sanitizeCategoryInput } from '../middlewares/sanitizeInput.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getOneCategory);
router.post('/', validateAdmin, sanitizeCategoryInput, addCategory);
router.put('/:id', validateAdmin, sanitizeCategoryInput, editCategory);
router.delete('/:id', validateAdmin, deleteCategory);

export default router;