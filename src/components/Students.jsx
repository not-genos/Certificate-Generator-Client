import { Box, Button, Typography } from '@mui/material';
import axios from '../axios.config';
import { useEffect, useState } from 'react';
import StudentListEle from './StudentListEle';
import RegisterStudentDialog from './RegisterStudentDialog';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStudents = async () => {
      const {
        data: { students },
      } = await axios.get('/api/students');
      if (isMounted) setStudents(students);
    };

    fetchStudents();

    () => {
      isMounted = false;
    };
  }, []);

  const refreshStudents = async () => {
    const {
      data: { students },
    } = await axios.get('/api/students');
    setStudents(students);
  };

  console.log({ students });

  const handleClosedRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <>
      <Box height='100%' pt={3} display='flex' flexDirection='column'>
        <Box flexGrow={0}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={() => setOpenRegisterDialog(true)}
          >
            Register New Student
          </Button>
        </Box>
        <Box mt={3} mb={2} p={2} borderRadius={6} boxShadow={2} flexGrow={1}>
          <Typography variant='h5'>Students</Typography>
          {students && students.length > 0 ? (
            students.map((student) => (
              <StudentListEle
                key={student._id}
                student={student}
                refreshStudents={refreshStudents}
              />
            ))
          ) : (
            <Typography align='center'>
              No Students found Please register some students
            </Typography>
          )}
        </Box>
      </Box>
      <RegisterStudentDialog
        open={openRegisterDialog}
        handleClose={handleClosedRegisterDialog}
        setStudents={setStudents}
      />
    </>
  );
};

export default Students;
