const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController  = require('./controllers/JobController');
//const views = __dirname + '/views/'; //const = basePATH 

routes.get('/', (JobController.index))
routes.get('/job', (JobController.create))
routes.post('/job', (JobController.save))
routes.get('/job/:id', (JobController.show))
routes.post('/job/:id', (JobController.update))
routes.post('/job/delete/:id', (JobController.delete))
routes.get('/profile', (ProfileController.index))
routes.post('/profile', (ProfileController.update))

//routes.get('/teste', (req, res) => res.render('teste'))

module.exports = routes;
