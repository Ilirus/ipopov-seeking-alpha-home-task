import apiClient from '@/services/axios/apiClient'
import type { User } from '@/types/user/user'
const USER_PATH = '/user'

export const fetchUser = async (): Promise<User> => {
    const { data } = await apiClient.get<User>(USER_PATH)
    return data
}
