import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGameById, updateGame, removeGame, getGames } from "../../utils/storage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./GameDetails.scss";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  useEffect(() => {
    const foundGame = getGameById(id);
    if (!foundGame) {
      navigate("/");
    } else {
      setGame(foundGame);
    }
  }, [id, navigate]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required").max(100),
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
      .max(new Date().getFullYear(), `Year cannot be after ${new Date().getFullYear()}`),
    startDate: Yup.date()
      .required("Start Date is required")
      .max(new Date(), "Start Date cannot be in the future"),
  });

  const handleUpdate = (values, { setSubmitting }) => {
    const existingGames = getGames();
    const alreadyExists = existingGames.some(
      (g) =>
        g.id !== game.id &&
        g.title.toLowerCase().trim() === values.title.toLowerCase().trim() &&
        g.platform.toLowerCase().trim() === values.platform.toLowerCase().trim()
    );

    if (alreadyExists) {
      setShowErrorModal(true);
      setSubmitting(false);
      return;
    }

    updateGame({ ...game, ...values });
    const updatedGame = getGameById(id);
    setGame(updatedGame);
    setIsEditing(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleDelete = () => {
    removeGame(id);
    navigate("/");
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div className="game-details-container">
      <h1>Game details</h1>

      {showSuccessModal && (
        <Modal
          type="success"
          message="Game updated successfully!"
          onConfirm={() => setShowSuccessModal(false)}
        />
      )}


      {!isEditing ? (
        <div className="game-card">
          <div className="game-info">
            <img src={game.cover} alt={game.title} />
            <p>Title: {game.title}</p>
            <p>Status: {game.status}</p>
            <p>Platform: {game.platform}</p>
            <p>Release Year: {game.releaseYear}</p>
            <p>
              Start Date:{" "}
              {game.startDate
                ? game.startDate.split("-").reverse().join("/")
                : "Not started yet"}
            </p>
          </div>

          <div className="actions">
            <CustomButton onClick={() => setIsEditing(true)} variant="primary">
              Edit game
            </CustomButton>
            <CustomButton onClick={() => setShowDeleteConfirm(true)} variant="danger">
              Delete
            </CustomButton>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            title: game.title,
            cover: game.cover,
            status: game.status,
            platform: game.platform,
            releaseYear: game.releaseYear,
            startDate: game.startDate || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting }) => (
            <Form className="edit-form">
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
                max={new Date().getFullYear()}
                onInput={(e) => {
                  if (e.target.value.length > 4) {
                    e.target.value = e.target.value.slice(0, 4);
                  }
                }}
              />
              <ErrorMessage name="releaseYear" component="div" className="error-message" />

              <ErrorMessage name="releaseYear" component="div" className="error-message" />

              <label>Start Date:</label>
              <Field type="date" name="startDate" />
              <ErrorMessage name="startDate" component="div" className="error-message" />

              <div className="actions">
                <CustomButton type="submit" variant="primary" disabled={isSubmitting}>
                  Save Changes
                </CustomButton>
                <CustomButton type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {showDeleteConfirm && (
        <Modal
          message="Are you sure you want to delete this game?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          showCancel={true}
        />
      )}

      {showErrorModal && (
        <Modal
          message="This game already exists on the shelf for this platform."
          onConfirm={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default GameDetails;
