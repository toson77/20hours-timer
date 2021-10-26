import axios from "axios";
import Vue from "vue";
export const state = () => ({
  idToken: null,
  uid: null,
  skills: [],
  tasks: [],
  skillsIndex: 0,
})

export const getters = {
  idToken: state => state.idToken,
  uid: state => state.uid,
  skills: state => state.skills,
  tasks: state => state.tasks,
  skillsIndex: state => state.skillsIndex,
}

export const mutations = {
  updateIdToken (state, idToken) {
    state.idToken = idToken;
  },
  updateUid (state, uid) {
    state.uid = uid;
  },
  updateSkills (state, skills) {
    state.skills.splice(0, state.skills.length);
    skills.forEach((value, index) => {
      state.skills.push(value);
    });
  },
  updateTasks (state, tasks) {
    state.tasks.splice(0, state.tasks.length);
    tasks.forEach((value, index) => {
      state.tasks.push(value);
    })
  },
  updateSkillsIndex (state, index) {
    state.skillsIndex = index;
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
  actionSetSkills ({ commit }, dataList) {
    commit('updateSkills', dataList);
  },
  actionSetTasks ({ commit }, dataList) {
    commit('updateTasks', dataList);
  },
  async changeSkill ({ commit }, authData) {
    //get tasks
    await axios
      .get(
        `https://firestore.googleapis.com/v1/${authData.apiPath}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${authData.idToken}`
          }
        }
      )
      .then(responce => {
        commit("updateTasks", responce.data.documents);
      });
    commit("updateSkillsIndex", authData.skillsIndex);
  }

}
