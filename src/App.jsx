import { useEffect } from "react";
// import ContactForm from "./components/ContactForm/ContactForm";
// import SearchBox from "./components/SearchBox/SearchBox";
// import ContactList from "./components/ContactList/ContactList";

import { useDispatch, useSelector } from "react-redux";
import { fetchDataThunk } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  const dispatch = useDispatch();

  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  return (
    <div>
      {isLoading && (
        <p style={{ color: "blue", fontSize: "18px", fontWeight: "bold" }}>
          Loading...
        </p>
      )}
      {isError && (
        <p style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
          Error
        </p>
      )}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
