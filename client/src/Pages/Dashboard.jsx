import React, { useState } from 'react';
import DataTable from "../Components/DataTable";


const Dashboard = () => {




  return (
    <div className='bg-slate-50 min-h-screen'>
       
          <section>
            <div className='h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16 pb-10'>
              <div className='flex flex-col lg:flex-col items-center py-20 gap-4'>
                <h2 className='relative w-fit text-center tracking-tight items-center justify-center font-bold text-4xl md:text-5xl text-gray-900 !leading-tight mt-2'>
                  Welcome to <span className='text-green-500'>the Your</span> Space!
                </h2>
                <p className='text-gray-600 text-2xl md:text-3xl'>Fill the form to add new Event</p>
              </div>
            </div>
          </section>
          <section className='bg-slate-100'>
            <div className='h-full mx-auto py-10 max-w-screen-xl px-2.5 md:px-20'>
              <DataTable />
            </div>
          </section>
        
    </div>
  );
}

export default Dashboard;
