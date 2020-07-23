import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { strDay, strMonth, zeroPad } from "../common/utils";
import * as power from "power";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { goals } from "user-activity";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
let lblTime = document.getElementById("time");
let lblDate = document.getElementById("date");
let batLvl = document.getElementById("battery");
let batIcon = document.getElementById("batLength");
let lblSteps = document.getElementById("steps");
let dataSteps = lblSteps.getElementById("dataCount");
let stepsArc = document.getElementById("stepsArc")
let lblActiveMins = document.getElementById("activemins");
let activeMinsArc = document.getElementById("activeMinsArc");
let lblDist = document.getElementById("distance");
let distArc = document.getElementById("distArc");
let lblCals = document.getElementById("calories");
let calsArc = document.getElementById("calsArc");
let percentage;

// Some functions

function setBatteryLevel(percent){
  
  batIcon.width = Math.round(percent * 26 / 100);
  
  if (percent <= 20) {
    batIcon.style.fill = "crimson";
  } else {
    batIcon.style.fill = "fb-aqua";
  }
}

function setStepsArc(steps, goal){
  stepsArc.sweepAngle = Math.round(steps/goal*360);
}

function setActiveMinsArc(mins, goal){
  activeMinsArc.sweepAngle = Math.round(mins/goal*360);
}

function setDistanceArc(dist, goal){
  distArc.sweepAngle = Math.round(dist/goal*360);
}

function setCalsArc(cals, goal){
  calsArc.sweepAngle = Math.round(cals/goal*360);
}



// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let now = evt.date;
  let hours = now.getHours();
  let mins = zeroPad(now.getMinutes());
  
  let curDay = now.getDay();
  let curDate = now.getDate();
  let curMonth = now.getMonth();
  
  let displayDay = strDay(curDay);
  let displayMonth = strMonth(curMonth);
  
  const {clockDisplay} = preferences;
  const displayHours = clockDisplay === "12h" ? hours % 12 || 12 : zeroPad(hours);
  

  
  lblDate.text = `${displayDay}, ${displayMonth} ${curDate}`;
  lblTime.text = `${displayHours}:${mins}`;
  batLvl.text = `${power.battery.chargeLevel}%`;
  
  
  
  dataSteps.text = `${today.adjusted.steps}`;
  setStepsArc(today.adjusted.steps, goals.steps);
  
 
  
  lblActiveMins.text = `${today.adjusted.activeMinutes}`;
  setActiveMinsArc(today.adjusted.activeMinutes, goals.activeMinutes);
  
  lblDist.text = `${(today.adjusted.distance* 0.000621371).toFixed(2)}`;
  setDistanceArc(today.adjusted.distance, goals.distance);
  
  lblCals.text = `${today.adjusted.calories}`;
  setCalsArc(today.adjusted.calories, goals.calories);
  
  setBatteryLevel(power.battery.chargeLevel);

}
