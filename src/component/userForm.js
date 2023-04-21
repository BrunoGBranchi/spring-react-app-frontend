import React, { useState } from 'react';

const UserForm = ({ user, onSubmit }) => {
  const [nome, setNome] = useState(user ? user.nome : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [senha, setSenha] = useState(user ? user.senha : '');
  const [perfis, setPerfis] = useState(user ? user.perfis : []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { nome, username, email, senha, perfis };
    onSubmit(userData);
  };

  const handlePerfilChange = (index, field, value) => {
    const newPerfis = [...perfis];
    newPerfis[index] = { ...newPerfis[index], [field]: value };
    setPerfis(newPerfis);
  };

  const handleAddPerfil = () => {
    setPerfis([...perfis, { nome: '', nivel: '' }]);
  };

  const handleRemovePerfil = (index) => {
    const newPerfis = [...perfis];
    newPerfis.splice(index, 1);
    setPerfis(newPerfis);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} />
      </label>
      <div>
        <label>Perfis:</label>
        <ul>
          
        </ul>
        <button type="button" onClick={handleAddPerfil}>Adicionar perfil</button>
      </div>
      <button type="submit">{user ? 'Salvar' : 'Criar'}</button>
    </form>
  );
};

export default UserForm;
