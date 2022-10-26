<script setup>
import { mdiBlender, mdiUnfoldMoreHorizontal , mdiMonitorCellphone, mdiConsoleLine, mdiPlusCircleOutline } from "@mdi/js";
import axios from "axios";
import { apiConfig } from "@/config.js";
import SectionMain from "@/components/SectionMain.vue";
import TableBasic from "@/components/TableBasic_Ingredient.vue";
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
  name: "",
});

onMounted(() => {
  reqApiData();
});

const dataEntries = computed(() => form.rows);
const errorMessage = computed(() => form.errorMessage);
// const computePerPage = computed(() => form.perPage);1
// const computeTotal = computed(() => form.total);
const isModalActive = ref();

const emitSubmitCreate = () => {
  // Api backend request -
  const queryBody = `mutation {
    createIngredient(
      input : {
        name: "${createForm.name}"
      }
    ) {
      id,
      name,
      created_at,
      deleted_at,
      updated_at
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
      // Reset Defaults
      createForm.name = "";

      // Retrigger Data;
      reqApiData();
    });
};

const emitConfirmDelete = (value) => {
  // Delete data, recall API for now
  const queryBody = `mutation {
    deleteIngredient(
      filter: { id: { eq: "${value}" } }
    ) {
      id,
      name,
      created_at,
      deleted_at,
      updated_at
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
      reqApiData();
    });
};

const reqApiData = () => {
  let filter = JSON.stringify(form.filter)
  filter = filter.replace(/"([^"]+)":/g, '$1:');

  const queryBody = `{
    ingredients(
      # perPage: ${form.perPage} TODO: Add server paginations
      page: ${form.page}
      sort: ${JSON.stringify(form.sort)}
      filter: ${filter}
    ) {
      rows {
        id
        name

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
          "Error in retrieving ingredient list. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      form.rows = data.ingredients.rows;
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
      title="Create Ingredient"
      @confirm="emitSubmitCreate"
    >
      <FormField
        label="Name of Ingredient"
        help="Character should be small case and have length greater than 0"
      >
        <FormControl v-model="createForm.name" type="tel" placeholder=""/>
      </FormField>
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBlender"
        title="Ingredient List"
        main
      >
        <BaseButton
          @click="isModalActive = true"
          :icon="mdiPlusCircleOutline"
          label="Create New Ingredient"
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
          @confirm:delete="emitConfirmDelete"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
