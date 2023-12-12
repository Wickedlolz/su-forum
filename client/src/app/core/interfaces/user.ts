export interface IUser {
  themes: string[];
  posts: string[];
  _id: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  photoURL?: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface IUserUpdateDto {
  tel: string;
  email: string;
  username: string;
  photoURL?: string | ArrayBuffer | null;
}

export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IUserRegisterDto {
  username: string;
  email: string;
  tel: string;
  password: string;
}
