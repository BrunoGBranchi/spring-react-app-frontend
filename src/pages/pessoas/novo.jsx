import React, { useState } from "react";
import { Button, FormControl, Box, Input, InputLabel, NativeSelect } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NovaPessoa = (props) => {
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [perfis, setPerfis] = useState([]);
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const handleCreateUser =  async (event) => {
        event.preventDefault();
        const response = await fetch('/pessoas/novo', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
          body: JSON.stringify({ descricao, tipo, senha, email, perfis })
        });
        if (response.status < 400) {
            const data = await response.json();
            props.addMessage(data.message, response.status);
            navigate('/pessoas');
        } else {
            props.addMessage(response.statusText, response.status);
            navigate('/pessoas');
        }
        
      };
    
    return (


        <div>
            <div>
            <h2>Nova Pessoa</h2>
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
                        <Input id="component-simple" defaultValue="Nome" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">Tipo</InputLabel>
                        <Input id="component-simple" defaultValue="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="component-simple">CPF/CNPJ</InputLabel>
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

export default NovaPessoa;