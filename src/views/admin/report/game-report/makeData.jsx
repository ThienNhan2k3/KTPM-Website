import { faker } from "@faker-js/faker";


export const generateDataForNumBrands = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(
      {
        id: faker.string.uuid(),
        game_id: 1,
        brands: faker.number.int({ min: 1000, max: 2000 }),
        date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
      }
    );
    arr.push({
      id: faker.string.uuid(),
      game_id: 2,
      brands: faker.number.int({ min: 1000, max: 2000 }),
      date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
    })
  }
  return arr;
}


export const generateDataForPlayTime = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(
      {
        id: faker.string.uuid(),
        game_id: 1,
        time: faker.number.int({ min: 0, max: 8 }),
        date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
      }
    );
    arr.push({
      id: faker.string.uuid(),
      game_id: 2,
      time: faker.number.int({ min: 0, max: 8 }),
      date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
    })
  }
  return arr;
}
