import { faker } from "@faker-js/faker";

// Helper function to format dates as dd/mm/yyyy
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

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
    dateCreate: formatDate(dateCreate),
    dateEnd: formatDate(dateEnd),
  };
};

export function makeData(...lens) {
  return lens.flatMap(len => range(len).map(() => newPerson()));
}
