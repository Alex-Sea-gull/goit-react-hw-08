import { createSelector } from "@reduxjs/toolkit";
import { filterContacts } from "../filters/selectors";

//Selector
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, filterContacts],
    (contacts, filter) => {
        return contacts.filter(
            contact =>
                contact.name.toLowerCase().includes(filter) ||
                contact.number.includes(filter)
        );
    }
)