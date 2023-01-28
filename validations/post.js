import { body } from "express-validator";

export const postCreateValidation = [
  body('title', 'Type title').isLength({min: 3}).isString(),
  body('text', 'Type textdklfjlksajdflkajsldfjlasdf 3').isLength({min: 3}).isString(),
  body('tags', 'Incorect tags format').optional().isString(),
  body('imageUrl', 'Incorrect Image link').optional().isString(),
]