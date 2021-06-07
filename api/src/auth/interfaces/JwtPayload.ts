export interface JwtPayload {
    sub: number
    userId: number
    username: string
    roles?: string[]
  }