<template>
  <section class="resume-page">
    <div class="resume-page__paper">
      <div class="resume-page__content">

        <!-- =========================================
             JOURNAL HEADER
             ========================================= -->

        <header class="resume-page__header">

          <div class="resume-page__entry-label">
            <span>JOURNAL ENTRY</span>

            <strong>05</strong>
          </div>

          <div class="resume-page__date">
            RESUME / EXPERIENCE / EDUCATION
          </div>

        </header>

        <!-- =========================================
             HERO
             ========================================= -->

        <section class="resume-page__hero">

          <div class="resume-page__hero-copy">

            <p class="resume-page__eyebrow">
              THE PAPER VERSION
            </p>

            <h1 class="resume-page__title">
              A little
              <span>about my work.</span>
            </h1>

            <p class="resume-page__intro">
              A more traditional snapshot of my development
              journey, the technologies I've worked with, and the
              projects and experiences that have shaped how I build.
            </p>

            <div class="resume-page__scribble">
              <span>
                the short version → everything is still growing
              </span>
            </div>

            <!-- =======================================
                 ACTIONS
                 ======================================= -->

            <div class="resume-page__actions">

              <button
                type="button"
                class="resume-page__action-button resume-page__action-button--primary"
                @click="toggleEditMode"
              >
                <span>
                  {{
                    editMode
                      ? 'DONE EDITING'
                      : 'EDIT RESUME'
                  }}
                </span>

                <strong>
                  {{
                    editMode
                      ? '✓'
                      : '✎'
                  }}
                </strong>
              </button>

              <button
                type="button"
                class="resume-page__action-button"
                @click="printResume"
              >
                <span>
                  PRINT / SAVE PDF
                </span>

                <strong>
                  ↗
                </strong>
              </button>

              <button
                type="button"
                class="resume-page__action-button"
                @click="goToContact"
              >
                <span>
                  GET IN TOUCH
                </span>

                <strong>
                  →
                </strong>
              </button>

            </div>

            <p
              v-if="editMode"
              class="resume-page__editor-hint"
            >
              Edit the résumé below. Add or remove entries as your
              experience grows. Changes are saved in this browser.
            </p>

            <p
              v-if="storageMessage"
              class="resume-page__storage-message"
              :class="{
                'resume-page__storage-message--error':
                  storageError
              }"
            >
              {{ storageMessage }}
            </p>

          </div>

          <!-- Resume stamp -->

          <div
            class="resume-page__resume-stamp"
            aria-hidden="true"
          >

            <span>
              RESUME
            </span>

            <strong>
              2026
            </strong>

            <small>
              SELECTED DETAILS
            </small>

          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="resume-page__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             RESUME SHEET
             ========================================= -->

        <section
          id="printable-resume"
          class="resume-sheet"
        >

          <!-- =======================================
               RESUME HEADER
               ======================================= -->

          <header class="resume-sheet__header">

            <div
              v-if="!editMode"
              class="resume-sheet__identity"
            >

              <span class="resume-sheet__kicker">
                {{ resume.profileTitle }}
              </span>

              <h2>
                {{ resume.name }}
              </h2>

              <p>
                {{ resume.professionalTitle }}
              </p>

            </div>

            <div
              v-else
              class="resume-editor__identity"
            >

              <label>
                <span>PROFILE LABEL</span>

                <input
                  v-model="resume.profileTitle"
                  type="text"
                />
              </label>

              <label>
                <span>NAME</span>

                <input
                  v-model="resume.name"
                  type="text"
                />
              </label>

              <label>
                <span>PROFESSIONAL TITLE</span>

                <input
                  v-model="
                    resume.professionalTitle
                  "
                  type="text"
                />
              </label>

            </div>

            <!-- Contact -->

            <div
              v-if="!editMode"
              class="resume-sheet__contact"
            >

              <a
                v-if="resume.contact.email"
                :href="
                  `mailto:${resume.contact.email}`
                "
              >
                {{ resume.contact.email }}
              </a>

            </div>

            <div
              v-else
              class="resume-editor__contact"
            >

              <label>
                <span>EMAIL</span>

                <input
                  v-model="resume.contact.email"
                  type="email"
                  placeholder="name@example.com"
                />
              </label>

            </div>

          </header>

          <div class="resume-sheet__line"></div>

          <!-- =======================================
               PROFILE
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>01</span>
              PROFILE
            </div>

            <div class="resume-section__content">

              <template v-if="!editMode">

                <p class="resume-section__large-text">
                  {{ resume.profile }}
                </p>

              </template>

              <template v-else>

                <textarea
                  v-model="resume.profile"
                  class="resume-editor__textarea resume-editor__textarea--large"
                  rows="6"
                ></textarea>

              </template>

            </div>

          </section>

          <!-- =======================================
               TECHNICAL SKILLS
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>02</span>
              TECHNICAL SKILLS
            </div>

            <div class="resume-section__content">

              <div class="resume-skills-grid">

                <article
                  v-for="(
                    skillGroup,
                    index
                  ) in resume.skills"
                  :key="skillGroup.id"
                  class="resume-skill-group"
                >

                  <template v-if="!editMode">

                    <h3>
                      {{ skillGroup.name }}
                    </h3>

                    <p>
                      {{ skillGroup.description }}
                    </p>

                  </template>

                  <template v-else>

                    <div class="resume-editor__field-actions">

                      <span>
                        SKILL GROUP {{ index + 1 }}
                      </span>

                      <button
                        type="button"
                        class="resume-editor__remove-button"
                        @click="
                          removeSkillGroup(
                            skillGroup.id
                          )
                        "
                      >
                        REMOVE
                      </button>

                    </div>

                    <label>
                      <span>GROUP NAME</span>

                      <input
                        v-model="skillGroup.name"
                        type="text"
                      />
                    </label>

                    <label>
                      <span>DESCRIPTION</span>

                      <textarea
                        v-model="
                          skillGroup.description
                        "
                        rows="5"
                      ></textarea>
                    </label>

                  </template>

                </article>

              </div>

              <button
                v-if="editMode"
                type="button"
                class="resume-editor__add-button"
                @click="addSkillGroup"
              >
                + ADD SKILL GROUP
              </button>

            </div>

          </section>

          <!-- =======================================
               SELECTED PROJECT EXPERIENCE
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>03</span>
              SELECTED EXPERIENCE
            </div>

            <div class="resume-section__content">

              <div class="resume-entry-list">

                <article
                  v-for="(
                    project,
                    index
                  ) in resume.projectExperience"
                  :key="project.id"
                  class="resume-entry"
                >

                  <template v-if="!editMode">

                    <div class="resume-entry__meta">

                      <span>
                        {{ project.type }}
                      </span>

                      <small>
                        {{ project.area }}
                      </small>

                    </div>

                    <div class="resume-entry__main">

                      <h3>
                        {{ project.title }}
                      </h3>

                      <p class="resume-entry__subtitle">
                        {{ project.subtitle }}
                      </p>

                      <p>
                        {{ project.description }}
                      </p>

                      <div class="resume-entry__tags">

                        <span
                          v-for="technology in project.technologies"
                          :key="technology"
                        >
                          {{ technology }}
                        </span>

                      </div>

                    </div>

                  </template>

                  <template v-else>

                    <div class="resume-editor__entry-editor">

                      <div class="resume-editor__field-actions">

                        <span>
                          PROJECT {{ index + 1 }}
                        </span>

                        <button
                          type="button"
                          class="resume-editor__remove-button"
                          @click="
                            removeProjectExperience(
                              project.id
                            )
                          "
                        >
                          REMOVE
                        </button>

                      </div>

                      <div class="resume-editor__grid">

                        <label>
                          <span>TYPE</span>

                          <input
                            v-model="project.type"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>AREA</span>

                          <input
                            v-model="project.area"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>PROJECT TITLE</span>

                          <input
                            v-model="project.title"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>SUBTITLE</span>

                          <input
                            v-model="project.subtitle"
                            type="text"
                          />
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>DESCRIPTION</span>

                          <textarea
                            v-model="project.description"
                            rows="6"
                          ></textarea>
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>
                            TECHNOLOGIES
                          </span>

                          <input
                            :value="
                              project.technologies.join(
                                ', '
                              )
                            "
                            type="text"
                            @input="
                              updateTechnologies(
                                project,
                                $event.target.value
                              )
                            "
                          />

                          <small>
                            Separate technologies with commas.
                          </small>
                        </label>

                      </div>

                    </div>

                  </template>

                </article>

              </div>

              <button
                v-if="editMode"
                type="button"
                class="resume-editor__add-button"
                @click="addProjectExperience"
              >
                + ADD PROJECT EXPERIENCE
              </button>

            </div>

          </section>

          <!-- =======================================
               EDUCATION
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>04</span>
              EDUCATION
            </div>

            <div class="resume-section__content">

              <div class="resume-timeline">

                <article
                  v-for="(
                    education,
                    index
                  ) in resume.education"
                  :key="education.id"
                  class="resume-timeline__item"
                >

                  <template v-if="!editMode">

                    <div class="resume-timeline__date">
                      {{ education.dates }}
                    </div>

                    <div>
                      <h3>
                        {{ education.institution }}
                      </h3>

                      <strong>
                        {{ education.qualification }}
                      </strong>

                      <p>
                        {{ education.description }}
                      </p>
                    </div>

                  </template>

                  <template v-else>

                    <div class="resume-editor__entry-editor">

                      <div class="resume-editor__field-actions">

                        <span>
                          EDUCATION {{ index + 1 }}
                        </span>

                        <button
                          type="button"
                          class="resume-editor__remove-button"
                          @click="
                            removeEducation(
                              education.id
                            )
                          "
                        >
                          REMOVE
                        </button>

                      </div>

                      <div class="resume-editor__grid">

                        <label>
                          <span>DATES</span>

                          <input
                            v-model="education.dates"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>INSTITUTION</span>

                          <input
                            v-model="
                              education.institution
                            "
                            type="text"
                          />
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>QUALIFICATION</span>

                          <input
                            v-model="
                              education.qualification
                            "
                            type="text"
                          />
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>DETAILS</span>

                          <textarea
                            v-model="
                              education.description
                            "
                            rows="4"
                          ></textarea>
                        </label>

                      </div>

                    </div>

                  </template>

                </article>

              </div>

              <button
                v-if="editMode"
                type="button"
                class="resume-editor__add-button"
                @click="addEducation"
              >
                + ADD EDUCATION
              </button>

            </div>

          </section>

          <!-- =======================================
               CERTIFICATIONS
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>05</span>
              CERTIFICATIONS
            </div>

            <div class="resume-section__content">

              <div class="resume-certifications">

                <article
                  v-for="(
                    certification,
                    index
                  ) in resume.certifications"
                  :key="certification.id"
                  class="resume-certification"
                >

                  <template v-if="!editMode">

                    <div
                      class="resume-certification__mark"
                      aria-hidden="true"
                    >
                      ✓
                    </div>

                    <div>

                      <h3>
                        {{ certification.name }}
                      </h3>

                      <strong>
                        {{ certification.issuer }}
                      </strong>

                      <p>
                        {{ certification.details }}
                      </p>

                    </div>

                  </template>

                  <template v-else>

                    <div class="resume-editor__entry-editor">

                      <div class="resume-editor__field-actions">

                        <span>
                          CERTIFICATION {{ index + 1 }}
                        </span>

                        <button
                          type="button"
                          class="resume-editor__remove-button"
                          @click="
                            removeCertification(
                              certification.id
                            )
                          "
                        >
                          REMOVE
                        </button>

                      </div>

                      <div class="resume-editor__grid">

                        <label>
                          <span>CERTIFICATION</span>

                          <input
                            v-model="
                              certification.name
                            "
                            type="text"
                          />
                        </label>

                        <label>
                          <span>ISSUER</span>

                          <input
                            v-model="
                              certification.issuer
                            "
                            type="text"
                          />
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>DETAILS</span>

                          <textarea
                            v-model="
                              certification.details
                            "
                            rows="4"
                          ></textarea>
                        </label>

                      </div>

                    </div>

                  </template>

                </article>

              </div>

              <button
                v-if="editMode"
                type="button"
                class="resume-editor__add-button"
                @click="addCertification"
              >
                + ADD CERTIFICATION
              </button>

            </div>

          </section>

          <!-- =======================================
               FORMAL WORK EXPERIENCE
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>06</span>
              WORK EXPERIENCE
            </div>

            <div class="resume-section__content">

              <div
                v-if="
                  resume.workExperience.length === 0 &&
                  !editMode
                "
                class="resume-empty-state"
              >
                <strong>
                  No prior formal work experience.
                </strong>

                <p>
                  This section can grow as professional experience
                  is added.
                </p>
              </div>

              <div class="resume-work-list">

                <article
                  v-for="(
                    job,
                    index
                  ) in resume.workExperience"
                  :key="job.id"
                  class="resume-work"
                >

                  <template v-if="!editMode">

                    <div class="resume-work__meta">

                      <span>
                        {{ job.dates }}
                      </span>

                      <small>
                        {{ job.location }}
                      </small>

                    </div>

                    <div class="resume-work__main">

                      <h3>
                        {{ job.role }}
                      </h3>

                      <strong>
                        {{ job.company }}
                      </strong>

                      <p>
                        {{ job.description }}
                      </p>

                    </div>

                  </template>

                  <template v-else>

                    <div class="resume-editor__entry-editor">

                      <div class="resume-editor__field-actions">

                        <span>
                          WORK EXPERIENCE {{ index + 1 }}
                        </span>

                        <button
                          type="button"
                          class="resume-editor__remove-button"
                          @click="
                            removeWorkExperience(
                              job.id
                            )
                          "
                        >
                          REMOVE
                        </button>

                      </div>

                      <div class="resume-editor__grid">

                        <label>
                          <span>DATES</span>

                          <input
                            v-model="job.dates"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>LOCATION</span>

                          <input
                            v-model="job.location"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>ROLE</span>

                          <input
                            v-model="job.role"
                            type="text"
                          />
                        </label>

                        <label>
                          <span>COMPANY</span>

                          <input
                            v-model="job.company"
                            type="text"
                          />
                        </label>

                        <label class="resume-editor__field--wide">
                          <span>DESCRIPTION</span>

                          <textarea
                            v-model="
                              job.description
                            "
                            rows="5"
                          ></textarea>
                        </label>

                      </div>

                    </div>

                  </template>

                </article>

              </div>

              <button
                v-if="editMode"
                type="button"
                class="resume-editor__add-button"
                @click="addWorkExperience"
              >
                + ADD WORK EXPERIENCE
              </button>

            </div>

          </section>

          <!-- =======================================
               DEVELOPMENT JOURNEY
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>07</span>
              DEVELOPMENT
            </div>

            <div class="resume-section__content">

              <div
                v-if="!editMode"
                class="resume-development"
              >

                <div
                  v-for="(
                    step,
                    index
                  ) in resume.developmentJourney"
                  :key="step.id"
                  class="resume-development__item"
                >

                  <span>
                    {{ step.label }}
                  </span>

                  <strong>
                    {{ step.title }}
                  </strong>

                  <p>
                    {{ step.description }}
                  </p>

                  <div
                    v-if="
                      index <
                      resume.developmentJourney.length - 1
                    "
                    class="resume-development__arrow"
                    aria-hidden="true"
                  >
                    →
                  </div>

                </div>

              </div>

              <div
                v-else
                class="resume-development-editor"
              >

                <article
                  v-for="(
                    step,
                    index
                  ) in resume.developmentJourney"
                  :key="step.id"
                  class="resume-editor__journey-item"
                >

                  <div class="resume-editor__field-actions">

                    <span>
                      STAGE {{ index + 1 }}
                    </span>

                    <button
                      type="button"
                      class="resume-editor__remove-button"
                      @click="
                        removeJourneyStep(
                          step.id
                        )
                      "
                    >
                      REMOVE
                    </button>

                  </div>

                  <div class="resume-editor__grid">

                    <label>
                      <span>LABEL</span>

                      <input
                        v-model="step.label"
                        type="text"
                      />
                    </label>

                    <label>
                      <span>TITLE</span>

                      <input
                        v-model="step.title"
                        type="text"
                      />
                    </label>

                    <label class="resume-editor__field--wide">
                      <span>DESCRIPTION</span>

                      <textarea
                        v-model="step.description"
                        rows="4"
                      ></textarea>
                    </label>

                  </div>

                </article>

                <button
                  type="button"
                  class="resume-editor__add-button"
                  @click="addJourneyStep"
                >
                  + ADD JOURNEY STAGE
                </button>

              </div>

            </div>

          </section>

          <!-- =======================================
               WORKING STYLE
               ======================================= -->

          <section class="resume-section">

            <div class="resume-section__label">
              <span>08</span>
              WORKING STYLE
            </div>

            <div class="resume-section__content">

              <div
                v-if="!editMode"
                class="resume-soft-skills"
              >

                <span
                  v-for="style in resume.workingStyle"
                  :key="style.id"
                >
                  {{ style.text }}
                </span>

              </div>

              <div
                v-else
                class="resume-working-style-editor"
              >

                <article
                  v-for="(
                    style,
                    index
                  ) in resume.workingStyle"
                  :key="style.id"
                  class="resume-working-style-editor__item"
                >

                  <label>
                    <span>
                      ITEM {{ index + 1 }}
                    </span>

                    <input
                      v-model="style.text"
                      type="text"
                    />
                  </label>

                  <button
                    type="button"
                    class="resume-editor__remove-button"
                    @click="
                      removeWorkingStyle(
                        style.id
                      )
                    "
                  >
                    REMOVE
                  </button>

                </article>

                <button
                  type="button"
                  class="resume-editor__add-button"
                  @click="addWorkingStyle"
                >
                  + ADD WORKING STYLE
                </button>

              </div>

            </div>

          </section>

          <!-- =======================================
               RESUME SHEET FOOTER
               ======================================= -->

          <footer class="resume-sheet__footer">

            <span>
              SELECTED PORTFOLIO RESUME
            </span>

            <span>
              ENTRY 05
            </span>

          </footer>

        </section>

        <!-- =========================================
             JOURNAL NOTE
             ========================================= -->

        <section class="resume-page__note">

          <div class="resume-page__note-copy">

            <span class="resume-page__small-label">
              JOURNAL NOTE
            </span>

            <h2>
              The résumé is the summary.
              The projects are the proof.
            </h2>

            <p>
              This page keeps the traditional format, but the rest
              of the portfolio tells the longer story.
            </p>

          </div>

          <div
            class="resume-page__note-sticker"
            aria-hidden="true"
          >

            <span>
              KEEP
            </span>

            <strong>
              BUILDING
            </strong>

          </div>

        </section>

        <!-- =========================================
             NAVIGATION
             ========================================= -->

        <section class="resume-page__navigation">

          <button
            type="button"
            class="resume-page__nav-button resume-page__nav-button--back"
            @click="goToSkills"
          >
            <span>←</span>
            BACK TO SKILLS
          </button>

          <button
            type="button"
            class="resume-page__nav-button"
            @click="goToContact"
          >
            NEXT ENTRY
            <span>→</span>
          </button>

        </section>

        <!-- =========================================
             FOOTER
             ========================================= -->

        <footer class="resume-page__footer">

          <span>
            ENTRY 05 / END
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
import {
  inject,
  onMounted,
  ref
} from 'vue'

