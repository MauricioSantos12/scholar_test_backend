export const validateSchema = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const formattedErrors = Object.entries(
      parsed.error.flatten().fieldErrors
    ).map(([field, messages]) => ({
      field,
      messages,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  req.body = parsed.data;
  next();
};
