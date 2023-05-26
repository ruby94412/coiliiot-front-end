import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import {
  antEmptyImg1,
  antEmptyImg2,
  antEmptyImg3,
  antEmptyImg4,
  antEmptyImg5,
} from 'components/common/pathConstants';
import messages from 'hocs/Locale/Messages/common/NoRowsOverlay';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d={antEmptyImg1}
            />
            <path
              className="ant-empty-img-2"
              d={antEmptyImg2}
            />
            <path
              className="ant-empty-img-3"
              d={antEmptyImg3}
            />
          </g>
          <path
            className="ant-empty-img-3"
            d={antEmptyImg4}
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d={antEmptyImg5} />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}><FormattedMessage {...messages.message} /></Box>
    </StyledGridOverlay>
  );
}

export default CustomNoRowsOverlay;
