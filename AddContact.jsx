import { Link } from "react-router-dom";

import { Purple, Green, Comment } from "./../../helper/Colors";
import Spinner from "./../Spinner";
import { useContext, useState } from "react";
import { ContactContext } from "./../context/contactContext";
import { useFormik, Formik, ErrorMessage, Form, Field } from "formik";
import { contactSchema } from "./../../Validations/ContactValidations";

const AddContact = ({}) => {
  const { loading, contact, onContactChange, Groups, createContact, errors } =
    useContext(ContactContext);
  // const formik = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     photo: "",
  //     job: "",
  //     mobile: "",
  //     email: "",
  //     group: "",
  //   },
  //   validationSchema: contactSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     createContact(values);
  //   },
  // });
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: Green }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: Green }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  {/* {errors?.map((error, index) => (
                    <p key={index} className="text-danger">{error.message}</p>
                  ))} */}
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      job: "",
                      mobile: "",
                      email: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => createContact(values)}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-2">
                          <Field
                            name="fullname"
                            type="text"
                            // {...formik.getFieldProps("fullname")}
                            className="form-control"
                            placeholder="نام و نام خانوادگی"
                          />
                          <ErrorMessage
                            name="fullname"
                            render={(msg) => (
                              <div className="text-danger">{msg}</div>
                            )}
                          />
                          {/* {formik.touched.fullname && formik.errors.fullname ? (
                            <div className="text-danger">
                              {formik.errors.fullname}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mb-2">
                          <Field
                            name="photo"
                            type="text"
                            className="form-control"
                            placeholder="آدرس تصویر"
                            // {...formik.getFieldProps("photo")}
                          />
                          <ErrorMessage
                            name="photo"
                            render={(msg) => <div className="text-danger">{msg}</div>}
                          />
                          {/* {formik.touched.photo && formik.errors.photo ? (
                            <div className="text-danger">
                              {formik.errors.photo}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mb-2">
                          <input
                            name="mobile"
                            type="number"
                            className="form-control"
                            placeholder="شماره موبایل"
                            {...formik.getFieldProps("mobile")}
                          />
                          <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>}/>
                          {/* {formik.touched.mobile && formik.errors.mobile ? (
                            <div className="text-danger">
                              {formik.errors.mobile}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mb-2">
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="آدرس ایمیل"
                            // {...formik.getFieldProps("email")}
                          />
                          <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>}/>
                          {/* {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mb-2">
                          <Field
                            type="text"
                            name="job"
                            className="form-control"
                            placeholder="شغل"
                            // {...formik.getFieldProps("job")}
                          />
                          <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>}/>
                          {/* {formik.touched.job && formik.errors.job ? (
                            <div className="text-danger">
                              {formik.errors.job}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mb-2">
                          <Field
                            name="group"
                            className="form-control"
                            as="select"
                            // {...formik.getFieldProps("group")}
                          >
                            <option value="">انتخاب گروه</option>
                            {Groups.length > 0 &&
                              Groups.map((g) => (
                                <option key={g.id} value={g.id}>
                                  {g.name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>}/>
                          {/* {formik.touched.group && formik.errors.group ? (
                            <div className="text-danger">
                              {formik.errors.group}
                            </div>
                          ) : null} */}
                        </div>
                        <div className="mx-2">
                          <input
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: Purple }}
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
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;
