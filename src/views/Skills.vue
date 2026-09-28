<template>
  <section class="skills-page">
    <div class="skills-page__paper">
      <div class="skills-page__content">

        <!-- =========================================
             JOURNAL HEADER
             ========================================= -->

        <header class="skills-page__header">

          <div class="skills-page__entry-label">
            <span>JOURNAL ENTRY</span>

            <strong>04</strong>
          </div>

          <div class="skills-page__date">
            SKILLS / TOOLS / THINGS I'VE LEARNED
          </div>

        </header>

        <!-- =========================================
             HERO
             ========================================= -->

        <section class="skills-page__hero">

          <div class="skills-page__hero-copy">

            <p class="skills-page__eyebrow">
              THE TOOLBOX
            </p>

            <h1 class="skills-page__title">
              Things I
              <span>build with.</span>
            </h1>

            <p class="skills-page__intro">
              A collection of technologies, tools and ideas I've
              worked with while building projects, solving problems
              and figuring things out along the way.
            </p>

            <div class="skills-page__scribble">
              <span>
                learn → experiment → build → repeat
              </span>
            </div>

          </div>

          <!-- Toolbox sticker -->

          <div
            class="skills-page__toolbox-sticker"
            aria-hidden="true"
          >

            <span>
              MY
            </span>

            <strong>
              TOOLBOX
            </strong>

            <small>
              OPEN / BUILD / LEARN
            </small>

          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="skills-page__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             SKILL CATEGORIES
             ========================================= -->

        <section class="skills-page__skills">

          <div class="skills-page__section-heading">

            <div>
              <span class="skills-page__small-label">
                01 / SKILL SHELVES
              </span>

              <h2>
                The things I reach for.
              </h2>
            </div>

            <div
              class="skills-page__tiny-note"
              aria-hidden="true"
            >
              <span>
                picked up
              </span>

              <strong>
                along
              </strong>

              <span>
                the way →
              </span>
            </div>

          </div>

          <div class="skills-grid">

            <!-- =======================================
                 FRONTEND
                 ======================================= -->

            <article
              class="skill-shelf skill-shelf--01"
            >

              <div class="skill-shelf__tape"></div>

              <div class="skill-shelf__top">

                <span class="skill-shelf__number">
                  01
                </span>

                <span class="skill-shelf__label">
                  FRONTEND
                </span>

              </div>

              <div class="skill-shelf__title-row">

                <h3>
                  Interfaces
                </h3>

                <div
                  class="skill-shelf__sticker"
                  aria-hidden="true"
                >
                  &lt;/&gt;
                </div>

              </div>

              <p class="skill-shelf__description">
                The part where ideas become something people can
                actually see, click and interact with.
              </p>

              <div class="skill-shelf__tags">

                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Vue 3</span>
                <span>Responsive Design</span>
                <span>Three.js</span>

              </div>

            </article>

            <!-- =======================================
                 BACKEND
                 ======================================= -->

            <article
              class="skill-shelf skill-shelf--02"
            >

              <div class="skill-shelf__tape"></div>

              <div class="skill-shelf__top">

                <span class="skill-shelf__number">
                  02
                </span>

                <span class="skill-shelf__label">
                  BACKEND
                </span>

              </div>

              <div class="skill-shelf__title-row">

                <h3>
                  Behind the scenes
                </h3>

                <div
                  class="skill-shelf__sticker skill-shelf__sticker--purple"
                  aria-hidden="true"
                >
                  API
                </div>

              </div>

              <p class="skill-shelf__description">
                Building the logic that connects interfaces,
                data and the things happening behind the page.
              </p>

              <div class="skill-shelf__tags">

                <span>Node.js</span>
                <span>Express</span>
                <span>Python</span>
                <span>Flask</span>
                <span>FastAPI</span>
                <span>REST APIs</span>

              </div>

            </article>

            <!-- =======================================
                 DATABASE / AUTH
                 ======================================= -->

            <article
              class="skill-shelf skill-shelf--03"
            >

              <div class="skill-shelf__tape"></div>

              <div class="skill-shelf__top">

                <span class="skill-shelf__number">
                  03
                </span>

                <span class="skill-shelf__label">
                  DATA / AUTH
                </span>

              </div>

              <div class="skill-shelf__title-row">

                <h3>
                  Keeping things connected
                </h3>

                <div
                  class="skill-shelf__sticker"
                  aria-hidden="true"
                >
                  DB
                </div>

              </div>

              <p class="skill-shelf__description">
                Working with databases, authentication and the
                pieces that help applications remember and protect
                information.
              </p>

              <div class="skill-shelf__tags">

                <span>MySQL</span>
                <span>JWT</span>
                <span>bcryptjs</span>
                <span>Local Storage</span>
                <span>Database Design</span>

              </div>

            </article>

            <!-- =======================================
                 TOOLS
                 ======================================= -->

            <article
              class="skill-shelf skill-shelf--04"
            >

              <div class="skill-shelf__tape"></div>

              <div class="skill-shelf__top">

                <span class="skill-shelf__number">
                  04
                </span>

                <span class="skill-shelf__label">
                  TOOLS / WORKFLOW
                </span>

              </div>

              <div class="skill-shelf__title-row">

                <h3>
                  The everyday stuff
                </h3>

                <div
                  class="skill-shelf__sticker skill-shelf__sticker--olive"
                  aria-hidden="true"
                >
                  ⚙
                </div>

              </div>

              <p class="skill-shelf__description">
                The tools that help turn a folder of code into an
                actual working project.
              </p>

              <div class="skill-shelf__tags">

                <span>Git</span>
                <span>GitHub</span>
                <span>Vite</span>
                <span>Axios</span>
                <span>npm</span>
                <span>Netlify</span>
                <span>Render</span>

              </div>

            </article>

          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="skills-page__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             DEVELOPMENT JOURNEY
             ========================================= -->

        <section class="skills-page__journey">

          <div class="skills-page__journey-copy">

            <span class="skills-page__small-label">
              02 / DEVELOPMENT JOURNEY
            </span>

            <h2>
              Skills don't really stay still.
            </h2>

            <p>
              The more projects I build, the more the toolbox
              changes. Something that started as completely new
              eventually becomes part of the next project.
            </p>

            <p>
              That's why I don't think of this page as a finished
              list. It's more like a snapshot of what I've picked
              up so far.
            </p>

          </div>

          <div class="skills-page__journey-note">

            <span>
              STARTED WITH
            </span>

            <strong>
              PYTHON
            </strong>

            <small>
              ↓
            </small>

            <span>
              NOW BUILDING WITH
            </span>

            <strong>
              FULL-STACK
            </strong>

          </div>

        </section>

        <!-- =========================================
             CURRENTLY LEARNING
             ========================================= -->

        <section class="skills-page__learning">

          <div class="skills-page__learning-heading">

            <div>

              <span class="skills-page__small-label">
                03 / CURRENTLY LEARNING
              </span>

              <h2>
                What's on the desk right now.
              </h2>

            </div>

            <div
              class="journal-sticker skills-page__learning-sticker"
              aria-hidden="true"
            >
              <span>
                STILL
              </span>

              <strong>
                LEARNING
              </strong>
            </div>

          </div>

          <div class="learning-grid">

            <article
              class="learning-note learning-note--01"
            >

              <div class="learning-note__pin">
                +
              </div>

              <span>
                01
              </span>

              <h3>
                Better Vue architecture
              </h3>

              <p>
                Improving component structure, reusable patterns,
                state management and overall frontend organisation.
              </p>

            </article>

            <article
              class="learning-note learning-note--02"
            >

              <div class="learning-note__pin">
                +
              </div>

              <span>
                02
              </span>

              <h3>
                Motion & interaction
              </h3>

              <p>
                Exploring how animation and interaction can make
                interfaces feel more expressive without getting in
                the way of the experience.
              </p>

            </article>

            <article
              class="learning-note learning-note--03"
            >

              <div class="learning-note__pin">
                +
              </div>

              <span>
                03
              </span>

              <h3>
                Stronger full-stack foundations
              </h3>

              <p>
                Continuing to improve how I connect frontend,
                backend, databases, authentication and deployment.
              </p>

            </article>

          </div>

        </section>

        <!-- =========================================
             SKILL PHILOSOPHY
             ========================================= -->

        <div
          class="skills-page__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <section class="skills-page__philosophy">

          <div class="skills-page__philosophy-title">

            <span class="skills-page__small-label">
              04 / HOW I THINK ABOUT SKILLS
            </span>

            <h2>
              Know enough to build.
              Stay curious enough to keep learning.
            </h2>

          </div>

          <div class="skills-page__philosophy-list">

            <p>
              <span>01</span>

              I learn best by actually building something.
            </p>

            <p>
              <span>02</span>

              I don't mind figuring things out as I go.
            </p>

            <p>
              <span>03</span>

              A project is usually where the next skill appears.
            </p>

          </div>

          <div
            class="skills-page__philosophy-sticker"
            aria-hidden="true"
          >

            <span>
              BUILD
            </span>

            <strong>
              → LEARN
            </strong>

            <span>
              → REPEAT
            </span>

          </div>

        </section>

        <!-- =========================================
             NAVIGATION
             ========================================= -->

        <section class="skills-page__navigation">

          <button
            type="button"
            class="skills-page__nav-button skills-page__nav-button--back"
            @click="goToProjects"
          >
            <span>←</span>
            BACK TO PROJECTS
          </button>

          <button
            type="button"
            class="skills-page__nav-button"
            @click="goToResume"
          >
            NEXT ENTRY
            <span>→</span>
          </button>

        </section>

        <!-- =========================================
             FOOTER
             ========================================= -->

        <footer class="skills-page__footer">

          <span>
            ENTRY 04 / END
          </span>

          <span>
            MORE PAGES AHEAD
          </span>

        </footer>

      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue'

