exports.checkCreateUser = (req, res, next) => {
  if (!req.body.nom) res.boom.badData("validating...");
  else next();
};
