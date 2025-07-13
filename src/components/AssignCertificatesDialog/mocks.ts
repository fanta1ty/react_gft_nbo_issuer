import { faker } from "@faker-js/faker";
import { StudentType } from "@/types";

export type StudentOptionType = Pick<
  StudentType,
  "id" | "avatar" | "firstName" | "lastName"
>;

export const MOCK_STUDENTS: StudentOptionType[] = new Array(200)
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    avatar: "",
    firstName: faker.person.firstName("male"),
    lastName: faker.person.lastName("male"),
  }));
