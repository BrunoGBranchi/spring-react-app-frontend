import React, { useState } from "react";
import { Button, FormControl, Box, Input, InputLabel, NativeSelect } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NovoUsuario = () => {
    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [perfis, setPerfis] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    //const token = localStorage.getItem('token');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const handleCreateUser =  async (event) => {
        event.preventDefault();
        console.log(`Bearer ${token}`);
        const response = await fetch('/usuarios/novo', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
          body: JSON.stringify({ nome, login, senha, email, perfis })
        });
        if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('message', data.message);
            navigate('/usuarios');
        }
        
      };
    
    return (


        <div>
            <div>
            <h2>Criar novo usuário</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleCreateUser}
                >
                    <FormControl variant="standard" fullWidth >
                        <InputLabel htmlFor="component-simple">Nome</InputLabel>
                        <Input id="component-simple" defaultValue="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Login</InputLabel>
                        <Input id="component-simple" defaultValue="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input id="component-simple" defaultValue="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Senha</InputLabel>
                        <Input type="password" id="component-simple" defaultValue="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="uncontrolled-native">
                            Perfil
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            multiple
                            value={perfis} onChange={(e) => setPerfis(e.target.value)}
                        >
                            <option value={{ nome: 'Administrador', nivel: 1 }}>Administrador</option>
                            <option value={{ nome: 'Usuário', nivel: 2 }}>Usuário</option>
                        </NativeSelect>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Criar usuário
                    </Button>
                </Box>
            </div>
        </div>
    );
};

export default NovoUsuario;