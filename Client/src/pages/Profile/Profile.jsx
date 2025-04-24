
//pasar id, y comprovar si esa id es la misma que la del 'local storage' (usuari logueado), si es 
// la mateixa, mostrar les opcions d'editar perfil, si no es la mateixa, mostrar el perfil de 
// l'usuari (amb les opcions de seguir i missatge directe)
// sempre mostrar el perfil de l'usuari, i les seves publicacions

import React from 'react';
import { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
          const storedUser = localStorage.getItem("user-info");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            console.log("User loguejat:", parsed.user);
            setUser(parsed.user); 
          }
        }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-10  w-[800px] mt-[20%]">
                <p>perfil pages</p>
                <p>{user.name}</p>
            </div>
        </>




    )
}

export default Profile