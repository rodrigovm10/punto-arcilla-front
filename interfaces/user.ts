export interface CreateUserForm {
  email: string
  password: string
  confirmPassword: string
}

export interface CreateUser {
  email: string
  password: string
}

export interface UserRole {
  label: string
  value: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface UserLogged {
  name: string
  email: string
}
