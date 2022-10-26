<script setup>
import { reactive, computed, ref } from "vue";
import { mdiCircleEditOutline, mdiAccountRemove } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import moment from "moment";

const props = defineProps({
  checkable: Boolean,
  rows: Array,
  total: Number,
  perPage: Number
});

const emit = defineEmits(["confirm:update", "confirm:delete"]);

const items = computed(() => props.rows);

const isModalActive = ref(false);
const isModalDangerActive = ref(false);

const selectOptions = [
  { id: 3, label: "Store Employee" },
  { id: 2, label: "Store Manager" },
  { id: 1, label: "Admin" },
];

const deleteEntry = ref({
  id: "",
  name: "",
  username: "",
  user_type_id: "",
});

const editEntry = reactive({
  id: "",
  name: "",
  username: "",
  user_type_id: "",
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

const returnUserType = (data) => {
  if (!data && data.user_type_id) {
    return "Waiting Verfification";
  }

  switch (parseInt(data.user_type_id)) {
    case 1:
      return "Admin";
    case 2:
      return "Store Manager";
    case 3:
      return "Store Employee";
    default:
      return "-";
  };
}

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
  if (parseInt(entry.user_type_id) === 1) {
    return alert("Attempting to delete admins is not allowed");
  }

  deleteEntry.value.id = entry.id;
  deleteEntry.value.name = entry.name;
  deleteEntry.value.username = entry.username;
  deleteEntry.value.user_type_id = entry.user_type_id;

  isModalDangerActive.value = true;
};

const triggerEdit = (entry) => {
  editEntry.id = entry.id;
  editEntry.name = entry.name;
  editEntry.username = entry.username;
  editEntry.user_type_id = entry.user_type_id;
  editEntry.userType = selectOptions.find((d) => d.id === parseInt(entry.user_type_id));

  isModalActive.value = true;
};

const confirmDelete = () => {
  emit("confirm:delete", deleteEntry.value.id);
};

const confirmUpdate = () => {
  emit("confirm:update", editEntry);
};
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Edit Stock"
    buttonLabel="Edit"
    @confirm="confirmUpdate"
  >
    <FormField label="Stock" help="Edit Stock">
      <FormControl v-model="editEntry.name" type="text" placeholder="Please choose a valid name"/>
    </FormField>
    <FormField label="Dropdown">
      <FormControl v-model="editEntry.userType" :options="selectOptions" />
    </FormField>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Delete User"
    button="danger"
    buttonLabel="Delete"
    has-cancel
    @confirm="confirmDelete"
  >
    <p>Warning, please confirm your delete. User will still be in the system with <b>user employment type of NULL</b></p>
    <p>Username: <b>{{ deleteEntry.username }}</b></p>
    <p>Name: <b>{{ deleteEntry.name }}</b></p>
    <p>Employee Type: <b>{{ returnUserType(deleteEntry) }}</b></p>
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
        <th>Email</th>
        <th>Name</th>
        <th>Employee Type</th>
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
        <td data-label="Name">{{ data.name ? data.name : "Yet to assign" }}</td>
        <td data-label="Email">{{ data.username }}</td>
        <td data-label="User Type">{{ returnUserType(data) }}</td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"
            :title="data.createdAt"
          >{{ moment.unix(data.createdAt/1000).format("DD/MM/YYYY HH:mm") }}
          </small>
        </td>

        <td data-label="UpdatedAt" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400">
            <span v-if="data.updatedAt">{{ moment.unix(data.updatedAt/1000).format("DD/MM/YYYY HH:mm") }}</span>
            <span v-else> - </span>
          </small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              :icon="mdiCircleEditOutline"
              small
              @click="triggerEdit(data)"
            />
            <BaseButton
              color="danger"
              :icon="mdiAccountRemove"
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
