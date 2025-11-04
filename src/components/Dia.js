import React, { useState } from 'react';
import Atividade from './Atividade';

function Dia({ nomeDia, atividades, onToggle, onDelete, onCreate }) {
  // Estado local para controlar o input de nova atividade
  const [novoTitulo, setNovoTitulo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (novoTitulo.trim() === '') return; // Não adiciona se vazio

    onCreate(nomeDia, novoTitulo); // Chama a função do Planner
    setNovoTitulo(''); // Limpa o input
  };

  return (
    <div className="dia-coluna">
      <h2 className="dia-titulo">{nomeDia}</h2>
      
      {/* Lista de Atividades (READ) */}
      <div className="lista-atividades">
        {atividades.map(atv => (
          <Atividade 
            key={atv.id} 
            atividade={atv}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Formulário (CREATE) */}
      <form className="form-nova-atividade" onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input-nova-atividade"
          placeholder="Nova meta..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <button type="submit" className="btn-add-atividade">+</button>
      </form>
    </div>
  );
}

export default Dia;