import React, { useState } from 'react';
import { dadosIniciais } from '../data/mockDados';
import { frasesMotivacionais } from '../data/frases';
import Dia from './Dia';
import ModalParabens from './ModalParabens';

// Definimos os dias da semana
const DIAS_DA_SEMANA = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

function Planner() {
  // O "Estado" (nosso array em memória)
  const [atividades, setAtividades] = useState(dadosIniciais);
  
  // Estado para o Modal
  const [modalVisivel, setModalVisivel] = useState(false);
  const [fraseModal, setFraseModal] = useState('');

  // --- Funções de CRUD ---

  // Função para marcar/desmarcar (UPDATE)
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

  // Função para DELETAR
  const handleDeletarAtividade = (id) => {
    setAtividades(atividades.filter(atv => atv.id !== id));
  };

  // Função para CRIAR
  const handleCriarAtividade = (dia, titulo) => {
    const novaAtividade = {
      id: Date.now(), 
      dia: dia,
      titulo: titulo,
      concluida: false
    };
    setAtividades([...atividades, novaAtividade]);
  };

  // --- Renderização ---

  return (
    <div className="planner-container">
      {/* ATUALIZADO AQUI (pode manter os emojis se quiser) */}
      <h1 className="planner-titulo">🌸 Projeto N3 🌸</h1>
      
      {/* A visualização (READ) */}
      <div className="semana-grid">
        {DIAS_DA_SEMANA.map(dia => {
          const atividadesDoDia = atividades.filter(atv => atv.dia === dia);
          
          return (
            <Dia 
              key={dia} 
              nomeDia={dia} 
              atividades={atividadesDoDia}
              onToggle={handleToggleConcluida}
              onDelete={handleDeletarAtividade}
              onCreate={handleCriarAtividade}
            />
          );
        })}
      </div>

      {/* O Modal */}
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