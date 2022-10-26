<script setup>
import { mdiAccountRemove, mdiMonitorCellphone, mdiAccountGroup, mdiPlusCircleOutline } from "@mdi/js";
import axios from "axios";
import { apiConfig } from "@/config.js";
import SectionMain from "@/components/SectionMain.vue";
import TableBasic from "@/components/TableBasic_User.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import Util from "@/util";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import BaseButton from '@/components/BaseButton.vue';
import NotificationBar from "@/components/NotificationBar.vue";

import { reactive, onMounted, ref, computed } from "vue";

const form = reactive({
  name: "",
  rows: [],
  total: 10, // totalCount
  perPage: 15, // limit
  page: 1, // offset
  sort: [["id", "desc"]],
  filter: {
    deleted_at: { is: null },
  },
  errorMessage: [],
});

const createForm = reactive({
  username: null,
  password: null,
  confirmPassword: null,
  name: null,
});

onMounted(() => {
  getUserTypeData();
  getUsersData();
});

const dataEntries = computed(() => form.rows);
const errorMessage = computed(() => form.errorMessage);
const isModalActive = ref();
const userTypeOptions = ref([]);

const createUser = () => {
  if (!createForm.username || !createForm.password || !createForm.name) {
    isModalActive.value = true;
    return alert("Please make sure all forms are filled");
  };

  if (createForm.confirmPassword !== createForm.password) {
    isModalActive.value = true;
    return alert("Please make sure your confirm password is identical to password.");
  }

  axios
    .post(`${apiConfig.path}/oauth/signup`,
      {
        username: createForm.username,
        password: createForm.password,
        name: createForm.name,
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
        throw new Error("Error in creating ingredient. Please try again later");
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      // Reset Defaults
      createForm.name = "";

      // Retrigger Data;
      getUsersData();
    });
};

const updateUser = (entry) => {
  // Delete data, recall API for now
  const queryBody = `mutation {
    updateUser(
      filter: { id: { eq: "${entry.id}" } }
      input: {
        user_type_id: ${entry.userType.id},
        name: "${entry.name}"
      }
    ) {
      id,
      name
    }
  }`;

  axios
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
        throw new Error("Error in updating user details. Please try again.");
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      getUsersData();
    });
};

const deleteUser = (value) => {
  // Delete data, recall API for now
  const queryBody = `mutation {
    updateUser(
      filter: { id: { eq: "${value}" } }
      input: { user_type_id: null }
    ) {
      id,
      name
    }
  }`;

  axios
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
        throw new Error("Error in creating ingredient. Please try again later");
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      getUsersData();
    });
};

const getUserTypeData = () => {
};

const getUsersData = () => {
  let filter = JSON.stringify(form.filter);
  filter = filter.replace(/"([^"]+)":/g, '$1:');

  const queryBody = `{
    users(
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

  axios
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
      form.rows = data.users.rows;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="isModalActive"
      title="Create User"
      @confirm="createUser"
    >
      <FormField
        label="Username"
        help="Does NOT have to be an email. Choose a username that has not been taken by other employees."
      >
        <FormControl v-model="createForm.username" type="text" placeholder=""/>
      </FormField>
      <FormField
        label="Employee Name"
        help="Employee name. Used for displaying public data in system."
      >
        <FormControl v-model="createForm.name" type="text" placeholder=""/>
      </FormField>
      <FormField
        label="Password"
        help="Password should be more than 8 characters, & special symbols are not allowed."
      >
        <FormControl v-model="createForm.password" type="password" placeholder=""/>
      </FormField>
      <FormField label="Confirm Password">
        <FormControl v-model="createForm.confirmPassword" type="password" placeholder=""/>
      </FormField>
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountGroup"
        title="User List"
        main
      >
        <BaseButton
          @click="isModalActive = true"
          :icon="mdiPlusCircleOutline"
          label="Create New User"
          color="success"
          rounded-full
        />
      </SectionTitleLineWithButton>

      <NotificationBar
        v-if="errorMessage && errorMessage.length > 0"
        color="danger"
        :icon="mdiMonitorCellphone"
      >
        <b>Error</b>
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableBasic
          :checkable="false"
          :rows="dataEntries"
          :perPage="form.perPage"
          @confirm:update="updateUser"
          @confirm:delete="deleteUser"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
