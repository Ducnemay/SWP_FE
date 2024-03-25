import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth.user?.roleId && allowedRoles?.includes(auth.user.roleId)
            ? <Outlet />
            : <Navigate to="/log-in" state={{ from: location }} replace />
    );

};

export default RequireAuth;
