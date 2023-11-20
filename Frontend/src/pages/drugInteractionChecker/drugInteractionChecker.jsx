import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './drugInteractionChecker.css';

const columnsA = [
  { field: 'name', headerName: 'Drug A', width: 200 }
];
const columnsB = [
  { field: 'name', headerName: 'Drug B', width: 200 }
];

const DrugInteractionChecker = () => {

  const [medications, setMedications] = useState([]);
  const [medicationInteraction, setMedicationInteraction] = useState([]);
  const [rowSelectionAModel, setRowSelectionAModel] = useState([]);
  const [rowSelectionBModel, setRowSelectionBModel] = useState([]);
  const [medicineSelectedA, setMedicineSelectedA] = useState([]);
  const [medicineSelectedB, setMedicineSelectedB] = useState([]);
  const [isCompare, setIsCompare] = useState([]);
  
  useEffect(() => {
    //replace with fetching medications from the backend
    setMedications([
      { id: 1, name: 'MedicineA' },
      { id: 2, name: 'MedicineB' },
      { id: 3, name: 'MedicineC' },
      { id: 4, name: 'MedicineD' },
      { id: 5, name: 'MedicineE' },
      { id: 6, name: 'MedicineF' },
      { id: 7, name: 'MedicineG' },
      { id: 8, name: 'MedicineH' },
      { id: 9, name: 'MedicineI' }
    ]);
  }, []);

  const onCompare = (drugAId, drugBId) => {
    
    if (drugAId === undefined || drugBId === undefined || drugAId === drugBId) {
      setIsCompare(false);
    }
    else {
      setIsCompare(true);
      setMedicineSelectedA(medications.find((item) => item.id === drugAId).name);
      setMedicineSelectedB(medications.find((item) => item.id === drugBId).name);
      //replace with fetching interaction from the backend, using medication selection A and B as inputs
      setMedicationInteraction("Text explaining the interaction between " + medications.find((item) => item.id === drugAId).name + " and " + medications.find((item) => item.id === drugBId).name + ".\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    }
  }

  const CompareSection = () => {
    if (isCompare.length === 0 || !isCompare) {
      return <Paper elevation={1} className='image'/>;
    }
    else {
      return (
        <div className='compareContainer'>
          <h1 className='subHeaderText'>{medicineSelectedA}</h1>
          <h1 className='subHeaderText'>{medicineSelectedB}</h1>
          <span>Conflicts:</span>
          <p>{medicationInteraction}</p>
        </div>
      );
    }
  }

  return (
    <Grid container spacing={8} className='pharma-container'>
      <Grid item lg={8} className='content'>
          <div className='text-container'>
            <h1 className="header-text">Drug interaction checker</h1>
          </div>
          <Grid container spacing={8} className='pharma-container'>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 400 }}>
                <DataGrid
                  style={{ border: 'none' }}
                  sx={{
                    '.MuiDataGrid-row.Mui-selected': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-row.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 0.08)'
                    },
                    '.MuiDataGrid-row.Mui-selected.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '.MuiDataGrid-main': {
                        fontFamily: 'Montserrat'
                    },
                    '.MuiDataGrid-columnHeaders': {
                        fontWeight: '500',
                        fontSize: '1.2em',
                        color: '#7B9B69'
                    }
                  }}
                  rows={medications}
                  columns={columnsA}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'desc' }],
                    },
                  }}
                  disableColumnFilter
                  disableColumnMenu
                  hideFooter
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionAModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionAModel}
                />
              </div>
            </Grid>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 400, }}>
                <DataGrid
                  style={{ border: 'none' }}
                  sx={{
                    '.MuiDataGrid-row.Mui-selected': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-row.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 0.08)'
                    },
                    '.MuiDataGrid-row.Mui-selected.Mui-hovered': {
                      backgroundColor: 'rgba(123, 155, 105, 1)',
                      color: '#FFF'
                    },
                    '.MuiDataGrid-columnSeparator': {
                        display: 'none'
                    },
                    '.MuiDataGrid-main': {
                        fontFamily: 'Montserrat'
                    },
                    '.MuiDataGrid-columnHeaders': {
                        fontWeight: '500',
                        fontSize: '1.2em',
                        color: '#7B9B69'
                    }
                  }}
                  rows={medications}
                  columns={columnsB}
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'name', sort: 'desc' }],
                    },
                  }}
                  disableColumnFilter
                  disableColumnMenu
                  hideFooter
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionBModel(newRowSelectionModel);
                  }}
                  rowSelectionModel={rowSelectionBModel}
                />
              </div>
            </Grid>
          </Grid>
          <Button onClick={() => onCompare(rowSelectionAModel[0], rowSelectionBModel[0])} id='compareButton'>
            Compare
          </Button>
      </Grid>
      <Grid item lg={4} className='image-container'>
        <CompareSection/>
      </Grid>
    </Grid>
  );
}

export default DrugInteractionChecker;
