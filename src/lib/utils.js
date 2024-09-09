import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { useHeaderTitle } from "@/hooks/useHeaderTitle";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function changeHeaderTitle(newTitle) {
  const { headerTitle, setHeaderTitle } = useHeaderTitle();
  setHeaderTitle(newTitle);
}

function convertToDateWithoutTime(date) {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`
}


export const convertToPlayTimeChartData = (rawData) => {
  const newData = [];
  const dateSet = new Set();
  for (let i = 0; i < rawData.length; i++) {
    const date = convertToDateWithoutTime(new Date(rawData[i].start_time));
    if (dateSet.has(date)) {
      continue;
    }
    
    dateSet.add(date);
    const time = (new Date(rawData[i].end_time) - new Date(rawData[i].start_time)) / (1000 * 60 * 60) 
    const obj = {
      LacXi: rawData[i].Event.type === "Lắc xì" ? time : 0,
      Quiz: rawData[i].Event.type === "Quiz" ? time : 0,
      date: date
    };
    let count = 1;
    for (let j = i + 1; j < rawData.length; j++) {
      if (date === convertToDateWithoutTime(rawData[j].date)) {
        obj.LacXi += rawData[j].Event.type === "Lắc xì"  ? (new Date(rawData[j].end_time) - new Date(rawData[j].start_time)) / (1000 * 60 * 60)  : 0;
        obj.Quiz += rawData[j].Event.type === "Quiz" ? (new Date(rawData[j].end_time) - new Date(rawData[j].start_time)) / (1000 * 60 * 60)  : 0;
        count += 1;
      }
    }
    newData.push({
      LacXi: obj.LacXi / count,
      Quiz: obj.Quiz / count,
      date
    });
  }
  console.log(newData);
  newData.sort(function(a, b){
    return new Date(a.date) - new Date(b.date);
  });
  
  return newData;
}

export const convertToGameAttendanceChartData = (rawData) => {
  const newData = [];
  const dateSet = new Set();
  for (let i = 0; i < rawData.length; i++) {
    const date = convertToDateWithoutTime(new Date(rawData[i].start_time));
    if (dateSet.has(date)) {
      continue;
    }
    
    dateSet.add(date);
    const obj = {
      LacXi: rawData[i].Event.type === "Lắc xì" ? 1 : 0,
      Quiz: rawData[i].Event.type === "Quiz" ? 1 : 0,
      date: date
    };
    for (let j = i + 1; j < rawData.length; j++) {
      if (date === convertToDateWithoutTime(rawData[j].date)) {
        obj.LacXi += rawData[j].Event.type === "Lắc xì"  ? 1  : 0;
        obj.Quiz += rawData[j].Event.type === "Quiz" ? 1  : 0;
      }
    }
    newData.push(obj);
  }
  console.log(newData);
  newData.sort(function(a, b){
    return new Date(a.date) - new Date(b.date);
  });
  
  return newData;
}