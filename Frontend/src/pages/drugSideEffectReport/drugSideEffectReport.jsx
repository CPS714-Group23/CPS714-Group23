import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import './drugSideEffectReport.css';

const columnsA = [
  { field: 'drug_name', headerName: 'Medicine Name', width: 200 }
];

const DrugInteractionChecker = () => {

  const [medications, setMedications] = useState([]);
  const [MedicationCommonUses, setMedicationCommonUses] = useState([]);
  const [MedicationSideEffects, setMedicationSideEffects] = useState([]);
  const [rowSelectionAModel, setRowSelectionAModel] = useState([]);
  const [medicineSelectedA, setMedicineSelectedA] = useState([]);
  const [isCompare, setIsSelected] = useState([]);
  

  useEffect(() => {
    fetch('/side-effect-reporting', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Server Error');
      }
      return response.json();
    })
    .then(data => setMedications(data))
    .catch(error => console.error('Error fetching drug interaction data:', error));
}, []);

  const onCompare = async (drugAId) => {
    
    if (drugAId === undefined) {
      setIsSelected(false);
    }
    else {
      setIsSelected(true);
      setMedicineSelectedA(medications.find((item) => item.id === drugAId).name);
      //replace with fetching interaction from the backend, using medication selection A as inputs
      setMedicationCommonUses("Text explaining the Common Uses of " + medicineSelectedA + ".\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
      setMedicationSideEffects("Text explaining the Side Effects of " + medicineSelectedA + ".\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");

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
          <span>Common Uses:</span>
          <p>{MedicationCommonUses}</p>
          <span>Side Effects:</span>
          <p>{MedicationSideEffects}</p>
        </div>
      );
    }
  }

  return (
    <Grid container spacing={8} className='pharma-container'>
      <Grid item lg={12} className='content'>
          <div className='text-container'>
            <h1 className="header-text">Side Effect Reporting</h1>
          </div>
          <Grid container spacing={8} className='pharma-container'>
            <Grid item lg={6} className='image-container'>
              <div style={{ height: 600 }}>
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
                    onCompare(newRowSelectionModel[0])
                  }}
                  rowSelectionModel={rowSelectionAModel}
                />
              </div>
            </Grid>
            <Grid item lg={6} className='image-container'>
              <CompareSection/>
            </Grid>
          </Grid>
      </Grid>

    </Grid>
  );
}

export default DrugInteractionChecker;
