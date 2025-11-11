import React, { useState } from 'react';
import Atividade from './Atividade';

const DIAS_SEMANA_NOMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function Dia({ date, atividades, onToggle, onDelete, onCreate }) {
  const [novoTitulo, setNovoTitulo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (novoTitulo.trim() === '') return; 

    // Converte o objeto Date para o formato 'YYYY-MM-DD'
    const dateString = date.toISOString().split('T')[0];

    onCreate(dateString, novoTitulo); // Chama a função do Planner
    setNovoTitulo(''); 
  };

  // Formata o título (ex: "Seg (10/11)")
  const nomeDia = DIAS_SEMANA_NOMES[date.getDay()];
  const dataFormatada = `${date.getDate()}/${date.getMonth() + 1}`;

  return (
    <div className="dia-coluna">
      <h2 className="dia-titulo">
        {nomeDia}
        <span className="data-num">{dataFormatada}</span>
      </h2>
      
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

      {/* Formulário com novo botão '✓' */}
      <form className="form-nova-atividade" onSubmit={handleSubmit}>
        <input 
          type="text"
          className="input-nova-atividade"
          placeholder="Nova meta..."
          value={novoTitulo}
          onChange={(e) => setNovoTitulo(e.target.value)}
        />
        <button type="submit" className="btn-add-atividade">✓</button>
      </form>
    </div>
  );
}

export default Dia;