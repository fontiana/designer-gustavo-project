var express = require('express');
var appRouter = express.Router();
var Works = getmodule('api/services/work');
var About = getmodule('api/services/about');
var Admin = getmodule('api/services/admin');
var Config = getmodule('api/services/config');
var Category = getmodule('api/services/category');

//WORK
appRouter.route('/work')
	.get(Works.get)
	.post(Works.insert)
	.put(Works.update);

appRouter.route('/work/:id')
	.get(Works.getFromId)
	.delete(Works.delete);

//CATEGORY
appRouter.route('/category')
	.get(Category.get)
	.post(Category.insert)
	.put(Category.update);

appRouter.route('/category/:id')
	.get(Category.getFromId)
	.delete(Category.delete);

//CONFIG
appRouter.route('/config')
	.get(Config.get)
	.put(Config.update);	

//ABOUT
appRouter.route('/about')
	.get(About.get)
	.post(About.update);

//ADMIN
appRouter.route('/admin/login')
	.post(Admin.login);

module.exports = appRouter;