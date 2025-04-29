import React, { useState } from 'react';
import Edit from '../../components/AuthForm/EditProfile';

const EditProfile = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        username: user?.username || '',
        biography: user?.biography || '',
        birth_date: user?.birth_date || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className='bg-blue-600 w-full h-full z-[9999]'>
            <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
                <div className="bg-black p-6 rounded-lg w-[600px]">
                    <h2 className="text-lg font-bold mb-4 tcolor">Editar Perfil</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Edit user={user} />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="text-sm text-gray-600">Cancel·la</button>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-700">Desa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
