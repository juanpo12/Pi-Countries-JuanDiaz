const axios = require('axios');
const { Country } = require('../db')
const getCountries = async () => {
    
    const { data } = await axios("http://localhost:5000/countries")
    data.map(async (countryNew) => {
        await Country.findOrCreate({
            where: {
                id: countryNew.cca3
            },
            defaults: {
                name: countryNew.name.common,
                banderaImagen: countryNew.flags.png,
                continentes: countryNew.continents[0],
                capital: countryNew.capital ? countryNew.capital[0] : null,
                subregion: countryNew.subregion,
                area: countryNew.area,
                poblacion: countryNew.population
            }
        })
    })

}

module.exports = { getCountries }