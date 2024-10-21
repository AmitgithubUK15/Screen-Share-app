import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const {S_ID} = useSelector((state) => state.user);
  return S_ID ? <Outlet /> :<Navigate to='/login' />;
}