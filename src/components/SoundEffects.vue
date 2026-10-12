
<template>
  <div class="sound-effects">

    <!-- CHARACTER BUTTON -->

    <button
      class="sound-effects__character"
      type="button"
      aria-label="Open sound effects question"
      aria-haspopup="dialog"
      :aria-expanded="isSoundPromptOpen"
      @click="openSoundPrompt"
    >
      <span class="sound-effects__character-frame" aria-hidden="true">
        <img
          class="sound-effects__character-image"
          :src="characterImage"
          alt=""
          draggable="false"
        />
      </span>
    </button>

    <!-- PLAYFUL MUTE CONFIRMATION -->

    <div
      v-if="isSoundPromptOpen"
      class="sound-effects__dialog-backdrop"
      @click.self="closeSoundPrompt"
    >
      <section
        class="sound-effects__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sound-effects-dialog-title"
        aria-describedby="sound-effects-dialog-copy"
        tabindex="-1"
        @keydown.esc.stop.prevent="closeSoundPrompt"
      >
        <span
          class="sound-effects__dialog-tape"
          aria-hidden="true"
        ></span>

        <p class="sound-effects__dialog-eyebrow">
          A VERY IMPORTANT QUESTION
        </p>

        <span
          class="sound-effects__dialog-face"
          aria-hidden="true"
        >
          ಠ_ಠ
        </span>

        <h2
          id="sound-effects-dialog-title"
          class="sound-effects__dialog-title"
        >
          Wow, am I that annoying...
        </h2>

        <p
          id="sound-effects-dialog-copy"
          class="sound-effects__dialog-copy"
        >
          Should I shut Nithaam up?
        </p>

        <div class="sound-effects__dialog-actions">
          <button
            type="button"
            class="sound-effects__choice sound-effects__choice--yes"
            @click="confirmMute"
          >
            YES
          </button>

          <button
            type="button"
            class="sound-effects__choice sound-effects__choice--no"
            @click="keepSoundOn"
          >
            NO
          </button>
        </div>

        <p class="sound-effects__dialog-note">
          Choose wisely. I have feelings, you know.
        </p>
      </section>
    </div>

    <!-- SOUND EFFECT PLAYER -->

    <audio
      ref="effectAudio"
      preload="none"
      @play="handleEffectPlay"
      @ended="handleEffectEnded"
      @error="handleEffectError"
    ></audio>

    <!-- PAGE SONG PLAYER -->

    <audio
      ref="pageAudio"
      preload="none"
      @play="handlePagePlay"
      @ended="handlePageEnded"
      @error="handlePageError"
    ></audio>

  </div>
</template>

<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

import { useRoute } from 'vue-router'

/* =========================================
   CHARACTER IMAGES
   ========================================= */

import shutUpImage from '../assets/images/shut-up.png'
import talkingOneImage from '../assets/images/talking1.png'
import talkingTwoImage from '../assets/images/talking2.png'
import talkingThreeImage from '../assets/images/talking3.png'
import singingImage from '../assets/images/singing.png'

/* =========================================
   PAGE SONGS
   ========================================= */

import welcomeSong from '../assets/audio/final/character/page-songs/welcome-sing.mp3'
import introSong from '../assets/audio/final/character/page-songs/intro-sing.mp3'
import homeSong from '../assets/audio/final/character/page-songs/home-sing.mp3'
import aboutSong from '../assets/audio/final/character/page-songs/about-sing.mp3'
import projectsSong from '../assets/audio/final/character/page-songs/projects-sing.mp3'
import skillsSong from '../assets/audio/final/character/page-songs/skills-sing.mp3'
import resumeSong from '../assets/audio/final/character/page-songs/resume-sing.mp3'
import contactSong from '../assets/audio/final/character/page-songs/contact-sing.mp3'

/* =========================================
   HOME PORTRAIT
   ========================================= */

import pictureOne from '../assets/audio/final/character/home-picture/picture1.mp3'
import pictureTwo from '../assets/audio/final/character/home-picture/picture2.mp3'
import pictureThree from '../assets/audio/final/character/home-picture/picture3.mp3'

/* =========================================
   KEYBOARD SOUNDS

   Alphabet and number recordings are no longer
   used for keyboard input.
   ========================================= */

import specialCharacterOne from '../assets/audio/final/keyboard/special-character1.mp3'
import specialCharacterTwo from '../assets/audio/final/keyboard/special-character2.mp3'
import specialCharacterThree from '../assets/audio/final/keyboard/special-character3.mp3'
import specialCharacterFour from '../assets/audio/final/keyboard/special-character4.mp3'

import errorOne from '../assets/audio/final/keyboard/error1.mp3'
import errorTwo from '../assets/audio/final/keyboard/error2.mp3'

