import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Form = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
          <div className="border border-gray-400 rounded-lg p-5">
            <div className="flex flex-col items-center space-y-4">
              <img src="/imgs/logo.png" alt="Instagram" className="h-24 cursor-pointer" />
              {isLogin ? <Login /> : <Signup />}
            </div>
          </div>

          <div className="border border-gray-400 rounded-lg p-5 mt-4">
            <div className="flex items-center justify-center text-sm">
              <span className="mx-2">
                {isLogin ? "No tens un compte?" : "Ja tens un compte?"}
              </span>
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 cursor-pointer"
              >
                {isLogin ? "Registra't" : "Inicia sessió"}
              </span>
            </div>
          </div>
        </>
      );
      
}

export default Form