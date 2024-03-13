import { ArrowBack } from '@mui/icons-material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function BackModal() {
    const navigate = useNavigate()
  return (
    <div className="flex bg-blue-200 h-[50px] w-[100px] items-center pl-2">
      <ArrowBack className='cursor-pointer' onClick={() => navigate(-1)} />
      <p className="pl-[10px]">Back</p>
    </div>
  );
}

export default BackModal