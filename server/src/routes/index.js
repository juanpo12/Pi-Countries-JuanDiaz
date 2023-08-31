const { Router } = require("express");
const { obtenerPaises  } = require('../controllers/paises')
const { countryById } = require('../controllers/countryById')
const { newActivity } = require('../controllers/newActivity')
const { getActivities } = require('../controllers/getActivities')

const router = Router();

router.get('/countries', obtenerPaises );

router.get('/countries/:idPais', countryById);

router.get('/activities', getActivities);

router.post('/activities', newActivity);




module.exports = router;
