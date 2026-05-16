import { cookies } from 'next/headers'

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function createSession() {
  const cookieStore = await cookies()
  cookieStore.set('admin-session', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  return session?.value === 'true'
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-session')
}

export async function verifyCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