const navigateWithTransition =
  inject(
    'navigateWithTransition'
  )

function navigateTo(path) {
  if (
    typeof navigateWithTransition ===
    'function'
  ) {
    navigateWithTransition(path)
    return
  }

  window.location.href = path
}

function goToProjects() {
  navigateTo('/projects')
}

function goToResume() {
  navigateTo('/resume')
}
</script>

<style scoped>

/* =========================================
   SKILLS PAGE
   ========================================= */

.skills-page {
  position: relative;
  min-height: calc(100svh - 6.2rem);
  overflow: hidden;
  background: var(--paper);
  color: var(--welcome-brown);
}

.skills-page__paper {
  position: relative;
  min-height: 100%;
  isolation: isolate;

  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.06),
      transparent 9%,
      transparent 91%,
      rgba(0, 0, 0, 0.035)
    ),
    var(--paper);
}

.skills-page__paper::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.28;

  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 47px,
      rgba(35, 36, 36, 0.16) 48px,
      transparent 49px
    );
}

.skills-page__paper::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;

  background:
    linear-gradient(
      90deg,
      transparent 6.5%,
      rgba(35, 36, 36, 0.13) 6.55%,
      transparent 6.65%
    ),
    radial-gradient(
      circle at center,
      transparent 54%,
      rgba(35, 36, 36, 0.045) 100%
    );

  pointer-events: none;
}

