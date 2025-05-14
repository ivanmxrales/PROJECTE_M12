import React from 'react'

const getAuthUserTokenMultimedia = () => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    console.log("Token being used:", token);
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    };
}

export default getAuthUserTokenMultimedia