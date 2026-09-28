<template>
  <section class="projects-page">
    <div class="projects-page__paper">
      <div class="projects-page__content">

        <!-- =========================================
             JOURNAL HEADER
             ========================================= -->

        <header class="projects-page__header">
          <div class="projects-page__entry-label">
            <span>JOURNAL ENTRY</span>

            <strong>03</strong>
          </div>

          <div class="projects-page__date">
            PROJECT ARCHIVE / SELECTED WORK
          </div>
        </header>

        <!-- =========================================
             HERO
             ========================================= -->

        <section class="projects-page__hero">

          <div class="projects-page__hero-copy">

            <p class="projects-page__eyebrow">
              PROJECT ARCHIVE
            </p>

            <h1 class="projects-page__title">
              Things I've
              <span>built.</span>
            </h1>

            <p class="projects-page__intro">
              A collection of projects, experiments, team
              contributions and things I've learned by building
              them.
            </p>

            <div class="projects-page__scribble">
              <span>ideas → code → something real</span>
            </div>

            <!-- Editor controls -->

            <div class="projects-page__editor-controls">

              <button
                type="button"
                class="projects-page__editor-button"
                @click="toggleEditor"
              >
                <span>
                  {{ isEditing ? 'EXIT EDITOR' : 'EDIT ARCHIVE' }}
                </span>

                <strong>
                  {{ isEditing ? '×' : '✎' }}
                </strong>
              </button>

              <button
                v-if="isEditing"
                type="button"
                class="projects-page__editor-button projects-page__editor-button--add"
                @click="addProject"
              >
                <span>ADD PROJECT</span>
                <strong>+</strong>
              </button>

              <button
                v-if="isEditing"
                type="button"
                class="projects-page__editor-button projects-page__editor-button--save"
                @click="saveArchive"
              >
                <span>SAVE CHANGES</span>
                <strong>✓</strong>
              </button>

            </div>

            <p
              v-if="isEditing"
              class="projects-page__editor-hint"
            >
              Changes are saved locally in this browser.
            </p>

            <p
              v-if="storageMessage"
              class="projects-page__storage-message"
              :class="{
                'projects-page__storage-message--error':
                  storageError
              }"
            >
              {{ storageMessage }}
            </p>

          </div>

          <!-- Archive sticker -->

          <div
            class="projects-page__archive-sticker"
            aria-hidden="true"
          >
            <span>PROJECT</span>
            <strong>ARCHIVE</strong>

            <small>
              {{ projects.length }}
              {{ projects.length === 1 ? 'FILE' : 'FILES' }}
            </small>
          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="projects-page__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             PROJECT LIST
             ========================================= -->

        <section class="projects-page__projects">

          <article
            v-for="(project, index) in projects"
            :id="`project-${project.id}`"
            :key="project.id"
            class="project-card"
            :class="getRotationClass(index)"
          >

            <!-- Project metadata -->

            <div class="project-card__top">

              <div class="project-card__number">
                PROJECT {{ project.number }}
              </div>

              <div
                class="project-card__type"
                :class="{
                  'project-card__type--team':
                    project.type === 'TEAM PROJECT'
                }"
              >
                {{ project.type }}
              </div>

            </div>

            <!-- =======================================
                 EDITOR TOP CONTROLS
                 ======================================= -->

            <div
              v-if="isEditing"
              class="project-card__editor-toolbar"
            >

              <span>
                EDITING PROJECT {{ project.number }}
              </span>

              <button
                type="button"
                @click="removeProject(project.id)"
              >
                REMOVE
              </button>

            </div>

            <!-- =======================================
                 SCREENSHOT
                 ======================================= -->

            <div class="project-card__image-wrap">

              <div
                class="project-card__tape project-card__tape--one"
                aria-hidden="true"
              ></div>

              <div class="project-card__image">

                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="`${project.title} screenshot`"
                />

                <div
                  v-else
                  class="project-card__image-placeholder"
                >
                  <span>SCREENSHOT</span>

                  <strong>
                    ADD PROJECT IMAGE
                  </strong>

                  <small>
                    src/assets/images/
                  </small>
                </div>

              </div>

              <div
                class="project-card__tape project-card__tape--two"
                aria-hidden="true"
              ></div>

            </div>

            <!-- =======================================
                 IMAGE EDITOR
                 ======================================= -->

            <div
              v-if="isEditing"
              class="project-card__image-editor"
            >

              <label
                class="project-card__upload"
              >
                <span>REPLACE SCREENSHOT</span>

                <input
                  type="file"
                  accept="image/*"
                  @change="
                    handleImageUpload(
                      $event,
                      project
                    )
                  "
                />
              </label>

              <button
                v-if="project.image"
                type="button"
                class="project-card__remove-image"
                @click="removeProjectImage(project)"
              >
                REMOVE IMAGE
              </button>

            </div>

            <!-- =======================================
                 PROJECT INFORMATION
                 ======================================= -->

            <div class="project-card__body">

              <!-- =====================================
                   EDIT MODE
                   ===================================== -->

              <div
                v-if="isEditing"
                class="project-card__editor"
              >

                <div class="project-card__editor-grid">

                  <label>
                    <span>PROJECT TYPE</span>

                    <select
                      v-model="project.type"
                    >
                      <option value="SOLO PROJECT">
                        SOLO PROJECT
                      </option>

                      <option value="TEAM PROJECT">
                        TEAM PROJECT
                      </option>
                    </select>
                  </label>

                  <label>
                    <span>CATEGORY</span>

                    <input
                      v-model="project.category"
                      type="text"
                    />
                  </label>

                  <label>
                    <span>TITLE</span>

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

                  <label>
                    <span>STICKER</span>

                    <input
                      v-model="project.sticker"
                      type="text"
                      maxlength="8"
                    />
                  </label>

                  <label>
                    <span>GITHUB LINK</span>

                    <input
                      v-model="project.github"
                      type="url"
                      placeholder="https://github.com/..."
                    />
                  </label>

                  <label>
                    <span>LIVE DEMO LINK</span>

                    <input
                      v-model="project.live"
                      type="url"
                      placeholder="https://..."
                    />
                  </label>

                  <label class="project-card__editor-field--wide">
                    <span>DESCRIPTION</span>

                    <textarea
                      v-model="project.description"
                      rows="4"
                    ></textarea>
                  </label>

                  <label class="project-card__editor-field--wide">
                    <span>MY CONTRIBUTION</span>

                    <textarea
                      v-model="project.contribution"
                      rows="5"
                    ></textarea>
                  </label>

                  <label class="project-card__editor-field--wide">
                    <span>
                      TECHNOLOGIES
                    </span>

                    <input
                      :value="
                        project.technologies.join(', ')
                      "
                      type="text"
                      placeholder="Vue.js, JavaScript, CSS"
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

              <!-- =====================================
                   VIEW MODE
                   ===================================== -->

              <template v-else>

                <div class="project-card__heading">

                  <div>
                    <p class="project-card__label">
                      {{ project.category }}
                    </p>

                    <h2>
                      {{ project.title }}
                    </h2>

                    <p class="project-card__subtitle">
                      {{ project.subtitle }}
                    </p>
                  </div>

                  <div
                    class="project-card__little-sticker"
                    aria-hidden="true"
                  >
                    {{ project.sticker }}
                  </div>

                </div>

                <p class="project-card__description">
                  {{ project.description }}
                </p>

                <!-- Contribution -->

                <div class="project-card__contribution">

                  <div class="project-card__mini-heading">
                    MY CONTRIBUTION
                  </div>

                  <p>
                    {{ project.contribution }}
                  </p>

                </div>

                <!-- Technologies -->

                <div class="project-card__tech">

                  <div class="project-card__mini-heading">
                    TECHNOLOGIES
                  </div>

                  <div class="project-card__tags">

                    <span
                      v-for="technology in project.technologies"
                      :key="technology"
                      class="project-card__tag"
                    >
                      {{ technology }}
                    </span>

                  </div>

                </div>

                <!-- Links -->

                <div class="project-card__actions">

                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-card__button project-card__button--github"
                  >
                    <span>GITHUB</span>
                    <strong>↗</strong>
                  </a>

                  <a
                    v-if="project.live"
                    :href="project.live"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-card__button project-card__button--live"
                  >
                    <span>LIVE DEMO</span>
                    <strong>↗</strong>
                  </a>

                  <span
                    v-if="!project.live"
                    class="project-card__not-deployed"
                  >
                    LIVE DEMO: NOT DEPLOYED
                  </span>

                </div>

              </template>

            </div>

          </article>

        </section>

        <!-- =========================================
             ARCHIVE NOTE
             ========================================= -->

        <div class="projects-page__divider">
          <span></span>
        </div>

        <section class="projects-page__archive-note">

          <div class="projects-page__archive-note-copy">

            <span class="projects-page__small-label">
              ARCHIVE NOTE
            </span>

            <h2>
              Every project taught me something.
            </h2>

            <p>
              Some were built alone. Some were built with a
              team. Some worked immediately and others
              definitely did not.
            </p>

            <p>
              All of them became part of the process.
            </p>

          </div>

          <div
            class="journal-sticker journal-sticker--keep-building"
            aria-hidden="true"
          >
            <span>KEEP</span>
            <strong>BUILDING</strong>
          </div>

        </section>

        <!-- =========================================
             NAVIGATION
             ========================================= -->

        <section class="projects-page__navigation">

          <button
            type="button"
            class="projects-page__nav-button projects-page__nav-button--back"
            @click="goToAbout"
          >
            <span>←</span>
            BACK TO ABOUT
          </button>

          <button
            type="button"
            class="projects-page__nav-button"
            @click="goToSkills"
          >
            NEXT ENTRY
            <span>→</span>
          </button>

        </section>

        <!-- =========================================
             FOOTER
             ========================================= -->

        <footer class="projects-page__footer">

          <span>
            ENTRY 03 / END
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

