<script setup>
import { useRoute } from 'vue-router';
import {
  mdiBallotOutline,
  mdiAccount,
  mdiMail,
  mdiRefresh,
  mdiBlender,
  mdiPlaylistPlus,
  mdiCompassOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import axios from "axios";
import { apiConfig } from "@/config.js";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useMainStore } from "@/stores/main";
import Util from "@/util";

import TableOutletIngredient from "@/components/TableBasic_OutletIngredient.vue";
import TableOutletEmployee from "@/components/TableBasic_OutletEmployee.vue";

const selectOptions = [
];

import { reactive, ref, onMounted, computed } from "vue";

const route = useRoute();

const formOutlet = reactive({
  id: null,
  name: null,
  address: null,
  coordinate_x: null,
  coordinate_y: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
});

const ingredientOptions = ref([]);

const formOutletIngredient = reactive({
  isModalActive: false,
  rows: [],
  total: 10, // totalCount
  perPage: 15, // limit
  page: 1, // offset
  sort: [["id", "desc"]],
  filter: {
    deleted_at: { is: null },
  },
  errorMessage: [],
  createForm: {
    ingredientData: {},
    ingredient_id: null,
    value: 0,
    json_value: "",
  },
});

const formOutletUser = reactive({
  isModalActive: false,
  rows: [],
  total: 10, // totalCount
  perPage: 15, // limit
  page: 1, // offset
  sort: [["id", "desc"]],
  filter: {
    deleted_at: { is: null },
  },
  errorMessage: [],
  createForm: {
    employeeUsername: "",
  },
});

const dataEntries = computed(() => formOutletIngredient.rows);
const computeOutletUserData = computed(() => formOutletUser.rows);

const resetForm = reactive({
  name: null,
  address: null,
  coordinate_x: null,
  coordinate_y: null,
});

onMounted(() => {
  apiGetOutletData();
  apiGetIngredientData();
});

const apiGetIngredientData = () => {
  const queryBody = `{
    ingredients(
      sort: [["name", "asc"]]
      filter: {
        deleted_at: { is: null }
      }
    ) {
      rows {
        id
        name
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
          "Error in retrieving ingredient list. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      ingredientOptions.value = data.ingredients.rows.map(d => {
        d.label = d.name;
        return d;
      });
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
};

// >: OUTLET API
const apiGetOutletData = () => {
  let id = route.params.id ? route.params.id : null;

  if (id === null) {
    throw new Error("helo");
  }

  const queryBody = `{
    outlets(
      filter: {
        id: { eq: "${id}" },
        deleted_at: { is: null }
      }
    ) {
      rows {
        id
        name
        address
        coordinate_x
        coordinate_y
        created_at
        updated_at
        deleted_at
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
          "Error in retrieving outlet summary. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      const entry = data.outlets.rows[0];

      formOutlet.id = entry.id;
      formOutlet.name = entry.name;
      formOutlet.address = entry.address;
      formOutlet.coordinate_x = entry.coordinate_x;
      formOutlet.coordinate_y = entry.coordinate_y;
      formOutlet.created_at = entry.created_at;
      formOutlet.updated_at = entry.updated_at;
      formOutlet.deleted_at = entry.deleted_at;

      // Create copy of formOutlet
      resetForm.name = entry.name;
      resetForm.address = entry.address;
      resetForm.coordinate_x = entry.coordinate_x;
      resetForm.coordinate_y = entry.coordinate_y;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      // GET - Outlet Ingredients Data
      // GET - Outlet User Data
      getOutletIngredient();
      getOutletUser();
    });
};

const submitOutletEdit = () => {
  // Api backend request -
  const queryBody = `mutation {
    updateOutlet(
      filter: {
        id: { eq: "${formOutlet.id}" }
      }

      input: {
        name: "${formOutlet.name}"
        address: "${formOutlet.address}"
        coordinate_x: "${formOutlet.coordinate_x}"
        coordinate_y: "${formOutlet.coordinate_y}"
      }
    ) {
      id
      name
      address
      coordinate_x
      coordinate_y
      created_at
      updated_at
      deleted_at
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
      resetForm.name = formOutlet.name;
      resetForm.address = formOutlet.address;
      resetForm.coordinate_x = formOutlet.coordinate_x;
      resetForm.coordinate_y = formOutlet.coordinate_y;
    });
};

const resetOutletEdit = () => {
  formOutlet.name = resetForm.name;
  formOutlet.address = resetForm.address;
  formOutlet.coordinate_x = resetForm.coordinate_x;
  formOutlet.coordinate_y = resetForm.coordinate_y;
};
// >: OUTLET API

// >: OUTLET_INGREDIENT API
const createOutletIngredient = () => {
  const createForm = formOutletIngredient.createForm

  // Api backend request -
  const queryBody = `mutation {
    createIngredientOutlet(
      input: {
        outlet_id: ${formOutlet.id}
        ingredient_id: ${createForm.ingredientData.id}
        value: "${createForm.value}"
        json_value: "${createForm.json_value}"
      }
    ) {
      id
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
          "Error in add ingredient to outlet. Please try again later"
        );
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      formOutletIngredient.createForm.ingredientData = {};
      formOutletIngredient.createForm.ingredient_id = null;
      formOutletIngredient.createForm.value = 0;
      formOutletIngredient.createForm.json_value = "";

      getOutletIngredient();
    });
};

