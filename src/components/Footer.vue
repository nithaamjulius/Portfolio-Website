
<template>
  <footer class="footer">
    <div class="footer__paper">

      <!-- Decorative tape -->
      <span
        class="footer__tape footer__tape--left"
        aria-hidden="true"
      ></span>

      <span
        class="footer__tape footer__tape--right"
        aria-hidden="true"
      ></span>

      <div class="footer__inner">

        <!-- =====================================
             JOURNAL FOOTER HEADER
             ===================================== -->

        <div class="footer__topline">

          <div class="footer__file-label">
            <span
              class="footer__file-dot"
              aria-hidden="true"
            ></span>

            <span>PERSONAL JOURNAL / FOOTER NOTES</span>
          </div>

          <span class="footer__page-number">
            LAST PAGE · FOR NOW
          </span>

        </div>

        <div
          class="footer__rule"
          aria-hidden="true"
        ></div>

        <!-- =====================================
             MAIN FOOTER CONTENT
             ===================================== -->

        <div class="footer__layout">

          <!-- Personal sign-off -->

          <section class="footer__identity">

            <p class="footer__eyebrow">
              A LITTLE NOTE BEFORE YOU GO
            </p>

            <h2 class="footer__heading">
              That's a
              <span class="footer__heading-word">
                wrap.
              </span>
            </h2>

            <p class="footer__message">
              Thanks for taking a look through my little
              corner of the internet. This journal is still
              being written — one idea, one bug, one build
              at a time.
            </p>

            <p class="footer__signature">
              — Nithaam Julius
            </p>

          </section>

          <!-- Journal navigation -->

          <nav
            class="footer__navigation"
            aria-label="Footer navigation"
          >

            <div class="footer__section-heading">

              <span class="footer__section-number">
                06
              </span>

              <h3>REVISIT AN ENTRY</h3>

            </div>

            <div class="footer__links">

              <RouterLink
                v-for="item in navItems"
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
                  class="footer__link"
                  :class="{
                    'is-active': isExactActive
                  }"
                  :aria-current="
                    isExactActive ? 'page' : undefined
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

                  <span class="footer__link-index">
                    {{ item.number }}
                  </span>

                  <span class="footer__link-name">
                    {{ item.label }}
                  </span>

                  <span
                    class="footer__link-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>

                </a>
              </RouterLink>

            </div>

            <p class="footer__navigation-note">
              A few pages worth turning back to.
            </p>

          </nav>

          <!-- Handwritten sticker -->

          <aside class="footer__sticker">

            <span
              class="footer__sticker-tape"
              aria-hidden="true"
            ></span>

            <p class="footer__sticker-label">
              P.S. — KEEP GOING
            </p>

            <p class="footer__sticker-message">
              There's always another
              <span>idea to build.</span>
            </p>

            <span
              class="footer__sticker-arrow"
              aria-hidden="true"
            >
              ↳
            </span>

            <button
              type="button"
              class="footer__back-top"
              @click="scrollToTop"
            >
              <span>Back to the beginning</span>

              <span
                class="footer__back-top-arrow"
                aria-hidden="true"
              >
                ↑
              </span>
            </button>

          </aside>

        </div>

        <!-- =====================================
             BOTTOM COLOPHON
             ===================================== -->

        <div
          class="footer__bottom-rule"
          aria-hidden="true"
        ></div>

        <div class="footer__bottom">

          <p class="footer__copyright">
            © {{ currentYear }} Nithaam Julius
          </p>

          <p class="footer__credit">
            MADE WITH
            <span>VUE</span>
            & CURIOSITY
          </p>

          <p class="footer__ending">
            MORE PAGES AHEAD...
          </p>

        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
import { inject } from 'vue'

const navigateWithTransition = inject(
  'navigateWithTransition',
  null
)

const currentYear = new Date().getFullYear()

const navItems = [
  {
    number: '01',
    label: 'Home',
    path: '/home'
  },
  {
    number: '02',
    label: 'About',
    path: '/about'
  },
  {
    number: '03',
    label: 'Projects',
    path: '/projects'
  },
  {
    number: '04',
    label: 'Skills',
    path: '/skills'
  },
  {
    number: '05',
    label: 'Resume',
    path: '/resume'
  },
  {
    number: '06',
    label: 'Contact',
    path: '/contact'
  }
]

function handleNavigation(
  event,
  path,
  isCurrent,
  fallbackNavigate
) {
  // Preserve normal browser behaviour for opening
  // links in new tabs and other modified clicks.
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  event.preventDefault()

  if (isCurrent) {
    return
  }

  if (navigateWithTransition) {
    navigateWithTransition(path)
    return
  }

  fallbackNavigate()
}

