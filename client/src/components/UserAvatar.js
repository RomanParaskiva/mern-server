import React from 'react'

const UserAvatar = () => {
    const avatar = './images/useravatar.png'
    return (
        <img className="circle responsive-img" src={require(`${avatar}`)}/>
    )
}

export default UserAvatar