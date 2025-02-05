import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import s from "./UserMenu.module.css";
import { logoutThunk } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const navigate = useNavigate();

  const handleExit = async () => {
    try {
      await dispatch(logoutThunk());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={s.userMenu}>
      <h2 className={s.greeting}>Hello! {userName.name}</h2>
      <button onClick={handleExit} className={s.exitButton}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
