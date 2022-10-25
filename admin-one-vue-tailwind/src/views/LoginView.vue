<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk, mdiLayersTriple } from "@mdi/js";
import axios from "axios";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import Util from "@/util";

import { useMainStore } from "@/stores/main";
import { apiConfig } from "@/config.js";

const form = reactive({
  login: "",
  pass: "",
  remember: true,
});

const router = useRouter();

const submit = async () => {
  const login = form.login;
  const password = form.pass;
  const client = "express-client";
  const secret = "express-secret";
  var authorizationBasic = window.btoa(client + ":" + secret);

  // console.log(useMainStore().loggedIn);
  axios
    .post(`${apiConfig.path}/oauth/token`,
      {
        username: login,
        grant_type: "password",
        password: password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + authorizationBasic,
        },
      }
    )
    .then(async (res) => {
      if (res.status !== 200) {
        throw new Error(
          "Invalid credentials, please make sure your store username or password are correct."
        );
      }

      const accessToken = res.data.access_token;
      const expiresIn = res.data.access_token;
      const refreshToken = res.data.access_token;

      await useMainStore().setLoginState({
        name: login,
        email: login,
        accessToken,
        expiresIn,
        refreshToken,
      });
      router.push("/");
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    });
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
