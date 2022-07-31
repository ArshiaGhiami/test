import { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getContact,
  getAllGroups,
  updateContact,
  createContact,
} from "../../services/services";
import Spinner from "../Spinner";
import { Orange, Comment, Purple } from "./../../helper/Colors";
import { ContactContext } from "./../context/contactContext";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { contactSchema } from "./../../Validations/ContactValidations";
import { useImmer } from 'use-immer';

const EditContact = ({ forceRender, setForceRender }) => {
  const { contacts, setContacts, setFilteredContacts } =
    useContext(ContactContext);
  const { contactId } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useImmer({
    loading: false,
    contact: {},
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setState({
          ...state,
          loading: false,
          contact: contactData,
          groups: groupsData,
        });
      } catch (err) {
        console.log(err);
        setState({ ...state, loading: false });
      }
    };

    fetchData();
  }, []);


  const submitForm = async (values) => {
    // event.preventDefault();
    try {
      setState(draft => { draft.loading = true });
      const { data } = await updateContact(values, contactId);
      setState(draft => { draft.loading = false });
      if (data) {
        setContacts(draft => {
          const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
          draft[contactIndex] = { ...data }
        });
        setFilteredContacts(draft => {
          const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
          draft[contactIndex] = { ...data }
        })
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setState(draft => draft.loading = false);
    }
  };

  const { loading, contact, groups } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: Orange }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Orange }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={{
                      fullname: contact.fullname,
                      photo: contact.photo,
                      job: contact.job,
                      mobile: contact.mobile,
                      email: contact.email,
                      group: contact.group,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => submitForm(values)}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-2">
                          <Field
                            name="fullname"
                            type="text"
                            className="form-control"
                            // value={contact.fullname}
                            // onChange={formik.handleChange}
                            // required={true}
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="photo"
                            type="text"
                            // value={contact.photo}
                            // onChange={setContactInfo}
                            // required={true}
                            className="form-control"
                            placeholder="آدرس تصویر"
                          />
                          <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="mobile"
                            type="number"
                            className="form-control"
                            // value={contact.mobile}
                            // onChange={setContactInfo}
                            // required={true}
                            placeholder="شماره موبایل"
                          />
                          <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            // value={contact.email}
                            // onChange={setContactInfo}
                            // required={true}
                            placeholder="آدرس ایمیل"
                          />
                          <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="job"
                            type="text"
                            className="form-control"
                            // value={contact.job}
                            // onChange={setContactInfo}
                            // required={true}
                            placeholder="شغل"
                          />
                          <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>} />
                        </div>
                        <div className="mb-2">
                          <Field
                            name="group"
                            // value={contact.group}
                            // onChange={setContactInfo}
                            // required={true}
                            className="form-control"
                            as="select"
                          >
                            <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>} />
                            <option value="">انتخاب گروه</option>
                            {groups.length > 0 &&
                              groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                  {group.name}
                                </option>
                              ))}
                          </Field>
                        </div>
                        <div className="mb-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: Purple }}
                            value="ویرایش مخاطب"
                          />
                          <Link
                            to={"/contacts"}
                            className="btn mx-2"
                            style={{ backgroundColor: Comment }}
                          >
                            انصراف
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${Purple}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
