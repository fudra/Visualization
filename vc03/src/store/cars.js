import axios from "axios";
import {jsonfy, splitDataIntoRows, countItems, countableItems} from "./../helper"


export const namespaced = true;

const mutationsTypes = {
  SET_CARS: "SET_CARS",
  SET_CURRENT_SELECTED: "SET_CURRENT_SELECTED",
  CLEAR_CURRENT_SELECTED: "CLEAR_CURRENT_SELECTED",
  SET_HEADER: "SET_HEADER",
  SET_AXIS: "SET_AXIS",
  SET_COUNTABLE: "SET_COUNTABLE",
  REST_COUNTABLE: "REST_COUNTABLE",
  SET_COUNTRY_DATA_SET: "SET_COUNTRY_DATA_SET",
};

export const state = () => ({
  cars: [],
  headings: [],
  count: {},
  currentSelected: [],
  axis: {},
  countries: [],
});

export const getters = {
  cars(state) {
    return state.cars;
  },
  heading(state) {
    return state.headings;
  },
  countable(state) {
    return state.count;
  },
  selected(state) {
    return state.currentSelected;
  },
  axis(state) {
    return state.axis;
  },
  countries(state) {
    return state.countries;
  }
};

export const mutations = {
  [mutationsTypes.SET_CARS](state, cars) {
    state.cars = cars;
  },
  [mutationsTypes.SET_HEADER](state, headings) {
    state.headings = headings;
  },
  [mutationsTypes.SET_COUNTABLE](state, count) {
    state.count = Object.assign(count, state.count)
  },

  [mutationsTypes.REST_COUNTABLE](state) {
    state.count = {};
  },

  [mutationsTypes.SET_AXIS](state, axis) {
    state.axis = axis;
  },

  [mutationsTypes.SET_CURRENT_SELECTED](state, car) {
    state.currentSelected.push(car);
  },

  [mutationsTypes.CLEAR_CURRENT_SELECTED](state) {
    state.currentSelected = [];
  },

  [mutationsTypes.SET_COUNTRY_DATA_SET](state, countries) {
    state.countries =countries;
  },
};

export const actions = {
  selectUnit({ commit }, unit) {
    commit(mutationsTypes.SELECT_UNIT, unit);
  },
  clearUnit({ commit }) {
    commit(mutationsTypes.CLEAR_UNIT);
  },
  clearCurrentSelected({commit}) {
    commit(mutationsTypes.CLEAR_CURRENT_SELECTED);
  },
  setCurrentSelected({ commit }, car) {
    commit(mutationsTypes.SET_CURRENT_SELECTED, car);
  },
  setAxis({ commit }, axis) {
    commit(mutationsTypes.SET_AXIS, axis);
  },
  selectCountries({ commit }, countries) {
    commit(mutationsTypes.SET_COUNTRY_DATA_SET, countries);
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



