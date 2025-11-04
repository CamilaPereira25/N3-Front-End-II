import React from 'react';

function Atividade({ atividade, onToggle, onDelete }) {
  
  // Define a classe CSS com base no status 'concluida'
  const classeTitulo = `atividade-titulo ${atividade.concluida ? 'concluida' : ''}`;

  return (
    <div className="atividade-item">
      {/* Checkbox (UPDATE) */}
      <input 
        type="checkbox" 
        className="atividade-checkbox"
        checked={atividade.concluida}
        onChange={() => onToggle(atividade.id)}
      />
      
      {/* Título da Atividade */}
      <span className={classeTitulo}>
        {atividade.titulo}
      </span>
      
      {/* Botão de Deletar (DELETE) */}
      <button 
        className="btn-deletar-atividade"
        onClick={() => onDelete(atividade.id)}
      >
        &times; {/* Isso é um ícone "X" simples */}
      </button>
    </div>
  );
}

export default Atividade;