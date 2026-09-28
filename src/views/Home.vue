<template>
  <section class="journal-home">
    <div class="journal-home__paper">
      <div class="journal-home__content">

        <!-- =========================================
             JOURNAL HEADER
             ========================================= -->

        <header class="journal-home__header">
          <div class="journal-home__entry-label">
            <span>JOURNAL ENTRY</span>

            <strong>01</strong>
          </div>

          <div class="journal-home__date">
            PERSONAL PORTFOLIO / FIRST ENTRY
          </div>
        </header>

        <!-- =========================================
             HERO
             ========================================= -->

        <section class="journal-home__hero">
          <div class="journal-home__hero-copy">

            <p class="journal-home__eyebrow">
              PAGE ONE
            </p>

            <h1 class="journal-home__title">
              <span class="journal-home__title-line">
                Hi,
              </span>

              <span
                v-if="visitorName"
                class="journal-home__title-name"
              >
                {{ visitorName }}.
              </span>

              <span
                v-else
                class="journal-home__title-name"
              >
                curious visitor.
              </span>
            </h1>

            <p class="journal-home__intro">
              I’m a developer who enjoys turning ideas into
              interactive digital experiences, thoughtful
              interfaces, and things that feel a little more
              personal than a standard webpage.
            </p>

            <div class="journal-home__scribble">
              <span class="journal-home__scribble-arrow">
                ↳
              </span>

              <span>
                this is where the story starts
              </span>
            </div>

            <!-- Cursor sticker -->
            <div
              class="journal-sticker journal-sticker--cursor"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                ↖
              </span>

              <span>
                CLICK<br />
                AROUND
              </span>
            </div>

          </div>

          <!-- =========================================
               PORTRAIT
               ========================================= -->

          <div class="journal-home__portrait-wrap">

            <!-- SNAP sticker -->
            <div
              class="journal-sticker journal-sticker--camera"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                ◉
              </span>

              <span>
                SNAP!
              </span>
            </div>

            <div
              class="journal-home__tape journal-home__tape--one"
            ></div>

            <div class="journal-home__portrait">
              <div class="journal-home__portrait-image-wrap">
                <img
                  :src="profileImage"
                  alt="Portrait"
                  class="journal-home__portrait-image"
                />
              </div>
            </div>

            <div
              class="journal-home__tape journal-home__tape--two"
            ></div>

            <p class="journal-home__portrait-caption">
              a little snapshot of me
            </p>

          </div>
        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="journal-home__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             ABOUT THIS PAGE
             ========================================= -->

        <section
          class="journal-home__section journal-home__about"
        >

          <div class="journal-home__section-heading">

            <span class="journal-home__section-number">
              01
            </span>

            <h2>
              ABOUT THIS PAGE
            </h2>

            <div
              class="journal-sticker journal-sticker--folder"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                □
              </span>
            </div>

          </div>

          <div class="journal-home__about-layout">

            <div>
              <p>
                This portfolio is built like a personal journal —
                a place to collect projects, ideas, skills,
                experiments, lessons, and pieces of work that have
                helped shape me as a developer.
              </p>

              <p>
                Instead of treating every page like a traditional
                portfolio section, each one is part of the same
                visual story.
              </p>
            </div>

            <!-- Idea sticker -->
            <div
              class="journal-sticker journal-sticker--idea"
              aria-hidden="true"
            >
              <span class="journal-sticker__emoji">
                💡
              </span>

              <span>
                IDEA
              </span>

              <strong>
                →
              </strong>

              <span>
                BUILD
              </span>
            </div>

          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="journal-home__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             CURRENTLY
             ========================================= -->

        <section
          class="journal-home__section journal-home__currently"
        >

          <div
            class="journal-home__currently-header"
          >

            <div
              class="journal-home__section-heading"
            >

              <span class="journal-home__section-number">
                02
              </span>

              <h2>
                CURRENTLY
              </h2>

            </div>

            <button
              type="button"
              class="journal-home__edit-button"
              @click="toggleEditMode"
            >
              {{
                editMode
                  ? 'DONE EDITING'
                  : '✎ EDIT JOURNAL'
              }}
            </button>

          </div>

          <p
            class="journal-home__currently-description"
          >
            A small snapshot of what is currently happening in
            my development journey.
          </p>

          <div
            ref="currentlyBoard"
            class="currently-board"
            :class="{
              'is-editing': editMode
            }"
          >

            <!-- =========================================
                 EDITABLE PAPER NOTES
                 ========================================= -->

            <article
              v-for="note in notes"
              :key="note.id"
              class="journal-note"
              :class="[
                `journal-note--${note.id}`,
                {
                  'is-settling':
                    settlingNoteId === note.id
                }
              ]"
              :style="{
                left: `${note.x}%`,
                top: `${note.y}%`,
                '--note-rotation':
                  `${note.rotation}deg`
              }"
              @pointerdown="
                startNotePointerDrag(
                  $event,
                  note.id
                )
              "
            >

              <div
                class="journal-note__tape"
              ></div>

              <div
                v-if="editMode"
                class="journal-note__drag-label"
              >
                DRAG
              </div>

              <template v-if="editMode">

                <input
                  v-model="note.label"
                  class="journal-note__input"
                  maxlength="28"
                  aria-label="Note heading"
                  @pointerdown.stop
                  @click.stop
                />

                <textarea
                  v-model="note.text"
                  class="journal-note__textarea"
                  maxlength="180"
                  aria-label="Note content"
                  @pointerdown.stop
                  @click.stop
                ></textarea>

              </template>

              <template v-else>

                <p class="journal-note__label">
                  {{ note.label }}
                </p>

                <p class="journal-note__value">
                  {{ note.text }}
                </p>

              </template>

              <span class="journal-note__pin">
                {{ note.symbol }}
              </span>

            </article>

            <!-- =========================================
                 CURRENTLY STICKERS
                 ========================================= -->

            <div
              class="journal-sticker journal-sticker--coffee"
              aria-hidden="true"
            >
              <span class="journal-sticker__emoji">
                ☕
              </span>

              <span>
                FUEL
              </span>
            </div>

            <div
              class="journal-sticker journal-sticker--laptop"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                ▭
              </span>

              <span>
                BUILD
              </span>
            </div>

            <div
              v-if="editMode"
              class="currently-board__edit-tip"
            >
              Drag the notes around the page.
              Click inside the text to edit it.
            </div>

          </div>
        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="journal-home__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             A FEW NOTES
             ========================================= -->

        <section
          class="journal-home__section journal-home__facts"
        >

          <div class="journal-home__facts-copy">

            <div
              class="journal-home__section-heading"
            >

              <span
                class="journal-home__section-number"
              >
                03
              </span>

              <h2>
                A FEW NOTES
              </h2>

            </div>

            <div class="journal-home__fact-list">

              <p>
                <span>01</span>

                I like building things from an idea and
                watching them become something real.
              </p>

              <p>
                <span>02</span>

                I care about how software feels, not only
                whether it technically works.
              </p>

              <p>
                <span>03</span>

                I’m always looking for the next thing to learn,
                improve, or experiment with.
              </p>

            </div>

          </div>

          <!-- Sticker cluster -->
          <div
            class="journal-home__sticker-area"
          >

            <!-- Code sticker -->
            <div
              class="journal-sticker journal-sticker--code"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                &lt;/&gt;
              </span>

              <span>
                MAKE<br />
                SOMETHING
              </span>
            </div>

            <!-- Actual star -->
            <div
              class="journal-sticker journal-sticker--star"
              aria-hidden="true"
            >
              ★
            </div>

            <!-- Mouse sticker -->
            <div
              class="journal-sticker journal-sticker--mouse"
              aria-hidden="true"
            >
              <span class="journal-sticker__symbol">
                ◇
              </span>

              <span>
                EXPLORE
              </span>
            </div>

            <!-- Page sticker -->
            <div
              class="journal-sticker journal-sticker--page"
              aria-hidden="true"
            >
              <span>
                PAGE
              </span>

              <strong>
                01
              </strong>
            </div>

          </div>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="journal-home__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             NAVIGATION
             ========================================= -->

        <section class="journal-home__navigation">

          <button
            type="button"
            class="journal-home__nav-button journal-home__nav-button--back"
            @click="goToIntro"
          >
            <span>←</span>
            BACK TO INTRO
          </button>

          <button
            type="button"
            class="journal-home__nav-button"
            @click="goToAbout"
          >
            NEXT ENTRY
            <span>→</span>
          </button>

        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div
          class="journal-home__divider"
          aria-hidden="true"
        >
          <span></span>
        </div>

        <!-- =========================================
             FOOTER
             ========================================= -->

        <footer class="journal-home__footer">

          <span>
            ENTRY 01 / END
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
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

