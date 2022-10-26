<script setup>
import { mdiBlender, mdiStore , mdiMonitorCellphone, mdiConsoleLine, mdiPlusCircleOutline } from "@mdi/js";
import axios from "axios";
import { apiConfig } from "@/config.js";
import SectionMain from "@/components/SectionMain.vue";
import TableBasic from "@/components/TableBasic_Outlet.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import Util from "@/util";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from "@/components/BaseButtons.vue";
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
  address: "",
  coordinate_x: "",
  coordinate_y: "",
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
    createOutlet(
      input : {
        name: "${createForm.name}"
        address: "${createForm.address}"
        coordinate_x: "${createForm.coordinate_x}"
        coordinate_y: "${createForm.coordinate_y}"
      }
    ) {
      id,
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
        throw new Error("Error in creating outlet. Please try again later");
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
    deleteOutlet(
      filter: { id: { eq: "${value}" } }
    ) {
      id,
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
        throw new Error("Error in creating outlet. Please try again later");
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
    outlets(
      # perPage: ${form.perPage} TODO: Add server paginations
      page: ${form.page}
      sort: ${JSON.stringify(form.sort)}
      filter: ${filter}
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
          "Error in retrieving outlet list. Please try again later"
        );
      }

      return res.data.data;
    })
    .then((data) => {
      form.rows = data.outlets.rows;
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
      title="Create Outlet"
      buttonLabel="create"
      @confirm="emitSubmitCreate"
    >
      <FormField label="Name of Outlet">
        <FormControl v-model="createForm.name" type="text" placeholder=""/>
      </FormField>

      <FormField label="Address of Outlet">
        <FormControl v-model="createForm.address" type="text" placeholder=""/>
      </FormField>

      <FormField label="Longitude X">
        <FormControl v-model="createForm.coordinate_x" type="number" placeholder=""/>
      </FormField>

      <FormField label="Latitude X">
        <FormControl v-model="createForm.coordinate_y" type="number" placeholder=""/>
      </FormField>
    </CardBoxModal>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiStore" title="Outlet List" main>
        <BaseButton
          :icon="mdiPlusCircleOutline"
          label="Create New Outlet"
          color="success"
          rounded-full
          @click="isModalActive = true"
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