import pyPlayImage from '../assets/images/pyplay.png'
import htmlCssPortfolioImage from '../assets/images/html-css-portfolio.png'
import teamAlphaShowcaseImage from '../assets/images/team-alpha-showcase.png'
import modernTechHrImage from '../assets/images/moderntech-hr.png'
import apexPulseImage from '../assets/images/apexpulse.png'
import modernTechSolutionsImage from '../assets/images/modern-tech-solutions.png'
import stockWellImage from '../assets/images/stockwell.png'

const navigateWithTransition =
  inject(
    'navigateWithTransition'
  )

const STORAGE_KEY =
  'portfolio-project-archive-v1'

const isEditing = ref(false)

const storageMessage = ref('')

const storageError = ref(false)

const projects = ref(
  createDefaultProjects()
)

/* =========================================
   DEFAULT PROJECT DATA
   ========================================= */

function createDefaultProjects() {
  return [
    {
      id: 'pyplay',
      number: '01',
      type: 'SOLO PROJECT',
      category: 'PYTHON / FIRST CODING PROJECT',
      title: 'PyPlay',
      subtitle: 'Python Mini Toolkit',
      sticker: '🐍',
      image: pyPlayImage,
      description:
        'A small Python toolkit containing several beginner-friendly interactive programs built while learning the fundamentals of programming.',
      contribution:
        'Built independently from start to finish as my first coding project. The toolkit includes a main menu, quiz, number guessing game, even/odd checker and reusable Python logic.',
      technologies: [
        'Python',
        'Functions',
        'Loops',
        'Conditionals',
        'Random',
        'Try / Except'
      ],
      github:
        'https://github.com/nithaamjulius/Python_Mini_Toolkit_My_First_Coding_Project_NJ.git',
      live: ''
    },

    {
      id: 'html-css-portfolio',
      number: '02',
      type: 'SOLO PROJECT',
      category: 'HTML / CSS / FIRST PORTFOLIO',
      title: 'HTML/CSS Portfolio',
      subtitle: 'My First Personal Portfolio',
      sticker: 'WEB',
      image: htmlCssPortfolioImage,
      description:
        'My first personal portfolio website, created while learning how HTML and CSS can be combined to build a responsive and interactive website.',
      contribution:
        'Designed and developed the project independently, including the navigation, project cards, responsive layouts, contact page, hover animations and CSS button animation.',
      technologies: [
        'HTML',
        'CSS',
        'Responsive Design',
        'Animations',
        'Google Fonts'
      ],
      github:
        'https://github.com/nithaamjulius/HTML-CSS-Portfolio.git',
      live:
        'https://html-css-nj.netlify.app/'
    },

    {
      id: 'team-alpha',
      number: '03',
      type: 'TEAM PROJECT',
      category: 'VUE / THREE.JS / FRONTEND',
      title: 'Team Alpha Showcase',
      subtitle: 'Interactive Data Visualisation',
      sticker: '◎',
      image: teamAlphaShowcaseImage,
      description:
        'A team-built Vue and Flask showcase project incorporating live data and interactive visualisation elements.',
      contribution:
        'Created the interactive Three.js globe and integrated the globe interaction into the frontend. This included node positioning, raycasting and node selection, click interactions, double-click explosion effects and triple-click fracture effects.',
      technologies: [
        'Vue.js',
        'JavaScript',
        'Three.js',
        'Flask',
        'Python',
        'Axios'
      ],
      github:
        'https://github.com/Khaalid-hattas/Team-Alpha-python-vue-showcase.git',
      live:
        'https://team-alpha-1.onrender.com/'
    },

    {
      id: 'moderntech-hr',
      number: '04',
      type: 'TEAM PROJECT',
      category: 'HTML / CSS / JAVASCRIPT',
      title: 'ModernTech HR',
      subtitle: 'HR Management System',
      sticker: 'PAY',
      image: modernTechHrImage,
      description:
        'A team-built HR management system covering areas such as employees, payroll, attendance, calendar, reviews and settings.',
      contribution:
        'Implemented the payroll frontend, including the payroll page, employee payroll information and payroll calculation functionality. I also worked with the project data used by the payroll interface.',
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'JSON',
        'Local Storage'
      ],
      github:
        'https://github.com/Zandakumsha/ModernTech_Project.git',
      live:
        'https://module1-core-project-group11.netlify.app/login.html'
    },

    {
      id: 'apexpulse',
      number: '05',
      type: 'TEAM PROJECT',
      category: 'VUE / API / DASHBOARD',
      title: 'ApexPulse',
      subtitle: 'Operations Dashboard',
      sticker: '⌁',
      image: apexPulseImage,
      description:
        'A modern full-stack operations dashboard for monitoring servers, system resources, logs and key performance information.',
      contribution:
        'Worked across the Vue frontend architecture, routing, API integration, dashboard logic and reusable components. I implemented dashboard views and composables, connected frontend services to the backend API and contributed to branch integration and deployment.',
      technologies: [
        'Vue 3',
        'JavaScript',
        'Axios',
        'Vite',
        'Python',
        'FastAPI'
      ],
      github:
        'https://github.com/NuriyahD/ApexPulse.git',
      live:
        'https://apexpulse-frontend.onrender.com/'
    },

    {
      id: 'modern-tech-solutions',
      number: '06',
      type: 'TEAM PROJECT',
      category: 'NODE / EXPRESS / MYSQL',
      title: 'Modern Tech Solutions',
      subtitle: 'Module 2 — Payroll Backend',
      sticker: 'API',
      image: modernTechSolutionsImage,
      description:
        'The full-stack continuation of the ModernTech HR system, connecting the original frontend to a Node.js, Express and MySQL backend.',
      contribution:
        'Focused on the payroll backend and its integration into the application. This included payroll controllers, routes, frontend API integration, payroll database configuration and merging the payroll work into the development workflow.',
      technologies: [
        'Node.js',
        'Express',
        'MySQL',
        'JavaScript',
        'JWT',
        'REST API'
      ],
      github:
        'https://github.com/Zandakumsha/Modern_Tech_2.git',
      live: ''
    },

    {
      id: 'stockwell',
      number: '07',
      type: 'TEAM PROJECT',
      category: 'VUE / NODE / EXPRESS / MYSQL',
      title: 'StockWell',
      subtitle: 'Collective Purchasing Platform',
      sticker: '🛒',
      image: stockWellImage,
      description:
        'A full-stack collective purchasing platform designed around Stokvel groups, shared purchasing, proposals, voting, wallets, orders and group decision-making.',
      contribution:
        'Responsible for the authentication experience across the frontend and backend, including login, signup, forgot-password and reset-password functionality. I also worked on JWT authentication, password recovery, database integration and substantial team integration and merging work.',
      technologies: [
        'Vue 3',
        'Node.js',
        'Express',
        'MySQL',
        'JWT',
        'bcryptjs',
        'Nodemailer',
        'PayFast'
      ],
      github:
        'https://github.com/butshatengwa951-cmd/Module_3_e-commerce_project.git',
      live:
        'https://stockwell-hl1e.onrender.com/'
    }
  ]
}

