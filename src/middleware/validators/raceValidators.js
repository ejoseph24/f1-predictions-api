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

export const validateRaceId = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
];



export const validateCreateRace = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('circuit')
    .notEmpty().withMessage('Circuit is required')
    .isString().withMessage('Circuit must be a string'),
  body('season')
    .notEmpty().withMessage('Season is required')
    .isInt({ gt: 0 }).withMessage('Season must be a positive integer'),
  body('date')
    .notEmpty().withMessage('Date is required')
    .isString().withMessage('Date must be a string'),
  handleValidationErrors,
];

export const validateUpdateRace = [
  body('name')
    .optional()
    .isString().withMessage('Name must be a string'),
  body('circuit')
    .optional()
    .isString().withMessage('Circuit must be a string'),
  body('season')
    .optional()
    .isInt({ gt: 0 }).withMessage('Season must be a positive integer'),
  body('date')
    .optional()
    .isString().withMessage('Date must be a string'),
  handleValidationErrors,
];