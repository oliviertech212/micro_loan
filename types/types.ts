export type UserType = {
  id: number;
  fname: string;
  lname: string;
  phone: string;
  password: string;
  loans:  LaonType[];
  createdAt: string;
  updatedAt: string;
  role : UserRole 
};


export type UserRole = "Admin"| "Applicant"

export type LoanStatus = "pending" | "approved" | "declined";

export type LaonType = {
  id: number;
  name: string;
  loanamount: number;
  monthlyinocme: number;
  status: LoanStatus;
  userId: number;
  owner: UserType;
  createdAt: string;
  updatedAt: string;
 
};