const navigateWithTransition =
  inject(
    'navigateWithTransition'
  )

const STORAGE_KEY =
  'portfolio-resume-v1'

const editMode =
  ref(false)

const storageMessage =
  ref('')

const storageError =
  ref(false)

/* =========================================
   DEFAULT DATA
   ========================================= */

function createDefaultResume() {
  return {
    name:
      'Nithaam Julius',

    profileTitle:
      'DEVELOPER',

    professionalTitle:
      'Full-Stack Developer',

    contact: {
      email:
        'nithaamjulius06@gmail.com'
    },

    profile:
      'Developer focused on building interactive, practical and visually thoughtful web applications. My experience has grown through individual and collaborative projects covering frontend development, backend systems, APIs, databases, authentication and deployment.',

    skills: [
      {
        id: createId(),
        name:
          'Frontend',
        description:
          'HTML, CSS, JavaScript, Vue 3, Vue Router, Vuex, Responsive Design and Three.js.'
      },

      {
        id: createId(),
        name:
          'Backend',
        description:
          'Node.js, Express, Python, Flask, FastAPI and REST APIs.'
      },

      {
        id: createId(),
        name:
          'Database / Auth',
        description:
          'MySQL, JWT, bcryptjs, database integration, password recovery and authentication flows.'
      },

      {
        id: createId(),
        name:
          'Tools',
        description:
          'Git, GitHub, Vite, Axios, npm, Netlify, Render and Local Storage.'
      }
    ],

    projectExperience: [
      {
        id: createId(),
        type:
          'TEAM PROJECT',
        area:
          'FULL-STACK',
        title:
          'StockWell',
        subtitle:
          'Collective Purchasing Platform',
        description:
          'Worked on the frontend and backend authentication experience, including login, signup, forgot-password and reset-password functionality. Also contributed to JWT authentication, password recovery, database integration and team branch integration.',
        technologies: [
          'Vue 3',
          'Node.js',
          'Express',
          'MySQL',
          'JWT',
          'bcryptjs'
        ]
      },

      {
        id: createId(),
        type:
          'TEAM PROJECT',
        area:
          'DASHBOARD',
        title:
          'ApexPulse',
        subtitle:
          'Operations Dashboard',
        description:
          'Contributed across the Vue frontend architecture, routing, API integration, dashboard logic and reusable components. Worked with frontend services, backend API integration, branch integration and deployment.',
        technologies: [
          'Vue 3',
          'Axios',
          'Vite',
          'Python',
          'FastAPI'
        ]
      },

      {
        id: createId(),
        type:
          'TEAM PROJECT',
        area:
          'BACKEND',
        title:
          'Modern Tech Solutions',
        subtitle:
          'Module 2 — Payroll Backend',
        description:
          'Focused on payroll backend development and its integration into the application, including controllers, routes, frontend API integration, database configuration and development workflow integration.',
        technologies: [
          'Node.js',
          'Express',
          'MySQL',
          'JWT',
          'REST API'
        ]
      },

      {
        id: createId(),
        type:
          'TEAM PROJECT',
        area:
          'VISUALISATION',
        title:
          'Team Alpha Showcase',
        subtitle:
          'Interactive Data Visualisation',
        description:
          'Built the interactive Three.js globe experience, including node positioning, raycasting, node-selection interactions, click behaviour and additional globe interaction effects.',
        technologies: [
          'Vue.js',
          'Three.js',
          'JavaScript',
          'Flask',
          'Python'
        ]
      },

      {
        id: createId(),
        type:
          'SOLO PROJECTS',
        area:
          'EARLY WORK',
        title:
          'PyPlay + HTML/CSS Portfolio',
        subtitle:
          'First coding and portfolio projects',
        description:
          'Built independently while developing my foundations in Python, HTML and CSS. These projects introduced me to programming logic, responsive interfaces, animation and personal web development.',
        technologies: [
          'Python',
          'HTML',
          'CSS',
          'Responsive Design'
        ]
      }
    ],

    education: [
      {
        id: createId(),
        dates:
          '2019 – 2023',
        institution:
          'Pelican Park High School',
        qualification:
          'Matric Certificate — Bachelors Pass',
        description:
          'Completed high school and matriculated in 2023 with a Bachelors Pass.'
      },

      {
        id: createId(),
        dates:
          'April 2026 – April 2027',
        institution:
          'Life Choices Academy',
        qualification:
          '6-Month Learning Programme + Internship',
        description:
          'Began the 6-month learning programme in April 2026 and moved into the internship phase from October 2026 through April 2027.'
      }
    ],

    certifications: [
      {
        id: createId(),
        name:
          'Matric Certificate',
        issuer:
          'Pelican Park High School',
        details:
          'Matriculated in 2023 with a Bachelors Pass.'
      }
    ],

    workExperience: [],

    developmentJourney: [
      {
        id: createId(),
        label:
          'STARTING POINT',
        title:
          'Python',
        description:
          'Began by learning core programming concepts through small independent projects.'
      },

      {
        id: createId(),
        label:
          'EXPANDING',
        title:
          'Frontend',
        description:
          'Moved into HTML, CSS, JavaScript and interactive web interfaces.'
      },

      {
        id: createId(),
        label:
          'CURRENT DIRECTION',
        title:
          'Full-Stack',
        description:
          'Building applications across frontend, backend, databases, authentication and deployment.'
      }
    ],

    workingStyle: [
      {
        id: createId(),
        text:
          'Problem Solving'
      },

      {
        id: createId(),
        text:
          'Team Collaboration'
      },

      {
        id: createId(),
        text:
          'Learning by Building'
      },

      {
        id: createId(),
        text:
          'Frontend Design'
      },

      {
        id: createId(),
        text:
          'Debugging'
      },

      {
        id: createId(),
        text:
          'Version Control'
      }
    ]
  }
}