/* =========================================
   PAGE TRANSITION
   ========================================= */

import paperCrunch from '../assets/audio/final/page-transitions/paper-crunch.mp3'

/* =========================================
   STICKERS
   ========================================= */

import stickerOne from '../assets/audio/final/stickers/sticker1.mp3'
import stickerTwo from '../assets/audio/final/stickers/sticker2.mp3'
import stickerThree from '../assets/audio/final/stickers/sticker3.mp3'

/* =========================================
   EDITING
   ========================================= */

import editOne from '../assets/audio/final/editing/edit1.mp3'
import editTwo from '../assets/audio/final/editing/edit2.mp3'

import doneEditOne from '../assets/audio/final/editing/done-edit1.mp3'
import doneEditTwo from '../assets/audio/final/editing/done-edit2.mp3'

/* =========================================
   PROJECTS
   ========================================= */

import addProjectOne from '../assets/audio/final/projects/add-project/project1.mp3'
import addProjectTwo from '../assets/audio/final/projects/add-project/project2.mp3'

import saveOne from '../assets/audio/final/projects/save-changes/save1.mp3'
import saveTwo from '../assets/audio/final/projects/save-changes/save2.mp3'

import replaceImage from '../assets/audio/final/projects/screenshot-actions/image1.mp3'
import removeImage from '../assets/audio/final/projects/screenshot-actions/image2.mp3'

import removeProjectOne from '../assets/audio/final/projects/remove-project/remove-projects1.mp3'
import removeProjectTwo from '../assets/audio/final/projects/remove-project/remove-projects2.mp3'

import githubProjectSound from '../assets/audio/final/projects/links/github2.mp3'
import liveDemoSound from '../assets/audio/final/projects/links/live-demo.mp3'

import dropdownOne from '../assets/audio/final/projects/dropdowns/dropdown1.mp3'
import dropdownTwo from '../assets/audio/final/projects/dropdowns/dropdown2.mp3'
import dropdownThree from '../assets/audio/final/projects/dropdowns/dropdown3.mp3'

/* =========================================
   RESUME
   ========================================= */

import printOne from '../assets/audio/final/resume/print-save/print1.mp3'
import printTwo from '../assets/audio/final/resume/print-save/print2.mp3'

import addContentSound from '../assets/audio/final/resume/content-editing/add.mp3'
import removeContentSound from '../assets/audio/final/resume/content-editing/remove.mp3'

/* =========================================
   CONTACT
   ========================================= */

import noteOne from '../assets/audio/final/contact/send-note/note1.mp3'
import noteTwo from '../assets/audio/final/contact/send-note/note2.mp3'

import emailSound from '../assets/audio/final/contact/social-links/email.mp3'
import githubContactSound from '../assets/audio/final/contact/social-links/github.mp3'
import linkedinSound from '../assets/audio/final/contact/social-links/linkedin.mp3'

/* =========================================
   ROUTE / AUDIO STATE
   ========================================= */

const route = useRoute()

const effectAudio = ref(null)
const pageAudio = ref(null)

const soundEnabled = ref(true)

const isTalking = ref(false)
const isSinging = ref(false)

const talkFrameIndex = ref(1)

const activeEffectKey = ref('')
const activePageKey = ref('')
const pendingPageSong = ref('')

/* Popup state */

const isSoundPromptOpen = ref(false)

let mouthTimer = null
let routeSongTimer = null

let lastSpecialCharacterIndex = -1
let lastErrorIndex = -1

const cyclePositions = {
  portrait: 0,
  sticker: 0,
  edit: 0,
  doneEdit: 0,
  addProject: 0,
  save: 0,
  removeProject: 0,
  dropdown: 0,
  print: 0,
  note: 0
}

/* =========================================
   AUDIO FILE MAP
   ========================================= */

const soundFiles = {
  'welcome-sing': welcomeSong,
  'intro-sing': introSong,
  'home-sing': homeSong,
  'about-sing': aboutSong,
  'projects-sing': projectsSong,
  'skills-sing': skillsSong,
  'resume-sing': resumeSong,
  'contact-sing': contactSong,

  picture1: pictureOne,
  picture2: pictureTwo,
  picture3: pictureThree,

  'special-character1': specialCharacterOne,
  'special-character2': specialCharacterTwo,
  'special-character3': specialCharacterThree,
  'special-character4': specialCharacterFour,

  error1: errorOne,
  error2: errorTwo,

  'paper-crunch': paperCrunch,

  sticker1: stickerOne,
  sticker2: stickerTwo,
  sticker3: stickerThree,

  edit1: editOne,
  edit2: editTwo,

  'done-edit1': doneEditOne,
  'done-edit2': doneEditTwo,

  project1: addProjectOne,
  project2: addProjectTwo,

  save1: saveOne,
  save2: saveTwo,

  image1: replaceImage,
  image2: removeImage,

  'remove-projects1': removeProjectOne,
  'remove-projects2': removeProjectTwo,

  github2: githubProjectSound,
  'live-demo': liveDemoSound,

  dropdown1: dropdownOne,
  dropdown2: dropdownTwo,
  dropdown3: dropdownThree,

  print1: printOne,
  print2: printTwo,

  add: addContentSound,
  remove: removeContentSound,

  note1: noteOne,
  note2: noteTwo,

  email: emailSound,
  github: githubContactSound,
  linkedin: linkedinSound
}

