import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Settings from "@material-ui/icons/Settings";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Project Specifications</h2>
          <h5 className={classes.description}>
            
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Input & Output"
              description="Input: RGB Image"
              description2 = "Output: A segmentation mask where different colors represent different depths"
              icon={SwapHoriz}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Dataset"
              description="We used the NYU Depth V2 dataset to train our model. The dataset contains raw 2D images and their corresponding depth maps"
              icon={PhotoLibrary}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Architecture"
              description="We used Convolutional Neural Network (CNN) along with residual layers to improve information flow across layers."
              description2 = "We also used Recurrent Neural Network (RNN) to capture the time based relationships in a sequence of images."
              icon={Settings}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