const resume =
  ref(
    createDefaultResume()
  )

/* =========================================
   LOAD
   ========================================= */

onMounted(() => {
  loadResume()
})

function loadResume() {
  try {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (!saved) {
      return
    }

    const parsed =
      JSON.parse(saved)

    resume.value =
      normaliseResume(
        parsed
      )

    storageMessage.value =
      'Saved résumé loaded.'

    storageError.value =
      false

  } catch (error) {
    console.error(
      'Could not load résumé:',
      error
    )

    storageMessage.value =
      'Could not load saved résumé. Using the default information.'

    storageError.value =
      true
  }
}

/* =========================================
   SAVE
   ========================================= */

function saveResume() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        resume.value
      )
    )

    storageMessage.value =
      'Résumé saved locally.'

    storageError.value =
      false

  } catch (error) {
    console.error(
      'Could not save résumé:',
      error
    )

    storageMessage.value =
      'Could not save résumé changes.'

    storageError.value =
      true
  }
}

function toggleEditMode() {
  if (
    editMode.value
  ) {
    saveResume()

    editMode.value =
      false

    return
  }

  editMode.value =
    true
}

/* =========================================
   SKILLS
   ========================================= */

function addSkillGroup() {
  resume.value.skills.push({
    id: createId(),
    name:
      'New Skill Group',
    description:
      'Add the technologies, tools or abilities that belong here.'
  })
}

