import { faker } from "@faker-js/faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const dateCreate = faker.date.past();
  const dateEnd = faker.date.future(undefined, dateCreate);

  return {
    id: faker.number.int({ min: 1, max: 500 }),
    name: faker.internet.userName(15),
    type: faker.helpers.arrayElement(["Quiz", "Lắc Xì"]),
    dateCreate: dateCreate.toISOString().split("/")[0],
    dateEnd: dateEnd.toISOString().split("/")[0],
  };
};

export function makeData(...lens) {
  return lens.flatMap(len => range(len).map(() => newPerson()));
}
