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
import { Delete } from '@mui/icons-material';
const UsersListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
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
    }, []);

    async function handleDelete(id) {
        if (window.confirm('Deseja realmente excluir o usuário?')) {
            try {
                await fetch('/users/${id}', {
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
                    <Link to="/users/create">Criar Usuário</Link>
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
