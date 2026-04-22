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

export const validatePredictionId = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreatePrediction = [
  body('raceId')
    .notEmpty().withMessage('Race ID is required')
    .isInt({ gt: 0 }).withMessage('Race ID must be a positive integer'),
  body('predictedFirstId')
    .notEmpty().withMessage('Predicted first place driver is required')
    .isInt({ gt: 0 }).withMessage('Predicted first ID must be a positive integer'),
  body('predictedSecondId')
    .notEmpty().withMessage('Predicted second place driver is required')
    .isInt({ gt: 0 }).withMessage('Predicted second ID must be a positive integer'),
  body('predictedThirdId')
    .notEmpty().withMessage('Predicted third place driver is required')
    .isInt({ gt: 0 }).withMessage('Predicted third ID must be a positive integer'),
  handleValidationErrors,
];

export const validateUpdatePrediction = [
  body('predictedFirstId')
    .optional()
    .isInt({ gt: 0 }).withMessage('Predicted first ID must be a positive integer'),
  body('predictedSecondId')
    .optional()
    .isInt({ gt: 0 }).withMessage('Predicted second ID must be a positive integer'),
  body('predictedThirdId')
    .optional()
    .isInt({ gt: 0 }).withMessage('Predicted third ID must be a positive integer'),
  handleValidationErrors,
];