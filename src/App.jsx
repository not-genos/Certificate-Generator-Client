import { Box, Container, Typography } from '@mui/material';
import Students from './components/Students';

function App() {
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: 2,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box flexGrow={0}>
        <Typography variant='h4' align='left'>
          Generate Certificates for your students...
        </Typography>
      </Box>
      <Box flexGrow={1}>
        <Students />
      </Box>
    </Container>
  );
}

export default App;
