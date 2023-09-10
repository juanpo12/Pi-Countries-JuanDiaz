const { Activity } = require('../db');

const putCountry = async (req, res) => {
    try {
        const { idAct } = req.params;
        const { nombre, dificultad, duracion, temporada} = req.body;
    
        const activity = await Activity.findByPk(idAct);
        await activity.update({
            nombre,
            dificultad,
            duracion,
            temporada
        })
        
        return res.status(200).json(activity);
    
        
    
    } catch (error) {
        return res.status(404).send(error.message)
    }
    
}

module.exports = {
    putCountry
}