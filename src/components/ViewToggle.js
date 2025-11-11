import React from 'react';

function ViewToggle({ viewAtual, onViewChange }) {
  return (
    <div className="view-toggle">
      <button 
        className={`toggle-btn ${viewAtual === 'semanal' ? 'active' : ''}`}
        onClick={() => onViewChange('semanal')}
      >
        Semana
      </button>
      <button 
        className={`toggle-btn ${viewAtual === 'mensal' ? 'active' : ''}`}
        onClick={() => onViewChange('mensal')}
      >
        Mês
      </button>
    </div>
  );
}

export default ViewToggle;