const utilisateurController = require('../controllers/utilisateurs.controller');
const {estAdmin} = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get('/deconnexion', utilisateurController.deconnexion);
router.post('/connexion', utilisateurController.connexion);
router.get('/', estAdmin,utilisateurController.findAll);
router.get('/:id_uti', estAdmin,utilisateurController.findOne);
router.post('/', estAdmin,utilisateurController.create);
router.put('/:id_uti', estAdmin,utilisateurController.update);
router.delete('/:id_uti', estAdmin,utilisateurController.deleteOne);



module.exports = router;