/* =========================================
   PAGE SONG LOOKUP
   ========================================= */

const pageSongs = {
  welcome: 'welcome-sing',
  intro: 'intro-sing',
  home: 'home-sing',
  about: 'about-sing',
  projects: 'projects-sing',
  skills: 'skills-sing',
  resume: 'resume-sing',
  contact: 'contact-sing'
}

/* =========================================
   CHARACTER IMAGE STATE
   ========================================= */

const talkingImages = [
  talkingOneImage,
  talkingTwoImage,
  talkingThreeImage
]

const characterImage = computed(() => {
  if (!soundEnabled.value) {
    return shutUpImage
  }

  if (isSinging.value) {
    return singingImage
  }

  if (isTalking.value) {
    return talkingImages[talkFrameIndex.value]
  }

  return talkingTwoImage
})

/* =========================================
   AUDIO HELPERS
   ========================================= */

function clearMouthTimer() {
  if (mouthTimer) {
    window.clearInterval(mouthTimer)
  }

  mouthTimer = null
}

function settleCharacter() {
  clearMouthTimer()

  isTalking.value = false
  isSinging.value = false

  talkFrameIndex.value = 1

  activeEffectKey.value = ''
  activePageKey.value = ''
}

function playCycle(group, keys) {
  const position = cyclePositions[group] || 0
  const key = keys[position % keys.length]

  cyclePositions[group] = position + 1

  playEffect(key)
}

function playRandomFromPool(group, keys) {
  if (!keys.length) return

  const previousIndex =
    group === 'error'
      ? lastErrorIndex
      : lastSpecialCharacterIndex

  let selectedIndex = Math.floor(
    Math.random() * keys.length
  )

  if (
    keys.length > 1 &&
    selectedIndex === previousIndex
  ) {
    const offset =
      1 +
      Math.floor(
        Math.random() * (keys.length - 1)
      )

    selectedIndex =
      (previousIndex + offset) % keys.length
  }

  if (group === 'error') {
    lastErrorIndex = selectedIndex
  } else {
    lastSpecialCharacterIndex = selectedIndex
  }

  playEffect(keys[selectedIndex])
}

function playRandomError() {
  playRandomFromPool('error', [
    'error1',
    'error2'
  ])
}

function playRandomSpecialCharacter() {
  playRandomFromPool('specialCharacter', [
    'special-character1',
    'special-character2',
    'special-character3',
    'special-character4'
  ])
}

