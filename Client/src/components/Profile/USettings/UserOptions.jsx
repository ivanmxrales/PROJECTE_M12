/* export const Logout = ({ onClose }) => (
    const handleLogout = async () => {
        await useLogout();
        localStorage.removeItem("user-info");
        setUser(null);
      };
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={handleLogout}
    >
        Tancar sessió
    </button>
); */

export const DeleteAccount = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Esborrar Compte
    </button>
);

export const ChangeEmail = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Canviar email
    </button>
);

export const ChangePassword = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Canviar contrasenya
    </button>
);

export const Close = ({ onClose }) => (
    <button
        className="bg-transparent text-white text-sm border-b-gray-600 hover:bg-opacity-80 sm:text-xl px-4 py-2 rounded"
        onClick={onClose}
    >
        Tancar
    </button>
);