/* =========================================
   LOAD SAVED PROJECTS
   ========================================= */

onMounted(() => {
  loadArchive()
})

function loadArchive() {
  try {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (!stored) {
      return
    }

    const parsed =
      JSON.parse(stored)

    if (!Array.isArray(parsed)) {
      return
    }

    projects.value =
      parsed.map(
        (project, index) =>
          normaliseProject(
            project,
            index
          )
      )

    storageMessage.value =
      'Saved project archive loaded.'

    storageError.value = false

  } catch (error) {
    console.error(
      'Could not load project archive:',
      error
    )

    storageMessage.value =
      'Could not load saved archive. Using default projects.'

    storageError.value = true
  }
}

/* =========================================
   SAVE PROJECTS
   ========================================= */

function saveArchive() {
  try {
    renumberProjects()

    const cleanProjects =
      projects.value.map(
        (project) =>
          normaliseProject(
            project,
            projects.value.indexOf(project)
          )
      )

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cleanProjects)
    )

    projects.value =
      cleanProjects

    storageMessage.value =
      'Project archive saved locally.'

    storageError.value = false

  } catch (error) {
    console.error(
      'Could not save project archive:',
      error
    )

    storageError.value = true

    if (
      error?.name ===
      'QuotaExceededError'
    ) {
      storageMessage.value =
        'The browser storage limit was reached. Try smaller screenshots.'
    } else {
      storageMessage.value =
        'Could not save the project archive.'
    }
  }
}

