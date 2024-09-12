import Image from 'next/image';
import React from 'react';

const Avatar = () => {
  return (
    <Image
      src='/avatar.png'
      alt=''
      width={26}
      height={26}
      className='rounded-full select-none'
    />
  )
}

export default Avatar;