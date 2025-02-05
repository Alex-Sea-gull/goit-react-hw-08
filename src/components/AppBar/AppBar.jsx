import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import Navigation from "../Navigation/Navigation";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import s from "./AppBar.module.css";

const AppBar = () => {
  const login = useSelector(selectIsLoggedIn);
  return (
    <div className={s.appBar}>
      <Navigation />
      {!login ? <AuthNav /> : <UserMenu />}
    </div>
  );
};

export default AppBar;
