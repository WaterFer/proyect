const AgendRouter = require('express').Router();

const citas = require('../models/citas')

AgendRouter.post('/', async (request, response) => {
    const { dia, servicios } = request.body;
    
    const newcita = new citas({
        dia,
        servicios
    });
    await newcita.save();
    return response.sendStatus(201);
});

module.exports = AgendRouter;