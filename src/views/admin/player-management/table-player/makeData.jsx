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
    type: faker.helpers.arrayElement(["Admin", "Người chơi"]),
    avatar: faker.image.avatar(),
    fullName: faker.person.fullName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    dob: faker.date.past(30, new Date()).toISOString().split("T")[0],
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
