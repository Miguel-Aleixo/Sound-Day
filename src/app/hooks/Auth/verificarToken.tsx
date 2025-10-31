import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

interface TokenPayload {
  sub: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}

export function useToken(): TokenPayload | null {
  const token = Cookies.get('token')
  if (!token) return null

  try {
    return jwtDecode<TokenPayload>(token)
  } catch {
    return null
  }
}
