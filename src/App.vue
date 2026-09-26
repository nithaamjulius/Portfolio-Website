<template>
  <div id="app">
    <template v-if="!route.meta.immersive">
      <Navbar />
    </template>

    <main>
      <RouterView />
    </main>

    <template v-if="!route.meta.immersive">
      <Footer />
    </template>

    <Transition name="paper-transition">
      <div
        v-if="pageTransition.active"
        class="paper-transition"
        :class="`paper-transition--${pageTransition.phase}`"
        aria-hidden="true"
      >
        <div class="paper-transition__sheet">
          <span
            v-for="crumb in crumbs"
            :key="crumb.id"
            class="paper-transition__crumb"
            :style="crumb.style"
          ></span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, provide, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const route = useRoute();
const router = useRouter();

const pageTransition = reactive({
  active: false,
  phase: "idle",
});

const crumbs = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  style: {
    "--crumb-left": `${12 + ((index * 17) % 76)}%`,
    "--crumb-top": `${14 + ((index * 29) % 70)}%`,
    "--crumb-delay": `${(index % 6) * 45}ms`,
    "--crumb-rotate": `${-24 + ((index * 31) % 70)}deg`,
  },
}));

let transitionTimer = null;

const sleep = (duration) =>
  new Promise((resolve) => {
    transitionTimer = window.setTimeout(resolve, duration);
  });

const navigateWithTransition = async (path) => {
  if (pageTransition.active) {
    return;
  }

  pageTransition.active = true;
  pageTransition.phase = "crumple";

  await sleep(720);

  await router.push(path);

  await nextTick();

  pageTransition.phase = "uncrumple";

  await sleep(900);

  pageTransition.active = false;
  pageTransition.phase = "idle";
};

provide("navigateWithTransition", navigateWithTransition);

onMounted(() => {
  document.documentElement.classList.add("portfolio-ready");
});

onBeforeUnmount(() => {
  if (transitionTimer) {
    window.clearTimeout(transitionTimer);
  }
});
</script>
