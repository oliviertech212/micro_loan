import { UserType ,LaonType } from "@/types/types";

const users: UserType[] = [
  {
    id: 1,
    fname: "John",
    lname: "Doe",
    phone: "0734567890",
    password: "password123",
    loans: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    role: "Admin",
  },
  {
    id: 2,
    fname: "Jane",
    lname: "Smith",
    phone: "0734567891",
    password: "password123",
    loans: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    role: "Applicant",
  },
];

const loans: LaonType[] = [
  {
    id: 1,
    name: "Car Loan",
    loanamount: 10000,
    monthlyinocme: 3000,
    status: "pending",
    userId: 1,
    owner: users[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Home Loan",
    loanamount: 50000,
    monthlyinocme: 5000,
    status: "approved",
    userId: 1,
    owner: users[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Personal Loan",
    loanamount: 2000,
    monthlyinocme: 2500,
    status: "declined",
    userId: 1,
    owner: users[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Education Loan",
    loanamount: 15000,
    monthlyinocme: 4000,
    status: "pending",
    userId: 2,
    owner: users[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Business Loan",
    loanamount: 30000,
    monthlyinocme: 6000,
    status: "approved",
    userId: 2,
    owner: users[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


users[0].loans = loans.filter(loan => loan.userId === 1);
users[1].loans = loans.filter(loan => loan.userId === 2);

export { users, loans };