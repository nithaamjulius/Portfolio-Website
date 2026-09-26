<template>
  <section
    class="welcome-page"
    aria-labelledby="welcome-title"
  >
    <div class="welcome-page__paper">
      <div class="welcome-page__content">
        <div
          id="welcome-title"
          class="welcome-page__title"
          aria-label="Welcome"
        >
          <span
            v-for="(letter, index) in animatedLetters"
            :key="`welcome-letter-${index}`"
            class="welcome-page__letter"
            :class="{
              'is-plopping': plopping[index]
            }"
            :style="{ fontFamily: letter.font }"
          >
            {{ letter.char }}
          </span>
        </div>

        <div
          class="welcome-page__prompt"
          :class="{ 'is-visible': showPrompt }"
          aria-label="Enter NEXT"
        >
          <span
            v-for="(slot, index) in slots"
            :key="`slot-${index}`"
            class="welcome-page__slot"
            :class="{
              'is-filled': nextValue[index],
              'is-wrong': wrongSlot === index
            }"
            @dragover.prevent
            @drop.prevent="dropKey($event, index)"
          >
            <span
              v-if="nextValue[index]"
              class="welcome-page__typed-letter"
            >
              {{ nextValue[index] }}
            </span>

            <span
              v-else
              class="welcome-page__line"
              aria-hidden="true"
            ></span>
          </span>
        </div>

        <p
          class="welcome-page__hint"
          :class="{ 'is-visible': showPrompt }"
        >
          Type <strong>NEXT</strong> or drag the letters into the spaces.
        </p>

        <div
          class="welcome-keyboard"
          :class="{ 'is-visible': showKeyboard }"
          aria-label="On-screen keyboard"
        >
          <!-- Numbers -->
          <div
            class="welcome-keyboard__row welcome-keyboard__row--numbers"
          >
            <button
              v-for="key in numberKeys"
              :key="key.value"
              class="welcome-key"
              type="button"
              draggable="true"
              @click="pressKey(getDisplayedNumber(key))"
              @dragstart="
                startDrag(
                  $event,
                  getDisplayedNumber(key)
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
          <div class="welcome-keyboard__row">
            <button
              v-for="key in letterRows[0]"
              :key="key"
              class="welcome-key"
              type="button"
              draggable="true"
              @click="pressKey(displayLetter(key))"
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
            class="welcome-keyboard__row welcome-keyboard__row--offset"
          >
            <button
              v-for="key in letterRows[1]"
              :key="key"
              class="welcome-key"
              type="button"
              draggable="true"
              @click="pressKey(displayLetter(key))"
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
            class="welcome-keyboard__row welcome-keyboard__row--offset-large"
          >
            <button
              v-for="key in letterRows[2]"
              :key="key"
              class="welcome-key"
              type="button"
              draggable="true"
              @click="pressKey(displayLetter(key))"
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

          <!-- Bottom row -->
          <div
            class="welcome-keyboard__row welcome-keyboard__row--bottom"
          >
            <button
              class="welcome-key welcome-key--modifier"
              :class="{ 'is-active': shiftActive }"
              type="button"
              @click="toggleShift"
            >
              SHIFT
            </button>

            <button
              v-for="key in punctuationKeys"
              :key="key.value"
              class="welcome-key welcome-key--small"
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
              class="welcome-key welcome-key--space"
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
              class="welcome-key welcome-key--backspace"
              type="button"
              @click="backspace"
              aria-label="Backspace"
            >
              ←
            </button>
          </div>
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
  ref
} from 'vue'

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

const title = 'Welcome'
const target = 'next'

const fontIndices = ref(
  title
    .split('')
    .map((_, index) => index % fonts.length)
)

const plopping = ref(
  title
    .split('')
    .map(() => false)
)

const nextValue = ref('')
const showPrompt = ref(false)
const showKeyboard = ref(false)
const wrongSlot = ref(-1)

const shiftActive = ref(false)

const slots = Array.from({
  length: 4
})

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

const animatedLetters = computed(() =>
  title
    .split('')
    .map((char, index) => ({
      char,
      font:
        fonts[fontIndices.value[index]]
    }))
)

let titleTimers = []
let revealTimers = []

function displayLetter(letter) {
  return shiftActive.value
    ? letter
    : letter.toLowerCase()
}

function getDisplayedNumber(key) {
  return shiftActive.value
    ? key.secondary
    : key.value
}

function toggleShift() {
  shiftActive.value =
    !shiftActive.value
}

function cycleLetter(index) {
  fontIndices.value[index] =
    (fontIndices.value[index] + 1) %
    fonts.length

  plopping.value[index] = true

  window.setTimeout(() => {
    plopping.value[index] = false
  }, 340)
}

function startFontAnimation() {
  titleTimers = title
    .split('')
    .map((_, index) => {
      return window.setInterval(
        () => cycleLetter(index),
        2200 + index * 120
      )
    })
}

function flashWrong(slotIndex) {
  wrongSlot.value = slotIndex

  window.setTimeout(() => {
    wrongSlot.value = -1
  }, 360)
}

function pressKey(value) {
  if (
    !value ||
    nextValue.value.length >=
      target.length
  ) {
    return
  }

  const index =
    nextValue.value.length

  const expectedCharacter =
    target[index]

  if (
    value.toLowerCase() !==
    expectedCharacter
  ) {
    flashWrong(index)
    return
  }

  nextValue.value +=
    value.toUpperCase()

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

function backspace() {
  if (!nextValue.value.length) {
    return
  }

  nextValue.value =
    nextValue.value.slice(0, -1)

  wrongSlot.value = -1
}

function startDrag(event, value) {
  event.dataTransfer.setData(
    'text/plain',
    value
  )

  event.dataTransfer.effectAllowed =
    'copy'
}

function dropKey(event, index) {
  if (
    index !==
    nextValue.value.length
  ) {
    flashWrong(index)
    return
  }

  const value =
    event.dataTransfer.getData(
      'text/plain'
    )

  if (!value) {
    return
  }

  pressKey(value)
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
    event.key.length === 1 &&
    nextValue.value.length <
      target.length
  ) {
    event.preventDefault()
    pressKey(event.key)
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
    nextValue.value.toLowerCase() !==
    target
  ) {
    return
  }

  if (!navigateWithTransition) {
    return
  }

  navigateWithTransition('/intro')
}

onMounted(() => {
  revealTimers.push(
    window.setTimeout(() => {
      showPrompt.value = true
    }, 1050),

    window.setTimeout(() => {
      showKeyboard.value = true
    }, 1550)
  )

  startFontAnimation()

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
  titleTimers.forEach(
    window.clearInterval
  )

  revealTimers.forEach(
    window.clearTimeout
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
