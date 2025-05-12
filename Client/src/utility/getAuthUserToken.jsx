import React from 'react'

const getAuthUserToken = () => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    console.log("Token being used:", token);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export default getAuthUserToken