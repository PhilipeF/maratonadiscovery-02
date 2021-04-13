const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    // total de horas por dia de cada job em progresso
    let jobTotalHours = 0;

    const upadatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      //somando a quantidade de status
      statusCount[status] += 1;

      //total de horas por dia de cada job em progresso
      jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours   

      //fazendo a mesma condição de cima porem utilizndo o if 
      /*if (status == 'progress') {
        jobTotalHours += Number(job['daily-hours']);
      }*/

      return {
        ...job,
        remaining, //restantes
        status,
        budget: JobUtils.calculatorBuget(job, profile["value-hour"]),
      };
    });
    //qtd de horas que quero trabalhar MENOS a quantidade de horas/dia de cada job em project
    const freeHours = profile["days-per-week"] - jobTotalHours;

    return res.render("index", {
      jobs: upadatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
