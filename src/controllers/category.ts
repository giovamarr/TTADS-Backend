import { Request, Response } from 'express';
import Category from '../models/Category.js';

export const addCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category = req.body.category
  const existCategory = await Category.findOne({ title: category.title });

  if (existCategory) {
    return res.status(400).json({ message: "Ya existe una categoria con ese titulo" });
  }

  const newCategory = new Category(category);
  await newCategory.save();
  return res.status(201).json(newCategory);
};

export const getAllCategories = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const categories = await Category.find({ });
  return res.status(200).json(categories);
};

export const getOneCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    if (!req.params.id) {
      return res.status(400).json({ message: "Enviar Id de la categoria" });
    }

    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: "No se encontro la categoria" });
    }

    return res.status(200).json(category);
};

export const editCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try{

    if (!req.params.id) {
      return res.status(400).json({ message: "Enviar Id de la categoria" });
    }

    const categoryEdit = req.body.category
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({ message: "No se encontro la categoria" });
    }

    const existCategory = await Category.findOne({ $and: [{title: categoryEdit.title, _id:{$ne: req.params.id} }]});
    if (existCategory) {
      return res.status(400).json({ message: "Ya existe una categoria con ese titulo" });
    }

    const updatedCategory = await Category.updateOne({_id : req.params.id},
                                          {$set: {title: categoryEdit.title, image: categoryEdit.image}})
    return res.status(200).json(updatedCategory);

  }catch(err){
    console.log(err)
    return res.status(500);
  }
};

export const deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    if (!req.params.id) {
      return res.status(400).json({ message: "Enviar Id de la categoria" });
    }

    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(404).json({ message: "No se encontro la categoria" });
    }

    const deletedCategory = await Category.deleteOne({_id : req.params.id})
    return res.status(200).json({ message: "Borrado correctamente" });
};