import React from 'react'

const UserInfo = ({user}) => {

    return(
        <div className="flex flex-col">
            <div className="welkome_blc black-text">
            <p className="info_title">Hi, {user.email}</p>
            </div>

           <div className="user_blc_wrapper grey lighten-2">
                <div className="personal_info grey lighten-5 border-radius mt">
                    <p className="info_title">Personal Info</p>               
                    <p className="info_title">In progress....</p>

                </div>

                <div className="personal_info grey lighten-5 border-radius mt">
                    <p className="info_title">Last Transaction</p>               
                    <p className="info_title">In progress....</p>
                    <ul class="collection">
                        <li class="collection-item">Alvin</li>
                        <li class="collection-item">Alvin</li>
                        <li class="collection-item">Alvin</li>
                        <li class="collection-item">Alvin</li>
                    </ul>

                </div>
           </div>
        </div>
            )
}

export default UserInfo;