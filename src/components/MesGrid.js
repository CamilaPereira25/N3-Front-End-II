import React from 'react';

// Função helper (sem mudança)
const gerarDiasCalendario = (dataBase) => {
  const calendario = [];
  const data = new Date(dataBase);
  const ano = data.getFullYear();
  const mes = data.getMonth();

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  
  const offsetInicio = primeiroDia.getDay(); 
  const totalDias = ultimoDia.getDate();

  // Dias do mês anterior
  for (let i = offsetInicio; i > 0; i--) {
    const dia = new Date(primeiroDia);
    dia.setDate(dia.getDate() - i);
    calendario.push({ date: dia, foraMes: true });
  }

  // Dias do mês atual
  for (let i = 1; i <= totalDias; i++) {
    const dia = new Date(ano, mes, i);
    calendario.push({ date: dia, foraMes: false });
  }

  // Dias do próximo mês
  const offsetFim = 42 - calendario.length;
  for (let i = 1; i <= offsetFim; i++) {
    const dia = new Date(ultimoDia);
    dia.setDate(dia.getDate() + i);
    calendario.push({ date: dia, foraMes: true });
  }

  return calendario;
};


// --- MODIFICADO: Adicionamos a prop 'onDiaClick' ---
function MesGrid({ dataBase, atividades, diasNomes, onDiaClick }) {
  const diasDoMes = gerarDiasCalendario(dataBase);

  return (
    <div className="mes-grid">
      {/* Cabeçalho (sem mudança) */}
      {diasNomes.map(nome => (
        <div key={nome} className="mes-header-dia">{nome}</div>
      ))}

      {/* Células dos dias */}
      {diasDoMes.map(({ date, foraMes }) => {
        const dateString = date.toISOString().split('T')[0];
        const atividadesDoDia = atividades.filter(atv => atv.date === dateString);
        
        let classeCSS = `dia-celula ${foraMes ? 'fora-mes' : ''}`;

        // --- MODIFICADO: Função de clique ---
        const handleClick = () => {
          // Só faz algo se for um dia DENTRO do mês
          if (!foraMes && onDiaClick) {
            onDiaClick(date);
          }
        };

        return (
          // --- MODIFICADO: Adicionamos o onClick ---
          <div key={dateString} className={classeCSS} onClick={handleClick}>
            <span>{date.getDate()}</span>
            
            <div className="dia-celula-atividades">
              {atividadesDoDia.slice(0, 3).map(atv => (
                <span key={atv.id} className="dia-celula-atv">
                  {atv.titulo}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MesGrid;