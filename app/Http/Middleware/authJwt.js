const jwt = require("jsonwebtoken");
const config = require("../../../config/auth.config");
const db = require("../../Models");
const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
      }

      jwt.verify(token,
        config.secret,
        (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!",
            });
          }
          req.userId = decoded.id;
          next();
        });
};


isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(users => {
      users.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };


  isSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(users => {
      users.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "super-admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require SuperAdmin Role!"
        });
      });
    });
  };

  
  isSuperAdminorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(users => {
      users.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "super-admin") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require super-admin or Admin Role!"
        });
      });
    });
  };

  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSuperAdmin: isSuperAdmin,
    isSuperAdminorOrAdmin: isSuperAdminorOrAdmin
  };
  module.exports = authJwt;

