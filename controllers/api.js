const crypto = require('crypto');

const Utility = require('./../services/utility');
const AppConstants = require('./../settings/constants');
const UserValidator = require('./../services/validators/user-validator');


module.exports = function (app)  {

  function _auth(permission) {
      return function (req, res, next) {
        if (permission == 'optional') {
          return next();
        }
        if (permission == 'user') {
            app.db.users.findOne({key: req.query.key}, (err, user) =>
                if(!user) {
                  return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.PERMISSION_DENID));
                }
                req.user = user;
                return next();
              });
          }
        if (permission == 'admin') {
          app.db.users.findOne({key: req.query.key}, (err, user) =>
              if(!user) {
                return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.PERMISSION_DENID));
              }
              req.user = user;
              return next();
            });
          }
        }
      }

  }


app.get ('/api/users', _auth('user'), (req, res) => {
        app.db.users.find({})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .exec((err, data) => {
          if(err) {
          return res.send('not found');
        }
        let response = data.map(d => {
            return {
            username: d.username,
            id: d._id,
            name: d.name,
            age: d.age.includes(user_id)
          }
        });
            return res.send(response);

      });
});
}


app.post('/api/users', _auth(optional), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let name = req.body.name;
    let age = req.body.age;

    let user_v = UserValidator.vaildate.Username(usrname, sanitize);
    if (ueer_v != Utility.ErrorTypes.SUCCESS)
    {
      return res.send(Utility.generateErrorMessage(user_v));
    }


    let pass_v = PasswordValidator.validate.Password(username, sanitize);
    if(pass_v != Utility.ErrorTypes.SUCCESS) {
      return res.send(Utility.generateErrorMessage(pass_v));
    }

    password = crypto.createHash('sha256').update(password + 'reversed').digest('hex');

    if (EmailValidator.validate(email) === false)
    {
      return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_EMAIL));
    }

    if (age < AppConstants.AGE_MIN_VALUE || age > AppConstants.AGE_MAX_VALUE)
    {
      return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.INVALID_AGE_RANGE));
    }


app.db.user.findeOne({username: username}, (err, data) => {
  if(data){
    return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.USER_ALREADY_EXISTS));
  }
  app.db.users.create({
      username: username,
      password: password,
      name: name,
      age: age,
      email: email
      }, (err, data) => {
         if (err){
      return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.USER_CREATION_ERROR));
    }
    return res.send(data);
     });
   });

});


  app.put('/api/users/:id', _auth('user'), (req, res) => {
      if (req.user.role != 'admin') {
          if(req.params.id != req.user_id) {
              return res.send ('you are not registrated user');
          }
      }

  });

   app.delete('/api/users/:id', _auth(admin), (req, res) => {
       app.db.users.findOne({key:req.query.key, role: 'admin'}, (err, user) => {
            if (err || !user) {
              return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.PERMISSION_DENID));
          }
      })
      if(!req.params.id) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.USER_DOES_NOT_EXIST));
      }
     app.db.users.findOneAndRemove({
       _id: req.params.id
     }, (err, data) => {
        if (err) {
            return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.DELETING_FAILD));
       }
       return res.send(data.map (d => {
         return {
           username: d.username,
           id: d._id,
           age: d.age,
           name: d.name,
           email: d.email,
           key: d.key
         }
       }));
     })
   });
