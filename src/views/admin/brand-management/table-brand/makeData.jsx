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
    id: faker.string.alphanumeric(8),
    brandName: faker.company.name(),
    industry: faker.person.jobTitle(),
    address: faker.location.streetAddress(),
    gps: faker.location.nearbyGPSCoordinate(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: "0" + faker.string.numeric(9),
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
