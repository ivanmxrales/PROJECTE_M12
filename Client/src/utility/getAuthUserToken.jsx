import React from 'react'

const getAuthUserToken = () => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    //console.log("Token being used:", token);
    return {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };
}

export default getAuthUserToken