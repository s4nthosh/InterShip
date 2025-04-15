import { Box } from '@mui/material';
import Graph from './Model/Graph';
import Onprogressdata from './Model/Onprogressdata';
import FilterUserDetails from './Model/FilterUserDetails';


export default function Dashboard({filteredUser}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(9, 1fr)',
        
        gap: 2,
        height: '100%' // Optional: just to give rows some height
      }}
    >
      <Box
        sx={{
          gridColumn: 'span 3',
          gridRow: 'span 4',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          borderRadius:'10px',
          justifyContent: 'center'
        }}
      >
        <Graph/>
      </Box>

      <Box
        sx={{
          gridColumn: '4 / span 2',
          gridRow: 'span 4',
          bgcolor: 'white',
          display: 'flex',
          borderRadius:'10px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Onprogressdata filteredUser={filteredUser}/>
      </Box>

      <Box
        sx={{
          gridColumn: 'span 5',
          gridRow: '5 / span 4',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          borderRadius:'10px',
          justifyContent: 'center'
        }}
      >
        <FilterUserDetails filteredUser={filteredUser}/>
      
      </Box>
    </Box>
  );
}
