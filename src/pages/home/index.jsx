import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'nome', headerName: 'First name', width: 200}
  ];

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <DataGrid rows={users} columns={columns} />
        </div>

      )
      }
    </div>
  )


}

export default Home