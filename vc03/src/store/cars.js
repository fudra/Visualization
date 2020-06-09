import axios from "axios";
import {jsonfy, splitDataIntoRows, countItems, countableItems} from "./../helper"


export const namespaced = true;

const mutationsTypes = {
  SET_CARS: "SET_CARS",
  SET_HEADER: "SET_HEADER",
  SET_COUNTABLE: "SET_COUNTABLE",
  REST_COUNTABLE: "REST_COUNTABLE",
};

export const state = () => ({
  cars: [],
  heading: [],
  count: {},
});

export const getters = {
  cars(state) {
    return state.cars;
  },
};

export const mutations = {
  [mutationsTypes.SET_CARS](state, cars) {
    state.cars = cars;
  },
  [mutationsTypes.SET_HEADER](state, header) {
    state.header = header;
  },
  [mutationsTypes.SET_COUNTABLE](state, count) {
    state.count = Object.assign(count, state.count)
  },

  [mutationsTypes.REST_COUNTABLE](state) {
    state.count = {};
  },
};

export const actions = {
  selectUnit({ commit }, unit) {
    commit(mutationsTypes.SELECT_UNIT, unit);
  },
  clearUnit({ commit }) {
    commit(mutationsTypes.CLEAR_UNIT);
  },
  countUnits({ commit}, cars) {
    commit(mutationsTypes.REST_COUNTABLE)

    countableItems.forEach(item  => {

        let count = countItems(cars, item);

        commit(mutationsTypes.SET_COUNTABLE, {
            [item]: count
        });
    })
  } ,
  async fetch({ commit, dispatch }) {
    let { data } = await axios.get("cars.txt");

    let dataRows = splitDataIntoRows(data);

    let cars = jsonfy(dataRows);
  
    commit(mutationsTypes.SET_CARS, cars.data);
    commit(mutationsTypes.SET_HEADER, cars.header);
    dispatch("countUnits", cars.data)

  },
};



