const livres = require('../models/livres.model');

exports.findAll = async (req, res) => {
    if (req.isAdmin===true){
        livres.findAll({
            where:{
                id_uti:req.id_uti
            }
        }).then(data => {
            console.log({ message: "livres trouvé(s)", livre: data })
            res.status(200).json({ message: "livres trouvé(s)", livre: data })
        }).catch(err => {
            console.log({ message: "livres non trouvé(s)", erreur: err })
            res.status(500).json({ message: "livres non trouvé(s)", erreur: err })
        });
    }else{
        livres.findAll().then(data => {
            console.log({ message: "livres trouvé(s)", livre: data })
            res.status(200).json({ message: "livres trouvé(s)", livre: data })
        }).catch(err => {
            console.log({ message: "livres non trouvé(s)", erreur: err })
            res.status(500).json({ message: "livres non trouvé(s)", erreur: err })
        });
    }

}
exports.findOne = async (req, res) => {
    if (req.isAdmin===true){
        livres.findOne({
            where: {
                id_livre: req.params.id,
            }
        }).then(data => {
            console.log({ message: "livre trouvé", livre: data })
            res.status(200).json({ message: "livre trouvé", livre: data })
        }).catch(err => {
            console.log({ message: "livre non trouvé", erreur: err })
            res.status(500).json({ message: "livre non trouvé", erreur: err })
        });
    }else{
        livres.findOne({
            where: {
                id_livre: req.params.id,
                id_uti: req.id_uti
            }
        }).then(data => {
            console.log({ message: "livre trouvé", livre: data })
            res.status(200).json({ message: "livre trouvé", livre: data })
        }).catch(err => {
            console.log({ message: "livre non trouvé", erreur: err })
            res.status(500).json({ message: "livre non trouvé", erreur: err })
        });
    }
}
exports.create = async (req, res) => {

    livres.create({
        contenu_livre: req.body.contenu_livre,
        id_uti: req.id_uti
    }).then(data => {
        console.log({ message: "livre créé", livre: data })
        res.status(200).json({ message: "livre créé", livre: data })
    }).catch(err => {
        console.log({ message: "livre non créé", erreur: err })
        res.status(500).json({ message: "livre non créé", erreur: err })
    });
}
exports.update = async (req, res) => {
    livres.update({
        where: {
            id_livre: req.params.id,
            contenu_livre: req.body.contenu_livre,
            id_uti: req.body.id_uti
        }
    }).then(data => {
        console.log({message: "livre modifié", livre: data})
        res.status(200).json({message: "livre modifié", livre: data})
    }).catch(err => {
        console.log({message: "livre non modifié", erreur: err})
        res.status(500).json({message: "livre non modifié", erreur: err})
    });
}
exports.deleteOne = async (req, res) => {
    livres.destroy({
        where: {
            id_livre: req.params.id
        }
    }).then(data => {
        console.log({ message: "livre supprimé", livre: data })
        res.status(200).json({ message: "livre supprimé", livre: data })
    }).catch(err => {
        console.log({ message: "livre non supprimé", erreur: err })
        res.status(500).json({ message: "livre non supprimé", erreur: err })
    });
}

