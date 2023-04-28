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
import FloatingAlert from '../../component/floatingAlert';
import Cookies from 'js-cookie';
const UsersListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('');
    const token = Cookies.get('token');
    useEffect(() => {
        const savedMessage = localStorage.getItem('message');
        if (savedMessage) {
            setMessage(savedMessage);
            setOpen(true);
            localStorage.removeItem('message'); // remova a mensagem após ser exibida
        }
        async function loadUsers() {
            const response = await fetch('/usuarios', {
                headers: {
                    method: 'GET',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setUsers(data);
        }
        loadUsers();
        setIsLoading(false);
    }, [token]);

    async function handleDelete(id) {
        if (window.confirm('Deseja realmente excluir o usuário?')) {
            try {
                await fetch(`/users/${id}`, {
                    headers: {
                        method: 'DELETE',
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(users.filter((user) => user.id !== id));
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
                    <h2>Listagem de Usuários</h2>
                    <Link to="/usuarios/novo">
                        <Button color='success' variant="outlined">Criar Usuário</Button>
                    </Link>                   
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>

                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.nome}
                                        </TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(user.id)}
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

export default UsersListPage;