import { useStore } from 'vuex'

import profileImage from '../assets/images/profile.jpg'

const store = useStore()

const navigateWithTransition =
  inject(
    'navigateWithTransition'
  )

const visitorName = computed(
  () => store.state.visitorName
)

const currentlyBoard =
  ref(null)

const editMode =
  ref(false)

const settlingNoteId =
  ref(null)

const draggedNoteId =
  ref(null)

const isDraggingNote =
  ref(false)

const pointerOffsetX =
  ref(0)

const pointerOffsetY =
  ref(0)

const storageKey =
  'portfolio-journal-currently'

const defaultNotes = [
  {
    id: 'learning',
    label: 'LEARNING',
    text:
      'Modern Vue development, JavaScript, and better interface design.',
    x: 3,
    y: 13,
    rotation: -2,
    symbol: '*'
  },
  {
    id: 'building',
    label: 'BUILDING',
    text:
      'A portfolio that feels more like an experience than a résumé.',
    x: 36,
    y: 28,
    rotation: 1,
    symbol: '✎'
  },
  {
    id: 'exploring',
    label: 'EXPLORING',
    text:
      'Creative interactions, animation, and playful web interfaces.',
    x: 69,
    y: 13,
    rotation: -1,
    symbol: '☼'
  }
]

const notes = ref(
  loadNotes()
)

