// To verify a Signup action, we need 2 functions:
// – check if username or email is duplicate or not
// – check if roles in the request is existed or not

const db = require("../../Models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicatePhoneOrEmail = (req, res, next) => {
    // Phone
  User.findOne({    
    where: {
      email: req.body.email
    }
  }).then(users => {
    if (users) {
      res.status(400).send({
        message: "Failed! email  is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        phone: req.body.phone
      }
    }).then(users => {
      if (users) {
        res.status(400).send({
          message: "Failed! Phone Number is already in use!"
        });
        return;
      }

      next();
    });
  });
};


checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };

const verifySignUp = {
checkDuplicatePhoneOrEmail: checkDuplicatePhoneOrEmail,
checkRolesExisted: checkRolesExisted
};

  module.exports = verifySignUp;