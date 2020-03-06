import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {useMessage} from "../hooks/message.hook";
import Loader from "../components/Loader";
import UserInfo from "../components/UserInfo";

const UserPage = () =>{
    const {request, loading} = useHttp()
    const [user, setUser] = useState({})
    const message = useMessage()
    const {token, userId} = useAuth()

    const getUser = useCallback( async () => {
        try {
            const data = await request(`/api/user/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            if(data){
                setUser(data)
                console.log(data)
            }

        } catch (e) {}
    }, [request, token, userId])

    useEffect(() => {
        getUser()
    },[getUser]);

    if(loading) {
        return <Loader/>
    }


    return  (
        <div className="container mt">
        {!loading && user && <UserInfo user={user}/>}
        </div>
    )
}

export default UserPage;