/* =========================================
   NORMALISE DATA
   ========================================= */

function normaliseProject(
  project,
  index
) {
  return {
    id:
      project.id ||
      createProjectId(),

    number:
      String(index + 1).padStart(
        2,
        '0'
      ),

    type:
      project.type ||
      'SOLO PROJECT',

    category:
      project.category ||
      'PROJECT',

    title:
      project.title ||
      'New Project',

    subtitle:
      project.subtitle ||
      'Project description',

    sticker:
      project.sticker ||
      'NEW',

    image:
      project.image ||
      null,

    description:
      project.description ||
      '',

    contribution:
      project.contribution ||
      '',

    technologies:
      Array.isArray(
        project.technologies
      )
        ? project.technologies
            .filter(
              Boolean
            )
            .map(
              (item) =>
                String(item).trim()
            )
        : [],

    github:
      normaliseUrl(
        project.github
      ),

    live:
      normaliseUrl(
        project.live
      )
  }
}

/* =========================================
   EDITOR
   ========================================= */

function toggleEditor() {
  if (isEditing.value) {
    saveArchive()
  }

  isEditing.value =
    !isEditing.value
}

function updateTechnologies(
  project,
  value
) {
  project.technologies =
    value
      .split(',')
      .map(
        (technology) =>
          technology.trim()
      )
      .filter(Boolean)
}

/* =========================================
   ADD PROJECT
   ========================================= */

function addProject() {
  const newProject = {
    id:
      createProjectId(),

    number:
      String(
        projects.value.length + 1
      ).padStart(
        2,
        '0'
      ),

    type:
      'SOLO PROJECT',

    category:
      'NEW PROJECT',

    title:
      'New Project',

    subtitle:
      'Project Subtitle',

    sticker:
      'NEW',

    image:
      null,

    description:
      'Add your project description here.',

    contribution:
      'Describe your contribution to this project here.',

    technologies: [
      'Technology'
    ],

    github:
      '',

    live:
      ''
  }

  projects.value.push(
    newProject
  )

  renumberProjects()

  saveArchive()

  requestAnimationFrame(() => {
    const element =
      document.getElementById(
        `project-${newProject.id}`
      )

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  })
}

/* =========================================
   REMOVE PROJECT
   ========================================= */

function removeProject(
  projectId
) {
  const project =
    projects.value.find(
      (item) =>
        item.id === projectId
    )

  if (!project) {
    return
  }

  const confirmed =
    window.confirm(
      `Remove "${project.title}" from the project archive?`
    )

  if (!confirmed) {
    return
  }

  projects.value =
    projects.value.filter(
      (item) =>
        item.id !== projectId
    )

  renumberProjects()

  saveArchive()
}

