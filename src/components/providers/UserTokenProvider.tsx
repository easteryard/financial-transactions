import React, { ReactNode, useState } from 'react'

interface IProps {
  children: ReactNode
}

export interface IUserTokenContext {
  userId: string
  setUserId: (value: string) => void
}

export const UserTokenContext = React.createContext({})

export default function UserTokenProvider ({ children }: IProps) {
  const [userId, setUserId] = useState('Fake-ID')

  return (
    <UserTokenContext.Provider value={{ userId, setUserId } as IUserTokenContext}>
      {children}
    </UserTokenContext.Provider>
  )
}
