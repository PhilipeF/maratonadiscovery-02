const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },

  update(req, res) {
    //req.body para pegar os dados
    const data = req.body;

    //definir quantas semana tem em um ano: 52
    const weeksPerYear = 52;

    //remover as semanas de ferias do ano, para pegar quantas semana tem em 1(um) mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    //total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    //horas trabalhads no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    //qual sera o valor da minha hora
    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour,
    });

    return res.redirect("/profile");
  },
};
