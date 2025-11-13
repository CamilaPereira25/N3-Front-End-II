import React, { useState, useEffect } from 'react';
import { dadosIniciais } from '../data/mockDados';
import { frasesMotivacionais } from '../data/frases';
import Dia from './Dia'; 
import ModalParabens from './ModalParabens';
import ViewToggle from './ViewToggle';
import MesGrid from './MesGrid'; 
import SugestoesTarefas from './SugestoesTarefas';

const CHAVE_STORAGE = 'n3:atividades';
const DIAS_SEMANA_NOMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

// --- Funções Helper (sem mudança) ---
const formatarHeaderData = (data, view) => {
  const optionsMes = { month: 'long', year: 'numeric' };
  if (view === 'mensal') {
    return data.toLocaleDateString('pt-BR', optionsMes);
  }
  
  const inicioSemana = new Date(data);
  inicioSemana.setDate(data.getDate() - data.getDay());
  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6); 

  if (inicioSemana.getMonth() === fimSemana.getMonth()) {
    return `${inicioSemana.getDate()} - ${fimSemana.getDate()} de ${inicioSemana.toLocaleDateString('pt-BR', { month: 'long' })}`;
  } else {
    return `${inicioSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${fimSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
  }
};

const getSemanaAtual = (dataBase) => {
  const semana = [];
  const hoje = new Date(dataBase);
  const primeiroDia = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));

  for (let i = 0; i < 7; i++) {
    const dia = new Date(primeiroDia);
    dia.setDate(dia.getDate() + i);
    semana.push(dia);
  }
  return semana;
};


function Planner() {
  
  // --- Estados (sem mudança) ---
  const [atividades, setAtividades] = useState(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return dadosIniciais;
  });
  
  const [modalVisivel, setModalVisivel] = useState(false);
  const [fraseModal, setFraseModal] = useState('');
  const [view, setView] = useState('semanal'); 
  const [currentDate, setCurrentDate] = useState(new Date()); 

  // --- Salvar no LocalStorage (sem mudança) ---
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(atividades));
  }, [atividades]);

  // --- Funções CRUD (sem mudança) ---
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

  const handleCriarAtividade = (dateString, titulo) => {
    const novaAtividade = {
      id: Date.now(), 
      date: dateString, 
      titulo: titulo,
      concluida: false
    };
    setAtividades([...atividades, novaAtividade]);
  };

  // --- Funções de Navegação (sem mudança) ---
  const mudarData = (valor) => {
    const novaData = new Date(currentDate);
    if (view === 'mensal') {
      novaData.setMonth(novaData.getMonth() + valor);
    } else {
      novaData.setDate(novaData.getDate() + (valor * 7));
    }
    setCurrentDate(novaData);
  };

  // --- Função clique mensal (sem mudança) ---
  const handleDiaClickMensal = (date) => {
    setCurrentDate(date); 
    setView('semanal'); 
  };

  // --- Função clique sugestão (sem mudança) ---
  const handleSugestaoClick = (titulo) => {
    const hoje = new Date();
    const hojeFormatado = hoje.toISOString().split('T')[0];

    const jaExiste = atividades.find(
      atv => atv.date === hojeFormatado && atv.titulo === titulo
    );

    if (!jaExiste) {
      handleCriarAtividade(hojeFormatado, titulo);
    } else {
      console.log("Tarefa já existe para hoje.");
    }
  };


  // --- Renderização Principal ---
  
  const diasDaSemana = getSemanaAtual(currentDate);

  return (
    <div className="planner-container">
      {/* ===== TEXTO ALTERADO AQUI ===== */}
      <h1 className="planner-titulo">Girl Planner</h1>

      {/* Toggle Mês/Semana (sem mudança) */}
      <ViewToggle viewAtual={view} onViewChange={setView} />
      
      {/* Header de Navegação (sem mudança) */}
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={() => mudarData(-1)}>&lt;</button>
        <h2>{formatarHeaderData(currentDate, view)}</h2>
        <button className="calendar-nav-btn" onClick={() => mudarData(1)}>&gt;</button>
      </div>

      {/* Renderização Condicional (Mês ou Semana) */}
      
      {view === 'semanal' ? (
        <> 
          <SugestoesTarefas onSugestaoClick={handleSugestaoClick} />
          
          <div className="semana-grid">
            {diasDaSemana.map((dia) => {
              const dateString = dia.toISOString().split('T')[0];
              const atividadesDoDia = atividades.filter(atv => atv.date === dateString);
              
              return (
                <Dia 
                  key={dateString} 
                  date={dia} 
                  atividades={atividadesDoDia}
                  onToggle={handleToggleConcluida}
                  onDelete={handleDeletarAtividade}
                  onCreate={handleCriarAtividade}
                />
              );
            })}
          </div>
        </>
      ) : (
        <MesGrid 
          dataBase={currentDate} 
          atividades={atividades} 
          diasNomes={DIAS_SEMANA_NOMES}
          onDiaClick={handleDiaClickMensal} 
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