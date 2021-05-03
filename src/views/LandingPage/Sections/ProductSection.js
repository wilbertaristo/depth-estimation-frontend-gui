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
          <h5 className={classes.description}></h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Input & Output"
              description="Input: RGB Image"
              description2="Output: A segmentation mask where different colors represent different depths"
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
              description="We used a Fully Convolutional Network (FCN) model with a Sigmoid layer at the end of the network. Optimizer wise, we chose RMSProp as it gave us the best result."
              description2="Our FCN follows an encoder-decoder system where we downsampled the input during the encoder phase and upsampled it back to the original size during the decoder phase."
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