function scrollToTop() {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? 'auto' : 'smooth'
  })
}
</script>

<style scoped>
/* =========================================
   FOOTER FOUNDATION
   ========================================= */

.footer {
  position: relative;
  width: min(1180px, calc(100% - clamp(1rem, 5vw, 4rem)));
  margin: clamp(3rem, 7vw, 6rem) auto 1.5rem;
  padding: 0;
  color: var(--welcome-brown, #473824);
}

.footer,
.footer * {
  box-sizing: border-box;
}

.footer__paper {
  position: relative;
  isolation: isolate;
  padding: clamp(1.5rem, 4vw, 3.4rem);

  background:
    linear-gradient(
      90deg,
      transparent 0 4.5%,
      rgba(142, 102, 169, 0.10) 4.55%,
      transparent 4.7%
    ),
    repeating-linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.20) 0,
      rgba(255, 255, 255, 0.20) 31px,
      rgba(71, 56, 36, 0.035) 32px,
      rgba(255, 255, 255, 0.20) 33px
    ),
    #e4e1da;

  border: 1px solid rgba(71, 56, 36, 0.22);

  box-shadow:
    0 12px 28px rgba(35, 36, 36, 0.055),
    0 2px 4px rgba(35, 36, 36, 0.025);
}

.footer__inner {
  position: relative;
  z-index: 1;
  min-width: 0;
}

/* =========================================
   DECORATIVE TAPE
   ========================================= */

.footer__tape {
  position: absolute;
  z-index: 3;
  top: -0.45rem;
  display: block;
  width: clamp(4.5rem, 8vw, 6.5rem);
  height: 1.15rem;

  background: rgba(199, 198, 142, 0.78);

  box-shadow: 0 2px 4px rgba(35, 36, 36, 0.06);

  pointer-events: none;
}

.footer__tape--left {
  left: clamp(2rem, 6vw, 5.5rem);
  transform: rotate(-4deg);
}

.footer__tape--right {
  right: clamp(2rem, 6vw, 5.5rem);
  width: clamp(3.8rem, 6vw, 5rem);
  background: rgba(142, 102, 169, 0.30);
  transform: rotate(5deg);
}

/* =========================================
   TOPLINE
   ========================================= */

.footer__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.footer__file-label {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;

  font-family: var(--font-google-code, monospace);
  font-size: clamp(0.6rem, 0.9vw, 0.72rem);
  font-weight: 600;
  letter-spacing: 0.075em;
  line-height: 1.6;
  color: rgba(71, 56, 36, 0.78);
}

.footer__file-dot {
  display: block;
  flex: 0 0 auto;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #8e66a9;
  box-shadow: 0 0 0 3px rgba(142, 102, 169, 0.12);
}

.footer__page-number {
  display: inline-block;
  padding: 0.45rem 0.65rem;

  border: 1px dashed rgba(71, 56, 36, 0.35);

  font-family: var(--font-google-code, monospace);
  font-size: 0.62rem;
  letter-spacing: 0.065em;
  color: #473824;
}

/* =========================================
   JOURNAL RULE
   ========================================= */

.footer__rule {
  width: 100%;
  height: 1px;
  margin: clamp(1.2rem, 2.5vw, 2rem) 0 clamp(2rem, 4vw, 3.2rem);

  background: repeating-linear-gradient(
    90deg,
    rgba(71, 56, 36, 0.30) 0 4px,
    transparent 4px 9px
  );
}

/* =========================================
   MAIN LAYOUT
   ========================================= */

.footer__layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1.15fr)
    minmax(0, 1fr)
    minmax(12rem, 0.75fr);

  gap: clamp(1.5rem, 3.5vw, 3.5rem);
  align-items: start;
}

/* =========================================
   IDENTITY / SIGN-OFF
   ========================================= */

.footer__identity {
  min-width: 0;
}

.footer__eyebrow {
  margin: 0 0 1rem;

  font-family: var(--font-google-code, monospace);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.075em;
  line-height: 1.7;
  color: #8e66a9;
}

