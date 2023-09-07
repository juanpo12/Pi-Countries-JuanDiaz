const { Country, Activity } = require('../db')
const { countriesByName } =  require('./countriesByName')


const obtenerPaises = async (req, res) => {
    try {
        const {name} = req.query;
        
        if(name){ const countryName = await countriesByName(name)
            return res.status(200).json(countryName)
        }

        const paises = await Country.findAll({
            include: Activity
        });
        return res.status(200).json(paises)
        

        
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

module.exports = {
    obtenerPaises
};