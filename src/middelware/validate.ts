import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = await schema.validate(req.body, { abortEarly: true, stripUnknown: true });
    next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      field: err.path,
    });
  }
};

export default validate;
