var express = require('express');
var appRouter = express.Router();
var Works = getmodule('api/services/work');
var About = getmodule('api/services/about');
var Admin = getmodule('api/services/admin');
var Config = getmodule('api/services/config');

//WORK
appRouter.route('/work')
	.get(Works.get)
	.post(Works.insert);

appRouter.route('/work/:id')
	.get(Works.getFromId)
	.delete(Works.delete)
	.post(Works.update);

appRouter.route('/config')
	.get(Config.get);
	
appRouter.route('/config/:id')
	.post(Config.update);

//ABOUT
appRouter.route('/about')
	.get(About.get)
	.post(About.update);

//ADMIN
appRouter.route('/admin/login')
	.post(Admin.login);

module.exports = appRouter;