.skills-page__content {
  width: min(1180px, 92vw);
  margin: 0 auto;

  padding:
    clamp(2rem, 4vw, 4.5rem)
    0
    4rem;
}

/* =========================================
   HEADER
   ========================================= */

.skills-page__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;

  padding-bottom: 1rem;

  border-bottom: 1px solid
    rgba(35, 36, 36, 0.2);
}

.skills-page__entry-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;

  font-family: var(--font-google-code);
  font-size: 0.75rem;

  letter-spacing: 0.14em;
}

.skills-page__entry-label strong {
  display: inline-grid;

  width: 2rem;
  height: 2rem;

  place-items: center;

  border: 1px solid
    rgba(35, 36, 36, 0.24);

  border-radius: 50%;

  font-size: 0.72rem;
}

.skills-page__date {
  max-width: 20rem;

  font-family: var(--font-google-code);
  font-size: 0.66rem;

  letter-spacing: 0.1em;
  text-align: right;

  opacity: 0.45;
}

/* =========================================
   HERO
   ========================================= */

.skills-page__hero {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 3rem;

  min-height: 30rem;

  padding:
    clamp(4rem, 7vw, 7rem)
    0
    clamp(3rem, 6vw, 5rem);
}

.skills-page__hero-copy {
  max-width: 48rem;
}

