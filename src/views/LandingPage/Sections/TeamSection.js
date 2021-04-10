import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import mel from "assets/img/faces/mel.jpg";
import ryan from "assets/img/faces/ryan.jpg";
import wilb from "assets/img/faces/wilb.jpg";
import jaz from "assets/img/faces/jazreel.jpg";
import gab from "assets/img/faces/gab.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const {teamRef} = props;
  return (
    <div className={classes.section} style={{paddingTop: "45px"}}>
      <h2 className={classes.title}>Our team</h2>
      <div ref={teamRef}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={gab} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Gabriel Koh
                <br />
                <small className={classes.smallTitle}>1003882</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ryan} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Ryan Gen
                <br />
                <small className={classes.smallTitle}>1003479</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={wilb} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Wilbert Aristo
                <br />
                <small className={classes.smallTitle}>1003742</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer style={{justifyContent: "center"}}>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={jaz} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Jazreel Kwek
                <br />
                <small className={classes.smallTitle}>1003830</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={mel} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Melissa
                <br />
                <small className={classes.smallTitle}>1003850</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
