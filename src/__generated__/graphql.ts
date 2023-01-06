/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  is_advisor?: Maybe<Advisor>;
  is_company?: Maybe<CompanyPerson>;
  is_student?: Maybe<Student>;
  password: Scalars['String'];
  role: Role;
  status: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Advisor = {
  __typename?: 'Advisor';
  account: Account;
  advisor_id: Scalars['String'];
  announcements: Array<Maybe<Announcement>>;
  created_at: Scalars['DateTime'];
  faculty: Scalars['String'];
  is_committee: Scalars['Boolean'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type AdvisorAccountInput = {
  email: Scalars['String'];
  faculty: Scalars['String'];
  is_committee: Scalars['Boolean'];
  last_name: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Announcement = {
  __typename?: 'Announcement';
  advisor_id: Advisor;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AnnouncementInput = {
  advisor_id: Scalars['String'];
  desc: Scalars['String'];
  title: Scalars['String'];
};

export type AuthData = {
  __typename?: 'AuthData';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  is_advisor?: Maybe<Advisor>;
  is_company?: Maybe<CompanyPerson>;
  is_student?: Maybe<Student>;
  password: Scalars['String'];
  role: Role;
  status: Scalars['String'];
  token: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Company = {
  __typename?: 'Company';
  address: Scalars['String'];
  business_type: Scalars['String'];
  company_id: Scalars['String'];
  company_persons: Array<Maybe<CompanyPerson>>;
  created_at: Scalars['DateTime'];
  name: Scalars['String'];
  phone_number: Scalars['String'];
  updated_at: Scalars['DateTime'];
  website_url: Scalars['String'];
};

export type CompanyInput = {
  address: Scalars['String'];
  business_type: Scalars['String'];
  name: Scalars['String'];
  phone_number: Scalars['String'];
  website_url: Scalars['String'];
};

export type CompanyPerson = {
  __typename?: 'CompanyPerson';
  account: Account;
  company_id: Company;
  company_person_id: Scalars['String'];
  created_at: Scalars['DateTime'];
  full_name: Scalars['String'];
  is_coordinator: Scalars['Boolean'];
  job_title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type CompanyPersonInput = {
  company_id: Scalars['String'];
  email: Scalars['String'];
  full_name: Scalars['String'];
  is_coordinator: Scalars['Boolean'];
  job_title: Scalars['String'];
  password: Scalars['String'];
};

export type GetWithKeyInput = {
  target?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnnouncement?: Maybe<Announcement>;
  createCompany: Company;
  deleteAdvisorAccount?: Maybe<Account>;
  deleteAnnouncement?: Maybe<Announcement>;
  deleteCompany?: Maybe<Company>;
  deleteCompanyPersonAccount?: Maybe<Account>;
  registerAdvisor: Account;
  registerCompanyPerson: Account;
  signIn?: Maybe<AuthData>;
  studentRegister: Account;
  updateAccount: Advisor;
  updateAnnouncement?: Maybe<Announcement>;
  updateCompany?: Maybe<Company>;
  updateCompanyPerson?: Maybe<CompanyPerson>;
};


export type MutationCreateAnnouncementArgs = {
  announcement_info: AnnouncementInput;
};


export type MutationCreateCompanyArgs = {
  company_info: CompanyInput;
};


export type MutationDeleteAdvisorAccountArgs = {
  id: Scalars['String'];
};


export type MutationDeleteAnnouncementArgs = {
  announcement_id: Scalars['String'];
};


export type MutationDeleteCompanyArgs = {
  delete_by_id: Scalars['String'];
};


export type MutationDeleteCompanyPersonAccountArgs = {
  id: Scalars['String'];
};


export type MutationRegisterAdvisorArgs = {
  advisorAccountInfo: AdvisorAccountInput;
};


export type MutationRegisterCompanyPersonArgs = {
  CompanyPersonAccountInfo: CompanyPersonInput;
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationStudentRegisterArgs = {
  student_register_input: StudentRegisterInput;
};


export type MutationUpdateAccountArgs = {
  updateInfo: UpdateAdvisorInput;
};


export type MutationUpdateAnnouncementArgs = {
  update_input: UpdateAnnouncementInput;
};


export type MutationUpdateCompanyArgs = {
  update_input: UpdateCompanyInput;
};


export type MutationUpdateCompanyPersonArgs = {
  update_input: UpdateCompanyPersonInput;
};

export type Query = {
  __typename?: 'Query';
  getAccount?: Maybe<Account>;
  getAccounts: Array<Maybe<Account>>;
  getAdvisorAccount?: Maybe<Account>;
  getAdvisorAccounts: Array<Maybe<Account>>;
  getAllCompanies: Array<Maybe<Company>>;
  getAnnouncement?: Maybe<Announcement>;
  getAnnouncements: Array<Maybe<Announcement>>;
  getCompanyById?: Maybe<Company>;
  getCompanyByKey?: Maybe<Company>;
  getCompanyPersonAccount?: Maybe<Account>;
  getCompanyPersonAccounts: Array<Maybe<Account>>;
  getMe?: Maybe<Account>;
};


export type QueryGetAccountArgs = {
  account_id: Scalars['String'];
};


export type QueryGetAdvisorAccountArgs = {
  advisorId: Scalars['String'];
};


export type QueryGetAnnouncementArgs = {
  with_key: GetWithKeyInput;
};


export type QueryGetCompanyByIdArgs = {
  company_id: Scalars['String'];
};


export type QueryGetCompanyByKeyArgs = {
  with_key: GetWithKeyInput;
};


export type QueryGetCompanyPersonAccountArgs = {
  account_id: Scalars['String'];
};

/** type of user */
export enum Role {
  Advisor = 'ADVISOR',
  Committee = 'COMMITTEE',
  Company = 'COMPANY',
  Student = 'STUDENT'
}

export type Student = {
  __typename?: 'Student';
  account: Account;
  lastname: Scalars['String'];
  name: Scalars['String'];
  student_id: Scalars['String'];
};

export type StudentRegisterInput = {
  email: Scalars['String'];
  lastname: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  student_id: Scalars['String'];
};

export type UpdateAdvisorInput = {
  faculty: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  is_committee: Scalars['Boolean'];
  last_name: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateAnnouncementInput = {
  desc: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateCompanyInput = {
  address: Scalars['String'];
  business_type: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  phone_number: Scalars['String'];
  website_url: Scalars['String'];
};

export type UpdateCompanyPersonInput = {
  full_name: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  is_coordinator: Scalars['Boolean'];
  job_title: Scalars['String'];
};
