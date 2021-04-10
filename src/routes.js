const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/'; //const = basePATH

const Profile = {
    data: {

        name: 'Philipe',
        avatar: 'http://github.com/philipef.png',
        'monthly-budget': 3000,
        'days-per-week': 5,
        'hours-per-day': 5,
        'vacation-per-year': 4,
        'value-hour': 75
    },

    controllers: {
        index(req, res) {

            //return res.render(views + 'teste')
            return res.render(views + 'profile', { profile: Profile.data })
        },

        update(req, res) {
            //req.body para pegar os dados
            const data = req.body

            //definir quantas semana tem em um ano: 52
            const weeksPerYear = 52

            //remover as semanas de ferias do ano, para pegar quantas semana tem em 1(um) mês  
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            //total de horas trabalhadas na semana
            const weekTotalHours = data['hours-per-day'] * data['days-per-week']

            //horas trabalhads no mês
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            //qual sera o valor da minha hora
            const valueHour = data['monthly-budget'] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    },
}

const Job = {
    data: [
        {
            id: 1,
            name: 'Pizzaria Guluso',
            'daily-hours': 2,
            'total-hours': 1,
            created_at: Date.now(),
        },
        {
            id: 2,
            name: 'One Two Project',
            'daily-hours': 3,
            'total-hours': 47,
            created_at: Date.now(),
        }
    ],

    controllers: {
        index(req, res) {
            const upadatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining, //restantes
                    status,
                    budget: Job.services.calculatorBuget(job, Profile.data['value-hour'])
                }
            })

            return res.render(views + 'index', { jobs: upadatedJobs })
        },
        save(req, res) {
            const lastId = jobs.data[jobs.data.length - 1]?.id || 1; //ex.: 1:20hr player2

            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() //atribuindo valor de hoje
            })
            return res.redirect('/')
        },
        create(req, res) {

            return res.render(views + 'job')
        },

        show(req, res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {

                return res.send('Not found o ID')
            }

            job.budget = Job.services.calculatorBuget(job, Profile.data['value-hour'])

            return res.render(views + 'job-edit', { job })
        },
        update(req, res) {

            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {

                return res.send('Not found o ID')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                'total-hours': req.body['total-hours'],
                'daily-hours': req.body['daily-hours'],
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {

                    job = updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },
        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) != Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            //ex.: 2h:20min d player2  //calculo de tempo restante
            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDateInMs - Date.now()
            //transformar milisegundos em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

            //restam x dias
            return dayDiff
        },
        calculatorBuget: (job, valueHour) => valueHour * job['total-hours']
    }
}

routes.get('/', (Job.controllers.index))
routes.get('/job', (Job.controllers.create))
routes.post('/job', (Job.controllers.save))
routes.get('/job/:id', (Job.controllers.show))
routes.post('/job/:id', (Job.controllers.update))
routes.post('/job/delete/:id', (Job.controllers.delete))
routes.get('/profile', (Profile.controllers.index))
routes.post('/profile', (Profile.controllers.update))


//routes.get('/teste', (req, res) => res.render(views + 'teste'))

module.exports = routes;
