<template>
  <section
    class="intro-page"
    aria-labelledby="intro-title"
  >
    <div class="intro-page__paper">
      <div class="intro-page__content">

        <!-- GREETING -->
        <div
          id="intro-title"
          class="intro-page__title"
          :aria-label="greetingText"
        >
          <span
            v-for="(letter, index) in animatedHi"
            :key="`hi-${index}`"
            class="intro-page__title-letter"
            :class="{
              'is-plopping': hiPlopping[index]
            }"
            :style="{
              fontFamily: letter.font
            }"
          >
            {{ letter.char }}
          </span>

          <span class="intro-page__comma">
            ,
          </span>

          <template v-if="name">
            <span class="intro-page__title-space">
              &nbsp;
            </span>

            <span
              v-for="(letter, index) in animatedName"
              :key="`name-title-${index}-${letter.char}`"
              class="intro-page__name-letter"
              :class="{
                'is-plopping':
                  namePlopping[index]
              }"
              :style="{
                fontFamily: letter.font,
                color: letter.color
              }"
            >
              {{
                letter.char === ' '
                  ? '\u00A0'
                  : letter.char
              }}
            </span>
          </template>
        </div>

        <!-- NAME INPUT -->
        <div
          class="intro-page__name-area"
          :class="{
            'is-active':
              activeMode === 'name'
          }"
          @click="activateNameMode"
          @dragover.prevent
          @drop.prevent="dropNameKey"
        >
          <div class="intro-page__name-slots">
            <span
              v-for="index in visibleNameSlotCount"
              :key="`name-slot-${index}`"
              class="intro-page__name-slot"
            >
              <span
                v-if="name[index - 1]"
                class="intro-page__name-character"
              >
                {{ name[index - 1] }}
              </span>

              <span
                v-else
                class="intro-page__name-line"
              ></span>
            </span>
          </div>

          <p class="intro-page__mode-hint">
            {{
              activeMode === 'name'
                ? 'Type or drag your name.'
                : 'Click the name area to edit it.'
            }}
          </p>
        </div>

        <!-- NEXT -->
        <div
          v-if="name.length > 0"
          class="intro-next"
          :class="{
            'is-active':
              activeMode === 'next'
          }"
          @click="activateNextMode"
        >
          <div
            class="intro-next__slots"
            aria-label="Enter NEXT"
          >
            <span
              v-for="(slot, index) in nextSlots"
              :key="`next-slot-${index}`"
              class="intro-next__slot"
              :class="{
                'is-filled':
                  nextValue[index],
                'is-wrong':
                  wrongNextSlot === index
              }"
              @dragover.prevent
              @drop.prevent="
                dropNextKey($event, index)
              "
            >
              <span
                v-if="nextValue[index]"
                class="intro-next__character"
              >
                {{ nextValue[index] }}
              </span>

              <span
                v-else
                class="intro-next__line"
              ></span>
            </span>
          </div>

          <p class="intro-next__hint">
            Enter <strong>NEXT</strong> to continue.
          </p>
        </div>

        <!-- CUSTOM KEYBOARD -->
        <div
          class="intro-keyboard"
          aria-label="Custom keyboard"
        >
          <!-- Numbers -->
          <div
            class="intro-keyboard__row intro-keyboard__row--numbers"
          >
            <button
              v-for="key in numberKeys"
              :key="key.value"
              class="intro-key"
              type="button"
              draggable="true"
              @click="
                pressKey(
                  getDisplayedKey(key)
                )
              "
              @dragstart="
                startDrag(
                  $event,
                  getDisplayedKey(key)
                )
              "
            >
              <span>
                {{
                  shiftActive
                    ? key.secondary
                    : key.value
                }}
              </span>

              <small>
                {{
                  shiftActive
                    ? key.value
                    : key.secondary
                }}
              </small>
            </button>
          </div>

          <!-- QWERTY -->
          <div class="intro-keyboard__row">
            <button
              v-for="key in letterRows[0]"
              :key="key"
              class="intro-key"
              type="button"
              draggable="true"
              @click="
                pressKey(
                  displayLetter(key)
                )
              "
              @dragstart="
                startDrag(
                  $event,
                  displayLetter(key)
                )
              "
            >
              {{ displayLetter(key) }}
            </button>
          </div>

          <!-- ASDF -->
          <div
            class="intro-keyboard__row intro-keyboard__row--offset"
          >
            <button
              v-for="key in letterRows[1]"
              :key="key"
              class="intro-key"
              type="button"
              draggable="true"
              @click="
                pressKey(
                  displayLetter(key)
                )
              "
              @dragstart="
                startDrag(
                  $event,
                  displayLetter(key)
                )
              "
            >
              {{ displayLetter(key) }}
            </button>
          </div>

          <!-- ZXCV -->
          <div
            class="intro-keyboard__row intro-keyboard__row--offset-large"
          >
            <button
              v-for="key in letterRows[2]"
              :key="key"
              class="intro-key"
              type="button"
              draggable="true"
              @click="
                pressKey(
                  displayLetter(key)
                )
              "
              @dragstart="
                startDrag(
                  $event,
                  displayLetter(key)
                )
              "
            >
              {{ displayLetter(key) }}
            </button>
          </div>

          <!-- Bottom -->
          <div
            class="intro-keyboard__row intro-keyboard__row--bottom"
          >
            <button
              class="intro-key intro-key--modifier"
              :class="{
                'is-active':
                  shiftActive
              }"
              type="button"
              @click="toggleShift"
            >
              SHIFT
            </button>

            <button
              v-for="key in punctuationKeys"
              :key="key.value"
              class="intro-key intro-key--small"
              type="button"
              draggable="true"
              @click="
                pressKey(
                  shiftActive
                    ? key.secondary
                    : key.value
                )
              "
              @dragstart="
                startDrag(
                  $event,
                  shiftActive
                    ? key.secondary
                    : key.value
                )
              "
            >
              {{
                shiftActive
                  ? key.secondary
                  : key.value
              }}
            </button>

            <button
              class="intro-key intro-key--space"
              type="button"
              draggable="true"
              @click="pressKey(' ')"
              @dragstart="
                startDrag($event, ' ')
              "
            >
              SPACE
            </button>

            <button
              class="intro-key intro-key--backspace"
              type="button"
              @click="backspace"
              aria-label="Backspace"
            >
              ←
            </button>
          </div>
        </div>

        <div class="intro-page__counter">
          {{ name.length }} / {{ maxNameLength }}
        </div>

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

