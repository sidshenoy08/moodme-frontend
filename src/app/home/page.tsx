"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200, description: 'Restaurant Name' },
    { field: 'address', headerName: 'Address', width: 300, description: 'Building and Street Address' },
    { field: 'cuisine', headerName: 'Cuisine', width: 200, description: 'Cuisine offered' },
    { field: 'grade', headerName: 'Grade', width: 90, description: 'Average grade based on most recent reviews', type: 'number' }
];

const rows = [
    { id: 1, name: 'Riviera Caterer', address: '2780 Stillwell Avenue', cuisine: 'American', grade: 'A' },
    { id: 2, name: 'Riviera Caterer', address: '2780 Stillwell Avenue', cuisine: 'American', grade: 'A' },
    { id: 3, name: 'Riviera Caterer', address: '2780 Stillwell Avenue', cuisine: 'American', grade: 'A' }
];

const paginationModel = { page: 0, pageSize: 10 };

export default function Home() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/restaurants")
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <Paper sx={{ height: 400, width: '60%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{
                    border: 0,
                    '& .MuiDataGrid-columnHeaderTitle': { // Target the title element within the header
                        fontWeight: 'bold',
                    }
                }}
            />
        </Paper>
    );
}