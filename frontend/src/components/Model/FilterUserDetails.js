import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FilterUserDetails = ({ filteredUser }) => {
  const [getStartYear, setGetStartYear] = useState(null); // Start year input
  const [getEndYear, setGetEndYear] = useState(null); // End year input
  const [wantEndYear, setWantEndYear] = useState(false); // Checkbox state
  const [filteredCount, setFilteredCount] = useState(0); // Count of filtered members

  const getYearlyDetails = () => {
    if (!getStartYear) {
      alert('Please enter a start year');
      return;
    }

    // Filter the users based on the year of applicationDate
    const filteredData = filteredUser?.filter((user) => {
      const applicationYear = new Date(user.applicationDate).getFullYear(); // Extract year from applicationDate
      if (wantEndYear && getEndYear) {
        // If end year is provided, filter within the range
        return applicationYear >= getStartYear && applicationYear <= getEndYear;
      } else {
        // If only start year is provided, filter for that year
        return applicationYear === parseInt(getStartYear);
      }
    });

    // Update the filtered count
    setFilteredCount(filteredData?.length || 0);
  };

  return (
    <Box>
      <TextField
        id="enterYear"
        label="Start Year*"
        multiline
        maxRows={4}
        value={getStartYear || ''}
        onChange={(e) => setGetStartYear(e.target.value)}
        size="small"
      />
      <br />
      <FormControlLabel
        control={<Checkbox />}
        label="Filter by End Year"
        onChange={() => setWantEndYear(!wantEndYear)}
      />
      <br />
      {wantEndYear && (
        <TextField
          id="EndYear"
          label="End Year*"
          multiline
          value={getEndYear || ''}
          onChange={(e) => setGetEndYear(e.target.value)}
          maxRows={4}
          size="small"
        />
      )}
      <br />
      <Button
        sx={{ backgroundColor: 'blue', color: 'white' }}
        onClick={getYearlyDetails}
      >
        Get
      </Button>
      <br />
      <p>
        {filteredCount > 0
          ? `Number of members: ${filteredCount}`
          : 'No members found for the selected year(s).'}
      </p>
    </Box>
  );
};

export default FilterUserDetails;