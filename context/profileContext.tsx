// import { Profile } from '@/interfaces/profile'
// import { createContext, Dispatch, useState } from 'react'

// interface ProfileContextType {
//   profile: Profile | null
//   createProfile: Dispatch
// }

// export const ProfileContext = createContext<ProfileContextType | undefined>({
//   profile: null
// })

// export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
//   const [profile, setProfile] = useState(null)

//   return (
//     <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
//   )
// }
