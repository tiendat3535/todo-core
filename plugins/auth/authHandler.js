import Boom from 'boom';
import httpStatus from 'http-status';
import authUtil from './authUtil';
import models from '../../models';

exports.registerUserHandler = async ({ payload: user }, h) => {
    const numberUser = await models.User.count({ where: { username: user.username } });
    if (numberUser) {
        return Boom.badRequest(`Username already exists: ${user.username}`);
    }
    const savedUser = await models.sequelize.transaction(() => models.User.create({ ...user, password: authUtil.encryptPassword(user.password) }));
    return h.response(authUtil.generateToken({ username: savedUser.username })).code(httpStatus.CREATED);
};

exports.logInHandler = async ({ payload: user }, h) => {
    const foundUser = await models.User.find({ where: { username: user.username } });
    if (!foundUser) {
        return Boom.unauthorized(`Username does not exist: ${user.username}.`);
    }
    if (!authUtil.isPasswordValid(foundUser.password)) {
        return Boom.unauthorized('Username or Password is incorrect');
    }
    return h.response(authUtil.generateToken({ username: foundUser.username })).code(httpStatus.CREATED);
};