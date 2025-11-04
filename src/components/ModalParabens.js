import React from 'react';

function ModalParabens({ frase, onClose }) {
  return (
    // O Overlay escuro
    <div className="modal-overlay" onClick={onClose}>
      
      {/* O Conteúdo do Modal (stopPropagation impede de fechar ao clicar aqui) */}
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="modal-emoji" role="img" aria-label="Confete">🎉</span>
        <p className="modal-frase">{frase}</p>
        <button className="modal-btn-fechar" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalParabens;