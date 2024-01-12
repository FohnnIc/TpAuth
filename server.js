const express = require('express'),
app = express(),
routeUtilisateur = require('./routes/utilisateurs.route'),
routeProduit = require('./routes/livres.route');
require('dotenv').config({ path: './config/.env' });

const cors = require('cors');

app.use(cors());
app.use(express.json())

app.get('/hello', (req, res) => {
    res.send('Bonjour, ceci est mon serveur Express !');
});
app.get('/operation', (req, res) => {
    const {a, b, op} = req.query;
    const acceptHeader = req.get('Accept');
    let result;
    switch (op) {
        case "add":
            result = parseInt(a) + parseInt(b);
            break;
        case "sub":
            result = parseInt(a) - parseInt(b);
            break;
        case "mul":
            result = parseInt(a) * parseInt(b);
            break;
        case "div":
            result = parseInt(a) / parseInt(b);
            break;
        default:
            result = "Opération non reconnue";
    }
    if (acceptHeader === 'application/json') {
        res.type('application/json').send({result});
    }else if(acceptHeader === 'text/plain') {
        res.type('text/plain').send(result);
    }else{
        res.status(406).send('Not Acceptable');
    }

});

app.use('/utilisateur', routeUtilisateur);
app.use('/livre', routeProduit);

    app.listen(process.env.PORT, () => {
    console.log(`Le serveur Express écoute sur le port ${process.env.PORT}`);
});