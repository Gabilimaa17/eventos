const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.get('/', eventoController.getEventos);
router.post('/', eventoController.createEventos);

router.get('/buscar', eventoController.buscarEventos);

router.get('/:id', eventoController.getEventoById);
router.put('/:id', eventoController.updateEventos);
router.delete('/:id', eventoController.deleteEventos);

module.exports = router;