import React, { useRef, useState } from "react";
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
import { Divider, Modal, Backdrop, Fade } from "@material-ui/core";

// Load sample images for live demo
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import sample1 from 'assets/img/samples/sample1.jpg';
import sample2 from 'assets/img/samples/sample2.jpg';
import sample3 from 'assets/img/samples/sample3.jpg';
import sample4 from 'assets/img/samples/sample4.jpg';
import sample5 from 'assets/img/samples/sample5.jpg';

const sampleList = [sample1, sample2, sample3, sample4, sample5];

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [openModal, setOpenModal] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(undefined);
  const teamRef = useRef(null);
  const teamScroller = () => teamRef.current.scrollIntoView({behaviour: 'smooth'})

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handlePickSample = (image) => {
    setSelectedSamples({image});
  }

  const handleEstimateDepth = () => {
    console.log(selectedSamples);
  }

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand= "Deep Learning Group 4" 
        rightLinks={<HeaderLinks teamScroller = {teamScroller} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        teamScroller = {teamScroller}
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
            <h4 id="transition-modal-description" style={{marginBottom: "15px", color: "#999"}}>Please select the image that you want to estimate depths on:</h4>
            <ImagePicker
              images={sampleList.map((image,i) => ({src: image, value: i}))}
              onPick={handlePickSample}
              multiple={true}
            />
            <div style={{display: "flex", justifyContent: "center"}}>
              <Button
                color="danger"
                size="md"
                onClick={handleEstimateDepth}
                target="_blank"
                rel="noopener noreferrer"
                style={{marginTop: "25px"}}
              >
                Estimate Depth
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{maxWidth: "50%"}}>
              <h1 className={classes.title}>Monocular Depth Estimation Model</h1>
              <h4>
                A deep learning model capable of predicting the depth value of each pixel in an input RGB image.
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                onClick={handleOpenModal}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" style={{marginRight: "10px"}} />
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
          <TeamSection teamRef = {teamRef}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
