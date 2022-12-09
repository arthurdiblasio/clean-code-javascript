async function registerUser(user) {
  const { email, name, avatar } = user

  if (!avatar) return { error: 'avatar is required' }

  if(!name) return { error: 'name is required' }

  const userFound = getUserByEmail(email)
  if (userFound) {
    return { error: 'email already used' }
  }

  // Essa função realiza a conversão das imagens para JPG a fim de evitar erros de incompatibilidade.
  // Mais informações na issue https://github.com/rocketseat-education/example-repository/issues/1
  const avatarConvertedToJPG = convertImageToJPG(avatar)

  const user = await createUser({ email, name, avatar: avatarConvertedToJPG })

  return { user }
}