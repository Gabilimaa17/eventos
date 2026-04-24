const eventosModel = require('../Models/eventoModel'); 

exports.getEventos = async (req, res) => { 
    try { 
        const eventos = await eventosModel.findAll(); 
        res.json(eventos);  
    } catch (err) { 
        console.error('Erro ao buscar eventos:', err); 
        res.status(500).json({ error: 'Erro interno ao buscar eventos' }); 
    } 
}; 

exports.createEventos = async (req, res) => { 
    const { nome, organizador, data_evento, capacidade, tipo, descricao } = req.body;  
     
    if (!nome || !organizador || !data_evento || !capacidade || !tipo || !descricao) { 
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' }); 
    } 

    try {
        const newEventos = await eventosModel.create(nome, organizador, data_evento, capacidade, tipo, descricao);
        res.status(201).json(newEventos);  
    } catch (err) { 
        console.error('Erro ao criar eventos:', err); 
        res.status(500).json({ error: 'Erro interno ao criar eventos' }); 
    } 
}; 

exports.updateEventos = async (req, res) => { 
    const id = req.params.id; 
    const { nome, organizador, data_evento, capacidade, tipo, descricao } = req.body; 
     
    if (!nome || !organizador || !data_evento || !capacidade || !tipo || !descricao) { 
        return res.status(400).json({ error: 'Todos os campos são necessários para atualização.' }); 
    } 

    try { 
        const updatedEventos = await eventosModel.update(id, nome, organizador, data_evento, capacidade, tipo, descricao); 
         
        if (!updatedEventos) { 
            return res.status(404).json({ error: 'Evento não encontrado.' }); 
        } 

        res.json(updatedEventos);  
    } catch (err) { 
        console.error('Erro ao atualizar eventos:', err); 
        res.status(500).json({ error: 'Erro interno ao atualizar eventos' }); 
    } 
}; 

exports.deleteEventos = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteEventos = await eventosModel.delete(id);
        
        if (!deleteEventos) {
            return res.status(404).json({ error: 'Evento não encontrado para exclusão.' });
        }
        
        res.json({ message: 'Evento removido com sucesso', eventos: deleteEventos });
    } catch (err) {
        console.error('Erro ao deletar eventos:', err);
        res.status(500).json({ error: 'Erro interno ao deletar eventos' });
    }
};

exports.getEventoById = async (req, res) => {
    const { id } = req.params;

    try {
        const eventos = await eventosModel.findByField('id', id);
        
        if (eventos.length === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        
        res.json(eventos[0]); 
    } catch (err) {
        console.error('Erro ao buscar evento por ID:', err);
        res.status(500).json({ error: 'Erro interno ao buscar evento' });
    }
};

exports.buscarEventos = async (req, res) => {
    const { filtro } = req.query; 

    if (!filtro) {
        return res.status(400).json({ error: 'Parâmetro filtro é obrigatório.' });
    }

    try {
        const eventos = await eventosModel.findByField('nome', filtro);
        res.json(eventos);
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        res.status(500).json({ error: 'Erro interno ao buscar eventos' });
    }
};