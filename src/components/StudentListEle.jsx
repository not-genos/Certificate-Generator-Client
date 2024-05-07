import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CertificateRow from './CertificateRow';
import GenerateCertificateDialog from './GenerateCertificateDialog';
import { useState } from 'react';

const StudentListEle = ({ student, refreshStudents }) => {
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);

  return (
    <>
      <Box pt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls='panel2-content'
            id='panel2-header'
          >
            <Box display='flex' alignItems='center' width='100%'>
              <Typography>Name: </Typography>
              <Typography fontWeight='600' pl={1}>
                {student.name}
              </Typography>
              <Typography pl={4}>Email: </Typography>
              <Typography fontWeight='600' pl={1}>
                {student.email}
              </Typography>
              <Typography ml='auto'>
                <Button>View Certificates</Button>
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {student.certificates && student.certificates.length > 0 ? (
              student.certificates.map((certificate) => (
                <CertificateRow
                  key={certificate._id}
                  certificate={certificate}
                />
              ))
            ) : (
              <Typography align='center'>No Certificates found</Typography>
            )}
            <Button
              sx={{
                marginTop: 1,
              }}
              variant='contained'
              color='success'
              disableElevation
              onClick={() => setOpenGenerateDialog(true)}
            >
              Generate New Certificate
            </Button>
          </AccordionDetails>
        </Accordion>
      </Box>
      <GenerateCertificateDialog
        open={openGenerateDialog}
        handleClose={() => setOpenGenerateDialog(false)}
        refreshStudents={refreshStudents}
        student_email={student.email}
      />
    </>
  );
};

StudentListEle.propTypes = {
  student: PropTypes.object.isRequired,
  refreshStudents: PropTypes.func.isRequired,
};

export default StudentListEle;
