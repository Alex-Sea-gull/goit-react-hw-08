import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={s.authNav}>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        to="/register"
      >
        Registration
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        to="/login"
      >
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
