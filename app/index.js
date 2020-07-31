import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { strDay, strMonth, zeroPad } from "../common/utils";
import * as power from "power";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { goals } from "user-activity";
import { display } from "display";
import * as hr from "./hrm.js";

import { HeartRateSensor } from "heart-rate";

// Update the clock every minute
clock.granularity = "minutes";
let clockDate = document.getElementById("date");
let clockTime = document.getElementById("time");
let dataOptions = ["steps", "activeMinutes", "distance", "calories"];

let hrText = document.getElementById("hrText");

// Some functions

function setBatteryLevel(percent){
  let batFill = document.getElementById("batFill");
  let batText = document.getElementById("batText");
  
  batFill.width = Math.round(percent * 29 / 100);
  
  if (percent <= 20) {
    batFill.style.fill = "crimson";
  } else {
    batFill.style.fill = "fb-aqua";
  }
  
  batText.text = `${percent}%`;
}

function updateStats(dataType){
  let dataContainer = document.getElementById(dataType);
  let dataCount = dataContainer.getElementById("dataCount");
  let progressArc = dataContainer.getElementById("progressArc");
  let image = dataContainer.getElementById("image");
  let typeValue = today.adjusted[dataType];
  let typeGoal = goals[dataType];
  
  if (dataType === "distance"){
    dataCount.text = `${(typeValue*0.000621371).toFixed(2)}`;
  }else {
    dataCount.text = `${typeValue}`;
  }
  
  progressArc.sweepAngle = Math.round(typeValue/typeGoal*360);
  
  if (typeValue/typeGoal >= 1){
    image.href = 'icons/' + dataType + '_complete.png';
  }else{
    image.href = 'icons/' + dataType + '_transparent.png';
  }

  
}

function updateTime(evt){
  const {clockDisplay} = preferences;
  let now = evt.date;
  let mins = zeroPad(now.getMinutes());
  let hours = clockDisplay === "12h" ? now.getHours() % 12 || 12 : zeroPad(now.getHours());
  
  let day = strDay(now.getDay());
  let date = now.getDate();
  let month = strMonth(now.getMonth());
  
  clockDate.text = `${day}, ${month} ${date}`;
  clockTime.text = `${hours}:${mins}`;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  
  updateTime(evt);
  setBatteryLevel(power.battery.chargeLevel);
  
  for (var i = 0; i<dataOptions.length; i++){
    updateStats(dataOptions[i]);
  }

}

hr.heartRate();

display.addEventListener("change", () => {
  hr.heartRate();
});


