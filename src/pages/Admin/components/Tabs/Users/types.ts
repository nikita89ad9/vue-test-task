export interface UserModel {
  name: string;
  surname: string;
  email: string;
  department: string;
  password: string;
}

export interface UserUpdateModel {
  name: string;
  surname: string;
  department: string;
  professionalLevel: string;
  jobTitle: string;
  avatar: File | string;
}
