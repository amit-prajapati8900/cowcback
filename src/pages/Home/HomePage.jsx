import React from 'react';
import Hero from './Hero';
import { Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      <Hero />
    </Box>
  );
}