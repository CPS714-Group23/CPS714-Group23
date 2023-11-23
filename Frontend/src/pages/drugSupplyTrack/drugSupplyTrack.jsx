import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { CiPillsBottle1 } from 'react-icons/ci';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './drugSupplyTrack.css';

const DrugSupplyTracker = () => {
  const [medications, setMedications] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');

    fetch(`/drug_supply_tracker/${storedUserId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server Error');
        }
        return response.json();
      })
      .then(data => setMedications(data))
      .catch(error => console.error('Error fetching drug tracker data:', error));
  }, []);

  const handleExpandCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div>
      <div className="green__tile"></div>
      <Typography variant="h4" style={{ color: '#7B9B69', fontWeight: 'bold', marginBottom: '20px', fontFamily: 'Times New Roman, serif' }}>
        Drug Supply Tracker
      </Typography>
      {medications.map((medication, index) => (
        <div key={medication.id} style={{ display: 'flex', marginBottom: '10px' }}>
          <Card
            style={{
              borderRadius: '50px',
              backgroundColor: index === 0 ? '#7B9B69' : 'white',
              color: index === 0 ? 'white' : '#7B9B69',
              fontFamily: 'Times New Roman, serif',
              transform: 'scale(0.9)',
              width: '450px',
              marginRight: '10px',
              position: 'relative',
            }}
          >
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: index === 0 ? '#7B9B69' : 'white',
                    borderRadius: '50%',
                    padding: '0px',
                  }}
                >
                  <CiPillsBottle1
                    size={90}
                    color={index === 0 ? 'white' : '#7B9B69'}
                    style={{
                      backgroundColor: index === 0 ? '#7B9B69' : 'white',
                      borderRadius: '50%',
                      padding: '8px',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6">{medication.title}</Typography>
                  <Typography variant="body1" style={{ wordSpacing: '2em' }}>
                    Strength   Dose    Duration
                  </Typography>
                  <Typography variant="body1" style={{ wordSpacing: '2em' }}>
                    {medication.drug_strength} {' '}
                    <span style={{ marginLeft: '10px' }}>{medication.dose}</span> {' '}
                    {medication.duration}
                    <span style={{ marginLeft: '10px' }}>
                      {medication.duration === '1' ? 'week' : 'weeks'}
                    </span>{' '}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  margin: '9px 0',
                }}
              >
                <div style={{ flex: '1' }} />
                <div style={{ padding: '0', margin: '9px 0', position: 'absolute', right: '20px' }}>
                  <IconButton
                    style={{ padding: '0', margin: '0' }}
                    onClick={() => handleExpandCard(index)}
                    aria-expanded={expandedCard === index}
                  >
                    <ArrowForwardIcon style={{ fontSize: '30px', color: index === 0 ? 'white' : '#7B9B69' }} />
                  </IconButton>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginRight: '10px' }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginLeft: '38px' }}>{medication.consumed}</Typography>
                  <Typography variant="body1" style={{ marginLeft: '80px' }}>Consumed</Typography>
                </div>
                <div style={{ width: '2px', height: '50px', backgroundColor: index === 0 ? 'white' : '#7B9B69' }} />
                <div style={{ textAlign: 'center', marginLeft: '10px' }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginRight: '140px' }}>{medication.remaining}</Typography>
                  <Typography variant="body1" style={{ marginRight: '100px' }}>Remaining</Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Collapse in={expandedCard === index}>
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    borderRadius: '50%',
                    padding: '8px',
                  }}
                >
                  <CiPillsBottle1
                    size={90}
                    color="#7B9B69"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: '8px',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="h6">{medication.title}</Typography>
                  <Typography variant="body1" style={{ wordSpacing: '2em', color: '#acacac' }}>
                    Strength   Dose    Duration
                  </Typography>
                  <Typography variant="body1" style={{ wordSpacing: '2em' }}>
                    {medication.drug_strength} {' '}
                    <span style={{ marginLeft: '10px' }}>{medication.dose}</span> {' '}
                    {medication.duration}
                    <span style={{ marginLeft: '10px' }}>
                      {medication.duration === '1' ? 'week' : 'weeks'}
                    </span>{' '}
                  </Typography>
                  <Typography variant="body1" color={'#acacac'}>
                    Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Date
                  </Typography>
                  <Typography variant="body1">{new Date(medication.start_recur).toLocaleDateString('en-CA')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{new Date(medication.end_recur).toLocaleDateString('en-CA')}</Typography>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  margin: '10px 0',
                }}
              >
                <div style={{ flex: '1', backgroundColor: 'white', height: '1px' }} />
                <div style={{ padding: '0', margin: '9px 0', position: 'absolute', right: '20px' }}>
                  <IconButton
                    style={{ padding: '0', margin: '0' }}
                    onClick={() => handleExpandCard(index)}
                    aria-expanded={expandedCard === index}
                  >
                    <ArrowForwardIcon style={{ fontSize: '30px', color: '#7B9B69' }} />
                  </IconButton>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginRight: '45px' }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginLeft: '50px' }}>{medication.consumed}</Typography>
                  <Typography variant="body1" style={{ marginLeft: '90px', color: '#acacac' }}>Consumed</Typography>
                </div>
                <div style={{ width: '2px', height: '50px', backgroundColor: '#7B9B69' }} />
                <div style={{ textAlign: 'center', marginLeft: '50px' }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginRight: '140px' }}>{medication.remaining}</Typography>
                  <Typography variant="body1" style={{ marginRight: '100px', color: '#acacac' }}>Remaining</Typography>
                </div>
              </div>
            </CardContent>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default DrugSupplyTracker;