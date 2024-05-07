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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const GenerateCertificateDialog = ({
  open,
  handleClose,
  refreshStudents,
  student_email,
}) => {
  console.log({ student_email });
  const handleSubmit = async (name, course, date, certificate_id) => {
    await axios.post('/api/generate-certificate', {
      name,
      email: student_email,
      course,
      date,
      certificate_id,
    });

    refreshStudents();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { name, course, date, certificate_id } = formJson;
            console.log({ formJson });
            handleSubmit(name, course, date, certificate_id);
            await handleClose();
          },
        }}
      >
        <DialogTitle>Generate Certificate</DialogTitle>
        <DialogContent>
          <Box display='flex' flexDirection='column' gap={4}>
            <Box display='flex' gap={3}>
              <TextField
                autoFocus
                required
                margin='dense'
                id='name'
                name='name'
                label='Name to Print'
                type='text'
                variant='outlined'
              />
              <TextField
                autoFocus
                required
                margin='dense'
                id='course'
                name='course'
                label='Course'
                type='text'
                variant='outlined'
              />
            </Box>
            <Box display='flex' gap={3}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  autoFocus
                  required
                  margin='dense'
                  id='date'
                  name='date'
                  label='Date of Course Completion'
                  type='text'
                />
              </LocalizationProvider>
              <TextField
                autoFocus
                required
                margin='dense'
                id='date'
                name='certificate_id'
                label='Certificate ID'
                type='text'
                variant='outlined'
              />
            </Box>
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

GenerateCertificateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  student_email: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  refreshStudents: PropTypes.func.isRequired,
};

export default GenerateCertificateDialog;
