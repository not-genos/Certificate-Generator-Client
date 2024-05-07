import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import axios from '../axios.config';

const RegisterStudentDialog = ({ open, handleClose, setStudents }) => {
  const handleSubmit = async (name, email) => {
    const {
      data: { student },
    } = await axios.post('/api/create-student', {
      name,
      email,
    });

    setStudents((students) => [...students, student]);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { name, email } = formJson;
            handleSubmit(name, email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Register New Student</DialogTitle>
        <DialogContent>
          <Box display='flex' gap={3}>
            <TextField
              autoFocus
              required
              margin='dense'
              id='name'
              name='name'
              label='Name'
              type='text'
              variant='standard'
            />
            <TextField
              autoFocus
              required
              margin='dense'
              id='email'
              name='email'
              label='Email Address'
              type='email'
              variant='standard'
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='contained' type='submit'>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

RegisterStudentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setStudents: PropTypes.func.isRequired,
};

export default RegisterStudentDialog;
