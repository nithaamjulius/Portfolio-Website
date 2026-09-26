import { createRouter, createWebHistory } from "vue-router";

import Welcome from "../views/Welcome.vue";
import Intro from "../views/Intro.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Projects from "../views/Projects.vue";
import Skills from "../views/Skills.vue";
import Resume from "../views/Resume.vue";
import Contact from "../views/Contact.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
      meta: {
        immersive: true,
      },
    },
    {
      path: "/intro",
      name: "intro",
      component: Intro,
      meta: {
        immersive: true,
      },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
    },
    {
      path: "/skills",
      name: "skills",
      component: Skills,
    },
    {
      path: "/resume",
      name: "resume",
      component: Resume,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
  ],
});

export default router;
