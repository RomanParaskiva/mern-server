import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isAdmin, setAdmin] = useState(null)
    const [userLikes, setUserLikes] = useState(null)

    const login = useCallback((jwtToken, id, isAdmin, likes) => {
        setToken(jwtToken)
        setUserId(id)
        setAdmin(isAdmin)
        setUserLikes(likes)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, likes: likes, isAdmin: isAdmin,
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