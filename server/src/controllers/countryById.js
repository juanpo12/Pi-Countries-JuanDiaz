const { Country, Activity } = require('../db');

const countryById = async (req, res) => {
    try {
        const { idPais } = req.params;
        const pais = await Country.findByPk(idPais, {
            include: Activity
        });

        if (!pais) throw Error('País no encontrado.');
         return res.status(200).json(pais);


    } catch (error) {
        return res.status(404).send(error.message)
    }

}

module.exports = {
    countryById
};