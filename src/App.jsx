import { useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

import { useDispatch, useSelector } from "react-redux";
import { fetchDataThunk } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ContactPage from "./pages/ContactPage/ContactPage";

function App() {
  const dispatch = useDispatch();

  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>

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
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
