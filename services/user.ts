export const createUser = async () => {
  const res = await fetch('http://localhost:3000/api/auth/register')
  const data = res.json()

  console.log(data)
}
