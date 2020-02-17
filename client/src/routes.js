import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import AdminDetailPage from './pages/AdminDetailPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import AdminNewItem from "./pages/AdminNewItem";

export const useRoutes = (isAdmin,isAuthenticated) => {
    if (isAuthenticated) {
        if (isAdmin) {
            return (
                <Switch>
                    <Route path="/adminka" exact>
                        <AdminPage/>
                    </Route>
                    <Route path="/adminka/new">
                        <AdminNewItem/>
                    </Route>
                    <Route path="/adminka/detail/:id">
                        <AdminDetailPage/>
                    </Route>
                    <Redirect to="/adminka"/>
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                    <Route path="/detail/:id">
                        <DetailPage/>
                    </Route>
                    <Route path="/user">
                        <UserPage/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
            )
        }

    }
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Route path="/auth">
                    <AuthPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )

}