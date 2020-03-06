import React from 'react'

const UserInfo = ({user}) => {

    return(
        <div>
            <div className="col m3">
                <p>Your email:</p>
                <p>{user.email}</p>
            </div>
            <div className="col m8 center-align">
                <p>Yours pokupki:</p>
                <p>Poka chto net</p>

            </div>
        </div>
            )
}

export default UserInfo;