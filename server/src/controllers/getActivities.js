const { Activity } = require('../db');

const getActivities = async (req, res) => {
    try {
        const allActivities = await Activity.findAll()
        if(!allActivities) throw Error('no hay actividades disponibles')
        return res.status(200).json(allActivities)
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = { 
    getActivities 
}
