import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from "./Navigation.module.css";

const Navigation = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.navigation}>
      <nav className={s.nav}>
        <NavLink
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          to="/"
        >
          Home
        </NavLink>
        {loggedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            to="/contacts"
          >
            Contacts
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
