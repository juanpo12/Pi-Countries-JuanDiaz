const { Activity } = require('../db');

const newActivity = async (req, res) => {
    try {
        const { nombre, dificultad, duracion, temporada, paises } = req.body;
        if (!nombre || !dificultad || !temporada || !paises || !paises.length) {
            throw Error('Datos incompletos para crear la actividad.')
        }
        const activityNew = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada

        })
 

        await activityNew.addCountries(paises)
        return res.status(200).json(activityNew)

    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {
    newActivity
}
