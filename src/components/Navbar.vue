<template>
  <nav
    class="navbar"
    aria-label="Main navigation"
  >
    <div class="navbar__links">
      <RouterLink
        v-for="(item, itemIndex) in navItems"
        :key="item.path"
        :to="item.path"
        custom
        v-slot="{
          href,
          navigate,
          isExactActive
        }"
      >
        <a
          :href="href"
          class="navbar__link"
          :class="{
            'is-active': isExactActive
          }"
          :style="{
            '--item-index': itemIndex
          }"
          :aria-current="
            isExactActive
              ? 'page'
              : undefined
          "
          @click="
            handleNavigation(
              $event,
              item.path,
              isExactActive,
              navigate
            )
          "
        >
          <span
            v-for="(
              letter,
              letterIndex
            ) in item.label.split('')"
            :key="`${item.path}-${letterIndex}`"
            class="navbar__letter"
            :style="{
              '--letter-index':
                letterIndex
            }"
          >
            {{ letter }}
          </span>
        </a>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { inject } from "vue";

const navigateWithTransition =
  inject(
    "navigateWithTransition"
  );

const navItems = [
  {
    label: "Home",
    path: "/home"
  },
  {
    label: "About",
    path: "/about"
  },
  {
    label: "Projects",
    path: "/projects"
  },
  {
    label: "Skills",
    path: "/skills"
  },
  {
    label: "Resume",
    path: "/resume"
  },
  {
    label: "Contact",
    path: "/contact"
  }
];

function handleNavigation(
  event,
  path,
  isCurrent,
  fallbackNavigate
) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();

  if (isCurrent) {
    return;
  }

  if (
    navigateWithTransition
  ) {
    navigateWithTransition(
      path
    );

    return;
  }

  fallbackNavigate();
}
</script>