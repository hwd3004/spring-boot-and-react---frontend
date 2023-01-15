interface User {
  id?: number;
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  confirmEmail?: string;
  image?: string | Blob;
}

export default User;