function getText(element) {
  if (!element) return ''

  return (
    `${element.innerText || element.textContent || ''} ` +
    `${element.getAttribute('aria-label') || ''} ` +
    `${element.getAttribute('title') || ''}`
  )
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/* =========================================
   TALKING ANIMATION
   ========================================= */

function startTalkingAnimation() {
  if (!soundEnabled.value) return

  clearMouthTimer()

  isSinging.value = false
  isTalking.value = true
  talkFrameIndex.value = 0

  mouthTimer = window.setInterval(() => {
    talkFrameIndex.value =
      (talkFrameIndex.value + 1) %
      talkingImages.length
  }, 145)
}

function startSingingAnimation() {
  if (!soundEnabled.value) return

  clearMouthTimer()

  isTalking.value = false
  isSinging.value = true
}

/* =========================================
   PLAY A VOICE CLIP / SOUND EFFECT
   ========================================= */

async function playEffect(key) {
  if (!soundEnabled.value) return

  const file = soundFiles[key]
  const player = effectAudio.value

  if (!file || !player) return

  pendingPageSong.value = ''

  if (pageAudio.value) {
    pageAudio.value.pause()
  }

  activePageKey.value = ''

  clearMouthTimer()

  isSinging.value = false
  isTalking.value = false

  activeEffectKey.value = key

  player.pause()
  player.src = file
  player.currentTime = 0
  player.load()

  try {
    await player.play()
  } catch (error) {
    settleCharacter()

    console.warn(
      'Portfolio sound effect could not play:',
      error
    )
  }
}

/* =========================================
   PLAY A PAGE SONG
   ========================================= */

async function playPageSong(key) {
  if (!soundEnabled.value || !key) return

  const file = soundFiles[key]
  const player = pageAudio.value

  if (!file || !player) return

  if (
    activePageKey.value === key &&
    !player.paused &&
    !player.ended
  ) {
    return
  }

  if (effectAudio.value) {
    effectAudio.value.pause()
  }

  activeEffectKey.value = ''

  clearMouthTimer()

  isTalking.value = false
  isSinging.value = false

  pendingPageSong.value = ''
  activePageKey.value = key

  player.pause()
  player.src = file
  player.currentTime = 0
  player.load()

  try {
    await player.play()
  } catch (error) {
    pendingPageSong.value = key
    activePageKey.value = ''

    settleCharacter()

    console.info(
      'The page song will retry after visitor interaction.'
    )
  }
}

function resumePendingSong() {
  if (
    !soundEnabled.value ||
    !pendingPageSong.value
  ) {
    return
  }

  const key = pendingPageSong.value
  pendingPageSong.value = ''

  playPageSong(key)
}

/* =========================================
   LEGACY SOUND TOGGLE
   ========================================= */

function toggleSoundEffects() {
  soundEnabled.value = !soundEnabled.value

  if (!soundEnabled.value) {
    pendingPageSong.value = ''

    if (effectAudio.value) {
      effectAudio.value.pause()
      effectAudio.value.currentTime = 0
    }

    if (pageAudio.value) {
      pageAudio.value.pause()
      pageAudio.value.currentTime = 0
    }

    settleCharacter()
    return
  }

  settleCharacter()

  playPageSong(pageSongs[route.name])
}

/* =========================================
   PLAYFUL MUTE CONFIRMATION
   ========================================= */

function openSoundPrompt() {
  isSoundPromptOpen.value = true
}

function closeSoundPrompt() {
  isSoundPromptOpen.value = false
}

function confirmMute() {
  isSoundPromptOpen.value = false

  // YES: silence all sound effects and page songs.
  soundEnabled.value = false
  pendingPageSong.value = ''

  if (effectAudio.value) {
    effectAudio.value.pause()
    effectAudio.value.currentTime = 0
  }

  if (pageAudio.value) {
    pageAudio.value.pause()
    pageAudio.value.currentTime = 0
  }

  settleCharacter()
}

function keepSoundOn() {
  isSoundPromptOpen.value = false

  // NO: leave existing audio playing when sound is on.
  if (soundEnabled.value) {
    return
  }

  // If sound was already off, turn it back on.
  soundEnabled.value = true

  settleCharacter()

  playPageSong(pageSongs[route.name])
}

/* =========================================
   AUDIO EVENTS
   ========================================= */

function handleEffectPlay() {
  if (soundEnabled.value) {
    startTalkingAnimation()
  }
}

function handlePagePlay() {
  if (soundEnabled.value) {
    startSingingAnimation()
  }
}

function handleEffectEnded() {
  if (!soundEnabled.value) return

  settleCharacter()
}

function handlePageEnded() {
  if (!soundEnabled.value) return

  settleCharacter()
}

function handleEffectError() {
  if (!soundEnabled.value) return

  settleCharacter()

  console.warn(
    'A portfolio voice clip could not be loaded.'
  )
}

function handlePageError() {
  if (!soundEnabled.value) return

  const key = activePageKey.value

  settleCharacter()

  if (key) {
    pendingPageSong.value = key
  }
}

/* =========================================
   PAGE TRANSITION EVENTS
   ========================================= */

function onRequestedSound(event) {
  if (!soundEnabled.value) return

  const key = event.detail?.key

  if (typeof key === 'string') {
    playEffect(key)
  }
}

function onTransitionFinished() {
  if (routeSongTimer) {
    window.clearTimeout(routeSongTimer)
  }

  routeSongTimer = window.setTimeout(() => {
    playPageSong(pageSongs[route.name])
  }, 1200)
}

watch(
  () => route.name,
  (name) => {
    if (routeSongTimer) {
      window.clearTimeout(routeSongTimer)
    }

    routeSongTimer = window.setTimeout(() => {
      playPageSong(pageSongs[name])
    }, 2300)
  }
)

/* =========================================
   WELCOME / INTRO KEYBOARD SOUNDS
   ========================================= */

const specialCharacters = new Set([
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
  '[',
  ']',
  '{',
  '}',
  '\\',
  '|',
  ';',
  ':',
  "'",
  '"',
  ',',
  '<',
  '.',
  '>',
  '/',
  '?',
  '`',
  '~'
])

const keyboardRoutes = new Set([
  'welcome',
  'intro'
])

const keyboardTargetWord = 'next'
const maximumNameLength = 20

function isKeyboardCharacter(character) {
  if (
    typeof character !== 'string' ||
    character.length !== 1
  ) {
    return false
  }

  return (
    character === ' ' ||
    /^[a-z0-9]$/i.test(character) ||
    specialCharacters.has(character)
  )
}

function getKeyboardInputState(
  target = null,
  forcedMode = null
) {
  if (route.name === 'welcome') {
    return {
      routeName: 'welcome',
      mode: 'next',
      count: document.querySelectorAll(
        '.welcome-page__typed-letter'
      ).length
    }
  }

  if (route.name !== 'intro') {
    return null
  }

  let mode = forcedMode

  const targetElement =
    typeof Element !== 'undefined' &&
    target instanceof Element
      ? target
      : null

  if (!mode && targetElement) {
    if (
      targetElement.closest(
        '.intro-page__name-area'
      )
    ) {
      mode = 'name'
    } else if (
      targetElement.closest('.intro-next')
    ) {
      mode = 'next'
    }
  }

  if (!mode) {
    mode = document.querySelector(
      '.intro-next.is-active'
    )
      ? 'next'
      : 'name'
  }

  if (mode === 'name') {
    return {
      routeName: 'intro',
      mode: 'name',
      count: document.querySelectorAll(
        '.intro-page__name-character'
      ).length
    }
  }

  return {
    routeName: 'intro',
    mode: 'next',
    count: document.querySelectorAll(
      '.intro-next__character'
    ).length
  }
}

/*
 * Correct NEXT character: special-character sound.
 * Incorrect NEXT character: random error sound.
 * Name input: special-character sound.
 * Name input at 20 characters: silent.
 * Backspace, Delete, Shift and Caps Lock: silent.
 */

function playKeyboardCharacterSound(
  character,
  {
    target = null,
    forcedMode = null,
    slotIndex = null
  } = {}
) {
  if (
    !soundEnabled.value ||
    !keyboardRoutes.has(route.name) ||
    !isKeyboardCharacter(character)
  ) {
    return
  }

  const state = getKeyboardInputState(
    target,
    forcedMode
  )

  if (!state) return

  /* NAME INPUT */

  if (state.mode === 'name') {
    if (state.count >= maximumNameLength) {
      return
    }

    playRandomSpecialCharacter()
    return
  }

  /* NEXT INPUT */

  if (state.count >= keyboardTargetWord.length) {
    return
  }

  if (
    slotIndex !== null &&
    slotIndex !== state.count
  ) {
    playRandomError()
    return
  }

  const expectedCharacter =
    keyboardTargetWord[state.count]

  if (
    character.toLowerCase() ===
    expectedCharacter.toLowerCase()
  ) {
    playRandomSpecialCharacter()
  } else {
    playRandomError()
  }
}

/* =========================================
   READ ON-SCREEN KEY LABELS
   ========================================= */

function getKeyboardCharacterFromButton(button) {
  if (!button) return null

  if (
    button.matches(
      '.welcome-key--modifier, ' +
      '.welcome-key--backspace, ' +
      '.intro-key--modifier, ' +
      '.intro-key--backspace'
    )
  ) {
    return null
  }

  if (
    button.matches(
      '.welcome-key--space, ' +
      '.intro-key--space'
    )
  ) {
    return ' '
  }

  const firstSpan = button.querySelector('span')

  const character = (
    firstSpan
      ? firstSpan.textContent
      : button.textContent
  )?.trim()

  if (
    character &&
    character.length === 1 &&
    isKeyboardCharacter(character)
  ) {
    return character
  }

  return null
}

/* =========================================
   PHYSICAL KEYBOARD
   ========================================= */

function onGlobalKeydown(event) {
  if (
    !soundEnabled.value ||
    !keyboardRoutes.has(route.name)
  ) {
    return
  }

  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.repeat
  ) {
    return
  }

  if (
    event.key === 'Shift' ||
    event.key === 'CapsLock' ||
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'Enter' ||
    event.key === 'Escape' ||
    event.key === 'Tab'
  ) {
    return
  }

  const targetElement =
    typeof Element !== 'undefined' &&
    event.target instanceof Element
      ? event.target
      : null

  // Prevent duplicate Space-key playback when
  // the browser also activates an on-screen key.
  if (
    event.key === ' ' &&
    targetElement?.closest(
      '.welcome-key, .intro-key'
    )
  ) {
    return
  }

  if (!isKeyboardCharacter(event.key)) {
    return
  }

  resumePendingSong()

  playKeyboardCharacterSound(
    event.key,
    { target: targetElement }
  )
}

