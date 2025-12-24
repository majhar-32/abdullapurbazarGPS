import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, image }) => {
  const siteTitle = 'Abdullapur Bazar Govt. Primary School';
  const defaultDescription = 'Welcome to Abdullapur Bazar Government Primary School. Providing quality primary education.';
  const defaultImage = '/logo.png'; // Ensure this exists in public folder

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name='description' content={description || defaultDescription} />
      
      {/* End standard metadata tags */}
      
      {/* Facebook tags */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      {/* End Facebook tags */}
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || siteTitle} />
      <meta name="twitter:card" content={type || 'summary'} />
      <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {/* End Twitter tags */}
    </Helmet>
  );
}

export default SEO;