.skills-page__eyebrow {
  margin: 0 0 1rem;

  font-family: var(--font-google-code);
  font-size: 0.72rem;
  font-weight: 600;

  letter-spacing: 0.2em;

  opacity: 0.42;
}

.skills-page__title {
  margin: 0;

  max-width: 9ch;

  font-family: var(--font-coda);
  font-size: clamp(4rem, 8vw, 7.8rem);

  line-height: 0.86;
  letter-spacing: -0.06em;
}

.skills-page__title span {
  display: block;

  color: #8e66a9;

  transform: translateX(0.06em);
}

.skills-page__intro {
  max-width: 40rem;

  margin:
    2rem
    0
    0;

  font-family: var(--font-crafty);
  font-size:
    clamp(1.2rem, 1.9vw, 1.6rem);

  line-height: 1.5;
}

.skills-page__scribble {
  width: fit-content;

  margin-top: 1.6rem;

  font-family: var(--font-bonbon);
  font-size:
    clamp(1.25rem, 2vw, 1.6rem);

  transform: rotate(-3deg);
}

.skills-page__toolbox-sticker {
  display: grid;

  width: 11.8rem;
  min-height: 11.8rem;

  place-items: center;
  align-content: center;

  gap: 0.2rem;

  padding: 1.2rem;

  border: 4px solid #fff;
  border-radius: 50%;

  background: #8e66a9;

  color: #fff;

  box-shadow:
    0 14px 24px
      rgba(35, 36, 36, 0.12),
    0 2px 4px
      rgba(35, 36, 36, 0.08);

  font-family: var(--font-google-code);

  transform: rotate(7deg);
}

.skills-page__toolbox-sticker span {
  font-size: 0.62rem;
  letter-spacing: 0.16em;
}

.skills-page__toolbox-sticker strong {
  color: #c7c68e;

  font-size: 1.3rem;

  letter-spacing: 0.08em;
}

.skills-page__toolbox-sticker small {
  margin-top: 0.35rem;

  font-size: 0.52rem;

  letter-spacing: 0.1em;

  text-align: center;

  opacity: 0.65;
}

/* =========================================
   DIVIDER
   ========================================= */

.skills-page__divider {
  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 1rem;
}

.skills-page__divider span {
  height: 1px;

  background:
    rgba(35, 36, 36, 0.28);
}

/* =========================================
   SECTION HEADING
   ========================================= */

.skills-page__section-heading {
  display: flex;

  align-items: flex-end;
  justify-content: space-between;

  gap: 2rem;

  padding:
    clamp(3.5rem, 6vw, 5rem)
    0
    2.5rem;
}

.skills-page__small-label {
  font-family: var(--font-google-code);
  font-size: 0.65rem;

  letter-spacing: 0.16em;

  opacity: 0.45;
}

.skills-page__section-heading h2 {
  margin:
    0.65rem
    0
    0;

  font-family: var(--font-coda);

  font-size:
    clamp(2.4rem, 5vw, 4.2rem);

  line-height: 0.98;
  letter-spacing: -0.04em;
}

.skills-page__tiny-note {
  display: grid;

  gap: 0.05rem;

  width: 7rem;

  font-family: var(--font-bonbon);

  font-size: 1.1rem;

  text-align: right;

  transform:
    rotate(-4deg)
    translateY(-0.4rem);
}

.skills-page__tiny-note strong {
  color: #8e66a9;

  font-size: 1.35rem;
}

/* =========================================
   SKILL GRID
   ========================================= */

.skills-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    clamp(1.5rem, 3vw, 2.5rem);
}

/* =========================================
   SKILL SHELVES
   ========================================= */

.skill-shelf {
  position: relative;

  min-height: 20rem;

  padding:
    2rem
    clamp(1.5rem, 3vw, 2.4rem)
    2.2rem;

  border: 1px solid
    rgba(35, 36, 36, 0.14);

  background:
    rgba(255, 255, 255, 0.28);

  box-shadow:
    0 15px 26px
      rgba(35, 36, 36, 0.06);
}

