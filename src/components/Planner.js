import React, { useState, useEffect } from 'react';
import { dadosIniciais } from '../data/mockDados';
import { frasesMotivacionais } from '../data/frases';
import Dia from './Dia'; // Reutilizamos o Dia para a visão semanal
import ModalParabens from './ModalParabens';

// --- NOVOS COMPONENTES ---
import ViewToggle from './ViewToggle';
import MesGrid from './MesGrid'; // O novo grid do calendário mensal

const CHAVE_STORAGE = 'n3:atividades';
const DIAS_SEMANA_NOMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

// --- Função Helper (nova) para formatar o Título do Header ---
const formatarHeaderData = (data, view) => {
  const optionsMes = { month: 'long', year: 'numeric' };
  if (view === 'mensal') {
    return data.toLocaleDateString('pt-BR', optionsMes);
  }
  
  // Lógica para header da semana
  const inicioSemana = new Date(data);
  inicioSemana.setDate(data.getDate() - data.getDay()); // Início (Dom)
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6); // Fim (Sab)

  if (inicioSemana.getMonth() === fimSemana.getMonth()) {
    return `${inicioSemana.getDate()} - ${fimSemana.getDate()} de ${inicioSemana.toLocaleDateString('pt-BR', { month: 'long' })}`;
  } else {
    return `${inicioSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${fimSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
  }
};

// --- Função Helper (nova) para pegar os dias da semana ---
const getSemanaAtual = (dataBase) => {
  const semana = [];
  const hoje = new Date(dataBase);
  
  // Encontra o início da semana (Domingo = 0)
  const primeiroDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));

  for (let i = 0; i < 7; i++) {
    const dia = new Date(primeiroDia);
    dia.setDate(dia.getDate() + i);
    semana.push(dia);
  }
  return semana;
};


function Planner() {
  
  // --- ESTADO (LocalStorage) ---
  const [atividades, setAtividades] = useState(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return dadosIniciais;
  });
  
  // --- NOVOS ESTADOS ---
  const [modalVisivel, setModalVisivel] = useState(false);
  const [fraseModal, setFraseModal] = useState('');
  const [view, setView] = useState('semanal'); // 'semanal' ou 'mensal'
  const [currentDate, setCurrentDate] = useState(new Date('2025-11-10T12:00:00')); // Data base (usei a data do mock)

  // --- Salvar no LocalStorage (sem mudança) ---
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(atividades));
  }, [atividades]);

  // --- Funções CRUD (adaptadas para 'date' string) ---

  const handleToggleConcluida = (id) => {
    const atividadeAlvo = atividades.find(atv => atv.id === id);
    const vaiConcluir = !atividadeAlvo.concluida; 

    setAtividades(atividades.map(atv =>
      atv.id === id ? { ...atv, concluida: !atv.concluida } : atv
    ));

    if (vaiConcluir) {
      const fraseAleatoria = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
      setFraseModal(fraseAleatoria);
      setModalVisivel(true);
    }
  };

  const handleDeletarAtividade = (id) => {
    setAtividades(atividades.filter(atv => atv.id !== id));
  };

  // Alterado para receber 'dateString'
  const handleCriarAtividade = (dateString, titulo) => {
    const novaAtividade = {
      id: Date.now(), 
      date: dateString, // Salva como 'YYYY-MM-DD'
      titulo: titulo,
      concluida: false
    };
    setAtividades([...atividades, novaAtividade]);
  };

  // --- Funções de Navegação (NOVAS) ---
  const mudarData = (valor) => {
    const novaData = new Date(currentDate);
    if (view === 'mensal') {
      novaData.setMonth(novaData.getMonth() + valor);
    } else {
      novaData.setDate(novaData.getDate() + (valor * 7));
    }
    setCurrentDate(novaData);
  };

  // --- Renderização Principal ---
  
  // Pega os dias da semana (Domingo a Sábado)
  const diasDaSemana = getSemanaAtual(currentDate);

  return (
    <div className="planner-container">
      {/* Título (sem flor) */}
      <h1 className="planner-titulo">Projeto N3</h1>

      {/* Toggle Mês/Semana */}
      <ViewToggle viewAtual={view} onViewChange={setView} />
      
      {/* Header de Navegação */}
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={() => mudarData(-1)}>&lt;</button>
        <h2>{formatarHeaderData(currentDate, view)}</h2>
        <button className="calendar-nav-btn" onClick={() => mudarData(1)}>&gt;</button>
      </div>

      {/* Renderização Condicional (Mês ou Semana) */}
      
      {view === 'semanal' ? (
        // --- VISÃO SEMANAL (Horizontal) ---
        <div className="semana-grid">
          {diasDaSemana.map((dia, index) => {
            // Converte o obj Date para string 'YYYY-MM-DD'
            const dateString = dia.toISOString().split('T')[0];
            
            // Filtra atividades SÓ para esse dia
            const atividadesDoDia = atividades.filter(atv => atv.date === dateString);
            
            return (
              <Dia 
                key={dateString} 
                date={dia} // Passa o objeto Date completo
                atividades={atividadesDoDia}
                onToggle={handleToggleConcluida}
                onDelete={handleDeletarAtividade}
                onCreate={handleCriarAtividade}
              />
            );
          })}
        </div>
      ) : (
        // --- VISÃO MENSAL (Nova) ---
        <MesGrid 
          dataBase={currentDate} 
          atividades={atividades} 
          diasNomes={DIAS_SEMANA_NOMES}
        />
      )}

      {/* Modal (sem mudança) */}
      {modalVisivel && (
        <ModalParabens 
          frase={fraseModal}
          onClose={() => setModalVisivel(false)} 
        />
      )}
    </div>
  );
}

export default Planner;