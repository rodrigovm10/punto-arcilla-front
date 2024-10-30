export const tokenSanitized = (token: string) => {
  return `Bearer ${token.replace(/["\\]/g, '')}`
}
