import { CurrentLine, Pink } from "../../helper/Colors";
import Contact from "./Contact";
import { Orange } from "./../../helper/Colors";
import Spinner from "./../Spinner";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from './../context/contactContext';

const Contacts = () => {

  const {loading, filteredContacts: contacts, deletContact} = useContext(ContactContext);
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div style={{textAlign: "center"}} className="col">
              <p className="h3">
                <Link
                  to="/contacts/add"
                  className="btn mx-2 mt-3 fw-bold"
                  style={{ backgroundColor: Pink, textAlign: "center" }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          {loading ? (
            <Spinner />
          ) : contacts.length > 0 ? (
            contacts.map((c) => <Contact key={c.id} contact={c} confirmDelete={() => deletContact(c.id, c.fullname)}/>)
          ) : (
            <div
              className="text-center py-5"
              style={{ backgroundColor: CurrentLine }}
            >
              <p className="h3" style={{ color: Orange }}>
                مخاطب یافت نشد
              </p>
              <img
                src={require("../../assets/no-found.gif")}
                className="w-25"
                alt=""
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Contacts;