const store = useStore()

const navigateWithTransition = inject(
  'navigateWithTransition'
)

const fonts = [
  "'Bonbon', cursive",
  "'Butterfly Kids', cursive",
  "'Crafty Girls', cursive",
  "'Cossette Titre', sans-serif",
  "'DotGothic16', sans-serif",
  "'Google Sans Code', monospace",
  "'Coda Caption', sans-serif"
]

const nameColors = [
  '#8E66A9',
  '#C7C68E'
]

const maxNameLength = 20

const name = ref(
  store.state.visitorName || ''
)

const activeMode = ref('name')
const shiftActive = ref(false)

const nextValue = ref('')
const wrongNextSlot = ref(-1)

const hiFontIndices = ref([
  0,
  1
])

const hiPlopping = ref([
  false,
  false
])

const nameFontIndices = ref([])
const namePlopping = ref([])

let hiTimers = []
let nameTimers = []

const numberKeys = [
  {
    value: '1',
    secondary: '!'
  },
  {
    value: '2',
    secondary: '@'
  },
  {
    value: '3',
    secondary: '#'
  },
  {
    value: '4',
    secondary: '$'
  },
  {
    value: '5',
    secondary: '%'
  },
  {
    value: '6',
    secondary: '^'
  },
  {
    value: '7',
    secondary: '&'
  },
  {
    value: '8',
    secondary: '*'
  },
  {
    value: '9',
    secondary: '('
  },
  {
    value: '0',
    secondary: ')'
  },
  {
    value: '-',
    secondary: '_'
  },
  {
    value: '=',
    secondary: '+'
  }
]

