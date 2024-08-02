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
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    type: faker.helpers.randomize(['Quiz', 'Lắc xì']),
    dateCreate: dateCreate.toISOString().split("T")[0],
    dateEnd: dateEnd.toISOString().split("T")[0],
  };
};

export function makeData(...lens) {
  return lens.flatMap(len => range(len).map(() => newPerson()));
}