const getOutletIngredient = () => {
  const queryBody = `{
    ingredientOutlets(
      filter: {
        outlet_id: { eq: "${formOutlet.id}" }
        deleted_at: { is: null }
      }
    ) {
      rows {
        id
        outlet_id
        value
        json_value
        ingredientData {
          id
          name
          created_at
          updated_at
          deleted_at
        }
        created_at
        updated_at
        deleted_at
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
          "Error in retrieving outlet ingredient data. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      formOutletIngredient.rows = data.ingredientOutlets.rows;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    });
};

const updateOutletIngredient = (newEntry) => {
  // Api backend request -
  const queryBody = `mutation {
    updateIngredientOutlet(
      filter: {
        id: { eq: "${newEntry.id}" }
      }

      input: {
        value: "${newEntry.value}"
      }
    ) {
      id
      ingredient_id
      outlet_id
      value
      json_value
      created_at
      updated_at
      deleted_at
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
      getOutletIngredient();
    });
};

const deleteOutletIngredient = (entryId) => {
  const queryBody = `mutation {
    deleteIngredientOutlet(
      filter: { id: { eq: "${entryId}" } }
    ) {
      id
      ingredient_id
      outlet_id
      value
      json_value
      created_at
      updated_at
      deleted_at
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
        throw new Error("Error in deleting ingredient. Please try again later");
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      getOutletIngredient();
    });
};
// >: OUTLET_INGREDIENT API

// >: OUTLET_USER API
const createOutletUser = async () => {
  // STEP1: FIND USER BASED ON EMAIL - IF DONT HAVE (ALERT ERROR)
  const foundUser = await validateUserExist();

  if (!foundUser) {
    formOutletUser.isModalActive = true;
    alert("Sorry, failed to add user. Are you sure this user exists?");
    return;
  }

  // STEP2: Add found user with current outlet id
  const queryBody = `mutation {
    createUserOutlet(
      input: {
        user_id: ${foundUser.id}
        outlet_id: ${formOutlet.id}
      }
    ) {
      id
      user_id
      outlet_id
      created_at
      updated_at
      deleted_at
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
          "Error in add employee to outlet. Please try again later"
        );
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      formOutletUser.createForm.employeeUsername = "";
      getOutletUser();
    });
};

const validateUserExist = async () => {
  const queryBody = `{
    users(
      filter: { username: {eq: "${formOutletUser.createForm.employeeUsername}"}},
      sort: [["id", "desc"]]
    ) {
      rows {
          id
      }
      count
      total
    }
  }`;

  try {
    const res = await axios
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
        return res.data.data;
      });

    if (res.users.rows.length < 0) {
      return false;
    }

    return res.users.rows[0];
  } catch (error) {
    console.log(error)

    return false;
  }
};

const getOutletUser = () => {
  const queryBody = `{
    userOutlets(
      sort: [["id", "desc"]]
      filter: {
        outlet_id: { eq: "${formOutlet.id}" }
        user_id: { not: null }
        deleted_at: { is: null }
      }
    ) {
      rows {
        id

        user_id
        userData {
            id
            name
            username
            user_type_id
        }

        outlet_id
        outletData {
          id
          name
          address
          coordinate_x
          coordinate_y
          created_at
          updated_at
          deleted_at
        }

        created_at
        updated_at
        deleted_at
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
          "Error in retrieving outlet employees data. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      formOutletUser.rows = data.userOutlets.rows;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    });
};

const updateOutletUser = () => {
  console.log("@updateOutletUser");
};

const deleteOutletUser = (entryId) => {
  const queryBody = `mutation {
    deleteUserOutlet(
      filter: { id: { eq: "${entryId}" } }
    ) {
      id
      user_id
      outlet_id
      created_at
      updated_at
      deleted_at
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
        throw new Error("Error in removing employee from outlet. Please try again later");
      }

      return res.data.data;
    })
    .catch((error) => {
      const errorMessage = Util.ParseError(error);
      alert(errorMessage.message);
    })
    .finally(() => {
      getOutletUser();
    });
};
// >: OUTLET_USER API
</script>

