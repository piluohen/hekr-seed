const getters = {
  token: ({ user }) => user.token,
  addRouters: ({ route }) => route.addRouters,
  authorities: ({ user }) => user.authorities
}

export default getters