const letterRows = [
  [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P'
  ],
  [
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L'
  ],
  [
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M'
  ]
]

const punctuationKeys = [
  {
    value: '[',
    secondary: '{'
  },
  {
    value: ']',
    secondary: '}'
  },
  {
    value: '\\',
    secondary: '|'
  },
  {
    value: ';',
    secondary: ':'
  },
  {
    value: "'",
    secondary: '"'
  },
  {
    value: ',',
    secondary: '<'
  },
  {
    value: '.',
    secondary: '>'
  },
  {
    value: '/',
    secondary: '?'
  },
  {
    value: '`',
    secondary: '~'
  }
]

const nextSlots = Array.from({
  length: 4
})

const animatedHi = computed(() => [
  {
    char: 'H',
    font: fonts[hiFontIndices.value[0]]
  },
  {
    char: 'i',
    font: fonts[hiFontIndices.value[1]]
  }
])

const animatedName = computed(() =>
  name.value
    .split('')
    .map((char, index) => ({
      char,
      font:
        fonts[
          nameFontIndices.value[index] ??
          index % fonts.length
        ],
      color:
        nameColors[
          index % nameColors.length
        ]
    }))
)

const visibleNameSlotCount = computed(() => {
  const minimumSlots = 8

  return Math.min(
    maxNameLength,
    Math.max(
      minimumSlots,
      name.value.length + 1
    )
  )
})

const greetingText = computed(() => {
  if (!name.value) {
    return 'Hi'
  }

  return `Hi, ${name.value}`
})

function displayLetter(letter) {
  return shiftActive.value
    ? letter
    : letter.toLowerCase()
}

function getDisplayedKey(key) {
  return shiftActive.value
    ? key.secondary
    : key.value
}

function toggleShift() {
  shiftActive.value =
    !shiftActive.value
}

function cycleHiLetter(index) {
  hiFontIndices.value[index] =
    (hiFontIndices.value[index] + 1) %
    fonts.length

  hiPlopping.value[index] = true

  window.setTimeout(() => {
    hiPlopping.value[index] = false
  }, 340)
}

function startHiAnimation() {
  hiTimers = [
    window.setInterval(
      () => cycleHiLetter(0),
      2200
    ),

    window.setInterval(
      () => cycleHiLetter(1),
      2380
    )
  ]
}

function resetNameAnimation() {
  nameTimers.forEach(
    window.clearInterval
  )

  nameTimers = []

  nameFontIndices.value =
    name.value
      .split('')
      .map(
        (_, index) =>
          index % fonts.length
      )

  namePlopping.value =
    name.value
      .split('')
      .map(() => false)

  name.value
    .split('')
    .forEach((_, index) => {
      window.setTimeout(() => {
        namePlopping.value[index] =
          true

        window.setTimeout(() => {
          namePlopping.value[index] =
            false
        }, 340)
      }, index * 70)
    })

  nameTimers = name.value
    .split('')
    .map((_, index) =>
      window.setInterval(
        () => {
          if (
            !name.value[index]
          ) {
            return
          }

          nameFontIndices.value[index] =
            (
              nameFontIndices.value[index] +
              1
            ) % fonts.length

          namePlopping.value[index] =
            true

          window.setTimeout(() => {
            namePlopping.value[index] =
              false
          }, 340)
        },
        2600 + index * 100
      )
    )
}

function activateNameMode() {
  activeMode.value = 'name'
}

function activateNextMode() {
  if (!name.value.length) {
    return
  }

  activeMode.value = 'next'
}

