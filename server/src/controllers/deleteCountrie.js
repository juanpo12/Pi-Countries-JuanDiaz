const { Activity } = require('../db');


const deleteActivity = async (req, res) => {
    try {
        const { idAct } = req.params;
    
        await Activity.destroy({
            where: {
                id: idAct
            }
        })
        return res.status(200).send(`${idAct} eliminado`);
        
    } catch (error) {
        return res.status(404).send(error.message)
    }
}


module.exports = {
    deleteActivity
}