<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="formOutletIngredient.isModalActive"
      title="New Outlet Stock"
      buttonLabel="Add Ingredient"
      @confirm="createOutletIngredient"
    >
      <FormField
        label="Ingredient"
        help="Please select from the systems ingredient list. Contact your admnistrator if unable to search for ingredient."
      >
        <!-- <FormControl v-model="formOutletIngredient.createForm.ingredient_id" /> -->
        <FormControl
          v-model="formOutletIngredient.createForm.ingredientData"
          :options="ingredientOptions"
        />
      </FormField>
      <FormField label="Stock Value" help="Amount of stock available">
        <FormControl type="number" v-model="formOutletIngredient.createForm.value" />
      </FormField>
      <BaseDivider />

      <FormField
        label="Configurations (JSON)"
        help="Optional: Please use a valid json."
      >
        <FormControl
          type="textarea"
          v-model="formOutletIngredient.createForm.json_value"
        />
      </FormField>
    </CardBoxModal>

    <CardBoxModal
      v-model="formOutletUser.isModalActive"
      title="Add New Employee"
      buttonLabel="Add"
      @confirm="createOutletUser"
    >
      <FormField
        label="Employee Username"
        help="Username that the employee uses to login the system. Please contact assistance if one has not been created yet"
      >
        <FormControl type="text" v-model="formOutletUser.createForm.employeeUsername" placeholder="employeeMoonPenny@worker1" />
      </FormField>
      <BaseDivider />
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Outlet Summary"
        main
      >
        <!-- <BaseButton type="submit" color="info" label="Edit Details" /> -->
      </SectionTitleLineWithButton>

      <CardBox formOutlet>
        <FormField label="Name of Outlet">
          <FormControl
            v-model="formOutlet.name"
            type="text"
            placeholder=""
            :disabled="useMainStore().getUserTypeId != 1"
          />
        </FormField>

        <FormField label="Coordinates - Long X, Lat Y">
          <FormControl
            v-model="formOutlet.coordinate_x"
            :disabled="useMainStore().getUserTypeId != 1"
            type="number"
            :icon="mdiCompassOutline"
          />
          <FormControl
            v-model="formOutlet.coordinate_y"
            :disabled="useMainStore().getUserTypeId != 1"
            type="number"
            :icon="mdiCompassOutline"
          />
        </FormField>

        <!-- <FormField label="With help line" help="Do not enter the leading zero">
          <FormControl
            v-model="formOutlet.phone"
            type="tel"
            placeholder="Your phone number"
          />
        </FormField> -->

        <!-- <FormField label="Dropdown">
          <FormControl v-model="formOutlet.department" :options="selectOptions" />
        </FormField> -->

        <FormField label="Address" help="Please choose select a proper address">
          <FormControl :disabled="useMainStore().getUserTypeId != 1" v-model="formOutlet.address" type="textarea"/>
        </FormField>

        <template #footer v-if="useMainStore().getUserTypeId == 1">
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Edit"
              @click="submitOutletEdit"
            />
            <BaseButton
              type="reset"
              color="info"
              outline
              label="Reset"
              @click="resetOutletEdit"
            />
          </BaseButtons>
        </template>
      </CardBox>

      <!-- OUTLET INGREDIENTS -->
      <BaseDivider />
      <SectionTitleLineWithButton
        :icon="mdiBlender"
        title="Stock Ingredient(s)"
      >
        <div>
          <BaseButton
            v-if="useMainStore().getUserTypeId === 1"
            :icon="mdiPlaylistPlus"
            color="warning"
            style="margin-right: 10px"
            @click="formOutletIngredient.isModalActive = true"
          />
          <BaseButton
            :icon="mdiRefresh"
            color="whiteDark"
            label=""
            @click="getOutletIngredient"
          />
        </div>
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableOutletIngredient
          :checkable="false"
          :rows="dataEntries"
          @confirm:delete="deleteOutletIngredient"
          @confirm:update="updateOutletIngredient"
          :perPage="15"
        />
        <!-- @confirm:delete="emitConfirmDelete" -->
      </CardBox>
      <!-- OUTLET INGREDIENTS -->

      <!-- OUTLET EMPLOYEES -->
      <BaseDivider />
      <SectionTitleLineWithButton
        :icon="mdiBlender"
        title="Staff & Employees(s)"
      >
        <div>
          <BaseButton
            v-if="useMainStore().getUserTypeId === 1"
            :icon="mdiPlaylistPlus"
            color="warning"
            style="margin-right: 10px"
            @click="formOutletUser.isModalActive = true"
          />
          <BaseButton
            :icon="mdiRefresh"
            color="whiteDark"
            label=""
            @click="getOutletUser"
          />
        </div>
      </SectionTitleLineWithButton>
      <CardBox has-table>
        <TableOutletEmployee
          :checkable="false"
          :rows="computeOutletUserData"
          @confirm:delete="deleteOutletUser"
          :perPage="15"
        />
        <!-- @confirm:delete="emitConfirmDelete" -->
      </CardBox>
      <!-- OUTLET EMPLOYEES -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
