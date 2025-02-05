import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { deleteContactThunk } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/selectors";
import { filterContacts } from "../../redux/filters/selectors";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(filterContacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContactThunk(id));
  };

  const searchTerm =
    filter && typeof filter === "string" ? filter.toLowerCase() : "";

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={s.wrapperListItem}>
      <ul className={s.contactListItem}>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
              id={contact.id}
              deleteContact={handleDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