/* =========================================
   GLOBAL CLICK / ACTION SOUNDS
   ========================================= */

function onGlobalClick(event) {
  const target =
    event.target instanceof Element
      ? event.target
      : null

  if (!target) return

  // Do not trigger portfolio effects when
  // the character or its popup is clicked.
  if (target.closest('.sound-effects')) return

  if (!soundEnabled.value) return

  resumePendingSong()

  /* Welcome and Intro keyboard buttons. */

  if (keyboardRoutes.has(route.name)) {
    const keyButton = target.closest(
      '.welcome-key, .intro-key'
    )

    if (keyButton) {
      const character =
        getKeyboardCharacterFromButton(keyButton)

      if (character !== null) {
        playKeyboardCharacterSound(
          character,
          { target: keyButton }
        )
      }

      return
    }
  }

  /* Home portrait. */

  if (
    route.name === 'home' &&
    target.closest('.journal-home__portrait-wrap')
  ) {
    playCycle('portrait', [
      'picture1',
      'picture2',
      'picture3'
    ])

    return
  }

  const action = target.closest(
    'button, a, [role="button"], select, ' +
    '.journal-sticker, [class*="-sticker"], ' +
    '.skill-shelf__sticker, .project-card__little-sticker'
  )

  if (!action) return

  const text = getText(action)

  /* Projects: add project. */

  if (
    route.name === 'projects' &&
    action.closest('.projects-page__editor-button--add')
  ) {
    playCycle('addProject', [
      'project1',
      'project2'
    ])

    return
  }

  /* Projects: save changes. */

  if (
    route.name === 'projects' &&
    action.closest('.projects-page__editor-button--save')
  ) {
    playCycle('save', [
      'save1',
      'save2'
    ])

    return
  }

  /* Home / Projects / Resume editing. */

  const isHomeEdit =
    route.name === 'home' &&
    action.closest('.journal-home__edit-button')

  const isProjectsEdit =
    route.name === 'projects' &&
    action.closest('.projects-page__editor-button') &&
    !action.closest('.projects-page__editor-button--add') &&
    !action.closest('.projects-page__editor-button--save')

  const isResumeEdit =
    route.name === 'resume' &&
    action.closest('.resume-page__action-button--primary')

  if (isHomeEdit || isProjectsEdit || isResumeEdit) {
    if (
      /done editing|exit editor|finish editing/i.test(text)
    ) {
      playCycle('doneEdit', [
        'done-edit1',
        'done-edit2'
      ])
    } else {
      playCycle('edit', [
        'edit1',
        'edit2'
      ])
    }

    return
  }

  /* Projects: screenshot actions. */

  if (
    route.name === 'projects' &&
    target.closest('input[type="file"]')
  ) {
    playEffect('image1')
    return
  }

  if (
    route.name === 'projects' &&
    action.closest('.project-card__remove-image')
  ) {
    playEffect('image2')
    return
  }

  if (
    route.name === 'projects' &&
    /remove/i.test(text) &&
    action.closest('.project-card__editor')
  ) {
    playCycle('removeProject', [
      'remove-projects1',
      'remove-projects2'
    ])

    return
  }

  /* Projects: GitHub and Live Demo. */

  if (
    route.name === 'projects' &&
    action.closest('.project-card__button--github')
  ) {
    playEffect('github2')
    return
  }

  if (
    route.name === 'projects' &&
    action.closest('.project-card__button--live')
  ) {
    playEffect('live-demo')
    return
  }

  /* Resume: print / save PDF. */

  if (
    route.name === 'resume' &&
    action.closest('.resume-page__action-button') &&
    /print|save pdf/i.test(text)
  ) {
    playCycle('print', [
      'print1',
      'print2'
    ])

    return
  }

  /* Resume: content editing. */

  if (
    route.name === 'resume' &&
    action.closest('.resume-editor__add-button')
  ) {
    playEffect('add')
    return
  }

  if (
    route.name === 'resume' &&
    action.closest('.resume-editor__remove-button')
  ) {
    playEffect('remove')
    return
  }

  /* Contact: send note. */

  if (
    route.name === 'contact' &&
    /send note|sending note/i.test(text)
  ) {
    playCycle('note', [
      'note1',
      'note2'
    ])

    return
  }

  /* Contact: social links. */

  if (
    route.name === 'contact' &&
    action.closest('.contact-card--email')
  ) {
    playEffect('email')
    return
  }

  if (
    route.name === 'contact' &&
    action.closest('.contact-card--github')
  ) {
    playEffect('github')
    return
  }

  if (
    route.name === 'contact' &&
    action.closest('.contact-card--linkedin')
  ) {
    playEffect('linkedin')
    return
  }

  /* Stickers throughout the portfolio. */

  if (
    action.matches(
      '.journal-sticker, ' +
      '.skill-shelf__sticker, ' +
      '.project-card__little-sticker, ' +
      '[class*="-sticker"]'
    )
  ) {
    playCycle('sticker', [
      'sticker1',
      'sticker2',
      'sticker3'
    ])
  }
}

