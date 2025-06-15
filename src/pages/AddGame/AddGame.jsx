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

    platform: Yup.string()
      .required("Platform is required"),

    status: Yup.string()
      .required("Status is required"),

    releaseYear: Yup.number()
      .typeError("Release Year must be a number")
      .required("Release Year is required")
      .min(1970, "Year must be after 1970")
      .max(currentYear, `Year cannot be after ${currentYear}`),

    startDate: Yup.date()
      .required("Start Date is required")
      .max(new Date(), "Start Date cannot be in the future"),
  });

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
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

  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  return (
    <div className="add-game-container">
      <h1>Add game</h1>

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
          status: "want to play",
          platform: "",
          releaseYear: "",
          startDate: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Title:</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" className="error-message" />

            <label>Cover URL:</label>
            <Field type="text" name="cover" />
            <ErrorMessage name="cover" component="div" className="error-message" />

            <label>Status:</label>
            <Field as="select" name="status">
              <option value="Want to play">Want to Play</option>
              <option value="Playing">Playing</option>
              <option value="Played">Played</option>
              <option value="Abandoned">Abandoned</option>
            </Field>
            <ErrorMessage name="status" component="div" className="error-message" />

            <label>Platform:</label>
            <Field as="select" name="platform">
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

            <label>Release Year:</label>
            <Field
              type="number"
              name="releaseYear"
              min="1970"
              max={currentYear}
              onInput={(e) => {
                if (e.target.value.length > 4) {
                  e.target.value = e.target.value.slice(0, 4);
                }
              }}
            />
            <ErrorMessage name="releaseYear" component="div" className="error-message" />

            <label>Start Date:</label>
            <Field type="date" name="startDate" />
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
