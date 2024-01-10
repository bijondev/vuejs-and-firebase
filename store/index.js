// store/index.js
import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            divisions: [],
            user: null,
        };
    },
    mutations: {
        setDivisions(state, divisions) {
            state.divisions = divisions;
        },
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    actions: {
        fetchDivisions() {
            // Fetch divisions from your data source and commit to the state
            // Example:
            // const data = fetchDataFromDatabase();
            // context.commit('setDivisions', data);
        },
        loginUser(context, user) {
            context.commit('setUser', user);
        },
        logoutUser(context) {
            context.commit('clearUser');
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        user: (state) => state.user,
    },
});
