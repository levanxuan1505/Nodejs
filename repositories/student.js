import Exception from "../exceptions/Exception.js";
import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";
import { print } from "../helpers/print.js";
const getAllStudents = async ({ page, size, searchString }) => {
  //agreegate data
  page = parseInt(page);
  size = parseInt(size);
  let filteredStudents = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
        ],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredStudents;
};
const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Student not found with id " + studentId);
  }
  return student;
};
const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  try {
    debugger;
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    debugger;
    return student;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception("Input Error: ", exception.errors);
    }
    debugger;
  }
  debugger;
};
const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  const student = await Student.findById(id);
  student.name = name ?? student.name;
  student.email = email ?? student.email;
  student.languages = languages ?? student.languages;
  student.gender = gender ?? student.gender;
  student.phoneNumber = phoneNumber ?? student.phoneNumber;
  student.address = address ?? student.address;
  await student.save();
  return student;
};
async function generateFakeStudents() {
  let fakeStudents = [];
  for (let i = 0; i < 1000; i++) {
    let fakeStudent = {
      name: `${faker.name.fullName()}-fake`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Spanish"]),
        faker.helpers.arrayElement(["French", "German"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.address.streetAddress(),
    };
    fakeStudents.push(fakeStudent);
  }
  debugger;
  await Student.insertMany(fakeStudents);
}
export default {
  getAllStudents,
  getStudentById,
  insertStudent,
  generateFakeStudents,
  updateStudent,
};
