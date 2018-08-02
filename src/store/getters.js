const getters = {
  token: ({ user }) => user.token,
  roles: ({ user }) => user.roles,
  addRouters: ({ route }) => route.addRouters
}

export default getters
