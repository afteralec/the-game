import { useState, useEffect } from "react";
import type { ReactElement } from "react";
import type { Dispatch, SetStateAction, ChangeEvent } from "react";
import type { Grid } from "types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";
import {
  InboxRounded as InboxRoundedIcon,
  PlayArrowRounded as PlayArrowRoundedIcon,
  PauseRounded as PauseRoundedIcon,
  CloseRounded as CloseRoundedIcon,
  CasinoRounded as CasinoRoundedIcon
} from "@material-ui/icons";
import { seeds } from "data";
import { renderSpeed } from "helpers";
import { generateGrid } from "scripts";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0
  },

  grow: {
    flexGrow: 1
  },

  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

// Component for all the controls for the game
export function Controls({
  style,
  playing,
  pause,
  play,
  clear,
  setTimeStep,
  tour,
  setTourStep,
  setGrid,
  setDrawerOpen
}: Props): ReactElement {
  const [sliderValue, setSliderValue] = useState(50),
    [playOnSliderMouseUp, setPlayOnSliderMouseUp] = useState(false);

  const classes = useStyles();

  // Effect to manage resuming the game after changing the slider speed
  useEffect(() => {
    if (playOnSliderMouseUp) {
      play();
      setPlayOnSliderMouseUp(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  // Function to manage clicking the Play button
  function handlePlay() {
    // If the tour is on the play step, push the tour forward when Play is pressed
    if (tour.play) {
      setTourStep((tourStep) => tourStep + 1);
      clear();
      return;
    }

    play();
  }

  // Function called when the slider value changes
  function sliderChange(event: ChangeEvent<{}>, value: number | number[]) {
    event.preventDefault();

    setSliderValue(+value);

    // When the slider is changed, pause the game
    pause();

    // If the game is being played and the slider changes,
    //  set playOnSliderMouseUp to true
    if (playing) setPlayOnSliderMouseUp(true);
  }

  // Updates the fundamental time step that the game is played at
  function updateTimeStep() {
    setTimeStep(1350 - sliderValue * 10);
    if (tour.slider) setTourStep((tourStep) => tourStep + 1);
  }

  // Adjust the control bar to mobile
  const hideSpeedTypography = useMediaQuery("(max-width: 799px)"),
    hideSpeedBar = useMediaQuery("(max-width: 450px)");

  return (
    <div style={style}>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => {
              setDrawerOpen(true);
            }}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <InboxRoundedIcon />
          </IconButton>
          <Fab
            color="secondary"
            aria-label="play and pause"
            className={classes.fabButton}
            onClick={() => {
              playing ? pause() : handlePlay();
            }}
          >
            {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </Fab>
          <div className={classes.grow} />
          {!hideSpeedTypography && (
            <>
              <Typography
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "0.5rem",
                  display: "inline"
                }}
              >
                Speed:{" "}
              </Typography>
              <Typography
                style={{
                  paddingLeft: "0.5rem",
                  paddingRight: "1rem",
                  display: "inline"
                }}
              >
                <strong>{renderSpeed(sliderValue)}</strong>
              </Typography>
            </>
          )}

          {!hideSpeedBar && (
            <Slider
              // Speed control slider
              style={{ width: "25%" }}
              color="secondary"
              value={sliderValue}
              onChange={sliderChange}
              onMouseDown={() => pause()}
              onMouseUp={updateTimeStep}
              onMouseLeave={updateTimeStep}
              aria-labelledby="continuous-slider"
            />
          )}
          <IconButton
            onClick={() => {
              clear();
            }}
            color="inherit"
          >
            <CloseRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const newGrid = generateGrid();
              setGrid(seeds.random(newGrid));
            }}
            edge="end"
            color="inherit"
          >
            <CasinoRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );

  // return (
  //   <div
  //     // Top-level wrapper div for the entire control unit
  //     style={{
  //       width: "100%",
  //       ...style
  //     }}
  //   >
  //     <div
  //       // Wrapper div for the majority of control buttons
  //       style={{
  //         display: "flex",
  //         position: "absolute",
  //         bottom: "7vh",
  //         left: "14vh",
  //         width: "85%"
  //       }}
  //     >
  //       <Button
  //         // Back button
  //         disabled={!!playing}
  //         onClick={back}
  //         color="primary"
  //       >
  //         Back
  //       </Button>

  //       <span
  //         // Wrapper to fade the Play/Pause buttons in and out on the appropriate tour step
  //         style={{
  //           animation: tour.play ? "fadeInAndOut 4s linear" : "",
  //           animationIterationCount: tour.play ? "infinite" : ""
  //         }}
  //       >
  //         <ButtonGroup
  //           // Button Group for Play and Pause buttons
  //           variant="contained"
  //           color="primary"
  //           aria-label="contained primary button group"
  //         >
  //           <Button
  //             // Play button
  //             variant="contained"
  //             disabled={!!playing}
  //             onClick={handlePlay}
  //             color="primary"
  //           >
  //             <PlayArrowRoundedIcon />
  //             Play
  //           </Button>
  //           <Button
  //             // Pause button
  //             variant="contained"
  //             disabled={!playing}
  //             onClick={pause}
  //             color="primary"
  //           >
  //             <PauseRoundedIcon />
  //             Pause
  //           </Button>
  //         </ButtonGroup>
  //       </span>

  //       <Button
  //         // Forward button
  //         disabled={!!playing}
  //         onClick={step}
  //         color="primary"
  //       >
  //         Forward
  //       </Button>

  //       <div
  //         // Wrapper div for Clear and Random buttons
  //         style={{
  //           marginLeft: "13rem"
  //         }}
  //       >
  //         <span
  //           // Wrapper for the Clear button to highlight during the appropriate tour step
  //           style={{
  //             animation: tour.clear ? "fadeInAndOut 4s linear" : "",
  //             animationIterationCount: tour.clear ? "infinite" : ""
  //           }}
  //         >
  //           <Button
  //             // Clear button
  //             onClick={() => {
  //               clear();

  //               // If the tour is on the Clear step, push the tour forward one step
  //               if (tour.clear) setTourStep((tourStep) => tourStep + 1);
  //             }}
  //             color="primary"
  //           >
  //             <CloseRoundedIcon />
  //             Clear
  //           </Button>
  //         </span>
  //         <Button
  //           // Random button
  //           onClick={() => {
  //             const newGrid = generateGrid();
  //             setGrid(seeds.random(newGrid));
  //           }}
  //           color="primary"
  //         >
  //           <CasinoRoundedIcon />
  //           Random
  //         </Button>
  //       </div>
  //     </div>

  //     <div
  //       // Wrapper div for the speed slider
  //       style={{
  //         position: "absolute",
  //         bottom: "5vh",
  //         right: "14vh",
  //         width: "15%"
  //       }}
  //     >
  //       <Typography style={{ display: "inline" }}>Speed: </Typography>
  //       <Typography
  //         style={{
  //           display: "inline"
  //         }}
  //       >
  //         <strong>{renderSpeed(sliderValue)}</strong>
  //       </Typography>
  //       <Slider
  //         // Speed control slider
  //         color="primary"
  //         value={sliderValue}
  //         onChange={sliderChange}
  //         onMouseDown={() => pause()}
  //         onMouseUp={updateTimeStep}
  //         onMouseLeave={updateTimeStep}
  //         aria-labelledby="continuous-slider"
  //       />
  //     </div>
  //   </div>
  // );
}

interface Props {
  style: Record<string, any>;
  playing: boolean;
  pause: () => void;
  play: () => void;
  clear: () => void;
  setTimeStep: Dispatch<SetStateAction<number>>;
  tour: { play: boolean; clear: boolean; slider?: boolean };
  setTourStep: Dispatch<SetStateAction<number>>;
  setGrid: Dispatch<SetStateAction<Grid>>;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
