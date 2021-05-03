import React, { useRef, useState, useReducer } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {
  Divider,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// Load sample images for live demo
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

// Load images
import sample1 from "assets/img/samples/sample1.jpg";
import sample2 from "assets/img/samples/sample2.jpg";
import sample3 from "assets/img/samples/sample3.jpg";
import sample4 from "assets/img/samples/sample4.jpg";
import sample5 from "assets/img/samples/sample5.jpg";
import sample1_gt from "assets/img/samples/sample1_gt.jpg";
import sample2_gt from "assets/img/samples/sample2_gt.jpg";
import sample3_gt from "assets/img/samples/sample3_gt.jpg";
import sample4_gt from "assets/img/samples/sample4_gt.jpg";
import sample5_gt from "assets/img/samples/sample5_gt.jpg";

const sampleList = [sample1, sample2, sample3, sample4, sample5];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const initialState = { fetched: false };
const ROOT_URL = "https://kkkgabriel.pythonanywhere.com";

function reducer(resultImage, action) {
  switch (action.type) {
    case "fetched":
      return { fetched: true };
    case "reset":
      return { fetched: false };
    default:
      throw new Error();
  }
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [openModal, setOpenModal] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(undefined);
  const [selectedGroundTruth, setSelectedGroundTruth] = useState(undefined);

  const [modelProcessing, setModelProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedUrl, setFetchedUrl] = useState();

  const [resultImage, dispatch] = useReducer(reducer, initialState);

  const teamRef = useRef(null);
  const teamScroller = () =>
    teamRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleOpenModal = () => {
    setErrorMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setOpenModal(false);
  };

  const handlePickSample = (image) => {
    setErrorMessage("");
    setSelectedSamples(image);
    switch (image.value) {
      case 0:
        setSelectedGroundTruth(sample1_gt);
        break;
      case 1:
        setSelectedGroundTruth(sample2_gt);
        break;
      case 2:
        setSelectedGroundTruth(sample3_gt);
        break;
      case 3:
        setSelectedGroundTruth(sample4_gt);
        break;
      case 4:
        setSelectedGroundTruth(sample5_gt);
        break;
    }
  };

  const srcToFile = (src, fileName, mimeType) => {
    return fetch(src)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], fileName, { type: mimeType });
      });
  };

  const handleEstimateDepth = async () => {
    let data = new FormData();
    let imageToSend = await srcToFile(
      selectedSamples["src"],
      "sample.jpg",
      "image/jpg"
    );
    data.append("image", imageToSend);
    setModelProcessing(true);
    await axios
      .post(`${ROOT_URL}/depthEst`, data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((uploadResponse) => {
        setFetchedUrl(uploadResponse.data.path);
        setModelProcessing(false);
        dispatch({
          type: "fetched",
        });
      })
      .catch((uploadError) => {
        setErrorMessage(uploadError.message);
        setModelProcessing(false);
        dispatch({
          type: "reset",
        });
      });
  };

  const handleUploadAnother = () => {
    dispatch({
      type: "reset",
    });
    setErrorMessage("");
    setOpenModal(false);
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Deep Learning Group 4"
        rightLinks={<HeaderLinks teamScroller={teamScroller} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        teamScroller={teamScroller}
        {...rest}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Live Demo</h2>
            <Divider />
            {resultImage.fetched ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Our Model's Prediction</h5>
                      <img
                        src={fetchedUrl}
                        alt="result"
                        width="640"
                        height="480"
                      />
                    </div>
                    <Divider
                      orientation="vertical"
                      style={{ margin: "0 10px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Ground Truth</h5>
                      <img
                        src={selectedGroundTruth}
                        alt="result"
                        width="640"
                        height="480"
                      />
                    </div>
                  </div>
                  <Button
                    color="danger"
                    size="lg"
                    onClick={handleUploadAnother}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "20px" }}
                  >
                    Back To Home
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {modelProcessing ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "100px 0",
                      width: "40vw",
                    }}
                  >
                    <CircularProgress size={100} />
                  </div>
                ) : (
                  <div>
                    <h4
                      id="transition-modal-description"
                      style={{ marginBottom: "15px", color: "#999" }}
                    >
                      Please select the image that you want to estimate depths
                      on:
                    </h4>
                    {errorMessage.length > 0 ? (
                      <Alert severity="error" style={{ marginBottom: "20px" }}>
                        {errorMessage}
                      </Alert>
                    ) : null}
                    <ImagePicker
                      images={sampleList.map((image, i) => ({
                        src: image,
                        value: i,
                      }))}
                      onPick={handlePickSample}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        disabled={modelProcessing}
                        color="danger"
                        size="lg"
                        onClick={handleEstimateDepth}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginTop: "25px" }}
                      >
                        {modelProcessing ? "Processing The Image" : "Run Model"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Fade>
      </Modal>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ maxWidth: "50%" }}>
              <h1 className={classes.title}>
                Monocular Depth Estimation Model
              </h1>
              <h4>
                A deep learning model capable of predicting the depth value of
                each pixel in an input RGB image.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                onClick={handleOpenModal}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" style={{ marginRight: "10px" }} />
                Live Demo
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <Divider />
          <TeamSection teamRef={teamRef} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
