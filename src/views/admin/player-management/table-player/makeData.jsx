import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    id: faker.string.alphanumeric(10),
    type: faker.helpers.arrayElement(["Người chơi"]),
    avatar: faker.image.avatar(),
    fullName: faker.person.fullName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: "0" + faker.string.numeric(9),
    dob: faker.date
      .birthdate({ min: 18, max: 90, mode: "age" })
      .toISOString()
      .split("T")[0],
    gender: faker.helpers.arrayElement(["Nam", "Nữ"]),
    facebookacc: faker.internet.userName() + "@facebook.com",
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
  };
};

export function makeData(...lens) {
  return range(lens).map(() => {
    return {
      ...newPerson(),
    };
  });
}
