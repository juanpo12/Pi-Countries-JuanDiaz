const { Activity, Country} = require('../db');

const putActivity = async (req, res) => {
    try {
        const { idAct } = req.params;
        const { nombre, dificultad, duracion, temporada, paises} = req.body;
        const activity = await Activity.findByPk(idAct);
        await activity.update({
            nombre,
            dificultad,
            duracion,
            temporada,
        })
        await activity.setCountries([]);
        const newCountries = await Country.findAll({
            where: {id: paises},
        });
        await activity.addCountries(newCountries)
        return res.status(200).json(activity);
    
        
    
    } catch (error) {
        return res.status(404).send(error.message)
    }
    
}

module.exports = {
    putActivity
}