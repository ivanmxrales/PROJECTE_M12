import React from 'react'

const getAuthUserId = () => {
    const userID = JSON.parse(localStorage.getItem("user-info"))?.user.id;
    console.log("Id being used:", userID);
    return userID;
}

export default getAuthUserId