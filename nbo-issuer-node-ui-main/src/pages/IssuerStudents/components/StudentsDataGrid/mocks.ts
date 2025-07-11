import { faker } from "@faker-js/faker";
import { StudentType } from "@/types";

const getMockCertificates = () => {
  const count = faker.number.int(5);
  return new Array(count).fill(null).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.words(20),
  }));
};

export const MOCK_STUDENTS: StudentType[] = new Array(200)
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    avatar: "",
    firstName: faker.person.firstName("male"),
    lastName: faker.person.lastName("male"),
    dateOfBirth: faker.date.birthdate().toISOString(),
    country: faker.location.countryCode(),
    certificates: getMockCertificates(),
    email: faker.internet.email(),
    city: faker.location.city(),
    phone: faker.phone.number(),
    gender: "M",
    startDate: faker.date.future().toDateString(),
    assignedDate: faker.date.past().toISOString(),
    score: faker.number.int(100),
  }));
