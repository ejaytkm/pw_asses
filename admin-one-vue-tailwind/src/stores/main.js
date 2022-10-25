import { defineStore } from "pinia";
import axios from "axios";

import Util from "@/util";
import { apiConfig } from "@/config.js";

import { useRouter } from "vue-router";
const router = useRouter();

export const useMainStore = defineStore("main", {
  persist: true,

  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    loggedIn: false,

    auth: {
      accessToken: null,
      expiresIn: null,
      refreshToken: null,
    },

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
  }),

  getters: {
    getLoginState: (state) => {
      return state.loggedIn;
    },

    // getLoginState: (state) => {
    //   return JSON.parse(localStorage.getItem("app_prcms"));
    // },
  },

  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },

    fetch(sampleDataKey) {
      axios
        .get(`data-sources/${sampleDataKey}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    isLoggedIn() {
      const userInfo =
        JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser
      for (const property of Object.keys(payload)) {
        if (payload[property] != null) {
          // If some of user property is null - user default property defined in state.AppActiveUser
          state.AppActiveUser[property] = payload[property]

          // Update key in localStorage
          userInfo[property] = payload[property]
        }
      }

      // Store data in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    setLoginState(payload) {
      this.userName = payload.name;
      this.userEmail = payload.email;
      this.loggedIn = true;

      this.auth.accessToken = payload.accessToken;
      this.auth.expiresIn = payload.expiresIn;
      this.auth.refreshToken = payload.refreshToken;
    },

    async setLogoutState() {
      this.userName = null;
      this.userEmail = null;
      this.loggedIn = false;

      this.auth.accessToken = null;
      this.auth.expiresIn = null;
      this.auth.refreshToken = null;
    },

    async fetchCheckAuth() {
      let token = this.auth.accessToken;

      try {
        const data = await axios.post(`${apiConfig.path}/token/valid`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (data.status !== 200) {
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
