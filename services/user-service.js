const User = require('../schemas/user');
const { v4: uuidv4 } = require('uuid');


class UserService {

    constructor() {
    }

    async createNewUser(firstName, lastName, email, hashedPassword, roles) {

        try {
            let user = new User({
                _id: uuidv4(),
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Roles: roles,
                IsAccountActive: false,
                IsEmailVerified: false,
                IsTwoFactorAuthenticationEnabled: false,
                IsPhoneNumberVerified: false,
                Password: hashedPassword,
                LogInCount: 0,
            });

            let ack = await user.save();
            return ack && ack._id;
        } catch(e) {
            console.log(e);
            return null;
        }

    }

    async isUserAlreadyExists(email) {
        let response = await User.findOne({ Email: email });
        return response != null;
    }



    async getUserByEmail(email) {
        return await User.findOne({ Email: email });
    }

}

module.exports = UserService;
