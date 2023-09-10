const { Activity } = require('../db');


const deleteCountrie = async (req, res) => {
    try {
        const { idAct } = req.params;
    
        const activity = await Activity.destroy({
            where: {
                id: idAct
            }
        })
        return res.status(200).json(activity);
        
    } catch (error) {
        return res.status(404).send(error.message)
    }
}


module.exports = {
    deleteCountrie
}