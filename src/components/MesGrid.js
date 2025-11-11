import React from 'react';

// Função helper para gerar os dias do mês
const gerarDiasCalendario = (dataBase) => {
  const calendario = [];
  const data = new Date(dataBase);
  const ano = data.getFullYear();
  const mes = data.getMonth();

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  
  const offsetInicio = primeiroDia.getDay(); // 0 (Dom) - 6 (Sab)
  const totalDias = ultimoDia.getDate();

  // 1. Dias do mês anterior
  for (let i = offsetInicio; i > 0; i--) {
    const dia = new Date(primeiroDia);
    dia.setDate(dia.getDate() - i);
    calendario.push({ date: dia, foraMes: true });
  }

  // 2. Dias do mês atual
  for (let i = 1; i <= totalDias; i++) {
    const dia = new Date(ano, mes, i);
    calendario.push({ date: dia, foraMes: false });
  }

  // 3. Dias do próximo mês (para completar 6 semanas = 42 dias)
  const offsetFim = 42 - calendario.length;
  for (let i = 1; i <= offsetFim; i++) {
    const dia = new Date(ultimoDia);
    dia.setDate(dia.getDate() + i);
    calendario.push({ date: dia, foraMes: true });
  }

  return calendario;
};


function MesGrid({ dataBase, atividades, diasNomes }) {
  const diasDoMes = gerarDiasCalendario(dataBase);

  return (
    <div className="mes-grid">
      {/* Cabeçalho com nomes dos dias */}
      {diasNomes.map(nome => (
        <div key={nome} className="mes-header-dia">{nome}</div>
      ))}

      {/* Células dos dias */}
      {diasDoMes.map(({ date, foraMes }) => {
        const dateString = date.toISOString().split('T')[0];
        
        // Filtra atividades SÓ para esse dia
        const atividadesDoDia = atividades.filter(atv => atv.date === dateString);
        
        const classeCSS = `dia-celula ${foraMes ? 'fora-mes' : ''}`;

        return (
          <div key={dateString} className={classeCSS}>
            <span>{date.getDate()}</span>
            
            <div className="dia-celula-atividades">
              {atividadesDoDia.slice(0, 3).map(atv => ( // Mostra no máx 3
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