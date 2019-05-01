export function logger(req, res, next) {
  console.log({ request: req, response: res });
  next();
};