function removeSkillGroup(
  id
) {
  resume.value.skills =
    resume.value.skills.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   PROJECT EXPERIENCE
   ========================================= */

function addProjectExperience() {
  resume.value.projectExperience.push({
    id: createId(),
    type:
      'PROJECT',
    area:
      'AREA',
    title:
      'New Project',
    subtitle:
      'Project Subtitle',
    description:
      'Add a short description of the project and your contribution.',
    technologies: [
      'Technology'
    ]
  })
}

function removeProjectExperience(
  id
) {
  resume.value.projectExperience =
    resume.value.projectExperience.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

function updateTechnologies(
  item,
  value
) {
  item.technologies =
    value
      .split(',')
      .map(
        (technology) =>
          technology.trim()
      )
      .filter(Boolean)
}

/* =========================================
   EDUCATION
   ========================================= */

function addEducation() {
  resume.value.education.push({
    id: createId(),
    dates:
      'YYYY – YYYY',
    institution:
      'Institution',
    qualification:
      'Qualification',
    description:
      'Add relevant education details here.'
  })
}

function removeEducation(
  id
) {
  resume.value.education =
    resume.value.education.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   CERTIFICATIONS
   ========================================= */

function addCertification() {
  resume.value.certifications.push({
    id: createId(),
    name:
      'New Certification',
    issuer:
      'Issuer',
    details:
      'Add certification details here.'
  })
}

function removeCertification(
  id
) {
  resume.value.certifications =
    resume.value.certifications.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   WORK EXPERIENCE
   ========================================= */

function addWorkExperience() {
  resume.value.workExperience.push({
    id: createId(),
    dates:
      'YYYY – PRESENT',
    location:
      'Location',
    role:
      'Role',
    company:
      'Company',
    description:
      'Describe your responsibilities and achievements here.'
  })
}

function removeWorkExperience(
  id
) {
  resume.value.workExperience =
    resume.value.workExperience.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   DEVELOPMENT JOURNEY
   ========================================= */

function addJourneyStep() {
  resume.value.developmentJourney.push({
    id: createId(),
    label:
      'NEW STAGE',
    title:
      'New Skill',
    description:
      'Describe this stage of your development journey.'
  })
}

function removeJourneyStep(
  id
) {
  resume.value.developmentJourney =
    resume.value.developmentJourney.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   WORKING STYLE
   ========================================= */

function addWorkingStyle() {
  resume.value.workingStyle.push({
    id: createId(),
    text:
      'New Working Style'
  })
}

function removeWorkingStyle(
  id
) {
  resume.value.workingStyle =
    resume.value.workingStyle.filter(
      (item) =>
        item.id !== id
    )

  saveResume()
}

/* =========================================
   NORMALISE
   ========================================= */

function normaliseResume(
  data
) {
  const defaults =
    createDefaultResume()

  return {
    ...defaults,

    ...data,

    contact: {
      ...defaults.contact,
      ...(data.contact || {})
    },

    skills:
      Array.isArray(data.skills)
        ? data.skills
        : defaults.skills,

    projectExperience:
      Array.isArray(
        data.projectExperience
      )
        ? data.projectExperience
        : defaults.projectExperience,

    education:
      Array.isArray(
        data.education
      )
        ? data.education
        : defaults.education,

    certifications:
      Array.isArray(
        data.certifications
      )
        ? data.certifications
        : defaults.certifications,

    workExperience:
      Array.isArray(
        data.workExperience
      )
        ? data.workExperience
        : defaults.workExperience,

    developmentJourney:
      Array.isArray(
        data.developmentJourney
      )
        ? data.developmentJourney
        : defaults.developmentJourney,

    workingStyle:
      Array.isArray(
        data.workingStyle
      )
        ? data.workingStyle
        : defaults.workingStyle
  }
}

/* =========================================
   RESET
   ========================================= */

function resetResume() {
  const confirmed =
    window.confirm(
      'Reset the résumé to the original information?'
    )

  if (!confirmed) {
    return
  }

  resume.value =
    createDefaultResume()

  saveResume()

  storageMessage.value =
    'Résumé reset to the original information.'
}

/* =========================================
   ID
   ========================================= */

function createId() {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID()
  }

  return `resume-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`
}

/* =========================================
   PRINT
   ========================================= */

function printResume() {
  window.print()
}

/* =========================================
   NAVIGATION
   ========================================= */

function navigateTo(path) {
  if (
    typeof navigateWithTransition ===
    'function'
  ) {
    navigateWithTransition(path)
    return
  }

  window.location.href =
    path
}

function goToSkills() {
  navigateTo('/skills')
}

function goToContact() {
  navigateTo('/contact')
}
</script>

<style scoped>

/* =========================================
   RESUME PAGE
   ========================================= */

.resume-page {
  position: relative;

  min-height:
    calc(100svh - 6.2rem);

  overflow: hidden;

  background:
    var(--paper);

  color:
    var(--welcome-brown);
}

.resume-page__paper {
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

.resume-page__paper::before {
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

.resume-page__paper::after {
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

.resume-page__content {
  width:
    min(1180px, 92vw);

  margin:
    0 auto;

  padding:
    clamp(2rem, 4vw, 4.5rem)
    0
    4rem;
}

/* =========================================
   HEADER
   ========================================= */

.resume-page__header {
  display:
    flex;

  align-items:
    flex-end;

  justify-content:
    space-between;

  gap:
    1.5rem;

  padding-bottom:
    1rem;

  border-bottom:
    1px solid
    rgba(35, 36, 36, 0.2);
}

.resume-page__entry-label {
  display:
    flex;

  align-items:
    center;

  gap:
    0.8rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.75rem;

  letter-spacing:
    0.14em;
}

.resume-page__entry-label strong {
  display:
    inline-grid;

  width:
    2rem;

  height:
    2rem;

  place-items:
    center;

  border:
    1px solid
    rgba(35, 36, 36, 0.24);

  border-radius:
    50%;

  font-size:
    0.72rem;
}

.resume-page__date {
  max-width:
    22rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.66rem;

  letter-spacing:
    0.1em;

  text-align:
    right;

  opacity:
    0.45;
}

/* =========================================
   HERO
   ========================================= */

.resume-page__hero {
  position:
    relative;

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    3rem;

  min-height:
    30rem;

  padding:
    clamp(4rem, 7vw, 7rem)
    0
    clamp(3rem, 6vw, 5rem);
}

.resume-page__hero-copy {
  max-width:
    50rem;
}

.resume-page__eyebrow {
  margin:
    0 0 1rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.72rem;

  font-weight:
    600;

  letter-spacing:
    0.2em;

  opacity:
    0.42;
}

.resume-page__title {
  margin:
    0;

  max-width:
    8ch;

  font-family:
    var(--font-coda);

  font-size:
    clamp(4rem, 8vw, 7.4rem);

  line-height:
    0.86;

  letter-spacing:
    -0.06em;
}

.resume-page__title span {
  display:
    block;

  color:
    #8e66a9;

  transform:
    translateX(0.06em);
}

.resume-page__intro {
  max-width:
    40rem;

  margin:
    2rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    clamp(1.2rem, 1.9vw, 1.6rem);

  line-height:
    1.5;
}

.resume-page__scribble {
  width:
    fit-content;

  margin-top:
    1.5rem;

  font-family:
    var(--font-bonbon);

  font-size:
    clamp(1.25rem, 2vw, 1.6rem);

  transform:
    rotate(-3deg);
}

.resume-page__actions {
  display:
    flex;

  align-items:
    center;

  flex-wrap:
    wrap;

  gap:
    0.7rem;

  margin-top:
    1.8rem;
}

.resume-page__action-button {
  display:
    inline-flex;

  align-items:
    center;

  gap:
    0.8rem;

  padding:
    0.75rem
    0.95rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.2);

  background:
    rgba(255, 255, 255, 0.24);

  color:
    var(--welcome-brown);

  cursor:
    pointer;

  font-family:
    var(--font-google-code);

  font-size:
    0.63rem;

  font-weight:
    700;

  letter-spacing:
    0.09em;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.resume-page__action-button:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 8px 15px
    rgba(35, 36, 36, 0.1);
}

.resume-page__action-button strong {
  font-size:
    1rem;
}

.resume-page__action-button--primary {
  background:
    var(--welcome-brown);

  color:
    #dedede;
}

.resume-page__editor-hint {
  max-width:
    40rem;

  margin:
    0.8rem 0 0;

  font-family:
    var(--font-google-code);

  font-size:
    0.6rem;

  line-height:
    1.5;

  letter-spacing:
    0.05em;

  opacity:
    0.5;
}

.resume-page__storage-message {
  margin:
    0.6rem 0 0;

  font-family:
    var(--font-google-code);

  font-size:
    0.61rem;

  letter-spacing:
    0.05em;

  color:
    #60733a;
}

.resume-page__storage-message--error {
  color:
    #9a4c45;
}

/* =========================================
   RESUME STAMP
   ========================================= */

.resume-page__resume-stamp {
  display:
    grid;

  width:
    11.8rem;

  min-height:
    11.8rem;

  place-items:
    center;

  align-content:
    center;

  gap:
    0.25rem;

  padding:
    1.2rem;

  border:
    4px solid
    #fff;

  border-radius:
    50%;

  background:
    #c7c68e;

  color:
    var(--welcome-brown);

  box-shadow:
    0 14px 24px
    rgba(35, 36, 36, 0.12),
    0 2px 4px
    rgba(35, 36, 36, 0.08);

  font-family:
    var(--font-google-code);

  transform:
    rotate(8deg);
}

.resume-page__resume-stamp span {
  font-size:
    0.65rem;

  letter-spacing:
    0.16em;
}

.resume-page__resume-stamp strong {
  color:
    #8e66a9;

  font-size:
    1.65rem;

  letter-spacing:
    0.06em;
}

.resume-page__resume-stamp small {
  max-width:
    6rem;

  margin-top:
    0.25rem;

  font-size:
    0.51rem;

  line-height:
    1.3;

  letter-spacing:
    0.08em;

  text-align:
    center;

  opacity:
    0.48;
}

/* =========================================
   DIVIDER
   ========================================= */

.resume-page__divider {
  display:
    grid;

  grid-template-columns:
    1fr
    1fr;

  gap:
    1rem;
}

.resume-page__divider span {
  height:
    1px;

  background:
    rgba(35, 36, 36, 0.28);
}

/* =========================================
   RESUME SHEET
   ========================================= */

.resume-sheet {
  position:
    relative;

  margin:
    clamp(4rem, 7vw, 6rem)
    0;

  padding:
    clamp(2rem, 5vw, 4rem);

  border:
    1px solid
    rgba(35, 36, 36, 0.16);

  background:
    rgba(255, 255, 255, 0.74);

  box-shadow:
    0 24px 45px
    rgba(35, 36, 36, 0.1);

  transform:
    rotate(-0.35deg);
}

.resume-sheet::before {
  content:
    'RESUME';

  position:
    absolute;

  top:
    1rem;

  right:
    1.4rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  letter-spacing:
    0.16em;

  opacity:
    0.18;

  transform:
    rotate(3deg);
}

/* =========================================
   RESUME HEADER
   ========================================= */

.resume-sheet__header {
  display:
    flex;

  align-items:
    flex-start;

  justify-content:
    space-between;

  gap:
    2rem;
}

.resume-sheet__kicker {
  font-family:
    var(--font-google-code);

  font-size:
    0.62rem;

  letter-spacing:
    0.17em;

  opacity:
    0.45;
}

.resume-sheet__header h2 {
  margin:
    0.45rem 0 0;

  font-family:
    var(--font-coda);

  font-size:
    clamp(2.6rem, 6vw, 5rem);

  line-height:
    0.9;

  letter-spacing:
    -0.05em;
}

.resume-sheet__header p {
  margin:
    0.5rem 0 0;

  font-family:
    var(--font-butterfly);

  font-size:
    1.45rem;
}

.resume-sheet__contact {
  display:
    flex;

  flex-wrap:
    wrap;

  justify-content:
    flex-end;

  gap:
    0.5rem;

  max-width:
    24rem;
}

.resume-sheet__contact a {
  color:
    var(--welcome-brown);

  text-decoration:
    none;

  padding:
    0.45rem
    0.65rem;

  border:
    1px dashed
    rgba(35, 36, 36, 0.22);

  background:
    rgba(199, 198, 142, 0.18);

  font-family:
    var(--font-google-code);

  font-size:
    0.58rem;
}

.resume-sheet__contact a:hover {
  text-decoration:
    underline;
}

.resume-sheet__line {
  width:
    100%;

  height:
    2px;

  margin:
    1.5rem 0 0;

  background:
    var(--welcome-brown);

  opacity:
    0.8;
}

/* =========================================
   RESUME SECTIONS
   ========================================= */

.resume-section {
  display:
    grid;

  grid-template-columns:
    10rem
    minmax(0, 1fr);

  gap:
    2rem;

  padding:
    2.1rem 0;

  border-bottom:
    1px dashed
    rgba(35, 36, 36, 0.18);
}

.resume-section__label {
  display:
    flex;

  align-items:
    flex-start;

  gap:
    0.55rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.62rem;

  font-weight:
    700;

  letter-spacing:
    0.1em;

  opacity:
    0.55;
}

.resume-section__label span {
  display:
    inline-grid;

  min-width:
    1.55rem;

  height:
    1.55rem;

  place-items:
    center;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  border-radius:
    50%;

  font-size:
    0.55rem;
}

.resume-section__content {
  min-width:
    0;
}

.resume-section__large-text {
  max-width:
    55rem;

  margin:
    0;

  font-family:
    var(--font-crafty);

  font-size:
    clamp(1.05rem, 1.6vw, 1.3rem);

  line-height:
    1.6;
}

/* =========================================
   EDITOR FORMS
   ========================================= */

.resume-editor__identity {
  display:
    grid;

  gap:
    0.8rem;

  flex:
    1;
}

.resume-editor__contact {
  width:
    min(24rem, 100%);
}

.resume-editor__identity label,
.resume-editor__contact label,
.resume-editor__entry-editor label,
.resume-editor__journey-item label,
.resume-working-style-editor label {
  display:
    grid;

  gap:
    0.35rem;
}

.resume-editor__identity span,
.resume-editor__contact span,
.resume-editor__entry-editor label > span,
.resume-editor__journey-item label > span,
.resume-working-style-editor label > span,
.resume-editor__grid label > span {
  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  font-weight:
    700;

  letter-spacing:
    0.09em;

  opacity:
    0.48;
}

.resume-editor__identity input,
.resume-editor__contact input,
.resume-editor__grid input,
.resume-editor__grid textarea,
.resume-editor__entry-editor > textarea,
.resume-editor__journey-item textarea,
.resume-working-style-editor input,
.resume-editor__textarea {
  width:
    100%;

  box-sizing:
    border-box;

  padding:
    0.65rem 0.7rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  border-radius:
    0;

  outline:
    none;

  background:
    rgba(255, 255, 255, 0.62);

  color:
    var(--welcome-brown);

  font-family:
    var(--font-crafty);

  font-size:
    1rem;
}

.resume-editor__identity input:focus,
.resume-editor__contact input:focus,
.resume-editor__grid input:focus,
.resume-editor__grid textarea:focus,
.resume-editor__textarea:focus,
.resume-working-style-editor input:focus {
  border-color:
    #8e66a9;

  box-shadow:
    0 0 0 2px
    rgba(142, 102, 169, 0.1);
}

.resume-editor__textarea {
  resize:
    vertical;

  min-height:
    8rem;

  line-height:
    1.5;
}

.resume-editor__textarea--large {
  min-height:
    11rem;
}

.resume-editor__grid {
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    1rem;
}

.resume-editor__grid textarea {
  resize:
    vertical;

  line-height:
    1.5;
}

.resume-editor__field--wide {
  grid-column:
    1 / -1;
}

.resume-editor__field--wide small {
  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  opacity:
    0.45;
}

.resume-editor__field-actions {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;

  margin-bottom:
    0.8rem;

  padding-bottom:
    0.55rem;

  border-bottom:
    1px dashed
    rgba(35, 36, 36, 0.2);

  font-family:
    var(--font-google-code);

  font-size:
    0.56rem;

  font-weight:
    700;

  letter-spacing:
    0.08em;

  opacity:
    0.55;
}

.resume-editor__remove-button {
  border:
    1px solid
    rgba(154, 76, 69, 0.25);

  background:
    rgba(154, 76, 69, 0.05);

  color:
    #9a4c45;

  cursor:
    pointer;

  padding:
    0.35rem
    0.5rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.54rem;

  font-weight:
    700;

  letter-spacing:
    0.06em;
}

.resume-editor__add-button {
  margin-top:
    1rem;

  padding:
    0.65rem
    0.8rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  background:
    #c7c68e;

  color:
    var(--welcome-brown);

  cursor:
    pointer;

  font-family:
    var(--font-google-code);

  font-size:
    0.58rem;

  font-weight:
    700;

  letter-spacing:
    0.08em;
}

.resume-editor__add-button:hover,
.resume-editor__remove-button:hover {
  transform:
    translateY(-1px);
}

/* =========================================
   SKILLS
   ========================================= */

.resume-skills-grid {
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    1.2rem;
}

.resume-skill-group {
  padding:
    1rem 1.1rem;

  border-left:
    3px solid
    #8e66a9;

  background:
    rgba(142, 102, 169, 0.06);
}

.resume-skill-group h3 {
  margin:
    0 0 0.55rem;

  font-family:
    var(--font-coda);

  font-size:
    1.35rem;
}

.resume-skill-group p {
  margin:
    0;

  font-family:
    var(--font-crafty);

  font-size:
    0.98rem;

  line-height:
    1.5;
}

.resume-skill-group label {
  display:
    grid;

  gap:
    0.35rem;

  margin-bottom:
    0.8rem;
}

.resume-skill-group label > span {
  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  font-weight:
    700;

  letter-spacing:
    0.08em;

  opacity:
    0.45;
}

.resume-skill-group input,
.resume-skill-group textarea {
  width:
    100%;

  box-sizing:
    border-box;

  padding:
    0.6rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  background:
    rgba(255, 255, 255, 0.55);

  color:
    var(--welcome-brown);

  font-family:
    var(--font-crafty);

  outline:
    none;
}

.resume-skill-group textarea {
  resize:
    vertical;

  line-height:
    1.45;
}

/* =========================================
   PROJECT EXPERIENCE
   ========================================= */

.resume-entry {
  display:
    grid;

  grid-template-columns:
    8rem
    minmax(0, 1fr);

  gap:
    1.5rem;

  padding:
    0 0 1.7rem;

  margin:
    0 0 1.7rem;

  border-bottom:
    1px dashed
    rgba(35, 36, 36, 0.16);
}

.resume-entry:last-child {
  margin-bottom:
    0;

  padding-bottom:
    0;

  border-bottom:
    0;
}

.resume-entry__meta {
  display:
    grid;

  align-content:
    start;

  gap:
    0.4rem;
}

.resume-entry__meta span,
.resume-entry__meta small {
  font-family:
    var(--font-google-code);

  font-size:
    0.56rem;

  letter-spacing:
    0.08em;
}

.resume-entry__meta span {
  color:
    #8e66a9;

  font-weight:
    700;
}

.resume-entry__meta small {
  opacity:
    0.4;
}

.resume-entry__main h3 {
  margin:
    0;

  font-family:
    var(--font-coda);

  font-size:
    clamp(1.7rem, 3vw, 2.4rem);

  line-height:
    0.95;
}

.resume-entry__subtitle {
  margin:
    0.45rem 0 0.8rem;

  font-family:
    var(--font-butterfly);

  font-size:
    1.2rem;
}

.resume-entry__main > p:not(
  .resume-entry__subtitle
) {
  max-width:
    55rem;

  margin:
    0;

  font-family:
    var(--font-crafty);

  font-size:
    1rem;

  line-height:
    1.55;
}

.resume-entry__tags {
  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    0.45rem;

  margin-top:
    1rem;
}

.resume-entry__tags span {
  padding:
    0.38rem
    0.56rem;

  border:
    1px dashed
    rgba(35, 36, 36, 0.18);

  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  background:
    rgba(255, 255, 255, 0.42);
}

.resume-editor__entry-editor {
  width:
    100%;
}

/* =========================================
   EDUCATION
   ========================================= */

.resume-timeline {
  display:
    grid;

  gap:
    1.3rem;
}

.resume-timeline__item {
  display:
    grid;

  grid-template-columns:
    10rem
    minmax(0, 1fr);

  gap:
    1.5rem;

  padding-bottom:
    1.3rem;

  border-bottom:
    1px dashed
    rgba(35, 36, 36, 0.16);
}

.resume-timeline__item:last-child {
  border-bottom:
    0;

  padding-bottom:
    0;
}

.resume-timeline__date {
  font-family:
    var(--font-google-code);

  font-size:
    0.65rem;

  letter-spacing:
    0.05em;

  opacity:
    0.45;
}

.resume-timeline__item h3 {
  margin:
    0;

  font-family:
    var(--font-coda);

  font-size:
    1.75rem;

  line-height:
    1;
}

.resume-timeline__item strong {
  display:
    block;

  margin-top:
    0.45rem;

  font-family:
    var(--font-butterfly);

  font-size:
    1.15rem;
}

.resume-timeline__item p {
  margin:
    0.7rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    1rem;

  line-height:
    1.5;
}

/* =========================================
   CERTIFICATIONS
   ========================================= */

.resume-certifications {
  display:
    grid;

  gap:
    1rem;
}

.resume-certification {
  display:
    grid;

  grid-template-columns:
    auto
    minmax(0, 1fr);

  gap:
    1rem;

  padding:
    1rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.13);

  background:
    rgba(199, 198, 142, 0.12);
}

.resume-certification__mark {
  display:
    grid;

  width:
    2.2rem;

  height:
    2.2rem;

  place-items:
    center;

  border-radius:
    50%;

  background:
    #8e66a9;

  color:
    #fff;

  font-family:
    var(--font-google-code);

  font-size:
    0.85rem;

  font-weight:
    700;
}

.resume-certification h3 {
  margin:
    0;

  font-family:
    var(--font-coda);

  font-size:
    1.4rem;
}

.resume-certification strong {
  display:
    block;

  margin-top:
    0.25rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.58rem;

  letter-spacing:
    0.05em;

  opacity:
    0.55;
}

.resume-certification p {
  margin:
    0.5rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    0.95rem;

  line-height:
    1.45;
}

/* =========================================
   WORK EXPERIENCE
   ========================================= */

.resume-empty-state {
  padding:
    1.2rem;

  border:
    1px dashed
    rgba(35, 36, 36, 0.22);

  background:
    rgba(255, 255, 255, 0.38);
}

.resume-empty-state strong {
  display:
    block;

  font-family:
    var(--font-coda);

  font-size:
    1.4rem;
}

.resume-empty-state p {
  margin:
    0.45rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    1rem;
}

.resume-work-list {
  display:
    grid;

  gap:
    1.4rem;
}

.resume-work {
  display:
    grid;

  grid-template-columns:
    8rem
    minmax(0, 1fr);

  gap:
    1.5rem;

  padding-bottom:
    1.4rem;

  border-bottom:
    1px dashed
    rgba(35, 36, 36, 0.16);
}

.resume-work:last-child {
  padding-bottom:
    0;

  border-bottom:
    0;
}

.resume-work__meta {
  display:
    grid;

  align-content:
    start;

  gap:
    0.35rem;
}

.resume-work__meta span,
.resume-work__meta small {
  font-family:
    var(--font-google-code);

  font-size:
    0.56rem;

  letter-spacing:
    0.06em;
}

.resume-work__meta span {
  color:
    #8e66a9;

  font-weight:
    700;
}

.resume-work__meta small {
  opacity:
    0.4;
}

.resume-work__main h3 {
  margin:
    0;

  font-family:
    var(--font-coda);

  font-size:
    1.85rem;

  line-height:
    1;
}

.resume-work__main strong {
  display:
    block;

  margin-top:
    0.35rem;

  font-family:
    var(--font-butterfly);

  font-size:
    1.15rem;
}

.resume-work__main p {
  margin:
    0.7rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    1rem;

  line-height:
    1.5;
}

/* =========================================
   DEVELOPMENT
   ========================================= */

.resume-development {
  display:
    grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    1rem;
}

.resume-development__item {
  position:
    relative;

  padding:
    1.15rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.14);

  background:
    rgba(199, 198, 142, 0.12);
}

.resume-development__item span {
  font-family:
    var(--font-google-code);

  font-size:
    0.54rem;

  letter-spacing:
    0.1em;

  opacity:
    0.45;
}

.resume-development__item strong {
  display:
    block;

  margin-top:
    0.45rem;

  font-family:
    var(--font-coda);

  font-size:
    1.5rem;
}

.resume-development__item p {
  margin:
    0.55rem 0 0;

  font-family:
    var(--font-crafty);

  font-size:
    0.92rem;

  line-height:
    1.45;
}

.resume-development__arrow {
  position:
    absolute;

  top:
    50%;

  right:
    -1.15rem;

  z-index:
    2;

  color:
    #8e66a9;

  font-family:
    var(--font-bonbon);

  font-size:
    2rem;

  transform:
    translateY(-50%);
}

.resume-editor__journey-item {
  padding:
    1rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.13);

  background:
    rgba(199, 198, 142, 0.1);

  margin-bottom:
    1rem;
}

.resume-development-editor
.resume-editor__journey-item:last-child {
  margin-bottom:
    0;
}

/* =========================================
   WORKING STYLE
   ========================================= */

.resume-soft-skills {
  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    0.65rem;
}

.resume-soft-skills span {
  padding:
    0.55rem
    0.75rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.15);

  background:
    rgba(255, 255, 255, 0.42);

  font-family:
    var(--font-google-code);

  font-size:
    0.58rem;

  letter-spacing:
    0.04em;
}

.resume-working-style-editor {
  display:
    grid;

  gap:
    0.8rem;
}

.resume-working-style-editor__item {
  display:
    grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto;

  align-items:
    end;

  gap:
    0.7rem;
}

.resume-working-style-editor label {
  flex:
    1;
}

/* =========================================
   RESUME FOOTER
   ========================================= */

.resume-sheet__footer {
  display:
    flex;

  justify-content:
    space-between;

  gap:
    1rem;

  padding-top:
    1.4rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  letter-spacing:
    0.1em;

  opacity:
    0.38;
}

/* =========================================
   JOURNAL NOTE
   ========================================= */

.resume-page__note {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    2.5rem;

  padding:
    clamp(3rem, 6vw, 5rem)
    0;
}

.resume-page__note-copy {
  max-width:
    48rem;
}

.resume-page__small-label {
  font-family:
    var(--font-google-code);

  font-size:
    0.65rem;

  letter-spacing:
    0.16em;

  opacity:
    0.45;
}

.resume-page__note h2 {
  margin:
    0.65rem 0 0.9rem;

  font-family:
    var(--font-coda);

  font-size:
    clamp(2rem, 4vw, 3.6rem);

  line-height:
    1;
}

.resume-page__note p {
  margin:
    0;

  font-family:
    var(--font-crafty);

  font-size:
    1.15rem;

  line-height:
    1.55;
}

.resume-page__note-sticker {
  display:
    grid;

  min-width:
    9.2rem;

  min-height:
    9.2rem;

  place-items:
    center;

  align-content:
    center;

  padding:
    1rem;

  border:
    3px solid
    #fff;

  background:
    #8e66a9;

  color:
    #fff;

  box-shadow:
    0 10px 18px
    rgba(35, 36, 36, 0.12);

  font-family:
    var(--font-coda);

  font-size:
    0.78rem;

  text-align:
    center;

  transform:
    rotate(8deg);
}

.resume-page__note-sticker strong {
  color:
    #c7c68e;

  font-size:
    1.1rem;
}

/* =========================================
   NAVIGATION
   ========================================= */

.resume-page__navigation {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;

  padding:
    2rem 0 1rem;
}

.resume-page__nav-button {
  display:
    inline-flex;

  align-items:
    center;

  gap:
    0.85rem;

  padding:
    0.8rem 1rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  background:
    rgba(255, 255, 255, 0.2);

  color:
    var(--welcome-brown);

  cursor:
    pointer;

  font-family:
    var(--font-google-code);

  font-size:
    0.65rem;

  font-weight:
    700;

  letter-spacing:
    0.1em;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.resume-page__nav-button:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 7px 14px
    rgba(35, 36, 36, 0.08);
}

.resume-page__nav-button--back {
  background:
    var(--welcome-brown);

  color:
    #dedede;
}

/* =========================================
   FOOTER
   ========================================= */

.resume-page__footer {
  display:
    flex;

  justify-content:
    space-between;

  gap:
    1rem;

  padding-top:
    2rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.62rem;

  letter-spacing:
    0.12em;

  opacity:
    0.42;
}

/* =========================================
   RESPONSIVE
   ========================================= */

@media (max-width: 950px) {

  .resume-page__hero {
    align-items:
      flex-start;

    flex-direction:
      column;

    min-height:
      auto;
  }

  .resume-page__resume-stamp {
    align-self:
      flex-end;
  }

  .resume-sheet__header {
    flex-direction:
      column;
  }

  .resume-sheet__contact {
    justify-content:
      flex-start;

    width:
      100%;
  }

  .resume-section {
    grid-template-columns:
      1fr;
  }

  .resume-development {
    grid-template-columns:
      1fr;
  }

  .resume-development__arrow {
    position:
      static;

    text-align:
      center;

    transform:
      rotate(90deg);
  }

  .resume-editor__grid {
    grid-template-columns:
      1fr;
  }

  .resume-editor__field--wide {
    grid-column:
      auto;
  }

}

@media (max-width: 700px) {

  .resume-page__content {
    width:
      min(94vw, 1180px);
  }

  .resume-page__header {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .resume-page__date {
    text-align:
      left;
  }

  .resume-page__title {
    font-size:
      clamp(3.6rem, 16vw, 6rem);
  }

  .resume-page__actions {
    align-items:
      stretch;

    flex-direction:
      column;
  }

  .resume-page__action-button {
    justify-content:
      center;
  }

  .resume-sheet {
    padding:
      1.4rem;
  }

  .resume-sheet__header h2 {
    font-size:
      clamp(2.4rem, 13vw, 4rem);
  }

  .resume-skills-grid {
    grid-template-columns:
      1fr;
  }

  .resume-entry {
    grid-template-columns:
      1fr;

    gap:
      0.8rem;
  }

  .resume-timeline__item {
    grid-template-columns:
      1fr;
  }

  .resume-work {
    grid-template-columns:
      1fr;
  }

  .resume-page__note {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .resume-page__note-sticker {
    align-self:
      flex-end;
  }

  .resume-page__navigation {
    align-items:
      stretch;

    flex-direction:
      column;
  }

  .resume-page__nav-button {
    justify-content:
      center;
  }

  .resume-page__footer {
    flex-direction:
      column;
  }

  .resume-working-style-editor__item {
    grid-template-columns:
      1fr;
  }

}

/* =========================================
   PRINT / SAVE PDF
   ========================================= */

@media print {

  .resume-page {
    min-height:
      auto;

    overflow:
      visible;

    background:
      #fff;
  }

  .resume-page__paper {
    background:
      #fff;
  }

  .resume-page__paper::before,
  .resume-page__paper::after {
    display:
      none;
  }

  .resume-page__content {
    width:
      100%;

    padding:
      0;
  }

  .resume-page__header,
  .resume-page__hero,
  .resume-page__divider,
  .resume-page__note,
  .resume-page__navigation,
  .resume-page__footer {
    display:
      none;
  }

  .resume-sheet {
    width:
      100%;

    margin:
      0;

    padding:
      0;

    border:
      0;

    background:
      #fff;

    box-shadow:
      none;

    transform:
      none;
  }

  .resume-sheet::before {
    display:
      none;
  }

  .resume-sheet__header h2 {
    font-size:
      2.8rem;
  }

  .resume-section {
    break-inside:
      avoid;
  }

  .resume-entry {
    break-inside:
      avoid;
  }

  .resume-timeline__item {
    break-inside:
      avoid;
  }

  .resume-certification {
    break-inside:
      avoid;
  }

  .resume-work {
    break-inside:
      avoid;
  }

  .resume-development {
    break-inside:
      avoid;
  }

  .resume-editor__add-button,
  .resume-editor__remove-button,
  .resume-editor__field-actions,
  .resume-editor__identity,
  .resume-editor__contact,
  .resume-editor__entry-editor,
  .resume-development-editor,
  .resume-working-style-editor {
    display:
      none !important;
  }

}
</style>