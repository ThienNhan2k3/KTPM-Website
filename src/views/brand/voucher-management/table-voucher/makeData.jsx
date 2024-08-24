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
    id: faker.string.alphanumeric(20),
    brandId: faker.number.int({ min: 0, max: 49 }),
    voucherCode: faker.string.alphanumeric(5),
    value: faker.number.int({ min: 1, max: 100 }),
    maxDiscount: faker.number.int({ min: 1000, max: 10000000 }),
    description: faker.lorem.sentences({ min: 1, max: 4 }),
    image: faker.image.url(),
    qrCode: faker.image.url(),
    expDate: faker.date
      .between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2025-01-01T00:00:00.000Z",
      })
      .toISOString()
      .split("T")[0],
    startDate: faker.date.past({ years: 4 }).toISOString().split("T")[0],
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
    quantity: faker.number.int({ min: 0, max: 100 }),
    totalQuantity: faker.number.int({ min: 10, max: 100 }),
  };
};

export function makeData(...lens) {
  return range(lens).map(() => {
    return {
      ...newPerson(),
    };
  });
}
