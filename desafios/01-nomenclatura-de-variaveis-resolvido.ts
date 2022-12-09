// Nomenclatura de variáveis

const categories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getCategoryByUsername(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userResponse = await fetch(`https://api.github.com/users/${username}`);

  if (userResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const userFound = await userResponse.json()

  const categoriesSortedByMostFollowers = categories.sort((a, b) =>  b.followers - a.followers); 
  
  const categoryUser = categoriesSortedByMostFollowers.find(i => userFound.followers > i.followers)

  const result = {
    username,
    category: categoryUser.title
  }

  return result
}

getCategoryByUsername({ query: {
  username: 'josepholiveira'
}}, {})