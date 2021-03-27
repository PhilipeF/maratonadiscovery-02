const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
    name: "Goku",
    avatar: "https://w7.pngwing.com/pngs/835/388/png-transparent-goku-goten-vegeta-chibi-drawing-goku-child-manga-computer-wallpaper.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

routes.get('/', (req, res) => res.render(views + 'index'));
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/job', (req, res) => res.render(views + 'job'));
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }));

routes.get('/index', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;

