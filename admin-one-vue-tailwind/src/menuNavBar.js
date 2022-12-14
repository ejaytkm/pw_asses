import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiPalette,
  mdiLogout,
  mdiThemeLightDark,
  mdiGithub,
  mdiReact,
} from "@mdi/js";

export default [
  // {
  //   icon: mdiMenu,
  //   label: "Sample menu",
  //   menu: [
  //     {
  //       icon: mdiClockOutline,
  //       label: "Item One",
  //     },
  //     {
  //       icon: mdiCloud,
  //       label: "Item Two",
  //     },
  //     {
  //       isDivider: true,
  //     },
  //     {
  //       icon: mdiCrop,
  //       label: "Item Last",
  //     },
  //   ],
  // },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiCogOutline,
        label: "Settings",
        to: "/profile",
      },
      // {
      //   icon: mdiCogOutline,
      //   label: "Settings",
      // },
      {
        icon: mdiPalette,
        to: "/style",
        label: "Styles",
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: "Log Out",
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: "Light/Dark",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  // {
  //   icon: mdiGithub,
  //   label: "GitHub",
  //   isDesktopNoLabel: true,
  //   href: "https://github.com/justboil/admin-one-vue-tailwind",
  //   target: "_blank",
  // },
  // {
  //   icon: mdiReact,
  //   label: "React version",
  //   isDesktopNoLabel: true,
  //   href: "https://github.com/justboil/admin-one-react-tailwind",
  //   target: "_blank",
  // },
  {
    icon: mdiLogout,
    label: "Log out",
    isDesktopNoLabel: true,
    isLogout: true,
  },
];
