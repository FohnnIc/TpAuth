const utilisateurs = require('../models/utilisateurs.model.js');
const jwt = require("jsonwebtoken");
//simule une connexion
exports.connexion = async (req, res) => {
    try {
        const idUtilisateur = req.id_uti;
        const isAdmin = req.admin_uti;

        const token = jwt.sign({ id: idUtilisateur, isAdmin: isAdmin }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // 24 heures
        });
        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la génération du token' });
    }
};
exports.deconnexion = async (req, res) => {
    return res.status(200).send({ auth: false, token: null });

}
exports.findAll = async (req, res) => {
    utilisateurs.findAll().then(data => {
        console.log({message: "utilisateurs trouvé(e)s", utilisateur: data})
        res.status(200).json({message: "utilisateurs trouvé(e)s", utilisateur: data})
    }).catch(err => {
        console.log({message: "utilisateurs non trouvé(e)s", erreur: err})
        res.status(500).json({message: "utilisateurs non trouvé(e)s", erreur: err})
    })
};
exports.findOne = async (req, res) => {
       utilisateurs.findOne({
           where: {
               id_uti:req.params.id,
           }
       }).then(data => {
            console.log({message: "utilisateur trouvé(e)", utilisateur: data})
            res.status(200).json({message: "utilisateur trouvé(e)", utilisateur: data})
        }).catch(err => {
            console.log({message: "utilisateur non trouvé(e)", erreur: err})
            res.status(500).json({message: "utilisateur non trouvé(e)", erreur: err})
        })
}
exports.create = async (req, res) => {
    utilisateurs.create({
        pseudo_uti: req.body.pseudo_uti,
        admin_uti: req.body.admin_uti
    }).then(data => {
        console.log({message: "utilisateur créé(e)", utilisateur: data})
        res.status(200).json({message: "utilisateur créé(e)", utilisateur: data})
    }).catch(err => {
        console.log({message: "utilisateur non créé(e)", erreur: err})
        res.status(500).json({message: "utilisateur non créé(e)", erreur: err})
    })
}
exports.update = async (req, res) => {
    utilisateurs.update({
        where: {
            id_uti: req.params.id,
            admin_uti: req.body.admin_uti,
            pseudo_uti: req.body.pseudo_uti
        }
    }).then(data => {
        console.log({message: "utilisateur modifié(e)", utilisateur: data})
        res.status(200).json({message: "utilisateur modifié(e)", utilisateur: data})
    }).catch(err => {
        console.log({message: "utilisateur non modifié(e)", erreur: err})
        res.status(500).json({message: "utilisateur non modifié(e)", erreur: err})
    })
}
exports.deleteOne = async (req, res) => {
    utilisateurs.destroy({
        where: {
            id_uti: req.body.id
        }
    }).then(data => {
        console.log({message: "utilisateur supprimé(e)", utilisateur: data})
        res.status(200).json({message: "utilisateur supprimé(e)", utilisateur: data})
    }).catch(err => {
        console.log({message: "utilisateur non supprimé(e)", erreur: err})
        res.status(500).json({message: "utilisateur non supprimé(e)", erreur: err})
    })
}