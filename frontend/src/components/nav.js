import { Box, Typography, InputBase, Paper, IconButton, Avatar } from '@mui/material';
import { IoMdNotificationsOutline } from 'react-icons/io';

export default function nav({ info ,search,setSearch }) {
  return (
    <Box sx={{ width: '100%', py: 1, m: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '97%', mx: 'auto' }}>
        
        {/* Left Side - Info Text */}
        <Typography variant="h4" sx={{ color: 'rgb(23 37 84)', fontWeight: 600, py: 1 }}>
          {info}
        </Typography>

        {/* Right Side - Profile + Search + Notification */}
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            backgroundColor: '#fff',
            p: 1,
            borderRadius: '9999px',
          }}
        >
          {/* Search Input */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '24px',
              height: '40px',
              px: 1,
              backgroundColor: '#F4F7FE',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              style={{ height: 16, width: 16, opacity: 0.7 }}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <InputBase
              placeholder="Search"
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
              value={search || ""} onChange={(e)=>setSearch(e.target.value)}
            />
          </Paper>

          {/* Notification Icon */}
          <IconButton>
            <IoMdNotificationsOutline style={{ fontSize: 24, color: '#2563eb' }} />
          </IconButton>

          {/* Avatar */}
          <Avatar
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            sx={{ width: 40, height: 40 }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