/* =========================================
   DRAG-AND-DROP KEYBOARD SOUNDS
   ========================================= */

function onGlobalDrop(event) {
  if (
    !soundEnabled.value ||
    !keyboardRoutes.has(route.name)
  ) {
    return
  }

  const target =
    event.target instanceof Element
      ? event.target
      : null

  if (!target) return

  const character =
    event.dataTransfer?.getData('text/plain')

  if (!isKeyboardCharacter(character)) {
    return
  }

  resumePendingSong()

  /* Welcome: NEXT slots. */

  if (route.name === 'welcome') {
    const slot = target.closest(
      '.welcome-page__slot'
    )

    if (!slot) return

    const slots = Array.from(
      document.querySelectorAll(
        '.welcome-page__slot'
      )
    )

    playKeyboardCharacterSound(character, {
      target: slot,
      forcedMode: 'next',
      slotIndex: slots.indexOf(slot)
    })

    return
  }

  /* Intro: name area. */

  const nameArea = target.closest(
    '.intro-page__name-area'
  )

  if (nameArea) {
    playKeyboardCharacterSound(character, {
      target: nameArea,
      forcedMode: 'name'
    })

    return
  }

  /* Intro: NEXT slots. */

  const nextSlot = target.closest(
    '.intro-next__slot'
  )

  if (nextSlot) {
    const slots = Array.from(
      document.querySelectorAll(
        '.intro-next__slot'
      )
    )

    playKeyboardCharacterSound(character, {
      target: nextSlot,
      forcedMode: 'next',
      slotIndex: slots.indexOf(nextSlot)
    })
  }
}

