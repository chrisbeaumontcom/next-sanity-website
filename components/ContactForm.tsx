import React, { useState } from "react";
import { useFormik, FormikErrors } from "formik";
import axios from "axios";
import { FormValues } from "../interfaces";

const contactApi = process.env.NEXT_PUBLIC_CONTACT_API;

const initialValues: FormValues = {
  email: "",
  fullname: "",
  phone: "",
  message: "",
};

const validate = (values: FormValues) => {
  let errors: FormikErrors<FormValues> = {};
  if (!values.fullname) {
    errors.fullname = "Required";
  } else if (values.fullname.length > 150) {
    errors.fullname = "Must be 150 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const ContactForm = () => {
  const [formwrap, hideForm] = useState("");
  const [sendProcess, sendForm] = useState("");

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: FormValues) => {
      hideForm("formhide");
      sendForm("[sending...]");
      axios({
        method: "post",
        url: contactApi,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Email: values.email,
          Name: values.fullname,
          Phone: values.phone,
          Message: values.message,
        },
      })
        .then((response) => {
          const { data } = response;
          //console.log(data);
          if (!!data.sent) {
            sendForm("[Message Sent...Thanks.]");
          }
          if (!!data.error) {
            sendForm("error:" + data.error);
          }
          formik.setSubmitting(false);
        })
        .catch((er) => {
          console.log(er);
          sendForm("[error sending form...]");
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <div>
      <p>{sendProcess}</p>
      <form onSubmit={formik.handleSubmit}>
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
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.email}
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
                id="fullname"
                type="text"
                name="fullname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <p className="text-red-500 text-xs italic">
                  {formik.errors.fullname}
                </p>
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
                id="phone"
                type="text"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
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
                id="message"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-5">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </form>
      <style scoped>{`
        div.formhide {
          display: none;
        }
      `}</style>
    </div>
  );
};
