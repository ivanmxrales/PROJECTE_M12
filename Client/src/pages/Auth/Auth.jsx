import React from 'react';
import Form from '../../components/AuthForm/Form';

const Auth = () => {
    return (
        <div className="min-h-screen flex justify-center items-center px-4">
          <div className="max-w-3xl w-full">
            <div className="flex justify-center items-center gap-10">

              <div className="hidden md:block">
                <img src='/imgs/auth.png' className="h-[650px]" alt='Phone img' />
              </div>

              <div className="flex flex-col items-stretch space-y-4">
                <Form />
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default Auth