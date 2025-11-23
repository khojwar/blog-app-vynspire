import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginSuccess, logout } from '../store/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isAuthenticated) {  
            try {
                const decoded: any = jwtDecode(token);
                dispatch(loginSuccess({ user: decoded, token }));
            } catch (err) {
                localStorage.removeItem('token');
            }
        }
    }, [dispatch, isAuthenticated]);

    const login = (user: any, token: string, msg: string) => {
        dispatch(loginSuccess({ user, token }));
        router.push('/dashboard?msg=' + encodeURIComponent(msg));
    };

    const logoutUser = () => {
        dispatch(logout());
        router.push('/login');
    };

    const redirectIfNotAuth = () => {
        if (!isAuthenticated) router.push('/login');
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout: logoutUser,
        redirectIfNotAuth,
    };
}