/* =========================================
   DROPDOWNS
   ========================================= */

function onGlobalChange(event) {
  const target =
    event.target instanceof Element
      ? event.target
      : null

  if (!target || !soundEnabled.value) return
  if (target.closest('.sound-effects')) return

  if (target.matches('select')) {
    playCycle('dropdown', [
      'dropdown1',
      'dropdown2',
      'dropdown3'
    ])

    return
  }

  if (
    route.name === 'projects' &&
    target.matches('input[type="file"]')
  ) {
    playEffect('image1')
  }
}

/* =========================================
   SETUP / CLEANUP
   ========================================= */

onMounted(() => {
  document.addEventListener(
    'click',
    onGlobalClick
  )

  document.addEventListener(
    'change',
    onGlobalChange
  )

  document.addEventListener(
    'keydown',
    onGlobalKeydown
  )

  document.addEventListener(
    'drop',
    onGlobalDrop
  )

  window.addEventListener(
    'portfolio:play-sound',
    onRequestedSound
  )

  window.addEventListener(
    'portfolio:transition-finished',
    onTransitionFinished
  )

  playPageSong(pageSongs[route.name])
})

onBeforeUnmount(() => {
  document.removeEventListener(
    'click',
    onGlobalClick
  )

  document.removeEventListener(
    'change',
    onGlobalChange
  )

  document.removeEventListener(
    'keydown',
    onGlobalKeydown
  )

  document.removeEventListener(
    'drop',
    onGlobalDrop
  )

  window.removeEventListener(
    'portfolio:play-sound',
    onRequestedSound
  )

  window.removeEventListener(
    'portfolio:transition-finished',
    onTransitionFinished
  )

  if (routeSongTimer) {
    window.clearTimeout(routeSongTimer)
  }

  clearMouthTimer()

  if (effectAudio.value) {
    effectAudio.value.pause()
  }

  if (pageAudio.value) {
    pageAudio.value.pause()
  }
})
</script>

<style scoped>
/* =========================================
   SOUND EFFECT CHARACTER
   ========================================= */

.sound-effects {
  position: fixed;
  left: clamp(1rem, 2.8vw, 2rem);
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 500;
  display: grid;
  justify-items: start;
  pointer-events: none;
}

.sound-effects__character {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(6rem, 9vw, 8.2rem);
  aspect-ratio: 1.42 / 1;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;

  filter: drop-shadow(
    0 0.5rem 0.8rem rgba(35, 36, 36, 0.15)
  );

  transition:
    transform 180ms ease,
    filter 180ms ease;
}

.sound-effects__character:hover {
  transform: rotate(-2deg) translateY(-3px);

  filter: drop-shadow(
    0 0.7rem 1rem rgba(35, 36, 36, 0.19)
  );
}

.sound-effects__character:focus-visible {
  outline: 2px solid #8e66a9;
  outline-offset: 3px;
  border-radius: 0.7rem;
}

