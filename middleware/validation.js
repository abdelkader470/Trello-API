const validation = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ Msg: "error", error });
    } else {
      next();
    }
  };
};
export default validation;
