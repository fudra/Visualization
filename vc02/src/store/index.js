import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    target: false,
    quizzes: [],
    timeoutIndex: 0,
    timeouts: [1000, 750, 500, 250, 100]
  },
  mutations: {
    target(state, value) {
      state.target = value.target;
    },
    quiz(state, value) {
      state.quizzes.push(value);
    },
    updateTimeout(state, value) {
      state.timeoutIndex = value;
    }
  },
  actions: {
    setTarget({ commit }, value) {
      commit("target", value);
    },
    setNewAnswer({ commit }, value) {
      commit("quiz", value);
    },
    updateTimeout({ commit, state }) {
      let idx = state.timeoutIndex;

      if (idx < state.timeouts.length - 1) {
        idx++;
      } else {
        idx = 0;
      }

      commit("updateTimeout", idx);
    }
  },
  getters: {
    hasTarget(state) {
      return state.target;
    },
    getAllQuizAnswers(state) {
      return state.quizzes;
    },
    getTimeout(state) {
      return state.timeouts[state.timeoutIndex];
    }
  }
});
