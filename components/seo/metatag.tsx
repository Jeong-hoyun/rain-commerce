import React from 'react'

export default function metatag({keywords,site_name,url,title,description,image,canonical}) {
  return (
    <>
<meta name="keywords" content={keywords}/>
<meta property="og:locale" content={``}/>
<meta property="og:site_name" content={site_name}/>
<meta property="og:url" content={url}/>
<meta property="og:type" content={`website`}/>
<meta property="og:title" content={title}/>
<meta property="og:description" content={description}/>
<meta property="og:image" content={image}/>
<meta name="twitter:title" content={title}/>
<meta name="twitter:description" content={description}/>
<meta name="twitter:image" content={image}/>
<link rel="canonical" href={canonical}/>
    </>
  )
}
