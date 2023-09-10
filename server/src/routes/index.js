const { Router } = require("express");
const { obtenerPaises  } = require('../controllers/paises')
const { countryById } = require('../controllers/countryById')
const { newActivity } = require('../controllers/newActivity')
const { getActivities } = require('../controllers/getActivities')
const { deleteCountrie } = require('../controllers/deleteCountrie')
const { putCountry } = require('../controllers/putCountry')

const router = Router();

router.get('/countries', obtenerPaises);

router.get('/countries/:idPais', countryById);

router.get('/activities', getActivities);

router.post('/activities', newActivity);

router.delete('/activities/:idAct', deleteCountrie );

router.put('/activities/:idAct', putCountry);




module.exports = router;
