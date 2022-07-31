import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Contacts from "./Components/Contact/Contacts";
import Navbar from "./Components/Navbar";
import AddContact from "./Components/Contact/AddContact";
import EditContact from "./Components/Contact/EditContact";
import ViewContact from "./Components/Contact/ViewContact";
import { confirmAlert } from "react-confirm-alert";
import {
  deleteContact,
  getAllGroups,
  getAllContacts,
  createContact,
} from "./services/services";
import { CurrentLine, Foreground, Purple, Yellow } from "./helper/Colors";
import { ContactContext } from "./Components/context/contactContext";
import { contactSchema } from "./Validations/ContactValidations";
import { useImmer } from "use-immer";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

const App = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useImmer([]);
  const [loading, setLoading] = useImmer([false]);
  const [Groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [contact, setContact] = useImmer({});
  // const [errors, setErrors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const { data: contactsData } = await getAllContacts();
  //       setContacts(contactsData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [forceRender]);

  const createContactForm = async (values) => {
    try {
      // await contactSchema.validate(contact, { abortEarly: false });
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(values);
      if (status === 201) {
        toast.success("مخاطب با موفقیت ساخته شد")
        // const allContacts = [...contacts, data];
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        // setContact({});
        setLoading((prevLoading) => !prevLoading);
        navigate("/contacts");
      }
    } catch (error) {
      // setErrors(error.inner);
      console.log(error.message);
    }
  };

  // const onContactChange = (event) => {
  //   setContact({ ...contact, [event.target.name]: event.target.value });
  // };

  const confirmDelete = (contactId, contactFullName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              مطمعنی که میخوای {contactFullName} رو پاک کنی؟
            </p>
            <button
              className="btn mx-2"
              style={{ backgroundColor: Purple }}
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Comment }}
            >
              خیر
            </button>
          </div>
        );
      },
    });
  };

  // const removeContact = async (contactId) => {
  //   try {
  //     setLoading(true);
  //     const { status } = await deleteContact(contactId);
  //     if (status === 200) {
  //       // const { data: contactsData } = await getAllContacts();
  //       const allContacts = [...contacts];
  //       const contactIndex = allContacts.filter(
  //         (c) => c.id !== parseInt(contactId)
  //       );
  //       // console.log(contactIndex);
  //       allContacts[contactIndex] = allContacts;
  //       // console.log(allContacts);
  //       setContacts(allContacts);
  //       setFilteredContacts(allContacts)
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  const removeContact = async (contactId) => {
    const allContact = [...contacts];
    try {
      setLoading(true);
      setContacts((draft) => draft.filter((c) => c.id !== parseInt(contactId)));
      setFilteredContacts((draft) =>
        draft.filter((c) => c.id !== parseInt(contactId))
      );
      setLoading(false);
      const { status } = await deleteContact(contactId);
      toast.error("مخاطب با موفقیت پاک شد")
      if (status !== 200) {
        setContacts(allContact);
        setFilteredContacts(allContact);
        setLoading(false);
      }
    } catch (error) {
      setContacts(allContact);
      setFilteredContacts(allContact);
      console.log(error.message);
      setLoading(false);
    }
  };

  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);
      setFilteredContacts((draft) => draft.filter(c => c.fullname.toLowerCase().startsWith(query.toLowerCase())));
  }, 1000);

  return (
    <ContactContext.Provider
      value={{
        setLoading,
        setContact,
        filteredContacts,
        setFilteredContacts,
        Groups,
        deletContact: confirmDelete,
        createContact: createContactForm,
        contactSearch,
        contacts,
        setContacts,
        // errors
      }}
    >
      <>
        <Navbar />
        <ToastContainer position="bottom-right" theme="colored" rtl={true}/>
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        </Routes>
        {/* <Outlet /> */}
      </>
    </ContactContext.Provider>
  );
};
export default App;
