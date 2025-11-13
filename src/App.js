import React, { useState, useEffect } from 'react';
import Planner from './components/Planner';
import IconeUsuario from './components/IconeUsuario'; // Vamos criar
import ModalLogin from './components/ModalLogin'; // Vamos criar
import './index.css'; 

// Nossas chaves do Storage
const CHAVE_SESSAO = 'n3:sessao';

function App() {
  // Estado para saber se o modal está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para saber QUEM está logado
  const [currentUser, setCurrentUser] = useState(null);

  // Efeito que roda UMA VEZ ao carregar o app
  useEffect(() => {
    // Tenta buscar uma sessão salva no localStorage
    const sessaoSalva = localStorage.getItem(CHAVE_SESSAO);
    if (sessaoSalva) {
      setCurrentUser(JSON.parse(sessaoSalva));
    }
  }, []); // O array vazio [] garante que isso só rode na inicialização

  // --- Funções de Autenticação ---

  // Chamada quando o login/cadastro é bem-sucedido
  const handleLoginSuccess = (usuario) => {
    setCurrentUser(usuario);
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario)); // Salva a sessão
    setIsModalOpen(false); // Fecha o modal
  };

  // Chamada para fazer logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(CHAVE_SESSAO); // Remove a sessão
  };

  return (
    <div className="App">
      
      {/* O Ícone de Usuário (Canto superior direito) */}
      <IconeUsuario 
        usuario={currentUser}
        onIconClick={() => setIsModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      {/* O nosso planner (agora pode saber quem está logado) */}
      <Planner usuarioLogado={currentUser} />

      {/* O Modal (só aparece se isModalOpen for true) */}
      {isModalOpen && (
        <ModalLogin 
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;