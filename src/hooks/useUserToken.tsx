import { useContext } from 'react'
import { IUserTokenContext, UserTokenContext } from '../components/providers/UserTokenProvider';

interface IUseUserToken {
  userId: string
  setUserId: (value: string) => void
}

export default function useUserToken (): IUseUserToken {
  const { userId, setUserId } = useContext(UserTokenContext) as IUserTokenContext

  return { userId, setUserId }
}
