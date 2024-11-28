export interface Profile {
  // id: string
  userId: string
  name: string
  bussinessDescription?: string
  avatar?: string
}

export interface UpdateProfile {
  name?: string
  bussinessDescription?: string
}
