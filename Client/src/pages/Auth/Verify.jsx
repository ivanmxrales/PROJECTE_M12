import React from 'react';
import { Link } from 'react-router-dom';
const Verify = () => {
    return (
        <div className="flex flex-col items-center justify-center h-0">
            <h1 className="text-2xl font-bold mb-4">Verifica el teu compte</h1>
            <p className="mb-4">T'hem enviat un correu de verificació a la teva adreça electrònica.</p>
            <p className="mb-4">Si us plau, revisa la teva safata d'entrada i fes clic a l'enllaç de verificació.</p>
            <Link to="/auth" className="text-blue-500 hover:underline">
                Tornar a la pàgina d'inici de sessió
            </Link>
        </div>

    );
}

export default Verify;
