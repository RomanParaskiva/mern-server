import React, {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useLike = () => {
    const [like, setLike] = useState(null)


    const addLike = useCallback((likes) => {
        setLike(likes)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, isAdmin: isAdmin, likes: userLikes
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setAdmin(null)
        setUserLikes(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.userId, data.isAdmin, data.likes)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, isAdmin, ready, userLikes }
}