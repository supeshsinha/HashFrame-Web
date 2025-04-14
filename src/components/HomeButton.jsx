import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const HomeButton = ({handler}) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="outlined" startIcon={<HomeIcon />} onClick={handler}>
          Verify another Image.
        </Button>
    </Stack>
  )
}

export default HomeButton