/* =========================================
   IMAGE UPLOAD
   ========================================= */

async function handleImageUpload(
  event,
  project
) {
  const file =
    event.target.files?.[0]

  if (!file) {
    return
  }

  if (
    !file.type.startsWith(
      'image/'
    )
  ) {
    storageMessage.value =
      'Please choose an image file.'

    storageError.value = true

    return
  }

  if (
    file.size >
    8 * 1024 * 1024
  ) {
    storageMessage.value =
      'Image is too large. Please choose an image under 8 MB.'

    storageError.value = true

    return
  }

  try {
    storageMessage.value =
      'Processing screenshot...'

    storageError.value = false

    const compressedImage =
      await compressImage(file)

    project.image =
      compressedImage

    storageMessage.value =
      'Screenshot updated. Save the archive to keep the change.'

  } catch (error) {
    console.error(
      'Could not upload screenshot:',
      error
    )

    storageMessage.value =
      'Could not process the screenshot.'

    storageError.value = true
  }

  event.target.value = ''
}

function removeProjectImage(
  project
) {
  project.image = null

  storageMessage.value =
    'Screenshot removed. Save the archive to keep the change.'

  storageError.value = false
}

function compressImage(file) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader()

      reader.onload =
        () => {
          const image =
            new Image()

          image.onload =
            () => {
              const maxWidth =
                1800

              const maxHeight =
                1200

              let width =
                image.width

              let height =
                image.height

              const scale =
                Math.min(
                  maxWidth /
                    width,
                  maxHeight /
                    height,
                  1
                )

              width =
                Math.round(
                  width * scale
                )

              height =
                Math.round(
                  height * scale
                )

              const canvas =
                document.createElement(
                  'canvas'
                )

              canvas.width =
                width

              canvas.height =
                height

              const context =
                canvas.getContext(
                  '2d'
                )

              if (!context) {
                reject(
                  new Error(
                    'Canvas is unavailable.'
                  )
                )

                return
              }

              context.drawImage(
                image,
                0,
                0,
                width,
                height
              )

              resolve(
                canvas.toDataURL(
                  'image/webp',
                  0.82
                )
              )
            }

          image.onerror =
            () => {
              reject(
                new Error(
                  'Could not read image.'
                )
              )
            }

          image.src =
            reader.result
        }

      reader.onerror =
        () => {
          reject(
            new Error(
              'Could not read file.'
            )
          )
        }

      reader.readAsDataURL(file)
    }
  )
}

/* =========================================
   RESET ARCHIVE
   ========================================= */

function resetArchive() {
  const confirmed =
    window.confirm(
      'Reset the project archive back to the original seven projects?'
    )

  if (!confirmed) {
    return
  }

  projects.value =
    createDefaultProjects()

  saveArchive()

  storageMessage.value =
    'Project archive reset to the original projects.'
}

/* =========================================
   NUMBERING / ROTATION
   ========================================= */

function renumberProjects() {
  projects.value.forEach(
    (
      project,
      index
    ) => {
      project.number =
        String(
          index + 1
        ).padStart(
          2,
          '0'
        )
    }
  )
}

function getRotationClass(
  index
) {
  const rotation =
    (index % 7) + 1

  return `project-card--${rotation
    .toString()
    .padStart(2, '0')}`
}

/* =========================================
   HELPERS
   ========================================= */

function createProjectId() {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID()
  }

  return `project-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`
}

function normaliseUrl(
  value
) {
  const url =
    String(
      value || ''
    ).trim()

  if (!url) {
    return ''
  }

  try {
    const parsed =
      new URL(url)

    if (
      parsed.protocol ===
        'http:' ||
      parsed.protocol ===
        'https:'
    ) {
      return parsed.href
    }

    return ''
  } catch {
    return ''
  }
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

function goToAbout() {
  navigateTo('/about')
}

function goToSkills() {
  navigateTo('/skills')
}
</script>

<style scoped>

/* =========================================
   PROJECTS PAGE
   ========================================= */

.projects-page {
  position: relative;
  min-height: calc(100svh - 6.2rem);
  overflow: hidden;
  background: var(--paper);
  color: var(--welcome-brown);
}

.projects-page__paper {
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

.projects-page__paper::before {
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

.projects-page__paper::after {
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

.projects-page__content {
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

.projects-page__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid
    rgba(35, 36, 36, 0.2);
}

.projects-page__entry-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-google-code);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
}

.projects-page__entry-label strong {
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid
    rgba(35, 36, 36, 0.24);
  border-radius: 50%;
  font-size: 0.72rem;
}

.projects-page__date {
  max-width: 18rem;
  font-family: var(--font-google-code);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-align: right;
  opacity: 0.45;
}

/* =========================================
   HERO
   ========================================= */

.projects-page__hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  min-height: 32rem;
  padding:
    clamp(4rem, 7vw, 7rem)
    0
    clamp(3rem, 6vw, 5rem);
}

.projects-page__hero-copy {
  max-width: 52rem;
}

.projects-page__eyebrow {
  margin: 0 0 1rem;
  font-family: var(--font-google-code);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  opacity: 0.42;
}

.projects-page__title {
  margin: 0;
  max-width: 9ch;
  font-family: var(--font-coda);
  font-size: clamp(4rem, 8vw, 7.8rem);
  line-height: 0.86;
  letter-spacing: -0.06em;
}

.projects-page__title span {
  display: block;
  color: #8e66a9;
  transform: translateX(0.06em);
}

.projects-page__intro {
  max-width: 40rem;
  margin: 2rem 0 0;
  font-family: var(--font-crafty);
  font-size: clamp(1.2rem, 1.9vw, 1.6rem);
  line-height: 1.5;
}

.projects-page__scribble {
  width: fit-content;
  margin-top: 1.6rem;
  font-family: var(--font-bonbon);
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  transform: rotate(-3deg);
}

/* =========================================
   EDITOR CONTROLS
   ========================================= */

.projects-page__editor-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 2rem;
}