.footer__heading {
  margin: 0;

  font-family: var(--font-coda, sans-serif);
  font-size: clamp(2.1rem, 4.1vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.075em;
  line-height: 1.05;
  color: #473824;
}

.footer__heading-word {
  display: inline-block;

  font-family: var(--font-crafty, cursive);
  font-size: 1.15em;
  font-weight: 400;
  letter-spacing: -0.045em;
  color: #8e66a9;

  transform: rotate(-4deg);
  transform-origin: center;
}

.footer__message {
  max-width: 25rem;
  margin: 1.25rem 0 0;

  font-size: 0.93rem;
  line-height: 1.9;
  color: rgba(71, 56, 36, 0.83);
}

.footer__signature {
  margin: 1.1rem 0 0;

  font-family: var(--font-bonbon, cursive);
  font-size: 1.85rem;
  line-height: 1.3;
  color: #473824;
  transform: rotate(-2deg);
  transform-origin: left center;
}

/* =========================================
   FOOTER NAVIGATION
   ========================================= */

.footer__navigation {
  min-width: 0;
}

.footer__section-heading {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.footer__section-number {
  display: grid;
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  place-items: center;

  background: rgba(199, 198, 142, 0.65);
  border: 1px solid rgba(71, 56, 36, 0.10);
  border-radius: 50%;

  font-family: var(--font-google-code, monospace);
  font-size: 0.66rem;
  color: #473824;
}

.footer__section-heading h3 {
  margin: 0;

  font-family: var(--font-google-code, monospace);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.035em;
  line-height: 1.6;
  color: #473824;
}

.footer__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.25rem 0.65rem;
}

.footer__link {
  display: flex;
  align-items: center;
  gap: 0.45rem;

  min-width: 0;
  min-height: 2.55rem;
  padding: 0.45rem 0.35rem;

  border-bottom: 1px dashed rgba(71, 56, 36, 0.18);

  color: #473824;
  text-decoration: none;

  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease,
    border-color 180ms ease;
}

.footer__link-index {
  flex: 0 0 auto;

  font-family: var(--font-google-code, monospace);
  font-size: 0.57rem;
  color: rgba(71, 56, 36, 0.55);
}

.footer__link-name {
  min-width: 0;

  font-family: var(--font-google-code, monospace);
  font-size: clamp(0.68rem, 1vw, 0.8rem);
  font-weight: 500;
  overflow-wrap: anywhere;
}

.footer__link-arrow {
  margin-left: auto;

  font-size: 0.78rem;
  opacity: 0;
  transform: translate(-3px, 3px);

  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.footer__link:hover,
.footer__link:focus-visible {
  color: #8e66a9;
  background: rgba(199, 198, 142, 0.18);
  border-color: rgba(142, 102, 169, 0.45);
  transform: translateX(2px);
}

.footer__link:hover .footer__link-arrow,
.footer__link:focus-visible .footer__link-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.footer__link.is-active {
  color: #8e66a9;
  background: rgba(142, 102, 169, 0.075);
  border-color: rgba(142, 102, 169, 0.4);
}

.footer__link.is-active .footer__link-index {
  color: #8e66a9;
}

.footer__link.is-active .footer__link-arrow {
  opacity: 1;
  transform: none;
}

.footer__link:focus-visible {
  outline: 2px solid #8e66a9;
  outline-offset: 2px;
}

.footer__navigation-note {
  margin: 0.85rem 0 0;

  font-family: var(--font-crafty, cursive);
  font-size: 1.05rem;
  line-height: 1.5;
  color: rgba(71, 56, 36, 0.75);
}

/* =========================================
   OLIVE PAPER STICKER
   ========================================= */

.footer__sticker {
  position: relative;

  min-width: 0;
  padding: 1.7rem 1.25rem 1.15rem;

  background: #c7c68e;
  border: 1px solid rgba(71, 56, 36, 0.18);

  box-shadow: 4px 7px 0 rgba(71, 56, 36, 0.07);

  transform: rotate(2deg);
  transform-origin: center top;

  transition:
    transform 220ms ease,
    box-shadow 220ms ease;
}

.footer__sticker:hover {
  transform: rotate(0deg) translateY(-3px);

  box-shadow: 4px 10px 0 rgba(71, 56, 36, 0.07);
}

.footer__sticker-tape {
  position: absolute;
  top: -0.55rem;
  left: 50%;

  width: 4.3rem;
  height: 1rem;

  background: rgba(255, 255, 255, 0.47);
  box-shadow: 0 2px 3px rgba(35, 36, 36, 0.06);

  transform: translateX(-50%) rotate(-4deg);
}

.footer__sticker-label {
  margin: 0 0 0.9rem;

  font-family: var(--font-google-code, monospace);
  font-size: 0.59rem;
  font-weight: 700;
  letter-spacing: 0.055em;
  line-height: 1.6;
  color: rgba(71, 56, 36, 0.77);
}

.footer__sticker-message {
  margin: 0;

  font-family: var(--font-crafty, cursive);
  font-size: clamp(1.5rem, 2vw, 2rem);
  line-height: 1.35;
  color: #473824;
}

.footer__sticker-message span {
  display: inline-block;
  color: #8e66a9;
  transform: rotate(-2deg);
}

.footer__sticker-arrow {
  display: block;
  margin: 0.45rem 0 0;

  font-family: var(--font-bonbon, cursive);
  font-size: 2rem;
  line-height: 1;
  color: #473824;
}

/* =========================================
   BACK-TO-TOP BUTTON
   ========================================= */

.footer__back-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;

  width: 100%;
  min-height: 2.8rem;
  margin-top: 0.8rem;
  padding: 0.65rem 0.75rem;

  background: #8e66a9;
  border: 1px solid rgba(71, 56, 36, 0.12);

  font-family: var(--font-google-code, monospace);
  font-size: 0.68rem;
  font-weight: 500;
  text-align: left;
  color: #fff;

  cursor: pointer;

  transition:
    background-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.footer__back-top:hover {
  background: #473824;
  transform: translateY(-2px);
  box-shadow: 0 4px 9px rgba(71, 56, 36, 0.12);
}

.footer__back-top:focus-visible {
  outline: 2px solid #473824;
  outline-offset: 3px;
}

.footer__back-top-arrow {
  flex: 0 0 auto;
  font-size: 1rem;
  transition: transform 180ms ease;
}

.footer__back-top:hover .footer__back-top-arrow {
  transform: translateY(-3px);
}

/* =========================================
   BOTTOM DETAILS
   ========================================= */

.footer__bottom-rule {
  height: 1px;
  margin: clamp(2rem, 3.7vw, 3.2rem) 0 1.2rem;

  background: rgba(71, 56, 36, 0.23);
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  gap: 0.6rem 1.25rem;
}

.footer__bottom p {
  margin: 0;

  font-family: var(--font-google-code, monospace);
  font-size: 0.61rem;
  line-height: 1.8;
  letter-spacing: 0.035em;
  color: rgba(71, 56, 36, 0.72);
}

.footer__credit span {
  font-weight: 700;
  color: #8e66a9;
}

.footer__ending {
  color: #8e66a9 !important;
}

/* =========================================
   TABLET
   ========================================= */

@media (max-width: 960px) {
  .footer__layout {
    grid-template-columns:
      minmax(0, 1.1fr)
      minmax(0, 1fr);
    gap: 2.5rem;
  }

  .footer__sticker {
    grid-column: 1 / -1;
    width: min(100%, 24rem);
    justify-self: end;
    margin-top: 0.3rem;
  }

  .footer__sticker-message {
    max-width: 20rem;
  }

  .footer__back-top {
    max-width: 20rem;
  }
}

/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 640px) {
  .footer {
    width: calc(100% - 1rem);
    margin-top: 3.5rem;
    margin-bottom: 0.75rem;
  }

  .footer__paper {
    padding: 1.5rem 1.1rem 1.2rem;
  }

  .footer__topline {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.7rem;
  }

  .footer__file-label {
    font-size: 0.61rem;
  }

  .footer__page-number {
    font-size: 0.58rem;
  }

  .footer__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.3rem;
  }

  .footer__heading {
    font-size: clamp(2.5rem, 11vw, 4rem);
  }

  .footer__message {
    max-width: 34rem;
    font-size: 0.9rem;
  }

  .footer__navigation {
    width: 100%;
  }

  .footer__links {
    gap: 0.3rem 0.7rem;
  }

  .footer__link {
    min-height: 2.8rem;
  }

  .footer__link-name {
    font-size: 0.76rem;
  }

  .footer__sticker {
    grid-column: auto;
    justify-self: center;
    width: min(100%, 24rem);
    margin-top: 0.3rem;
  }

  .footer__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }

  .footer__bottom p {
    font-size: 0.59rem;
  }
}

/* =========================================
   SMALL MOBILE
   ========================================= */

@media (max-width: 360px) {
  .footer__paper {
    padding-right: 0.85rem;
    padding-left: 0.85rem;
  }

  .footer__links {
    gap: 0.2rem 0.35rem;
  }

  .footer__link {
    gap: 0.3rem;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
  }

  .footer__link-index {
    font-size: 0.52rem;
  }

  .footer__link-name {
    font-size: 0.68rem;
  }

  .footer__sticker {
    padding-right: 0.9rem;
    padding-left: 0.9rem;
  }
}

/* =========================================
   REDUCED MOTION
   ========================================= */

@media (prefers-reduced-motion: reduce) {
  .footer *,
  .footer *::before,
  .footer *::after {
    scroll-behavior: auto !important;
    animation: none !important;
    transition: none !important;
  }
}
</style>
