var express = require('express');
var appRouter = express.Router();
var Works = getmodule('api/services/work');
var About = getmodule('api/services/about');
var Admin = getmodule('api/services/admin');
var Config = getmodule('api/services/config');
var Category = getmodule('api/services/category');
var Upload = getmodule('api/services/upload');

//WORK
appRouter.route('/work')
	.get(Works.get)
	.post(Admin.checkUserRole, Works.insert);

appRouter.route('/work/:id')
	.get(Works.getFromId)
	.delete(Admin.checkUserRole, Works.delete)
	.put(Admin.checkUserRole, Works.update);

//CATEGORY
appRouter.route('/category')
	.get(Category.get)
	.post(Admin.checkUserRole, Category.insert);

appRouter.route('/category/:id')
	.get(Category.getFromId)
	.delete(Admin.checkUserRole, Category.delete)
	.put(Admin.checkUserRole, Category.update);

//CONFIG
appRouter.route('/config')
	.get(Config.get);

appRouter.route('/config/:id')
	.put(Admin.checkUserRole, Config.update);

//ABOUT
appRouter.route('/about')
	.get(About.get);

appRouter.route('/about/:id')
	.put(Admin.checkUserRole, About.update);
	
//ADMIN
appRouter.route('/admin/login')
	.post(Admin.login);

//UPLOAD
appRouter.route('/upload')
	.post(Admin.checkUserRole, Upload.upload);
	
module.exports = appRouter;