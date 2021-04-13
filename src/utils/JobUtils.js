module.exports = {
    remainingDays(job) {
        //ex.: 2h:20min d player2  //calculo de tempo restante
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar milisegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        //restam x dias
        return dayDiff
    },
    calculatorBuget: (job, valueHour) => valueHour * job['total-hours']
}