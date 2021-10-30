import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex-persistedstate',
    storage: window.sessionStorage
  })(store)
}
