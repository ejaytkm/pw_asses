import {
  mdiMonitor,
  mdiStore,
  mdiBlender,
} from "@mdi/js";

export default [
  {
    to: "/",
    label: "Overview",
    icon: mdiMonitor,
  },
  {
    to: "/ingredients",
    label: "Ingredients",
    icon: mdiBlender,
  },
  {
    to: "/outlets",
    label: "Outlets",
    icon: mdiStore,
  },
  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: "Dropdown",
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: "Item One",
  //       icon: mdiPalette,
  //     },
  //     {
  //       label: "Item Two",
  //     },
  //   ],
  // },
  // {
  //   href: "https://github.com/justboil/admin-one-vue-tailwind",
  //   label: "GitHub",
  //   icon: mdiGithub,
  //   target: "_blank",
  // },
];
