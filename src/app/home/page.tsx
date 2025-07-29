"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React, { useEffect, useState } from 'react';

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200, description: 'Restaurant Name' },
    { field: 'full_address', headerName: 'Address', width: 300, description: 'Building and Street Address' },
    { field: 'cuisine', headerName: 'Cuisine', width: 200, description: 'Cuisine offered' },
    { field: 'avg_grade', headerName: 'Grade', width: 90, description: 'Average grade based on most recent reviews', type: 'number' }
];

const paginationModel = { page: 0, pageSize: 10 };

export default function Home() {
    const [pageNumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(10);
    const [restaurantName, setRestaurantName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [address, setAddress] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8000/grades")
    //         .then(response => response.json())
    //         .then((data) => setGrades(data))
    //         .catch((err) => console.log(err))
    // }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/restaurants?page_number=${pageNumber}&limit=${limit}&restaurant_name=${restaurantName}&address=${address}&cuisine=${cuisine}`)
            .then(response => response.json())
            .then((data) => setRestaurants(data))
            .catch((err) => console.log(err))
    }, [pageNumber, limit, restaurantName, address, cuisine]);

    function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
        let pno: number = parseInt(event.target.value, 10);
        if (!isNaN(pno)) {
            setPageNumber(pno);
        } else {
            setPageNumber(1);
        }
    }

    function handleLimitChange(event: React.ChangeEvent<HTMLInputElement>) {
        let lim: number = parseInt(event.target.value, 10);
        if (!isNaN(lim)) {
            setLimit(lim);
        } else {
            setLimit(10);
        }
    }

    function handleRestaurantNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRestaurantName(event.target.value as string);
    }

    function handleCuisineChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCuisine(event.target.value as string);
    }

    function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAddress(event.target.value as string);
    }

    // function handleGradeSelect(event: SelectChangeEvent) {
    //     setSelectedGrade(event.target.value as string);
    // }

    return (
        <div>
            <TextField id="pageNumber" label="Page Number" variant="outlined" onChange={handlePageChange} />
            <TextField id="limit" label="Number of Restaurants" variant="outlined" onChange={handleLimitChange} />
            <TextField id="restaurantName" label="Restaurant Name" variant="outlined" onChange={handleRestaurantNameChange} />
            <TextField id="address" label="Address" variant="outlined" onChange={handleAddressChange} />
            <TextField id="cuisine" label="Cuisine" variant="outlined" onChange={handleCuisineChange} />
            {/* <InputLabel id="select-grade-label">Grade</InputLabel>
            <Select
                labelId="select-grade-label"
                id="select-grade"
                label="Grade"
                value={selectedGrade}
                onChange={handleGradeSelect}
            >
                {grades.map((grade: string, index: number) => <MenuItem value={grade}>{grade}</MenuItem>)}
            </Select> */}
            <Paper sx={{ height: 400, width: '60%' }}>
                <DataGrid
                    rows={restaurants}
                    getRowId={(restaurant) => restaurant._id}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 50, 100]}
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