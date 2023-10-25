const { Activity } = require('../db');

const newActivity = async (req, res) => {
    try {
        const { nombre, dificultad, duracion, temporada, paises, autor } = req.body;
        if (!nombre || !dificultad || !temporada || !paises || !paises.length || !autor) {
            throw Error('Datos incompletos para crear la actividad.')
        }
        const activityNew = await Activity.create({
            nombre,
            dificultad,
            duracion,
            temporada,
            autor

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