function saveName() {
  store.commit(
    'setVisitorName',
    name.value
  )
}

function addNameCharacter(character) {
  if (
    !character ||
    name.value.length >=
      maxNameLength
  ) {
    return
  }

  name.value += character

  saveName()
}

function removeNameCharacter() {
  if (!name.value.length) {
    return
  }

  name.value =
    name.value.slice(0, -1)

  saveName()
}

function flashWrongNext(index) {
  wrongNextSlot.value = index

  window.setTimeout(() => {
    wrongNextSlot.value = -1
  }, 360)
}

function addNextCharacter(character) {
  const target = 'next'

  if (
    !character ||
    nextValue.value.length >=
      target.length
  ) {
    return
  }

  const index =
    nextValue.value.length

  if (
    character.toLowerCase() !==
    target[index]
  ) {
    flashWrongNext(index)
    return
  }

  nextValue.value +=
    character.toUpperCase()

  if (
    nextValue.value.toLowerCase() ===
    target
  ) {
    window.setTimeout(
      goNext,
      280
    )
  }
}

function pressKey(value) {
  if (!value) {
    return
  }

  if (
    activeMode.value === 'name'
  ) {
    addNameCharacter(value)
    return
  }

  addNextCharacter(value)
}

function backspace() {
  if (
    activeMode.value === 'name'
  ) {
    removeNameCharacter()
    return
  }

  if (!nextValue.value.length) {
    return
  }

  nextValue.value =
    nextValue.value.slice(0, -1)

  wrongNextSlot.value = -1
}

function startDrag(event, value) {
  event.dataTransfer.setData(
    'text/plain',
    value
  )

  event.dataTransfer.effectAllowed =
    'copy'
}

function dropNameKey(event) {
  const value =
    event.dataTransfer.getData(
      'text/plain'
    )

  if (!value) {
    return
  }

  activateNameMode()

  addNameCharacter(value)
}

function dropNextKey(event, index) {
  if (
    index !==
    nextValue.value.length
  ) {
    flashWrongNext(index)
    return
  }

  const value =
    event.dataTransfer.getData(
      'text/plain'
    )

  if (!value) {
    return
  }

  activateNextMode()

  addNextCharacter(value)
}

function handlePhysicalKeyboard(event) {
  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey
  ) {
    return
  }

  if (
    event.key === 'Shift'
  ) {
    shiftActive.value = true
    return
  }

  if (
    event.key === 'Backspace' ||
    event.key === 'Delete'
  ) {
    event.preventDefault()
    backspace()
    return
  }

  if (
    event.key.length === 1
  ) {
    event.preventDefault()

    if (
      activeMode.value === 'name'
    ) {
      addNameCharacter(
        event.key
      )
    } else {
      addNextCharacter(
        event.key
      )
    }
  }
}

function handlePhysicalKeyUp(event) {
  if (
    event.key === 'Shift'
  ) {
    shiftActive.value = false
  }
}

function goNext() {
  if (
    !name.value.trim() ||
    nextValue.value.toLowerCase() !==
      'next'
  ) {
    return
  }

  if (!navigateWithTransition) {
    return
  }

  saveName()

  navigateWithTransition('/home')
}

watch(
  name,
  () => {
    resetNameAnimation()
  }
)

onMounted(() => {
  startHiAnimation()
  resetNameAnimation()

  window.addEventListener(
    'keydown',
    handlePhysicalKeyboard
  )

  window.addEventListener(
    'keyup',
    handlePhysicalKeyUp
  )
})

onBeforeUnmount(() => {
  hiTimers.forEach(
    window.clearInterval
  )

  nameTimers.forEach(
    window.clearInterval
  )

  window.removeEventListener(
    'keydown',
    handlePhysicalKeyboard
  )

  window.removeEventListener(
    'keyup',
    handlePhysicalKeyUp
  )
})
</script>
