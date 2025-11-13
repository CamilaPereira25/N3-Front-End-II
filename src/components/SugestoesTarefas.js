// src/components/SugestoesTarefas.js
import React from 'react';
import { listaDeSugestoes } from '../data/sugestoes';
import './SugestoesTarefas.css';

function SugestoesTarefas({ onSugestaoClick }) {
  return (
    <div className="sugestoes-container">
      {/* ===== TEXTO ALTERADO AQUI ===== */}
      <h3 className="sugestoes-titulo">Tarefas recomendadas (Adiciona HOJE):</h3>
      
      <div className="sugestoes-chips">
        {listaDeSugestoes.map((sugestao, index) => (
          <button 
            key={index}
            className="chip-sugestao"
            onClick={() => onSugestaoClick(sugestao.titulo)} // Passa só o título
            style={{ borderColor: sugestao.cor }} // Borda com a cor do ícone
          >
            {/* Renderiza o ícone se existir */}
            {sugestao.icone && <sugestao.icone style={{ color: sugestao.cor, marginRight: '5px' }} />}
            {sugestao.titulo}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SugestoesTarefas;