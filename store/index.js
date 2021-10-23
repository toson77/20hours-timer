import axios from "axios";
export const state = () => ({
  idToken: null,
  uid: null
})

export const getters = {
  idToken: state => state.idToken,
  uid: state => state.uid
}

export const mutations = {
  updateIdToken (state, idToken) {
    state.idToken = idToken;
  },
  updateUid (state, uid) {
    state.uid = uid;
  }
}

export const actions = {
  login ({ commit }, authData) {
    return axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        },
        {
          params: {
            key: process.env.apiKey
          }
        }
      )
      .then(responce => {
        commit('updateUid', responce.data.localId);
        commit('updateIdToken', responce.data.idToken);
        console.log(responce);
      });
  },
  register ({ commit }, authData) {
    return axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        },
        {
          params: {
            key: process.env.apiKey
          }
        }
      )
      .then(responce => {
        commit('updateIdToken', responce.data.idToken);
        commit('updateUid', responce.data.localId);
        console.log(responce);
      });
  },

}
