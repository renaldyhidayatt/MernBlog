import React from 'react';
import { css } from '@emotion/react';
import RiseLoader from 'react-spinners/CircleLoader';

const LoadingComponent = () => {
  return (
    <RiseLoader
      color="red"
      loading={true}
      style={{ display: 'block', margin: '0 auto', borderColor: 'red' }}
    />
  );
};

export default LoadingComponent;
