import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150' className="w-48 h-24">
        <path
          fill='none'
          stroke='black'
          strokeWidth='15'
          strokeLinecap='round'
          strokeDasharray='300 385'
          strokeDashoffset='0'
          d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'
        >
          <animate
            attributeName='stroke-dashoffset'
            calcMode='spline'
            dur='2'
            values='685;-685'
            keySplines='0 0 1 1'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    </div>
  );
};

export default Loading;
