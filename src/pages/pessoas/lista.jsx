import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,

} from '@mui/material';
import Button from '@mui/material/Button';
import { Delete } from '@mui/icons-material';
import Cookies from 'js-cookie';
const ListaPessoa = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pessoas, setPessoas] = useState([]);
    const token = Cookies.get('token');
    useEffect(() => {
        const savedMessage = localStorage.getItem('message');
        if (savedMessage) {
            setMessage(savedMessage);
            setOpen(true);
            localStorage.removeItem('message'); // remova a mensagem após ser exibida
        }
        async function loadPessoas() {
            const response = await fetch('/pessoas', {
                headers: {
                    method: 'GET',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPessoas(data);
        }
        loadPessoas();
        setIsLoading(false);
    }, [token]);

    async function handleDelete(id) {
        if (window.confirm('Deseja realmente excluir essa pessoa?')) {
            try {
                await fetch(`/pessoas/${id}`, {
                    headers: {
                        method: 'DELETE',
                        Authorization: `Bearer ${token}`
                    }
                });
                setPessoas(pessoas.filter((pessoa) => pessoa.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div>
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                <div>
                    <h2>Pessoas</h2>
                    <Link to="/pessoas/novo">
                        <Button color='success' variant="outlined"sx={{ mb: 2 }}>Nova Pessoa</Button>
                    </Link>                   
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>DOC</TableCell>

                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pessoas.map((pessoa) => (
                                    <TableRow key={pessoa.id}>
                                        <TableCell component="th" scope="row">
                                            {pessoa.descricao}
                                        </TableCell>
                                        <TableCell>{pessoa.tipo}</TableCell>
                                        <TableCell>{pessoa.documento}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(pessoa.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
            }
        </div>
    );
};

export default ListaPessoa;