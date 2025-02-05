import { createSelector } from "@reduxjs/toolkit";

//Selector
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, (state) => state.filters.name], // Залежності: контакти та фільтр
    (contacts, filter) => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);