<script setup>
import { reactive, computed, ref } from "vue";
import { mdiCircleEditOutline, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import moment from "moment";

const props = defineProps({
  checkable: Boolean,
  rows: Array,
  total: Number,
  perPage: Number
});

const emit = defineEmits(["confirm:delete"]);

const items = computed(() => props.rows);

const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const deleteEntry = ref({
  id: "",
  name: "",
});

const dataPerPage = computed(() => {
  if (!props.perPage) {
    return 15;
  }
  return props.perPage;
});
const perPage = ref(dataPerPage); // sets per page

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};

const triggerDelete = (entry) => {
  deleteEntry.value.id = entry.id;
  deleteEntry.value.name = entry.name;
  isModalDangerActive.value = true;
};

const confirmDelete = () => {
  emit("confirm:delete", deleteEntry.value.id);
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Edit data">
    <p>Edit Data</p>
    <!-- <p v-if="deleteEntry">{{ deleteEntry.value }}</p> -->
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Confirm Delete"
    button="danger"
    buttonLabel="Delete"
    has-cancel
    @confirm="confirmDelete"
  >
    <p>Please confirm your delete of this item:</p>
    <p>ID: {{ deleteEntry.id }}</p>
    <p>Name: {{ deleteEntry.name }}</p>
  </CardBoxModal>

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Id</th>
        <th>Name</th>
        <th>Desc</th>
        <th>Long</th>
        <th>Lat</th>
        <th>Created</th>
        <th>Updated</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in itemsPaginated" :key="data.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, data)" />
        <td class="border-b-0 lg:w-6" data-label="Id">
          {{ data.id }}
        </td>
        <td data-label="Name">{{ data.name }}</td>
        <td data-label="Address">{{ data.address }}</td>
        <td data-label="Longitude">{{ data.coordinate_x }}</td>
        <td data-label="Latitude">{{ data.coordinate_y }}</td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="data.created_at"
          >{{ moment.unix(data.created_at/1000).format("DD/MM/YYYY HH:mm") }}
          </small>
        </td>

        <td data-label="UpdatedAt" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400">
            <span v-if="data.updated_at">{{ moment.unix(data.updated_at/1000).format("DD/MM/YYYY HH:mm") }}</span>
            <span v-else> - </span>
          </small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiCircleEditOutline"
              small
              :href="`/outlets/summary/${data.id}`"
            />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="triggerDelete(data)"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
