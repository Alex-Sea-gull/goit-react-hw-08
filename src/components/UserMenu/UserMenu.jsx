import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import s from "./UserMenu.module.css";
import { logoutThunk } from "../../redux/auth/operations";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);

  const handleExit = () => {
    dispatch(logoutThunk());
  };

  return (
    <div className={s.userMenu}>
      <h2 className={s.greeting}>Hello! {userName.name}</h2>
      <button onClick={handleExit} className={s.exitButton}>
        Exit
      </button>
    </div>
  );
};

export default UserMenu;
