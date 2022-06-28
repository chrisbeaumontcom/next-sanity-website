import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

const contactApi = process.env.NEXT_PUBLIC_CONTACT_API;

const ContactForm = () => {
  const [sendProcess, sendForm] = useState('');
  const [formwrap, hideForm] = useState('');

  return (
    <>
      <p>{sendProcess}</p>
      <Formik
        initialValues = {{
          Email: '',
          Name: '',
          Message: '',
          Phone: '',
          Address: '',
        }}
        validate = {(values) => {
          let Email = "";
          let Name = ""
          const rgx =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!values.Email) {
            Email = 'Required';
          } else if (!rgx.test(values.Email)) {
            Email = 'Invalid email address';
          }
          if (!values.Name) {
            Name = 'Required';
          }

          return {
            Email,
            Name
          };
        }}
        onSubmit={(values, { setSubmitting }) => {
          hideForm('formhide');
          sendForm('[sending...]');

          axios({
            method: 'post',
            url: contactApi,
            headers: {
              'Content-Type': 'application/json',
            },
            data: values,
          })
            .then((response) => {
              const { data } = response;
              console.log(data);
              if (!!data.sent) {
                sendForm('[Message Sent...Thanks.]');
              }
              if (!!data.error) {
                sendForm('error:' + data.error);
              }
              setSubmitting(false);
            })
            .catch((er) => {
              console.log(er);
              sendForm('[error sending form...]');
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="form w-full max-w-sm" onSubmit={handleSubmit}>
            <div className={formwrap}>
              <div className="md:flex md:items-center my-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="Email"
                  >
                    Email*
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="Email"
                    type="email"
                    name="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Email}
                  />
                  {touched.Email && errors.Email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.Email}
                    </p>
                  )}
                </div>
              </div>

              <div className="md:flex md:items-center my-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="Name"
                  >
                    Name *
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="Name"
                    type="text"
                    name="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Name}
                  />
                  {touched.Name && errors.Name && (
                    <p className="text-red-500 text-xs italic">{errors.Name}</p>
                  )}
                </div>
              </div>

              <div className="md:flex md:items-center my-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="Phone"
                  >
                    Phone
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="Phone"
                    type="text"
                    name="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Phone}
                  />
                </div>
              </div>

              <div className="md:flex md:items-center my-3">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="Message"
                  >
                    Message
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="Message"
                    name="Message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Message}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <style scoped>{`
        div.formhide {
          display: none;
        }
      `}</style>
    </>
  );
};
export default ContactForm;
