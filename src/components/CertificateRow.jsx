import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

const CertificateRow = ({ certificate }) => {
  return (
    <>
      <Box display='flex' key={certificate._id} alignItems='center' my={1}>
        <Typography>Course:</Typography>
        <Typography pl={1}>{certificate.course}</Typography>
        <Typography pl={3}>Completed On:</Typography>
        <Typography pl={1}>
          {moment(certificate.date).format('DD MMM YYYY')}
        </Typography>
        <Typography pl={3}>certificate id:</Typography>
        <Typography pl={1}>{certificate.certificateId}</Typography>
        <Typography pl={3} ml='auto'>
          <a href={certificate.link} target='_blank'>
            <Button variant='contained' size='small' disableElevation>
              View
            </Button>
          </a>
        </Typography>
      </Box>
    </>
  );
};

CertificateRow.propTypes = {
  certificate: PropTypes.object.isRequired,
};

export default CertificateRow;
