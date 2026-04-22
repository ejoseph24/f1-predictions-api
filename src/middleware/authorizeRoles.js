export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error('Forbidden: insufficient permissions');
      error.status = 403;
      return next(error);
    }
    next();
  };
}