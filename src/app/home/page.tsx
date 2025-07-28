"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200, description: 'Restaurant Name' },
    { field: 'full_address', headerName: 'Address', width: 300, description: 'Building and Street Address' },
    { field: 'cuisine', headerName: 'Cuisine', width: 200, description: 'Cuisine offered' },
    { field: 'avg_grade', headerName: 'Grade', width: 90, description: 'Average grade based on most recent reviews', type: 'number' }
];

const paginationModel = { page: 0, pageSize: 10 };

export default function Home() {
    const [pageNumber, setPageNumber] = useState(0);
    const [limit, setLimit] = useState(10);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [grades, setGrades] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/grades")
            .then(response => response.json())
            .then((data) => setGrades(data))
            .catch((err) => console.log(err))

        fetch("http://localhost:8000/restaurants")
            .then(response => response.json())
            .then((data) => setRestaurants(data))
            .catch((err) => console.log(err))
    }, []);

    function handleGradeSelect(event: SelectChangeEvent) {
        setSelectedGrade(event.target.value as string);
    }

    return (
        <div>
            <TextField id="pageNumber" label="Page Number" variant="outlined" />
            <TextField id="limit" label="Number of Restaurants" variant="outlined" />
            <InputLabel id="select-grade-label">Grade</InputLabel>
            <Select
                labelId="select-grade-label"
                id="select-grade"
                label="Grade"
                onChange={handleGradeSelect}
            >
                {grades.map((grade: string, index: number) => <MenuItem value={grade}>{grade}</MenuItem>)}
            </Select>
            <Paper sx={{ height: 400, width: '60%' }}>
                <DataGrid
                    rows={restaurants}
                    getRowId={(restaurant) => restaurant._id}
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
        </div>
    );
}