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


export const convertToChartData = (rawData, targetAttr) => {
  const newData = [];
  const dateSet = new Set();
  for (let i = 0; i < rawData.length; i++) {
      if (dateSet.has(rawData[i].date)) {
          continue;
      }
      dateSet.add(rawData[i].date);
      const obj = {
          quiz: rawData[i].game_id === 1 ? rawData[i][targetAttr] : 0,
          lacxi: rawData[i].game_id === 2 ? rawData[i][targetAttr] : 0,
          date: rawData[i].date
      };
      for (let j = i + 1; j < rawData.length; j++) {
          if (rawData[i].date === rawData[j].date) {
              obj.quiz += rawData[j].game_id === 1 ? rawData[j][targetAttr] : 0;
              obj.lacxi += rawData[j].game_id === 2 ? rawData[j][targetAttr] : 0;
          }
      }
      newData.push(obj);
  }

  newData.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
  })
  return newData;
}