.projects-page__editor-button {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding:
    0.72rem
    0.9rem;
  border: 1px solid
    rgba(35, 36, 36, 0.2);
  background:
    rgba(255, 255, 255, 0.32);
  color: var(--welcome-brown);
  cursor: pointer;
  font-family: var(--font-google-code);
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.projects-page__editor-button:hover {
  transform:
    translateY(-2px)
    rotate(-0.4deg);
  box-shadow:
    0 8px 15px
      rgba(35, 36, 36, 0.1);
}

.projects-page__editor-button strong {
  font-size: 1rem;
}

.projects-page__editor-button--add {
  background: #c7c68e;
}

.projects-page__editor-button--save {
  background: #8e66a9;
  color: #fff;
}

.projects-page__editor-hint {
  margin: 0.8rem 0 0;
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  opacity: 0.48;
}

.projects-page__storage-message {
  margin: 0.6rem 0 0;
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: #60733a;
}

.projects-page__storage-message--error {
  color: #9a4c45;
}

/* =========================================
   ARCHIVE STICKER
   ========================================= */

.projects-page__archive-sticker {
  display: grid;
  width: 11.5rem;
  min-height: 11.5rem;
  place-items: center;
  align-content: center;
  gap: 0.25rem;
  padding: 1.3rem;
  border: 4px solid #fff;
  border-radius: 50%;
  background: #c7c68e;
  color: var(--welcome-brown);
  box-shadow:
    0 14px 24px rgba(35, 36, 36, 0.12),
    0 2px 4px rgba(35, 36, 36, 0.08);
  font-family: var(--font-google-code);
  transform: rotate(8deg);
}

.projects-page__archive-sticker span {
  font-size: 0.65rem;
  letter-spacing: 0.16em;
}

.projects-page__archive-sticker strong {
  font-size: 1.35rem;
  letter-spacing: 0.08em;
}

.projects-page__archive-sticker small {
  margin-top: 0.35rem;
  font-size: 0.57rem;
  letter-spacing: 0.12em;
  opacity: 0.5;
}

/* =========================================
   DIVIDER
   ========================================= */

.projects-page__divider {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0;
}

.projects-page__divider span {
  height: 1px;
  background:
    rgba(35, 36, 36, 0.28);
}

/* =========================================
   PROJECT CARDS
   ========================================= */

.projects-page__projects {
  display: grid;
  gap: clamp(4rem, 7vw, 7rem);
  padding:
    clamp(4rem, 7vw, 6rem)
    0;
}

.project-card {
  position: relative;
  display: grid;
  grid-template-columns:
    minmax(280px, 0.9fr)
    minmax(0, 1.1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
  padding:
    clamp(1.5rem, 3vw, 2.5rem);
  border: 1px solid
    rgba(35, 36, 36, 0.13);
  background:
    rgba(255, 255, 255, 0.2);
  box-shadow:
    0 16px 28px
      rgba(35, 36, 36, 0.07);
}

.project-card--01 {
  transform: rotate(-0.5deg);
}

.project-card--02 {
  transform: rotate(0.65deg);
}

.project-card--03 {
  transform: rotate(-0.35deg);
}

.project-card--04 {
  transform: rotate(0.55deg);
}

.project-card--05 {
  transform: rotate(-0.45deg);
}

.project-card--06 {
  transform: rotate(0.4deg);
}

.project-card--07 {
  transform: rotate(-0.55deg);
}

/* =========================================
   EDITOR TOOLBAR
   ========================================= */

.project-card__editor-toolbar {
  position: absolute;
  top: -3.2rem;
  left: 0;
  right: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 0.7rem;
  border: 1px dashed
    rgba(142, 102, 169, 0.55);
  background:
    rgba(142, 102, 169, 0.1);
  font-family: var(--font-google-code);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
}

.project-card__editor-toolbar button {
  border: 0;
  background: transparent;
  color: #9a4c45;
  cursor: pointer;
  font-family: var(--font-google-code);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* =========================================
   PROJECT CARD TOP
   ========================================= */

.project-card__top {
  position: absolute;
  top: -1rem;
  left: 1.5rem;
  right: 1.5rem;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.project-card__number,
.project-card__type {
  padding:
    0.45rem
    0.7rem;
  border: 1px solid
    rgba(35, 36, 36, 0.14);
  background: #dedede;
  box-shadow:
    0 5px 10px
      rgba(35, 36, 36, 0.06);
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.project-card__type {
  background: #fff;
  transform: rotate(2deg);
}

.project-card__type--team {
  background:
    rgba(199, 198, 142, 0.45);
  transform: rotate(-2deg);
}

/* =========================================
   PROJECT IMAGE
   ========================================= */

.project-card__image-wrap {
  position: relative;
  padding: 1rem;
}

.project-card__image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 0.8rem solid #f0efeb;
  background: #d4d2cc;
  box-shadow:
    0 18px 26px
      rgba(35, 36, 36, 0.12),
    0 2px 4px
      rgba(35, 36, 36, 0.08);
}

.project-card__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__image-placeholder {
  display: grid;
  height: 100%;
  place-items: center;
  align-content: center;
  gap: 0.55rem;
  padding: 2rem;
  text-align: center;
  background:
    linear-gradient(
      135deg,
      rgba(142, 102, 169, 0.08),
      rgba(199, 198, 142, 0.22)
    );
}

.project-card__image-placeholder span {
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  opacity: 0.45;
}

.project-card__image-placeholder strong {
  font-family: var(--font-coda);
  font-size:
    clamp(1.1rem, 2vw, 1.7rem);
  letter-spacing: 0.04em;
}

.project-card__image-placeholder small {
  font-family: var(--font-google-code);
  font-size: 0.6rem;
  opacity: 0.4;
}

.project-card__tape {
  position: absolute;
  z-index: 2;
  width: 7rem;
  height: 1.6rem;
  background:
    rgba(199, 198, 142, 0.7);
  box-shadow:
    0 2px 4px
      rgba(35, 36, 36, 0.08);
}

.project-card__tape--one {
  top: 0.15rem;
  left: 50%;
  transform:
    translateX(-50%)
    rotate(-3deg);
}

.project-card__tape--two {
  right: -0.2rem;
  bottom: 0.8rem;
  transform:
    rotate(72deg);
  opacity: 0.65;
}

/* =========================================
   IMAGE EDITOR
   ========================================= */

.project-card__image-editor {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding: 0.75rem 1rem;
  border: 1px dashed
    rgba(35, 36, 36, 0.2);
  background:
    rgba(255, 255, 255, 0.25);
}

.project-card__upload {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 0.8rem;
  border: 1px solid
    rgba(35, 36, 36, 0.18);
  background:
    rgba(255, 255, 255, 0.55);
  cursor: pointer;
  font-family: var(--font-google-code);
  font-size: 0.59rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.project-card__upload input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.project-card__remove-image {
  padding: 0.65rem 0.8rem;
  border: 1px solid
    rgba(154, 76, 69, 0.3);
  background:
    rgba(154, 76, 69, 0.06);
  color: #9a4c45;
  cursor: pointer;
  font-family: var(--font-google-code);
  font-size: 0.59rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

/* =========================================
   PROJECT BODY
   ========================================= */

.project-card__body {
  padding-top: 1.4rem;
}

/* =========================================
   PROJECT EDITOR
   ========================================= */

.project-card__editor {
  padding-top: 0.5rem;
}

.project-card__editor-grid {
  display: grid;
  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );
  gap: 1rem;
}

.project-card__editor-grid label {
  display: grid;
  gap: 0.4rem;
}

.project-card__editor-grid label span {
  font-family: var(--font-google-code);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.project-card__editor-grid input,
.project-card__editor-grid select,
.project-card__editor-grid textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid
    rgba(35, 36, 36, 0.18);
  border-radius: 0;
  outline: none;
  background:
    rgba(255, 255, 255, 0.58);
  color: var(--welcome-brown);
  padding: 0.7rem 0.75rem;
  font-family: var(--font-crafty);
  font-size: 1rem;
}

.project-card__editor-grid input:focus,
.project-card__editor-grid select:focus,
.project-card__editor-grid textarea:focus {
  border-color: #8e66a9;
  box-shadow:
    0 0 0 2px
      rgba(142, 102, 169, 0.1);
}

.project-card__editor-grid textarea {
  resize: vertical;
  min-height: 7rem;
  line-height: 1.45;
}

.project-card__editor-grid small {
  font-family: var(--font-google-code);
  font-size: 0.56rem;
  opacity: 0.45;
}

.project-card__editor-field--wide {
  grid-column: 1 / -1;
}

/* =========================================
   PROJECT VIEW HEADING
   ========================================= */

.project-card__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.project-card__label {
  margin: 0 0 0.55rem;
  font-family: var(--font-google-code);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  opacity: 0.44;
}

.project-card__heading h2 {
  margin: 0;
  font-family: var(--font-coda);
  font-size:
    clamp(2rem, 4vw, 3.5rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.project-card__subtitle {
  margin: 0.55rem 0 0;
  font-family: var(--font-butterfly);
  font-size: 1.35rem;
  transform: rotate(-1deg);
}

.project-card__little-sticker {
  display: grid;
  min-width: 4.5rem;
  height: 4.5rem;
  place-items: center;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #8e66a9;
  color: #fff;
  box-shadow:
    0 7px 14px
      rgba(35, 36, 36, 0.1);
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  font-weight: 700;
  text-align: center;
  transform: rotate(7deg);
}

.project-card__description {
  margin: 1.7rem 0 0;
  max-width: 48rem;
  font-family: var(--font-crafty);
  font-size: 1.18rem;
  line-height: 1.55;
}

/* =========================================
   CONTRIBUTION
   ========================================= */

.project-card__contribution {
  margin-top: 1.5rem;
  padding:
    1.1rem
    1.2rem;
  border-left: 3px solid
    #8e66a9;
  background:
    rgba(142, 102, 169, 0.07);
}

.project-card__mini-heading {
  margin-bottom: 0.55rem;
  font-family: var(--font-google-code);
  font-size: 0.61rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.46;
}

.project-card__contribution p {
  margin: 0;
  font-family: var(--font-crafty);
  font-size: 1.05rem;
  line-height: 1.55;
}

/* =========================================
   TECHNOLOGIES
   ========================================= */

.project-card__tech {
  margin-top: 1.4rem;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-card__tag {
  padding:
    0.42rem
    0.65rem;
  border: 1px dashed
    rgba(35, 36, 36, 0.22);
  background:
    rgba(255, 255, 255, 0.28);
  font-family: var(--font-google-code);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
}

/* =========================================
   ACTIONS
   ========================================= */

.project-card__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.7rem;
}

.project-card__button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding:
    0.72rem
    0.9rem;
  border: 1px solid
    rgba(35, 36, 36, 0.2);
  font-family: var(--font-google-code);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.project-card__button:hover {
  transform:
    translateY(-2px)
    rotate(-0.5deg);
  box-shadow:
    0 7px 14px
      rgba(35, 36, 36, 0.1);
}

.project-card__button strong {
  font-size: 1rem;
}

.project-card__button--github {
  background:
    var(--welcome-brown);
  color: #dedede;
}

.project-card__button--live {
  background: #c7c68e;
  color: var(--welcome-brown);
}

.project-card__not-deployed {
  padding: 0.55rem 0;
  font-family: var(--font-google-code);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  opacity: 0.42;
}

/* =========================================
   ARCHIVE NOTE
   ========================================= */

.projects-page__archive-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
  padding:
    clamp(3rem, 6vw, 5rem)
    0;
}

.projects-page__archive-note-copy {
  max-width: 42rem;
}

.projects-page__small-label {
  font-family: var(--font-google-code);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  opacity: 0.45;
}

.projects-page__archive-note h2 {
  margin:
    0.65rem
    0
    0.9rem;
  font-family: var(--font-coda);
  font-size:
    clamp(2rem, 4vw, 3.5rem);
  line-height: 1;
}

.projects-page__archive-note p {
  margin: 0.7rem 0;
  font-family: var(--font-crafty);
  font-size: 1.15rem;
  line-height: 1.55;
}

.journal-sticker--keep-building {
  display: grid;
  min-width: 9rem;
  min-height: 9rem;
  place-items: center;
  align-content: center;
  padding: 1rem;
  border: 3px solid #fff;
  background: #8e66a9;
  color: #fff;
  box-shadow:
    0 10px 18px
      rgba(35, 36, 36, 0.12);
  font-family: var(--font-coda);
  font-size: 0.8rem;
  line-height: 1;
  text-align: center;
  transform: rotate(8deg);
}

.journal-sticker--keep-building strong {
  margin-top: 0.2rem;
  color: #c7c68e;
  font-size: 1.15rem;
}

/* =========================================
   NAVIGATION
   ========================================= */

.projects-page__navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding:
    2rem
    0
    1rem;
}

.projects-page__nav-button {
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

.projects-page__nav-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 7px 14px
      rgba(35, 36, 36, 0.08);
}

.projects-page__nav-button--back {
  background:
    var(--welcome-brown);
  color: #dedede;
}

/* =========================================
   FOOTER
   ========================================= */

.projects-page__footer {
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

@media (max-width: 900px) {
  .projects-page__hero {
    align-items: flex-start;
    flex-direction: column;
    min-height: auto;
  }

  .projects-page__archive-sticker {
    align-self: flex-end;
  }

  .project-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-card__body {
    padding-top: 0;
  }

  .projects-page__archive-note {
    align-items: flex-start;
    flex-direction: column;
  }

  .project-card__editor-grid {
    grid-template-columns: 1fr;
  }

  .project-card__editor-field--wide {
    grid-column: auto;
  }
}

@media (max-width: 600px) {
  .projects-page__content {
    width: min(94vw, 1180px);
  }

  .projects-page__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects-page__date {
    text-align: left;
  }

  .projects-page__title {
    font-size:
      clamp(3.6rem, 16vw, 6rem);
  }

  .projects-page__editor-controls {
    align-items: stretch;
    flex-direction: column;
  }

  .projects-page__editor-button {
    justify-content: center;
  }

  .project-card {
    padding: 1.25rem;
  }

  .project-card__top {
    top: -0.8rem;
    left: 0.8rem;
    right: 0.8rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .project-card__type {
    align-self: flex-end;
  }

  .project-card__editor-toolbar {
    top: -4.8rem;
    align-items: flex-start;
    flex-direction: column;
  }

  .project-card__heading {
    align-items: flex-start;
  }

  .project-card__little-sticker {
    min-width: 3.8rem;
    height: 3.8rem;
  }

  .projects-page__navigation {
    align-items: stretch;
    flex-direction: column;
  }

  .projects-page__nav-button {
    justify-content: center;
  }

  .projects-page__footer {
    flex-direction: column;
  }
}

</style>