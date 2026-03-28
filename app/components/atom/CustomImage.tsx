import React from 'react';
import NextImage from 'next/image';

const Image = ({ src, alt }: any) => {
  return (
    <div className="relative h-full w-full">
      <NextImage src={src} alt={alt} fill className="object-cover" />
    </div>
  );
};

export default Image;
