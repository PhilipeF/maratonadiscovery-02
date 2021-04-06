const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
    name: "Philipe",
    avatar: "http://github.com/philipef.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

const jobs = []  

routes.get('/', (req, res) => res.render(views + 'index'));
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/job', (req, res) => res.render(views + 'job'));
routes.post('/job', (req, res) => {
    jobs.push(req.body)
    return res.redirect('/')
    
});

routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }));

routes.get('/index', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;

