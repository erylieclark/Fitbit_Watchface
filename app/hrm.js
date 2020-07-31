import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import document from "document";

let hrText = document.getElementById("hrText");
let hrm, hrInterval, body;

var hrValue = 0;
var bodyPresent = 0;

export function heartRate(){
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    
    console.log("access granted");
    
    hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
      hrValue = hrm.heartRate;
    });
    
    
    if (display.on){
      
      // Check for body and get reading
      if (BodyPresenceSensor) {
        
        // Creat new instance of body sensor and add event listener
        body = new BodyPresenceSensor();
        body.addEventListener("reading", () =>{
          bodyPresent = body.present;
        })
      
        body.start();
        if (!bodyPresent) {
          console.log("not on wrist");
          stopReading();
        } else {
          startReading();
          console.log("on wrist");
          console.log("should be displaying reading");
          console.log(hrText.text);
        }
        body.stop();
        
      }
    }
    else{
      // turn everything off
      stopReading();
    }
   
  }
}


function displayReading(){
  hrText.text = `${hrValue}`;
}


function startReading(){
  if (!hrInterval){
    hrm.start();
    displayReading();
    hrInterval = setInterval(displayReading, 500);
  }
}


function stopReading(){
  hrm.stop();
  clearInterval(hrInterval);
  hrInterval = null;
  console.log("Hr Interval");
  console.log(hrInterval);
  hrText.text = `~`;
}