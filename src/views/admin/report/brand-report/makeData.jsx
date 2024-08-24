import { faker } from "@faker-js/faker";



/**
CREATE TABLE GameAttendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    date DATE NOT NULL,
    attendance INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Games(id)
);
 */

/**
 * Table: UserAttendance

  CREATE TABLE UserAttendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (game_id) REFERENCES Games(id)
  );
 * 
 */


export const makeData = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(
      {
        id: faker.string.uuid(),
        game_id: 1,
        brand_name: faker.string.alphanumeric(8),
        event: faker.number.int({ min: 1000, max: 2000 }),
        voucher: faker.number.int({ min: 1000, max: 2000 }),
        date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
      }
    );
    arr.push({
      id: faker.string.uuid(),
      game_id: 2,
      brand_name: faker.string.alphanumeric(),
      event: faker.number.int({ min: 1000, max: 2000 }),
      voucher: faker.number.int({ min: 1000, max: 2000 }),
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

