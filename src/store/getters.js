const getters = {
  token: ({ user }) => user.token,
  addRouters: ({ route }) => route.addRouters
}

export default getters
