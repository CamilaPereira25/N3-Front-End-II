import React, { useState } from 'react';
import './ModalLogin.css'; // Vamos criar este CSS

const CHAVE_USUARIOS = 'n3:usuarios';

function ModalLogin({ onClose, onLoginSuccess }) {
  // 'login' ou 'cadastro'
  const [view, setView] = useState('login'); 
  
  // Campos do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  
  const [error, setError] = useState(''); // Mensagem de erro

  // Traz o "banco de dados" de usuários do localStorage
  const getUsuarios = () => {
    const usuariosSalvos = localStorage.getItem(CHAVE_USUARIOS);
    return usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
  };

  // --- LÓGICA DE CADASTRO ---
  const handleCadastro = (e) => {
    e.preventDefault();
    setError(''); // Limpa erros
    
    // Validação simples
    if (!nome || !email || !dataNasc || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const usuarios = getUsuarios();

    // Verifica se o e-mail já existe
    const emailExiste = usuarios.find(u => u.email === email);
    if (emailExiste) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    // Cria o novo usuário
    const novoUsuario = { nome, email, dataNasc, senha };
    const novosUsuarios = [...usuarios, novoUsuario];
    
    // Salva o novo array no localStorage
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(novosUsuarios));

    // Avisa o App.js que o cadastro foi um sucesso
    // (O usuário já entra logado)
    onLoginSuccess({ nome: novoUsuario.nome, email: novoUsuario.email });
  };

  // --- LÓGICA DE LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Limpa erros

    if (!email || !senha) {
      setError('Por favor, preencha e-mail e senha.');
      return;
    }

    const usuarios = getUsuarios();
    
    // Procura o usuário
    const usuarioEncontrado = usuarios.find(u => u.email === email);

    // Verifica se encontrou E se a senha bate
    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
      // Sucesso!
      onLoginSuccess({ nome: usuarioEncontrado.nome, email: usuarioEncontrado.email });
    } else {
      // Falha
      setError('E-mail ou senha incorretos.');
    }
  };


  return (
    // O Overlay (fundo escuro)
    <div className="modal-login-overlay" onClick={onClose}>
      
      {/* O Pop-up (parando a propagação do clique) */}
      <div className="modal-login-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Botão de Fechar */}
        <button className="modal-login-close" onClick={onClose}>&times;</button>

        {/* --- Renderização Condicional: Login ou Cadastro --- */}
        
        {view === 'login' ? (
          // --- FORMULÁRIO DE LOGIN ---
          <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="modal-login-form">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              
              {error && <p className="modal-login-error">{error}</p>}
              
              <button type="submit" className="btn-submit">Entrar</button>
            </form>
            <p className="modal-login-switch">
              Não tem conta?{' '}
              <span onClick={() => { setView('cadastro'); setError(''); }}>
                Cadastre-se
              </span>
            </p>
          </div>

        ) : (
          // --- FORMULÁRIO DE CADASTRO ---
          <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastro} className="modal-login-form">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <label htmlFor="email-cad">E-mail</label>
              <input 
                type="email" 
                id="email-cad" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="data-nasc">Data de Nascimento</label>
              <input 
                type="date" 
                id="data-nasc" 
                value={dataNasc}
                onChange={(e) => setDataNasc(e.target.value)}
              />

              <label htmlFor="senha-cad">Senha</label>
              <input 
                type="password" 
                id="senha-cad" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              
              {error && <p className="modal-login-error">{error}</p>}

              <button type="submit" className="btn-submit">Criar Conta</button>
            </form>
            <p className="modal-login-switch">
              Já tem conta?{' '}
              <span onClick={() => { setView('login'); setError(''); }}>
                Faça Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;