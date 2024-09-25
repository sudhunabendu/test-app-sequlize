const { verifySignUp } = require("../app/Http/Middleware");
const controller = require("../app/Http/Controllers/auth.controller.js");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicatePhoneOrEmail,
        // verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],
      controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
  };