.skill-shelf--01 {
  transform: rotate(-0.6deg);
}

.skill-shelf--02 {
  transform: rotate(0.55deg);
}

.skill-shelf--03 {
  transform: rotate(0.45deg);
}

.skill-shelf--04 {
  transform: rotate(-0.5deg);
}

.skill-shelf__tape {
  position: absolute;

  top: -0.65rem;
  left: 50%;

  width: 6.8rem;
  height: 1.4rem;

  background:
    rgba(199, 198, 142, 0.7);

  box-shadow:
    0 2px 4px
      rgba(35, 36, 36, 0.08);

  transform:
    translateX(-50%)
    rotate(-2deg);
}

.skill-shelf__top {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 1rem;
}

.skill-shelf__number {
  display: inline-grid;

  width: 2rem;
  height: 2rem;

  place-items: center;

  border: 1px solid
    rgba(35, 36, 36, 0.18);

  border-radius: 50%;

  font-family: var(--font-google-code);
  font-size: 0.58rem;
}

.skill-shelf__label {
  font-family: var(--font-google-code);

  font-size: 0.6rem;

  letter-spacing: 0.13em;

  opacity: 0.45;
}

.skill-shelf__title-row {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  gap: 1rem;

  margin-top: 1.5rem;
}

.skill-shelf h3 {
  max-width: 12ch;

  margin: 0;

  font-family: var(--font-coda);

  font-size:
    clamp(1.9rem, 4vw, 3.1rem);

  line-height: 0.95;

  letter-spacing: -0.04em;
}

.skill-shelf__sticker {
  display: grid;

  min-width: 4.4rem;
  height: 4.4rem;

  place-items: center;

  border: 3px solid #fff;
  border-radius: 50%;

  background: #c7c68e;

  color: var(--welcome-brown);

  box-shadow:
    0 7px 14px
      rgba(35, 36, 36, 0.1);

  font-family: var(--font-google-code);

  font-size: 0.66rem;
  font-weight: 700;

  transform: rotate(8deg);
}

.skill-shelf__sticker--purple {
  background: #8e66a9;
  color: #fff;

  transform: rotate(-7deg);
}

.skill-shelf__sticker--olive {
  background: #c7c68e;

  transform: rotate(5deg);
}

.skill-shelf__description {
  max-width: 36rem;

  margin:
    1.35rem
    0
    1.5rem;

  font-family: var(--font-crafty);

  font-size: 1.08rem;

  line-height: 1.5;
}

.skill-shelf__tags {
  display: flex;

  flex-wrap: wrap;

  gap: 0.5rem;
}

.skill-shelf__tags span {
  padding:
    0.44rem
    0.62rem;

  border: 1px dashed
    rgba(35, 36, 36, 0.22);

  background:
    rgba(255, 255, 255, 0.32);

  font-family: var(--font-google-code);

  font-size: 0.6rem;

  letter-spacing: 0.04em;
}

/* =========================================
   JOURNEY
   ========================================= */

.skills-page__journey {
  display: grid;

  grid-template-columns:
    minmax(0, 1.3fr)
    minmax(15rem, 0.7fr);

  align-items: center;

  gap:
    clamp(2rem, 6vw, 6rem);

  padding:
    clamp(4rem, 7vw, 6rem)
    0;
}

.skills-page__journey-copy {
  max-width: 48rem;
}

.skills-page__journey-copy h2 {
  margin:
    0.7rem
    0
    1rem;

  font-family: var(--font-coda);

  font-size:
    clamp(2.4rem, 5vw, 4rem);

  line-height: 0.98;

  letter-spacing: -0.04em;
}

.skills-page__journey-copy p {
  margin:
    0.75rem
    0;

  font-family: var(--font-crafty);

  font-size: 1.15rem;

  line-height: 1.55;
}

