import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (num) => {
  return {
    id: num,
    brandName: faker.company.name(),
    industry: faker.person.jobTitle(),
    address: faker.location.streetAddress(),
    gps: faker.location.nearbyGPSCoordinate(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
  };
};

export function makeData(...lens) {
  return range(lens).map((index) => {
    return {
      ...newPerson(index),
    };
  });
}
