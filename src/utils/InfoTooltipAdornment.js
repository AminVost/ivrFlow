import React from 'react';
import { Tooltip, IconButton, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const InfoTooltipAdornment = ({ tooltipText }) => (
  <InputAdornment position="end">
    <Tooltip title={tooltipText}>
      <IconButton>
        {/* <InfoIcon /> */}
        <InfoIcon sx={{ color: '#ffffff26' }} />
      </IconButton>
    </Tooltip>
  </InputAdornment>
);

export default InfoTooltipAdornment;
