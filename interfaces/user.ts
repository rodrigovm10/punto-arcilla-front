export interface CreateUserForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface CreateUser {
  name: string
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
