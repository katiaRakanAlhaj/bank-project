import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../../assets/images/logo1.png';

const MetaHelmet = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={logo} type="image/png" />
    </Helmet>
  );
};

export default MetaHelmet;