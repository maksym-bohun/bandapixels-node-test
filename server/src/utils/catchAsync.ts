import AppError from "./appError";

const catchAsync = (fn: (req: any, res: any, next: any) => Promise<any>) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch((err: any) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      next(new AppError(message, statusCode));
    });
  };
};

export default catchAsync;
