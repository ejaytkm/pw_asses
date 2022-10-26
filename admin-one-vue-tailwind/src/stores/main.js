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

    employee_outlet_id: null,
    user_id: null,
    user_type_id: null,
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

    getUserId: (state) => {
      return state.user_id;
    },

    getUserTypeId: (state) => {
      return parseInt(state.user_type_id);
    },

    getEmployeeOutlet: (state) => {
      return state.employee_outlet_id;
    },
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

      this.employee_outlet_id = null;
      this.user_id = null;
      this.user_type_id = null;

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

    async getAccountDetails() {
      const queryBody = `{
        users(
          filter: { username: {eq: "${this.userEmail}"} }
          sort: [["id", "desc"]]
        ) {
          rows {
              id
              name
              username
              user_type_id
              createdAt
              updatedAt
          }
          count
          total
        }
      }`;

      await axios
        .post(`${apiConfig.path}/graphql`,
          {
            query: queryBody,
          },
          {
            headers: {
              // Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(
              "Error in retrieving users list. Please try again later"
            );
          }

          return res.data.data;
        })
        .then((data) => {
          this.user_type_id = data.users.rows[0].user_type_id;
          this.user_id = data.users.rows[0].id;
        })
        .catch((error) => {
          const errorMessage = Util.ParseError(error);
          alert(errorMessage.message);
        });
    },

    async findAllocatedStore() {
      const queryBody = `{
        userOutlets(
          sort: [["id", "desc"]]
          filter: {
            user_id: { eq: "${this.getUserId}" }
            deleted_at: { is: null }
          }
        ) {
          rows {
            id
            user_id
            outlet_id
            created_at
            updated_at
            deleted_at
          }
          count
          total
        }
      }`;

      await axios
        .post(`${apiConfig.path}/graphql`,
          {
            query: queryBody,
          },
          {
            headers: {
              // Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(
              "Sorry, we couldn't find your allocated store. Please wait or contact admin to speed up this process."
            );
          }

          return res.data.data;
        })
        .then((data) => {
          if (!data.userOutlets.rows[0]) {
            throw new Error(
              "Sorry, we couldn't find your allocated store. Please wait or contact admin to speed up this process."
            );
          }

          this.employee_outlet_id = data.userOutlets.rows[0].outlet_id;
        })
        .catch((error) => {
          const errorMessage = Util.ParseError(error);
          alert(errorMessage.message);
        });
    }
  },
});