function cloneNotes(
  noteList
) {
  return noteList.map(
    (note) => ({
      ...note
    })
  )
}

function loadNotes() {
  if (
    typeof window ===
    'undefined'
  ) {
    return cloneNotes(
      defaultNotes
    )
  }

  try {
    const saved =
      window.localStorage.getItem(
        storageKey
      )

    if (!saved) {
      return cloneNotes(
        defaultNotes
      )
    }

    const parsed =
      JSON.parse(saved)

    if (
      !Array.isArray(parsed) ||
      parsed.length !== 3
    ) {
      return cloneNotes(
        defaultNotes
      )
    }

    return parsed.map(
      (note, index) => ({
        ...note,
        symbol:
          index === 0
            ? '*'
            : index === 1
              ? '✎'
              : '☼'
      })
    )
  } catch {
    return cloneNotes(
      defaultNotes
    )
  }
}

function saveNotes() {
  if (
    typeof window ===
    'undefined'
  ) {
    return
  }

  window.localStorage.setItem(
    storageKey,
    JSON.stringify(
      notes.value
    )
  )
}

function toggleEditMode() {
  if (
    editMode.value
  ) {
    saveNotes()

    editMode.value =
      false

    return
  }

  editMode.value =
    true
}

function startNotePointerDrag(
  event,
  noteId
) {
  if (
    !editMode.value
  ) {
    return
  }

  if (
    event.target.closest(
      'input, textarea, button'
    )
  ) {
    return
  }

  if (
    !currentlyBoard.value
  ) {
    return
  }

  const noteElement =
    event.currentTarget

  const noteRect =
    noteElement.getBoundingClientRect()

  draggedNoteId.value =
    noteId

  isDraggingNote.value =
    true

  pointerOffsetX.value =
    event.clientX -
    noteRect.left

  pointerOffsetY.value =
    event.clientY -
    noteRect.top

  noteElement.setPointerCapture?.(
    event.pointerId
  )

  window.addEventListener(
    'pointermove',
    handleNotePointerMove
  )

  window.addEventListener(
    'pointerup',
    handleNotePointerUp
  )

  event.preventDefault()
}

function handleNotePointerMove(
  event
) {
  if (
    !isDraggingNote.value ||
    !draggedNoteId.value ||
    !currentlyBoard.value
  ) {
    return
  }

  const board =
    currentlyBoard.value.getBoundingClientRect()

  let x =
    event.clientX -
    board.left -
    pointerOffsetX.value

  let y =
    event.clientY -
    board.top -
    pointerOffsetY.value

  x =
    (x / board.width) *
    100

  y =
    (y / board.height) *
    100

  x = Math.max(
    1,
    Math.min(72, x)
  )

  y = Math.max(
    2,
    Math.min(69, y)
  )

  const note =
    notes.value.find(
      (item) =>
        item.id ===
        draggedNoteId.value
    )

  if (!note) {
    return
  }

  note.x = x
  note.y = y
}

function handleNotePointerUp() {
  if (
    !isDraggingNote.value
  ) {
    return
  }

  const note =
    notes.value.find(
      (item) =>
        item.id ===
        draggedNoteId.value
    )

  if (note) {
    settlingNoteId.value =
      note.id

    window.setTimeout(
      () => {
        if (
          settlingNoteId.value ===
          note.id
        ) {
          settlingNoteId.value =
            null
        }
      },
      360
    )
  }

  isDraggingNote.value =
    false

  draggedNoteId.value =
    null

  window.removeEventListener(
    'pointermove',
    handleNotePointerMove
  )

  window.removeEventListener(
    'pointerup',
    handleNotePointerUp
  )
}

