const livreController = require('../controllers/livres.controller');
const {estAdmin,verifToken} = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get('/', verifToken,livreController.findAll);
router.get('/:id_livre', estAdmin,livreController.findOne);
router.post('/', verifToken,livreController.create);
router.put('/:id_livre', verifToken,livreController.update);
router.delete('/:id_livre', estAdmin,livreController.deleteOne);

module.exports = router;