import React from 'react';
import Loading from '../Loading/Loading';

const WithLoading = Component => ({ isLoading, ...props }) => {
  return isLoading ? <Loading /> : <Component {...props} />;
};

export default WithLoading;