function goToIntro() {
  if (
    navigateWithTransition
  ) {
    navigateWithTransition(
      '/intro'
    )

    return
  }

  window.location.href =
    '/intro'
}

function goToAbout() {
  if (
    navigateWithTransition
  ) {
    navigateWithTransition(
      '/about'
    )

    return
  }

  window.location.href =
    '/about'
}

watch(
  notes,
  () => {
    if (
      editMode.value &&
      typeof window !==
        'undefined'
    ) {
      window.localStorage.setItem(
        `${storageKey}-draft`,
        JSON.stringify(
          notes.value
        )
      )
    }
  },
  {
    deep: true
  }
)

onMounted(() => {
  const draft =
    window.localStorage.getItem(
      `${storageKey}-draft`
    )

  if (!draft) {
    return
  }

  try {
    const parsed =
      JSON.parse(draft)

    if (
      Array.isArray(parsed) &&
      parsed.length === 3
    ) {
      notes.value =
        parsed.map(
          (note, index) => ({
            ...note,
            symbol:
              index === 0
                ? '*'
                : index === 1
                  ? '✎'
                  : '☼'
          })
        )
    }
  } catch {
    /*
     * Ignore invalid draft data.
     */
  }
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'pointermove',
    handleNotePointerMove
  )

  window.removeEventListener(
    'pointerup',
    handleNotePointerUp
  )
})
</script>

<style scoped>
/* =========================================
   ROOT
   ========================================= */

.journal-home {
  --journal-line-step: 48px;

  position: relative;

  min-height:
    calc(100svh - 6.2rem);

  overflow: hidden;

  background:
    #dedede;

  color:
    #473824;
}

/* =========================================
   PAPER
   ========================================= */

.journal-home__paper {
  position:
    relative;

  min-height:
    100%;

  isolation:
    isolate;

  background:
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.06),
      transparent 9%,
      transparent 91%,
      rgba(0, 0, 0, 0.035)
    ),
    #dedede;
}

.journal-home__paper::before {
  content:
    '';

  position:
    absolute;

  inset:
    0;

  z-index:
    -1;

  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 47px,
      rgba(35, 36, 36, 0.13) 48px,
      transparent 49px
    );

  pointer-events:
    none;
}

.journal-home__paper::after {
  content:
    '';

  position:
    absolute;

  inset:
    0;

  z-index:
    -1;

  background:
    linear-gradient(
      90deg,
      transparent 6.5%,
      rgba(35, 36, 36, 0.11) 6.55%,
      transparent 6.65%
    ),
    radial-gradient(
      circle at center,
      transparent 54%,
      rgba(35, 36, 36, 0.045) 100%
    );

  pointer-events:
    none;
}

.journal-home__content {
  width:
    min(1180px, 92vw);

  margin:
    0 auto;

  padding:
    calc(var(--journal-line-step) * 1.4)
    0
    calc(var(--journal-line-step) * 2);
}

/* =========================================
   HEADER
   ========================================= */

.journal-home__header {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1.5rem;

  min-height:
    var(--journal-line-step);

  padding-bottom:
    calc(var(--journal-line-step) * 0.45);

  border-bottom:
    1px solid
    rgba(35, 36, 36, 0.22);
}

.journal-home__entry-label {
  display:
    flex;

  align-items:
    center;

  gap:
    0.8rem;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.75rem;

  letter-spacing:
    0.14em;
}

