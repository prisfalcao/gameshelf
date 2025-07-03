import React from "react";
import { useNavigate } from "react-router-dom";
import { getGames, addGame } from "../../utils/storage";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./AddGame.scss";

const AddGame = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Maximum 100 characters"),
    cover: Yup.string()
      .required("Cover URL is required")
      .test(
        "is-valid-cover",
        "Must be a valid URL or a valid base64 image",
        (value) =>
          /^https?:\/\//.test(value) || /^data:image\/[a-z]+;base64,/.test(value)
      ),
    platform: Yup.string().required("Platform is required"),
    status: Yup.string().required("Status is required"),
    releaseYear: Yup.number()
      .typeError("Release Year must be a number")
      .required("Release Year is required")
      .min(1970, "Year must be after 1970")
      .max(currentYear, `Year cannot be after ${currentYear}`),
    startDate: Yup.date()
      .required("Start Date is required")
      .max(new Date(), "Start Date cannot be in the future"),
  });

  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const existingGames = getGames();
    const alreadyExists = existingGames.some(
      (game) =>
        game.title.toLowerCase().trim() === values.title.toLowerCase().trim() &&
        game.platform.toLowerCase().trim() === values.platform.toLowerCase().trim()
    );

    if (alreadyExists) {
      setShowErrorModal(true);
      setSubmitting(false);
      return;
    }

    const newGame = {
      id: uuidv4(),
      title: values.title,
      cover: values.cover,
      status: values.status,
      platform: values.platform,
      releaseYear: values.releaseYear,
      startDate: values.startDate,
      createdAt: new Date().toISOString(),
    };

    addGame(newGame);
    setShowSuccessModal(true);
    resetForm();
  };

  return (
    <div className="add-game-container">
      <h1>Add Game</h1>

      {showSuccessModal && (
        <Modal
          type="success"
          message="Game added successfully!"
          onConfirm={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
        />
      )}

      {showErrorModal && (
        <Modal
          type="error"
          message="This game already exists on the shelf for this platform."
          onConfirm={() => setShowErrorModal(false)}
        />
      )}

      <Formik
        initialValues={{
          title: "",
          cover: "",
          status: "Want to play",
          platform: "",
          releaseYear: "",
          startDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form role="form">
            <label htmlFor="title">Title:</label>
            <Field
              id="title"
              name="title"
              type="text"
              placeholder="Enter game title"
              aria-required="true"
              aria-invalid={errors.title && touched.title ? "true" : "false"}
            />
            <ErrorMessage name="title" component="div" className="error-message" />

            <label htmlFor="cover">Cover URL:</label>
            <Field
              id="cover"
              name="cover"
              type="text"
              placeholder="https://example.com/image.jpg"
              aria-required="true"
              aria-invalid={errors.cover && touched.cover ? "true" : "false"}
            />
            <ErrorMessage name="cover" component="div" className="error-message" />

            <label htmlFor="status">Status:</label>
            <Field
              as="select"
              id="status"
              name="status"
              aria-required="true"
              aria-invalid={errors.status && touched.status ? "true" : "false"}
            >
              <option value="Want to play">Want to Play</option>
              <option value="Playing">Playing</option>
              <option value="Played">Played</option>
              <option value="Abandoned">Abandoned</option>
            </Field>
            <ErrorMessage name="status" component="div" className="error-message" />

            <label htmlFor="platform">Platform:</label>
            <Field
              as="select"
              id="platform"
              name="platform"
              aria-required="true"
              aria-invalid={errors.platform && touched.platform ? "true" : "false"}
            >
              <option value="">Select Platform</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Xbox Series X">Xbox Series X</option>
              <option value="PlayStation 3">PlayStation 3</option>
              <option value="PlayStation 4">PlayStation 4</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="SNES">SNES</option>
              <option value="Nintendo Game Boy">Nintendo Game Boy</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Nintendo Switch 2">Nintendo Switch 2</option>
              <option value="PC">PC</option>
              <option value="Other">Other</option>
            </Field>
            <ErrorMessage name="platform" component="div" className="error-message" />

            <label htmlFor="releaseYear">Release Year:</label>
            <Field
              id="releaseYear"
              name="releaseYear"
              type="number"
              placeholder="2020"
              min="1970"
              max={currentYear}
              aria-required="true"
              aria-invalid={errors.releaseYear && touched.releaseYear ? "true" : "false"}
            />
            <ErrorMessage name="releaseYear" component="div" className="error-message" />

            <label htmlFor="startDate">Start Date:</label>
            <Field
              id="startDate"
              name="startDate"
              type="date"
              aria-required="true"
              aria-invalid={errors.startDate && touched.startDate ? "true" : "false"}
            />
            <ErrorMessage name="startDate" component="div" className="error-message" />

            <CustomButton type="submit" variant="success" disabled={isSubmitting}>
              Save
            </CustomButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGame;
