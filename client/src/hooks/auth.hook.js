import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isAdmin, setAdmin] = useState(null)

    const login = useCallback((jwtToken, id, isAdmin) => {
        setToken(jwtToken)
        setUserId(id)
        setAdmin(isAdmin)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, isAdmin: isAdmin
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setAdmin(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.userId, data.isAdmin)
        }
    }, [login])

    return { login, logout, token, userId, isAdmin }
}