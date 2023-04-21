import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';


function Logout() {
  
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    window.location.href = '/login';
    return(
        <div>
            Logout
        </div>
    )
}

export default Logout
