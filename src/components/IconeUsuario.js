import React from 'react';
import './IconeUsuario.css'; // Vamos criar este CSS

function IconeUsuario({ usuario, onIconClick, onLogoutClick }) {
  
  // Se tem usuário logado...
  if (usuario) {
    return (
      <div className="icone-usuario-container logado">
        <span>Olá, {usuario.nome.split(' ')[0]}!</span>
        <button onClick={onLogoutClick} className="btn-logout">
          Sair
        </button>
      </div>
    );
  }

  // Se está deslogado...
  return (
    <div className="icone-usuario-container" onClick={onIconClick}>
      {/* Um ícone de usuário (SVG) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span>Login / Cadastro</span>
    </div>
  );
}

export default IconeUsuario;