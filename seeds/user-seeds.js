import { User } from "../models/index.js";

const userData = [
  {
    username: "Xandromus",
    email: "Xandromus@gmail.com",
    password: "p@ssword1",
  },
  {
    username: "Lernantino",
    email: "Lernantino@gmail.com",
    password: "p@ssword2",
  },
];

const seedUsers = () => User.bulkCreate(userData);

export default seedUsers;