.sound-effects__character-frame {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  overflow: hidden;
}

.sound-effects__character-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
  user-select: none;
}

.sound-effects audio {
  display: none;
}

/* =========================================
   PLAYFUL MUTE POPUP
   ========================================= */

.sound-effects__dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: grid;
  place-items: center;

  width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1.25rem;

  background: rgba(35, 36, 36, 0.52);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  pointer-events: auto;

  animation: sound-dialog-fade-in 180ms ease both;
}

.sound-effects__dialog {
  position: relative;
  width: min(100%, 27rem);
  padding: clamp(1.8rem, 5vw, 2.6rem) 1.5rem 1.5rem;

  overflow: visible;

  color: #473824;
  text-align: center;

  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 30px,
      rgba(71, 56, 36, 0.07) 31px,
      transparent 32px
    ),
    #dedede;

  border: 1px solid rgba(71, 56, 36, 0.32);

  box-shadow:
    0 20px 55px rgba(0, 0, 0, 0.23),
    5px 6px 0 rgba(199, 198, 142, 0.6);

  transform: rotate(-1deg);

  animation: sound-dialog-pop-in 250ms ease both;
}

.sound-effects__dialog-tape {
  position: absolute;
  top: -0.65rem;
  left: 50%;

  width: 5.5rem;
  height: 1.25rem;

  background: rgba(199, 198, 142, 0.85);

  box-shadow: 0 2px 4px rgba(35, 36, 36, 0.08);

  transform: translateX(-50%) rotate(-3deg);
}

.sound-effects__dialog-eyebrow {
  margin: 0 0 1.1rem;

  font-family: var(--font-google-code, monospace);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;

  color: #8e66a9;
}

.sound-effects__dialog-face {
  display: block;
  margin-bottom: 0.6rem;

  font-family: var(--font-google-code, monospace);
  font-size: 2.1rem;
  line-height: 1.2;

  color: #473824;
}

.sound-effects__dialog-title {
  margin: 0;

  font-family: var(--font-crafty, cursive);
  font-size: clamp(1.7rem, 5vw, 2.25rem);
  font-weight: 400;
  line-height: 1.25;

  color: #473824;
}

.sound-effects__dialog-copy {
  margin: 0.9rem 0 1.6rem;

  font-family: var(--font-google-code, monospace);
  font-size: 0.85rem;
  line-height: 1.6;

  color: rgba(71, 56, 36, 0.82);
}

.sound-effects__dialog-actions {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.sound-effects__choice {
  min-width: 6.5rem;
  padding: 0.8rem 1.2rem;

  border: 1px solid rgba(71, 56, 36, 0.2);

  font-family: var(--font-google-code, monospace);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;

  cursor: pointer;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.sound-effects__choice:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(35, 36, 36, 0.12);
}

.sound-effects__choice:focus-visible {
  outline: 2px solid #473824;
  outline-offset: 3px;
}

.sound-effects__choice--yes {
  background: #8e66a9;
  color: #fff;
}

.sound-effects__choice--yes:hover {
  background: #74518d;
}

.sound-effects__choice--no {
  background: #c7c68e;
  color: #473824;
}

.sound-effects__choice--no:hover {
  background: #d3d29c;
}

.sound-effects__dialog-note {
  margin: 1.3rem 0 0;

  font-family: var(--font-bonbon, cursive);
  font-size: 1.35rem;
  line-height: 1.3;

  color: rgba(71, 56, 36, 0.78);
}

/* =========================================
   POPUP ANIMATIONS
   ========================================= */

@keyframes sound-dialog-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes sound-dialog-pop-in {
  from {
    opacity: 0;
    scale: 0.94;
  }

  to {
    opacity: 1;
    scale: 1;
  }
}

/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 720px) {
  .sound-effects {
    left: 0.7rem;
    bottom: max(0.7rem, env(safe-area-inset-bottom));
  }

  .sound-effects__character {
    width: 6.6rem;
  }
}

@media (max-width: 480px) {
  .sound-effects {
    left: 0.45rem;
  }

  .sound-effects__character {
    width: 5.7rem;
  }

  .sound-effects__dialog {
    padding: 1.8rem 1rem 1.25rem;
  }

  .sound-effects__dialog-actions {
    gap: 0.6rem;
  }

  .sound-effects__choice {
    flex: 1;
    min-width: 0;
  }
}

/* =========================================
   REDUCED MOTION
   ========================================= */

@media (prefers-reduced-motion: reduce) {
  .sound-effects__character,
  .sound-effects__choice {
    transition: none;
  }

  .sound-effects__dialog-backdrop,
  .sound-effects__dialog {
    animation: none;
  }
}
</style>