.skills-page__journey-note {
  display: grid;

  justify-items: center;

  gap: 0.3rem;

  min-height: 16rem;

  padding: 2rem;

  border: 2px dashed
    rgba(35, 36, 36, 0.2);

  background:
    rgba(199, 198, 142, 0.2);

  font-family: var(--font-google-code);

  text-align: center;

  transform: rotate(3deg);
}

.skills-page__journey-note span {
  font-size: 0.6rem;

  letter-spacing: 0.13em;

  opacity: 0.45;
}

.skills-page__journey-note strong {
  color: #8e66a9;

  font-size: 1.5rem;

  letter-spacing: 0.1em;
}

.skills-page__journey-note small {
  margin: 0.3rem 0;

  font-size: 1.3rem;

  opacity: 0.45;
}

/* =========================================
   CURRENTLY LEARNING
   ========================================= */

.skills-page__learning {
  padding:
    0
    0
    clamp(4rem, 7vw, 6rem);
}

.skills-page__learning-heading {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 2rem;

  margin-bottom: 2.5rem;
}

.skills-page__learning-heading h2 {
  margin:
    0.65rem
    0
    0;

  font-family: var(--font-coda);

  font-size:
    clamp(2.2rem, 4vw, 3.5rem);

  line-height: 1;

  letter-spacing: -0.04em;
}

.skills-page__learning-sticker {
  display: grid;

  min-width: 8rem;
  min-height: 8rem;

  place-items: center;
  align-content: center;

  gap: 0.2rem;

  padding: 1rem;

  border: 3px solid #fff;

  background: #8e66a9;

  color: #fff;

  box-shadow:
    0 10px 18px
      rgba(35, 36, 36, 0.12);

  font-family: var(--font-coda);

  font-size: 0.75rem;

  text-align: center;

  transform: rotate(7deg);
}

.skills-page__learning-sticker strong {
  color: #c7c68e;

  font-size: 1.05rem;
}

.learning-grid {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    clamp(1rem, 3vw, 2rem);
}

.learning-note {
  position: relative;

  min-height: 15rem;

  padding:
    2rem
    1.7rem
    1.7rem;

  border: 1px solid
    rgba(35, 36, 36, 0.11);

  background:
    rgba(255, 255, 255, 0.45);

  box-shadow:
    0 12px 20px
      rgba(35, 36, 36, 0.06);
}

.learning-note--01 {
  transform: rotate(-1deg);
}

.learning-note--02 {
  transform: rotate(0.8deg);
}

.learning-note--03 {
  transform: rotate(-0.6deg);
}

.learning-note__pin {
  position: absolute;

  top: 0.6rem;
  right: 0.8rem;

  display: grid;

  width: 1.8rem;
  height: 1.8rem;

  place-items: center;

  border-radius: 50%;

  background: #c7c68e;

  font-family: var(--font-google-code);
  font-weight: 700;

  box-shadow:
    0 4px 8px
      rgba(35, 36, 36, 0.08);
}

.learning-note > span {
  font-family: var(--font-google-code);

  font-size: 0.58rem;

  letter-spacing: 0.12em;

  opacity: 0.42;
}

.learning-note h3 {
  margin:
    0.8rem
    0
    0.8rem;

  font-family: var(--font-coda);

  font-size:
    clamp(1.5rem, 3vw, 2.1rem);

  line-height: 1;

  letter-spacing: -0.03em;
}

.learning-note p {
  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1rem;

  line-height: 1.5;
}

/* =========================================
   PHILOSOPHY
   ========================================= */

.skills-page__philosophy {
  display: grid;

  grid-template-columns:
    minmax(0, 1.1fr)
    minmax(14rem, 0.7fr)
    minmax(8rem, 0.35fr);

  align-items: center;

  gap: 2rem;

  padding:
    clamp(4rem, 7vw, 6rem)
    0;
}

.skills-page__philosophy-title h2 {
  max-width: 13ch;

  margin:
    0.65rem
    0
    0;

  font-family: var(--font-coda);

  font-size:
    clamp(2.2rem, 5vw, 4.2rem);

  line-height: 0.98;

  letter-spacing: -0.05em;
}

.skills-page__philosophy-list {
  display: grid;

  gap: 1rem;
}

