import axios from 'axios';
import { useState, useEffect, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({
        user: null,
        token: ""
    });

    // default axios
    axios.defaults.headers.common['Authorization'] = auth?.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.patch['Content-Type'] = 'application/json';
    axios.defaults.headers.get['Content-Type'] = 'application/json';

    useEffect(() => {
        const data = localStorage.getItem('auth');

        if (data) {
            const parsed = JSON.parse(data);
            setAuth({
                ...auth,
                user: parsed.user,
                token: parsed.token
            })
        }
    // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
