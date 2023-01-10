const UsersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

UsersRouter.post('/', async (request, response) => {
    const { email, name, phone, password, country, role } = request.body;
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const userExist = await User.findOne({email})

    if (!(PASSWORD_REGEX.test(password))) {
        response.status(400).json({error: 'La contraseña no cumple el formato'})
    } else if (!(email && password)) {
        return response.status(400).json({error: 'El email y la contraseña son requeridos'})
    } else if (userExist) {
        return response.status(400).json({error: 'El email ya existe. Intenta con otro'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        name,
        phone,
        email,
        country,
        passwordHash,
        role
    });
    await newUser.save();
    return response.sendStatus(201);
});

module.exports = UsersRouter;