.skills-page__philosophy-list p {
  display: grid;

  grid-template-columns:
    auto
    1fr;

  gap: 0.8rem;

  margin: 0;

  padding-bottom: 0.8rem;

  border-bottom: 1px dashed
    rgba(35, 36, 36, 0.2);

  font-family: var(--font-crafty);

  font-size: 1.05rem;

  line-height: 1.4;
}

.skills-page__philosophy-list span {
  font-family: var(--font-google-code);

  font-size: 0.62rem;

  opacity: 0.45;
}

.skills-page__philosophy-sticker {
  display: grid;

  min-height: 10rem;

  place-items: center;
  align-content: center;

  gap: 0.25rem;

  padding: 1.2rem;

  border: 3px solid #fff;

  background: #c7c68e;

  box-shadow:
    0 10px 18px
      rgba(35, 36, 36, 0.1);

  font-family: var(--font-google-code);

  font-size: 0.67rem;

  font-weight: 700;

  text-align: center;

  transform: rotate(-7deg);
}

.skills-page__philosophy-sticker strong {
  color: #8e66a9;

  font-size: 0.9rem;
}

/* =========================================
   NAVIGATION
   ========================================= */

.skills-page__navigation {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 1rem;

  padding:
    2rem
    0
    1rem;
}

.skills-page__nav-button {
  display: inline-flex;

  align-items: center;

  gap: 0.85rem;

  padding:
    0.8rem
    1rem;

  border: 1px solid
    rgba(35, 36, 36, 0.18);

  background:
    rgba(255, 255, 255, 0.2);

  color: var(--welcome-brown);

  cursor: pointer;

  font-family: var(--font-google-code);

  font-size: 0.65rem;

  font-weight: 700;

  letter-spacing: 0.1em;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.skills-page__nav-button:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 7px 14px
      rgba(35, 36, 36, 0.08);
}

.skills-page__nav-button--back {
  background:
    var(--welcome-brown);

  color: #dedede;
}

/* =========================================
   FOOTER
   ========================================= */

.skills-page__footer {
  display: flex;

  justify-content: space-between;

  gap: 1rem;

  padding-top: 2rem;

  font-family: var(--font-google-code);

  font-size: 0.62rem;

  letter-spacing: 0.12em;

  opacity: 0.42;
}

/* =========================================
   RESPONSIVE
   ========================================= */

@media (max-width: 950px) {

  .skills-page__hero {
    align-items: flex-start;

    flex-direction: column;

    min-height: auto;
  }

  .skills-page__toolbox-sticker {
    align-self: flex-end;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skills-page__journey {
    grid-template-columns: 1fr;
  }

  .skills-page__journey-note {
    width: min(
      100%,
      20rem
    );

    justify-self: end;
  }

  .learning-grid {
    grid-template-columns: 1fr;
  }

  .skills-page__philosophy {
    grid-template-columns:
      1fr
      1fr;
  }

  .skills-page__philosophy-sticker {
    grid-column: 1 / -1;

    width: 10rem;

    justify-self: end;
  }
}

@media (max-width: 600px) {

  .skills-page__content {
    width: min(94vw, 1180px);
  }

  .skills-page__header {
    align-items: flex-start;

    flex-direction: column;
  }

  .skills-page__date {
    text-align: left;
  }

  .skills-page__title {
    font-size:
      clamp(3.6rem, 16vw, 6rem);
  }

  .skills-page__section-heading {
    align-items: flex-start;

    flex-direction: column;
  }

  .skills-page__tiny-note {
    text-align: left;

    transform:
      rotate(-4deg);
  }

  .skills-page__learning-heading {
    align-items: flex-start;

    flex-direction: column;
  }

  .skills-page__journey-note {
    justify-self: stretch;
    width: auto;
  }

  .skills-page__philosophy {
    grid-template-columns: 1fr;
  }

  .skills-page__philosophy-sticker {
    grid-column: auto;

    justify-self: center;
  }

  .skills-page__navigation {
    align-items: stretch;

    flex-direction: column;
  }

  .skills-page__nav-button {
    justify-content: center;
  }

  .skills-page__footer {
    flex-direction: column;
  }

}

</style>