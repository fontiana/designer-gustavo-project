var express = require('express');
var appRouter = express.Router();
var Works = getmodule('api/services/work');
var About = getmodule('api/services/about');
var Admin = getmodule('api/services/admin');

//WORK
appRouter.route('/work')
	.get(Works.get);

appRouter.route('/work/:id')
	.get(Works.getFromId);

//ABOUT
appRouter.route('/about')
	.get(About.get);

//ADMIN
appRouter.route('/admin/login')
	.post(Admin.login);

module.exports = appRouter;