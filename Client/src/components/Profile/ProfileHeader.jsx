import React from 'react';
import { useEffect, useState } from 'react';

const ProfileHeader = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
          const storedUser = localStorage.getItem("user-info");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed.user); // <-- Only keep the nested user object
          }
        }, []);
    return (
        <div className='flex gap-4 py-10 flex-col'>
            <div className="flex justify-center">
                <div className="relative w-24 h-24">
                    <img
                        className="rounded-full"
                        src='a'
                        alt="usuari 1"
                    />
                </div>
            </div>

            <div className="flex flex-col items-start gap-2 mx-auto w-full">
                <div className="flex gap-4 flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
                    <p className="text-sm sm:text-lg">
                        prova de text
                    </p>

                    <div className="flex gap-4 items-center justify-center">
                        <button className="bg-white text-black hover:bg-opacity-80 text-xs sm:text-sm px-4 py-2 rounded">
                            Editar perfil
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <p>
                        <span className="font-bold mr-1">4</span>
                        Publicacions
                    </p>
                    <p>
                        <span className="font-bold mr-1">400</span>
                        Seguidors
                    </p>
                    <p>
                        <span className="font-bold mr-1">40</span>
                        Seguint
                    </p>
                </div>
                <br />
                <div className="flex flex-col items-start gap-4">
                    <p className="font-bold text-sm">
                        prova de text
                    </p>
                    <p className="text-sm">prova de text per sotsssssssssssssssssssssssssssssssssssssssssssssssssssssa</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