.journal-home__entry-label strong {
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

.journal-home__date {
  max-width:
    18rem;

  font-family:
    'Google Sans Code',
    monospace;

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
   DIVIDERS
   ========================================= */

.journal-home__divider {
  display:
    block;

  width:
    100%;

  height:
    1px;

  margin:
    calc(var(--journal-line-step) * 0.8)
    0;

  background:
    rgba(35, 36, 36, 0.22);
}

.journal-home__divider span {
  display:
    block;

  width:
    100%;

  height:
    1px;

  background:
    rgba(35, 36, 36, 0.22);
}

/* =========================================
   HERO
   ========================================= */

.journal-home__hero {
  display:
    grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(280px, 0.8fr);

  gap:
    clamp(2.5rem, 7vw, 7rem);

  align-items:
    center;

  padding:
    calc(var(--journal-line-step) * 1.5)
    0;
}

.journal-home__hero-copy {
  position:
    relative;
}

.journal-home__eyebrow {
  margin:
    0
    0
    1rem;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.72rem;

  font-weight:
    600;

  letter-spacing:
    0.2em;

  opacity:
    0.42;
}

.journal-home__title {
  margin:
    0;

  max-width:
    11ch;

  font-family:
    'Coda Caption',
    sans-serif;

  font-size:
    clamp(3.8rem, 7.3vw, 7rem);

  line-height:
    0.92;

  letter-spacing:
    -0.055em;

  font-weight:
    800;
}

.journal-home__title-line {
  display:
    block;
}

.journal-home__title-name {
  display:
    block;

  margin-top:
    0.05em;

  color:
    #8e66a9;
}

.journal-home__intro {
  max-width:
    38rem;

  margin:
    calc(var(--journal-line-step) * 0.6)
    0
    0;

  font-family:
    'Crafty Girls',
    cursive;

  font-size:
    clamp(1.2rem, 1.9vw, 1.6rem);

  line-height:
    1.5;
}

.journal-home__scribble {
  display:
    flex;

  align-items:
    center;

  gap:
    0.5rem;

  width:
    fit-content;

  margin-top:
    calc(var(--journal-line-step) * 0.5);

  font-family:
    'Bonbon',
    cursive;

  font-size:
    clamp(1.15rem, 1.9vw, 1.55rem);

  transform:
    rotate(-2deg);
}

.journal-home__scribble-arrow {
  font-size:
    1.6em;
}

/* =========================================
   PORTRAIT
   ========================================= */

.journal-home__portrait-wrap {
  position:
    relative;

  z-index:
    1;

  justify-self:
    center;

  width:
    min(100%, 380px);

  padding:
    1.2rem;

  overflow:
    visible;

  transform:
    rotate(2deg);
}

.journal-home__portrait {
  position:
    relative;

  z-index:
    3;

  padding:
    0.9rem;

  background:
    #f0efeb;

  box-shadow:
    0 22px 35px
    rgba(35, 36, 36, 0.15),
    0 2px 5px
    rgba(35, 36, 36, 0.1);
}

.journal-home__portrait-image-wrap {
  overflow:
    hidden;

  border:
    1px dashed
    rgba(71, 56, 36, 0.3);

  background:
    #dedede;
}

.journal-home__portrait-image {
  display:
    block;

  width:
    100%;

  aspect-ratio:
    4 / 5;

  object-fit:
    cover;

  object-position:
    center;

  filter:
    saturate(0.88)
    contrast(0.98);
}

.journal-home__portrait-caption {
  margin:
    0.9rem
    0
    0
    0.3rem;

  font-family:
    'Butterfly Kids',
    cursive;

  font-size:
    1.4rem;

  transform:
    rotate(-3deg);
}

.journal-home__tape {
  position:
    absolute;

  z-index:
    7;

  width:
    110px;

  height:
    28px;

  background:
    rgba(199, 198, 142, 0.68);

  box-shadow:
    0 2px 5px
    rgba(35, 36, 36, 0.08);
}

.journal-home__tape--one {
  top:
    0.25rem;

  left:
    50%;

  transform:
    translateX(-50%)
    rotate(-3deg);
}

.journal-home__tape--two {
  bottom:
    3.4rem;

  right:
    -1rem;

  transform:
    rotate(71deg);

  opacity:
    0.7;
}

/* =========================================
   SECTIONS
   ========================================= */

.journal-home__section {
  position:
    relative;

  padding:
    calc(var(--journal-line-step) * 1.1)
    0;
}

.journal-home__section-heading {
  position:
    relative;

  display:
    flex;

  align-items:
    center;

  gap:
    0.9rem;

  min-height:
    var(--journal-line-step);

  margin:
    0
    0
    calc(var(--journal-line-step) * 0.55);
}

.journal-home__section-number {
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
    rgba(35, 36, 36, 0.2);

  border-radius:
    50%;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.65rem;
}

.journal-home__section-heading h2 {
  margin:
    0;

  font-family:
    'Coda Caption',
    sans-serif;

  font-size:
    clamp(1.4rem, 2.2vw, 2rem);

  letter-spacing:
    0.06em;
}

/* =========================================
   ABOUT
   ========================================= */

.journal-home__about-layout {
  display:
    grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(190px, 0.35fr);

  gap:
    3rem;

  align-items:
    center;
}

.journal-home__about p {
  max-width:
    54rem;

  margin:
    0.8rem 0;

  font-family:
    'Crafty Girls',
    cursive;

  font-size:
    clamp(1.2rem, 1.8vw, 1.5rem);

  line-height:
    1.5;
}

/* =========================================
   CURRENTLY
   ========================================= */

.journal-home__currently-header {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;
}

.journal-home__edit-button {
  padding:
    0.6rem
    0.85rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.22);

  background:
    rgba(255, 255, 255, 0.3);

  color:
    #473824;

  cursor:
    pointer;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.68rem;

  letter-spacing:
    0.09em;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.journal-home__edit-button:hover {
  transform:
    translateY(-2px)
    rotate(-1deg);

  box-shadow:
    0 5px 12px
    rgba(35, 36, 36, 0.09);
}

.journal-home__currently-description {
  max-width:
    48rem;

  margin:
    0
    0
    calc(var(--journal-line-step) * 0.6);

  font-family:
    'Crafty Girls',
    cursive;

  font-size:
    1.15rem;

  line-height:
    1.5;

  opacity:
    0.72;
}

.currently-board {
  position:
    relative;

  width:
    100%;

  min-height:
    470px;

  overflow:
    hidden;

  border:
    0;

  background:
    transparent;

  touch-action:
    pan-y;
}

.currently-board.is-editing {
  background:
    rgba(255, 255, 255, 0.025);
}

/* =========================================
   NOTES
   ========================================= */

.journal-note {
  position:
    absolute;

  width:
    clamp(220px, 27vw, 310px);

  min-height:
    210px;

  padding:
    2rem
    1.4rem
    1.4rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.12);

  box-shadow:
    0 10px 18px
    rgba(35, 36, 36, 0.08);

  transform:
    rotate(var(--note-rotation));

  transition:
    box-shadow 160ms ease;

  user-select:
    none;

  touch-action:
    none;
}

.journal-note--learning {
  background:
    rgba(142, 102, 169, 0.11);
}

.journal-note--building {
  background:
    rgba(199, 198, 142, 0.18);
}

.journal-note--exploring {
  background:
    rgba(255, 255, 255, 0.34);
}

.currently-board.is-editing
.journal-note {
  cursor:
    grab;

  box-shadow:
    0 14px 22px
    rgba(35, 36, 36, 0.16),
    0 0 0 2px
    rgba(199, 198, 142, 0.38);
}

.currently-board.is-editing
.journal-note:hover {
  box-shadow:
    0 17px 25px
    rgba(35, 36, 36, 0.18),
    0 0 0 2px
    rgba(199, 198, 142, 0.38);
}

.journal-note.is-settling {
  animation:
    note-paste 360ms
    cubic-bezier(0.2, 0.85, 0.25, 1);
}

.journal-note::before {
  content:
    '';

  position:
    absolute;

  inset:
    0.45rem;

  border:
    1px dashed
    rgba(71, 56, 36, 0.12);

  pointer-events:
    none;
}

.journal-note__tape {
  position:
    absolute;

  top:
    -0.5rem;

  left:
    50%;

  width:
    74px;

  height:
    22px;

  transform:
    translateX(-50%)
    rotate(-2deg);

  background:
    rgba(199, 198, 142, 0.68);

  box-shadow:
    0 2px 4px
    rgba(35, 36, 36, 0.06);
}

.journal-note__label {
  position:
    relative;

  margin:
    0
    0
    0.8rem;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.7rem;

  letter-spacing:
    0.12em;

  color:
    #8e66a9;

  font-weight:
    700;
}

.journal-note__value {
  position:
    relative;

  margin:
    0;

  font-family:
    'Crafty Girls',
    cursive;

  font-size:
    1.15rem;

  line-height:
    1.5;
}

.journal-note__pin {
  position:
    absolute;

  top:
    0.8rem;

  right:
    0.9rem;

  font-family:
    'Bonbon',
    cursive;

  font-size:
    1.5rem;

  opacity:
    0.55;
}

.journal-note__drag-label {
  position:
    absolute;

  right:
    0.8rem;

  bottom:
    0.7rem;

  z-index:
    2;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.55rem;

  letter-spacing:
    0.12em;

  opacity:
    0.42;
}

.journal-note__input {
  position:
    relative;

  width:
    100%;

  padding:
    0;

  border:
    0;

  outline:
    0;

  background:
    transparent;

  color:
    #8e66a9;

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.7rem;

  letter-spacing:
    0.12em;

  font-weight:
    700;
}

.journal-note__textarea {
  position:
    relative;

  width:
    100%;

  min-height:
    115px;

  margin-top:
    0.8rem;

  padding:
    0;

  border:
    0;

  outline:
    0;

  resize:
    none;

  background:
    transparent;

  color:
    #473824;

  font-family:
    'Crafty Girls',
    cursive;

  font-size:
    1.05rem;

  line-height:
    1.45;
}

/* =========================================
   STICKERS
   ========================================= */

.journal-sticker {
  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    0.45rem;

  border:
    3px solid
    #fff;

  box-shadow:
    0 8px 16px
    rgba(35, 36, 36, 0.12),
    0 1px 2px
    rgba(35, 36, 36, 0.08);

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.58rem;

  font-weight:
    700;

  letter-spacing:
    0.05em;

  line-height:
    1.05;

  text-align:
    center;

  user-select:
    none;

  pointer-events:
    none;
}

.journal-sticker__symbol {
  font-size:
    1.5em;
}

/* =========================================
   SNAP STICKER
   ========================================= */

.journal-sticker--camera {
  position:
    absolute;

  z-index:
    20;

  top:
    -1.35rem;

  right:
    -1.25rem;

  padding:
    0.75rem
    1rem;

  border-radius:
    1rem;

  background:
    #8e66a9;

  color:
    #fff;

  box-shadow:
    0 9px 16px
    rgba(35, 36, 36, 0.14);

  transform:
    rotate(7deg);
}

/* =========================================
   CURSOR STICKER
   ========================================= */

.journal-sticker--cursor {
  position:
    absolute;

  z-index:
    8;

  right:
    0.5rem;

  bottom:
    -1rem;

  padding:
    0.7rem
    0.9rem;

  background:
    #fff;

  color:
    #473824;

  clip-path:
    polygon(
      5% 8%,
      91% 0,
      100% 25%,
      85% 100%,
      58% 75%,
      32% 91%,
      17% 63%,
      0 32%
    );

  transform:
    rotate(7deg);
}

/* =========================================
   FOLDER STICKER
   ========================================= */

.journal-sticker--folder {
  position:
    absolute;

  top:
    -1rem;

  right:
    0;

  width:
    72px;

  height:
    52px;

  background:
    #c7c68e;

  color:
    #473824;

  clip-path:
    polygon(
      0 18%,
      35% 18%,
      45% 2%,
      100% 2%,
      100% 85%,
      88% 100%,
      0 100%
    );

  transform:
    rotate(5deg);
}

/* =========================================
   IDEA STICKER
   ========================================= */

.journal-sticker--idea {
  position:
    relative;

  min-width:
    190px;

  min-height:
    100px;

  padding:
    1rem
    1.2rem;

  background:
    #fff;

  color:
    #473824;

  clip-path:
    polygon(
      4% 12%,
      18% 2%,
      74% 7%,
      96% 22%,
      100% 78%,
      84% 96%,
      15% 100%,
      0 74%,
      5% 28%
    );

  transform:
    rotate(4deg);
}

.journal-sticker--idea strong {
  color:
    #8e66a9;
}

/* =========================================
   CURRENTLY STICKERS
   ========================================= */

.journal-sticker--coffee {
  position:
    absolute;

  z-index:
    8;

  right:
    1.5rem;

  bottom:
    2rem;

  width:
    78px;

  height:
    70px;

  flex-direction:
    column;

  background:
    #8e66a9;

  color:
    #fff;

  clip-path:
    polygon(
      8% 5%,
      84% 0,
      100% 18%,
      94% 79%,
      76% 96%,
      12% 92%,
      0 27%
    );

  transform:
    rotate(8deg);
}

.journal-sticker--laptop {
  position:
    absolute;

  z-index:
    8;

  left:
    1.5rem;

  bottom:
    2rem;

  width:
    88px;

  height:
    72px;

  flex-direction:
    column;

  background:
    #c7c68e;

  color:
    #473824;

  clip-path:
    polygon(
      5% 13%,
      87% 3%,
      100% 26%,
      93% 88%,
      70% 100%,
      7% 91%,
      0 28%
    );

  transform:
    rotate(-6deg);
}

/* =========================================
   FEW NOTES STICKERS
   ========================================= */

.journal-home__sticker-area {
  position:
    relative;

  min-height:
    280px;
}

.journal-sticker--code {
  position:
    relative;

  width:
    145px;

  min-height:
    120px;

  flex-direction:
    column;

  padding:
    1rem;

  background:
    #473824;

  color:
    #dedede;

  clip-path:
    polygon(
      7% 3%,
      92% 0,
      100% 75%,
      82% 100%,
      10% 92%,
      0 23%
    );

  transform:
    rotate(-7deg);
}

.journal-sticker--code
.journal-sticker__symbol {
  font-size:
    1.5rem;

  color:
    #c7c68e;
}

/* Actual star */
.journal-sticker--star {
  position:
    absolute;

  z-index:
    8;

  right:
    1rem;

  top:
    3.5rem;

  width:
    84px;

  height:
    84px;

  border:
    0;

  background:
    #c7c68e;

  color:
    #473824;

  font-family:
    'Coda Caption',
    sans-serif;

  font-size:
    2rem;

  clip-path:
    polygon(
      50% 0,
      61% 35%,
      98% 35%,
      68% 55%,
      79% 92%,
      50% 69%,
      21% 92%,
      32% 55%,
      2% 35%,
      39% 35%
    );

  box-shadow:
    0 8px 15px
    rgba(35, 36, 36, 0.12);

  transform:
    rotate(8deg);
}

.journal-sticker--mouse {
  position:
    absolute;

  z-index:
    8;

  left:
    2.5rem;

  bottom:
    1rem;

  padding:
    0.8rem
    1rem;

  background:
    #fff;

  color:
    #473824;

  clip-path:
    polygon(
      7% 2%,
      87% 5%,
      100% 35%,
      91% 90%,
      10% 100%,
      0 30%
    );

  transform:
    rotate(4deg);
}

.journal-sticker--page {
  position:
    absolute;

  z-index:
    8;

  right:
    2rem;

  bottom:
    1rem;

  width:
    72px;

  height:
    58px;

  flex-direction:
    column;

  background:
    #fff;

  color:
    #473824;

  clip-path:
    polygon(
      0 0,
      75% 0,
      100% 25%,
      100% 100%,
      0 100%
    );

  transform:
    rotate(5deg);
}

.journal-sticker--page strong {
  color:
    #8e66a9;

  font-family:
    'Coda Caption',
    sans-serif;

  font-size:
    1.2rem;
}

/* =========================================
   NAVIGATION
   ========================================= */

.journal-home__navigation {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;

  padding:
    2rem
    0
    1rem;
}

.journal-home__nav-button {
  display:
    inline-flex;

  align-items:
    center;

  gap:
    0.85rem;

  padding:
    0.8rem
    1rem;

  border:
    1px solid
    rgba(35, 36, 36, 0.18);

  background:
    rgba(255, 255, 255, 0.2);

  color:
    #473824;

  cursor:
    pointer;

  font-family:
    'Google Sans Code',
    monospace;

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

.journal-home__nav-button:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 7px 14px
    rgba(35, 36, 36, 0.08);
}

.journal-home__nav-button--back {
  background:
    #473824;

  color:
    #dedede;
}

/* =========================================
   FOOTER
   ========================================= */

.journal-home__footer {
  display:
    flex;

  justify-content:
    space-between;

  gap:
    1rem;

  min-height:
    var(--journal-line-step);

  padding-top:
    var(--journal-line-step);

  font-family:
    'Google Sans Code',
    monospace;

  font-size:
    0.62rem;

  letter-spacing:
    0.12em;

  opacity:
    0.42;
}

/* =========================================
   ANIMATION
   ========================================= */

@keyframes note-paste {
  0% {
    opacity:
      0.7;

    transform:
      rotate(var(--note-rotation))
      translateY(-16px)
      scale(1.035);
  }

  55% {
    opacity:
      1;

    transform:
      rotate(
        calc(
          var(--note-rotation) -
          1deg
        )
      )
      translateY(3px)
      scale(0.985);
  }

  100% {
    opacity:
      1;

    transform:
      rotate(var(--note-rotation))
      translateY(0)
      scale(1);
  }
}

/* =========================================
   RESPONSIVE
   ========================================= */

@media (max-width: 900px) {
  .journal-home__hero {
    grid-template-columns:
      1fr;
  }

  .journal-home__portrait-wrap {
    width:
      min(100%, 360px);
  }

  .journal-home__about-layout {
    grid-template-columns:
      1fr;
  }

  .currently-board {
    min-height:
      700px;
  }

  .journal-note {
    width:
      clamp(210px, 45vw, 300px);
  }
}

@media (max-width: 680px) {
  .journal-home__content {
    width:
      94vw;
  }

  .journal-home__header {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .journal-home__date {
    text-align:
      left;
  }

  .journal-home__hero {
    padding:
      calc(var(--journal-line-step) * 1.5)
      0;
  }

  .journal-home__title {
    font-size:
      clamp(3rem, 16vw, 5.5rem);
  }

  .journal-home__currently-header {
    align-items:
      flex-start;

    flex-direction:
      column;
  }

  .currently-board {
    min-height:
      980px;
  }

  .journal-note {
    width:
      min(78vw, 290px);
  }

  .journal-home__navigation {
    align-items:
      stretch;

    flex-direction:
      column;
  }

  .journal-home__nav-button {
    justify-content:
      center;
  }

  .journal-home__footer {
    flex-direction:
      column;
  }
}
</style>