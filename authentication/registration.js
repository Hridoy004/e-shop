const User = require('../schemas/user');
const utils = require('../utils');

const UserService = require('../services/user-service');

const registration = async (req, res) => {

    const { FirstName, LastName, Email, Password } = req.body;

    if (FirstName && LastName && Email && Password) {

        let hashedPassword = await utils.hashPassword(Password);

        let userService = new UserService();
        let exists = await userService.isUserAlreadyExists(Email);
        if(exists) {
            let response = {
                Message: `User already exists with the email address ${Email}`,
                Success: false
            }
            res.status(400).json(response);
        } else {
            const roles = ['user'];
            let created = await userService.createNewUser(
                FirstName,
                LastName,
                Email,
                hashedPassword,
                roles
            );

            if(created) {
                let response = {
                    Message: `Use created successfully`,
                    Success: true
                };
                res.status(201).json(response);
            } else {
                let response = {
                    Message: `use creation fail`,
                    Success: false
                };
                res.status(400).json(response);
            }
        }

    } else {
        let response = {
            Message: "Missing required fields",
            Success: false
        };
        res.status(400).json(response);
    }

};

module.exports = registration;