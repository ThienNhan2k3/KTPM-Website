import { faker } from "@faker-js/faker";


const newPerson = () => {
  return {
    id: faker.string.uuid(),
    voucherCode: faker.string.alphanumeric(5),
    value: faker.number.int({ min: 1, max: 100 }),
    maxDiscount: faker.number.int({ min: 1000, max: 10000000 }),
    description: faker.lorem.sentence(),
    image: faker.image.url(),
    qrCode: faker.image.url(),
    expDate: faker.date.future().toISOString().split("T")[0],
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
  };
};

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


export const generateDataForGameAttendance = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(
      {
        id: faker.string.uuid(),
        game_id: 1,
        attendance: faker.number.int({ min: 1000, max: 2000 }),
        date: faker.date.recent({ days: 20 }).toISOString().split("T")[0]
      }
    );
    arr.push({
      id: faker.string.uuid(),
      game_id: 2,
      attendance: faker.number.int({ min: 1000, max: 2000 }),
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
