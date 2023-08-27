import { Request, Response } from 'express';
import Category from '../models/category.js';

export const addCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.title) {
    console.log(req.body)
    return res
      .status(400)
      .json({ msg: "Enviar Titulo de categoria." });
  }

  const category = await Category.findOne({ title: req.body.title });
  if (category) {
    return res.status(400).json({ msg: "Ya existe una categoria con ese titulo." });
  }

  const newCategory = new Category(req.body);
  await newCategory.save();
  return res.status(201).json(newCategory);
};

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const categories = await Category.find({ });
  return res.status(201).json(categories);

};

export const getOneCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ msg: "Enviar Id de la categoria." });
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({ msg: "No se encontro la categoria" });
    }

    return res.status(201).json(category);
};

export const editCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id || !req.body.title) {
      return res
        .status(400)
        .json({ msg: "Enviar Id de la categoria y el nuevo titulo." });
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({ msg: "No se encontro la categoria" });
    }
    const newCategory = await Category.findOne({ title: req.body.title });
    if (newCategory) {
      return res.status(400).json({ msg: "Ya existe una categoria con ese titulo." });
    }

    const updatedCategory = await Category.updateOne({_id : req.params.id},
                        {$set: {title: req.body.title}})
    return res.status(200).json(updatedCategory);
};

export const deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ msg: "Enviar Id de la categoria." });
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).json({ msg: "No se encontro la categoria" });
    }

    const deletedCategory = await Category.deleteOne({_id : req.params.id})
    return res.status(200).json(deletedCategory);
};