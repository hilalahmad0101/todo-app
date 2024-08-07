import React from 'react';
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import image1 from '../assets/Image1.png';
import image2 from '../assets/Image2.png';
const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Interior Design
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Step into a world where the art of Interior Design is meticulously crafted to bring together timeless elegance and cutting-edge modern innovation, allowing you to transform your living spaces into the epitome of luxury and sophistication.
        </Typography>
        {/* <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Start Project
        </Button> */}
      </Box>

      {/* <Grid container spacing={4} sx={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" component="p">
            400+
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Project Complete
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" component="p">
            600+
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Satisfied Clients
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h4" component="p">
            100+
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Unique Styles
          </Typography>
        </Grid>
      </Grid> */}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <img src={image1} alt="Interior 1" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={image2} alt="Interior 2" style={{ width: '100%' }} />
        </Grid>
      </Grid>

      {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" color="secondary">
          <Typography variant="h4">↓</Typography>
        </Button>
      </Box> */}
    </Container>
  );
};

export default HomePage;
