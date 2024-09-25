module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [2, 100],
                msg: 'The first name must contain between 2 and 100 characters.' // Error message I want to display
              }
            }
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [2, 100],
                msg: 'The last name must contain between 2 and 100 characters.' // Error message I want to display
              }
            }
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: {
                msg: "Must be an EMAIL ##CUSTOM MESSAGE##",
              },
            },
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              notNull: { args: true, msg: "You must enter Phone Number" },
              len: { args: [11, 11], msg: 'Phone Number is invalid' },
              isInt: { args: true, msg: "You must enter Phone Number" },
            }
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [6, 100],
                msg: 'The password must contain between 6 and 100 characters.' // Error message I want to display
              }
            }
          },
          status: {
            type:   Sequelize.ENUM,
            values: ['active', 'pending', 'inactive','deactive'],
            defaultValue :  'inactive'
          }
    });
    return User;
};