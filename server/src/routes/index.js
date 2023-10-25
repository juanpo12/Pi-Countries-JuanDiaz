const { Router } = require("express");
const { obtenerPaises  } = require('../controllers/paises')
const { countryById } = require('../controllers/countryById')
const { newActivity } = require('../controllers/newActivity')
const { getActivities } = require('../controllers/getActivities')
const { deleteActivity } = require('../controllers/deleteCountrie')
const { putActivity } = require('../controllers/putCountry')

const router = Router();

router.get('/countries', obtenerPaises);

router.get('/countries/:idPais', countryById);

router.get('/activities', getActivities);

router.post('/activities', newActivity);

router.delete('/activities/:idAct', deleteActivity );

router.put('/activities/:idAct', putActivity);




module.exports = router;
