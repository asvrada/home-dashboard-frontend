import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { getColor } from '../../../helpers/utils';

function getPercentage(current: number, total: number): number {
  // The percentage of the progress [0, 100]
  let percentage = 0;
  if (current > 0 && total >= 0) {
    percentage = Math.min(100,
      Math.max(0,
        Math.round(current / total * 100)));
  }

  return percentage;
}

const useStylesBar = makeStyles<any, any>(() => ({
  root: {
    position: 'relative',
    'height': '35px',
    'width': '80%',
    'margin': '0 auto',
  },
  barHeight: {
    'height': '100%',
  },
  barPositionAbsolute: {
    position: 'absolute',
  },
  barText: {
    'z-index': props => props.baseZIndex + 3,
    'margin-left': '-2px',
    'margin-top': '6px',
    'left': '50%',
    'text-shadow': '2px 2px 5px gray',
    '& .left': {
      'position': 'absolute',
      'right': '0',
      'margin-right': '10px',
    },
    '& .middle': {
      'position': 'relative',
    },
    '& .right': {
      'position': 'absolute',
      'margin-left': '4px',
    },
  },
  barSeparator: {
    'z-index': props => props.baseZIndex + 1,
    'position': 'absolute',
    'width': '2px',
    'height': '100%',
    'background-color': '#BDBDBD',
    'opacity': '0.4',
  },
  barOverlay: {
    width: props => props.textWidth,
    'background-color': props => props.textColor,
    'z-index': props => props.baseZIndex + 2,
    opacity: '0.8',
  },
  barBackground: {
    width: '100%',
    'z-index': props => props.baseZIndex,
    'background-color': 'grey',
    'opacity': '0.1'
  },
  barRadius: {
    'border-radius': props => `${props.radius}px`,
  },
}));

function Bar({text, current, total}: any): any {
  const percentage = getPercentage(current, total);

  // red
  const colorZero = [255, 0, 0];
  // yellow
  const colorMiddle = [255, 255, 0];
  // green
  const colorFull = [0, 255, 0];

  // generate color array
  const colorArray = getColor([
      [0.1, colorZero],
      [0.5, colorMiddle],
      [1, colorFull],
    ],
    percentage / 100);

  const textWidth = `${percentage}%`;
  // color array to rgb(x,y,z)
  const textColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

  const classes = useStylesBar({
    textWidth, textColor, baseZIndex: 10, radius: 5,
  });

  return (
    <Box>
      <Typography>
        {text}
      </Typography>

      <Box className={`${classes.root}`}>
        <Typography
          className={`${classes.barText} ${classes.barPositionAbsolute} ${classes.barHeight}`}
        >
          <span className={'left'}>{current}</span>
          <span className={'middle'}>/</span>
          <span className={'right'}>{total}</span>
        </Typography>

        {/* overlay bar */}
        <div
          className={`${classes.barOverlay} ${classes.barRadius} ${classes.barPositionAbsolute} ${classes.barHeight}`}
        />

        {/* separator */}
        <div className={`${classes.barSeparator}`}
             style={{'left': '25%'}} />
        <div className={`${classes.barSeparator}`}
             style={{'left': '50%'}} />
        <div className={`${classes.barSeparator}`}
             style={{'left': '75%'}} />

        {/* background bar */}
        <div
          className={`${classes.barBackground} ${classes.barRadius} ${classes.barPositionAbsolute} ${classes.barHeight}`}
        />
      </Box>
    </Box>
  );
}

const useStylesCircle = makeStyles(() => ({
  progressCircle: {
    'max-width': '86px',
    'margin': 'auto'
  },
}));

function Circle({text, current, total}: any): any {
  const classes = useStylesCircle();

  const percentage = getPercentage(current, total);

  // red
  const colorZero = [255, 0, 0];
  // yellow
  const colorMiddle = [255, 255, 0];
  // green
  const colorFull = [0, 255, 0];

  // generate color array
  const colorArray = getColor([
      [0.1, colorZero],
      [0.5, colorMiddle],
      [1, colorFull],
    ],
    percentage / 100);

  // color array to rgb(x,y,z)
  const textColor = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;

  return (
    <Box>
      <Typography>{text}</Typography>
      {/*padding left and right*/}
      <Box px={2}>
        <Box className={classes.progressCircle}>
          <CircularProgressbarWithChildren
            counterClockwise={true}
            value={percentage}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: textColor,
              trailColor: 'rgba(128,128,128,0.1)'
            })}
          >
            <ProgressBarContent current={current} total={total} />
          </CircularProgressbarWithChildren>
        </Box>
      </Box>
    </Box>
  );
}

function ProgressBarContent({current, total}: any) {
  return (
    <div>
      <div>{current}</div>
      <hr style={{margin: 0}}/>
      <div>{total}</div>
    </div>
  );
}

/**
 * Display money remaining for this month
 * Input key:
 * 1. 当日预算/共计
 *   budgetToday, budgetTodayTotal
 * 2. 当月预算/共计
 *   budgetMonth, budgetMonthTotal
 * 3. 当月预计存款
 *   savingMonth, incomeMonthTotal
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function BudgetGadget({obj}: any): any {

  return (
    <Grid container spacing={1}>
      <Hidden mdUp>
        <Grid item xs={4}>
          {/* 今日预算 */}
          <Circle text={'Budget Today'}
                  current={obj.budgetToday}
                  total={obj.budgetTodayTotal} />
        </Grid>
        <Grid item xs={4}>
          {/* 本月预算 */}
          <Circle text={'Budget Month'}
                  current={obj.budgetMonth}
                  total={obj.budgetMonthTotal} />
        </Grid>
        {/* 本月存款 */}
        <Grid item xs={4}>
          <Circle text={'Saving Month'}
                  current={obj.savingMonth}
                  total={obj.incomeMonthTotal} />
        </Grid>
      </Hidden>

      <Hidden smDown>
        <Grid item xs={4}>
          {/* 今日预算 */}
          <Bar text={'Budget Today'}
               current={obj.budgetToday}
               total={obj.budgetTodayTotal} />
        </Grid>
        <Grid item xs={4}>
          {/* 本月预算 */}
          <Bar text={'Budget Month'}
               current={obj.budgetMonth}
               total={obj.budgetMonthTotal} />
        </Grid>
        {/* 本月存款 */}
        <Grid item xs={4}>
          <Bar text={'Saving Month'}
               current={obj.savingMonth}
               total={obj.incomeMonthTotal} />
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default BudgetGadget;
