import ActiveLink from '@/components/ui/features/ActiveLink';
import React from 'react'

const Navlinks = () => {
  return (
    <div className='flex gap-4 font-semibold'>
      <ActiveLink href='/' text='Home'/>
      <ActiveLink href='/packages' text='About Us'/>
      <ActiveLink href='/about-us' text='Services'/>
      <ActiveLink href='/payments' text='Shop'/>
      <ActiveLink href='/payments' text='Contact Us'/>
    </div>
  )
}

export default Navlinks;