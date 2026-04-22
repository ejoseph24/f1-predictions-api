import { body, param, validationResult } from 'express-validator';

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 400;
    return next(error);
  }
  next();
}



export const validateDriverId = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateDriver = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('nationality')
    .notEmpty().withMessage('Nationality is required')
    .isString().withMessage('Nationality must be a string'),
  body('team')
    .notEmpty().withMessage('Team is required')
    .isString().withMessage('Team must be a string'),
  handleValidationErrors,
];

export const validateUpdateDriver = [
  body('name')
    .optional()
    .isString().withMessage('Name must be a string'),
  body('nationality')
    .optional()
    .isString().withMessage('Nationality must be a string'),
  body('team')
    .optional()
    .isString().withMessage('Team must be a string'),
  handleValidationErrors,
];