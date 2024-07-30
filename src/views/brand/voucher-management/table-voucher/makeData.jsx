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

export function makeData(...lens) {
  return range(lens).map(() => {
    return {
      ...newPerson(),
    };
  });
}
