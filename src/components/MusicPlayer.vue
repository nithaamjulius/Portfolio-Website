<template>
  <div
    ref="playerRoot"
    class="music-player"
    :class="{
      'is-open': isOpen
    }"
  >
    <!-- =========================================
         MUSIC STICKER
         ========================================= -->

    <button
      class="music-player__sticker"
      type="button"
      :aria-label="
        isPlaying
          ? 'Turn music off'
          : 'Turn music on'
      "
      :aria-pressed="isPlaying"
      @click="toggleStickerMusic"
    >
      <span
        class="music-player__sticker-frame"
        aria-hidden="true"
      >
        <img
          :src="
            isPlaying
              ? musicOnSticker
              : musicOffSticker
          "
          :alt="
            isPlaying
              ? 'Music on'
              : 'Music off'
          "
          class="music-player__sticker-image"
        />
      </span>
    </button>

    <!-- =========================================
         PLAYER POPUP
         ========================================= -->

    <section
      v-if="isOpen"
      class="music-player__panel"
      aria-label="Portfolio music player"
      role="dialog"
      aria-modal="false"
      @click.stop
    >
      <!-- HEADER -->

      <header class="music-player__header">
        <div>
          <span class="music-player__kicker">
            PORTFOLIO RADIO
          </span>

          <h2 class="music-player__heading">
            little soundtrack
          </h2>
        </div>

        <button
          class="music-player__close"
          type="button"
          aria-label="Minimize music player"
          @click="isOpen = false"
        >
          ×
        </button>
      </header>

      <!-- =========================================
           CURRENT TRACK
           ========================================= -->

      <div class="music-player__now-playing">
        <span class="music-player__now-label">
          NOW PLAYING
        </span>

        <h3
          class="music-player__track-title"
          aria-live="polite"
        >
          {{ currentTrack.title }}
        </h3>

        <p class="music-player__artist">
          {{ currentTrack.artist }}
        </p>

        <a
          class="music-player__credit"
          :href="currentTrack.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ currentTrack.credit }}
        </a>
      </div>

      <!-- =========================================
           PROGRESS
           ========================================= -->

      <div class="music-player__progress">
        <span class="music-player__time">
          {{ formatTime(currentTime) }}
        </span>

        <input
          v-model.number="currentTime"
          class="music-player__range music-player__range--progress"
          type="range"
          min="0"
          :max="duration || 0"
          step="0.1"
          :aria-label="`Seek ${currentTrack.title}`"
          @input="seek"
        />

        <span class="music-player__time">
          {{ formatTime(duration) }}
        </span>
      </div>

      <!-- =========================================
           MAIN CONTROLS
           ========================================= -->

      <div class="music-player__controls">
        <button
          class="music-player__icon-button"
          :class="{
            'is-active': isShuffle
          }"
          type="button"
          :aria-label="
            isShuffle
              ? 'Disable shuffle'
              : 'Enable shuffle'
          "
          :aria-pressed="isShuffle"
          @click="toggleShuffle"
        >
          <span aria-hidden="true">
            🔀
          </span>
        </button>

        <button
          class="music-player__icon-button"
          type="button"
          aria-label="Previous track"
          @click="previousTrack"
        >
          <span aria-hidden="true">
            ◀◀
          </span>
        </button>

        <button
          class="music-player__play-button"
          type="button"
          :aria-label="
            isPlaying
              ? 'Pause music'
              : 'Play music'
          "
          @click="togglePlay"
        >
          <span aria-hidden="true">
            {{ isPlaying ? "❚❚" : "▶" }}
          </span>
        </button>

        <button
          class="music-player__icon-button"
          type="button"
          aria-label="Next track"
          @click="nextTrack"
        >
          <span aria-hidden="true">
            ▶▶
          </span>
        </button>

        <button
          class="music-player__icon-button"
          type="button"
          :aria-label="
            repeatMode === 'one'
              ? 'Repeat one'
              : repeatMode === 'all'
                ? 'Repeat all'
                : 'Repeat off'
          "
          :aria-pressed="
            repeatMode !== 'off'
          "
          @click="cycleRepeat"
        >
          <span aria-hidden="true">
            {{ repeatMode === "one" ? "↻1" : "↻" }}
          </span>
        </button>
      </div>

      <!-- =========================================
           SKIP CONTROLS
           ========================================= -->

      <div class="music-player__skip-row">
        <button
          class="music-player__skip"
          type="button"
          aria-label="Rewind 10 seconds"
          @click="skip(-10)"
        >
          −10 sec
        </button>

        <span class="music-player__status">
          {{ isPlaying ? "PLAYING" : "PAUSED" }}
        </span>

        <button
          class="music-player__skip"
          type="button"
          aria-label="Forward 10 seconds"
          @click="skip(10)"
        >
          +10 sec
        </button>
      </div>

      <!-- =========================================
           VOLUME
           ========================================= -->

      <div class="music-player__volume">
        <button
          class="music-player__volume-button"
          type="button"
          :aria-label="
            isMuted
              ? 'Unmute music'
              : 'Mute music'
          "
          @click="toggleMute"
        >
          <span aria-hidden="true">
            {{
              isMuted || volume === 0
                ? "🔇"
                : volume < 0.5
                  ? "🔉"
                  : "🔊"
            }}
          </span>
        </button>

        <input
          v-model.number="volume"
          class="music-player__range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          aria-label="Music volume"
          @input="changeVolume"
        />

        <span class="music-player__volume-value">
          {{ Math.round(volume * 100) }}%
        </span>
      </div>

      <!-- =========================================
           PLAYLIST
           ========================================= -->

      <div class="music-player__playlist">
        <div class="music-player__playlist-header">
          <span>
            PLAYLIST
          </span>

          <span>
            {{ tracks.length }} TRACKS
          </span>
        </div>

        <div class="music-player__track-list">
          <button
            v-for="(
              track,
              index
            ) in tracks"
            :key="track.file"
            class="music-player__track"
            :class="{
              'is-current':
                index === currentTrackIndex,
              'is-playing':
                index === currentTrackIndex &&
                isPlaying
            }"
            type="button"
            @click="selectTrack(index)"
          >
            <span class="music-player__track-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <span class="music-player__track-copy">
              <strong>
                {{ track.title }}
              </strong>

              <small>
                {{ track.artist }}
              </small>
            </span>

            <span
              class="music-player__track-state"
              aria-hidden="true"
            >
              {{
                index === currentTrackIndex &&
                isPlaying
                  ? "♪"
                  : "•"
              }}
            </span>
          </button>
        </div>
      </div>

      <!-- =========================================
           CREDIT FOOTER
           ========================================= -->

      <footer class="music-player__footer">
        <span>
          MUSIC PROVIDED BY
          <strong>PIXABAY</strong>
        </span>

        <a
          href="https://pixabay.com/service/license-summary/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CONTENT LICENSE
        </a>
      </footer>
    </section>

    <!-- =========================================
         AUDIO
         ========================================= -->

    <audio
      ref="audio"
      :src="currentTrack.file"
      preload="metadata"
      @loadedmetadata="handleLoadedMetadata"
      @timeupdate="handleTimeUpdate"
      @ended="handleEnded"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @error="handleAudioError"
    ></audio>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "vue";

import musicOffSticker from "../assets/images/music-off.png";
import musicOnSticker from "../assets/images/music-on.png";

import ambientForestRain from "../assets/music/ambient-forest-rain.mp3";
import jazzCafe from "../assets/music/jazz-cafe-61sec.mp3";
import thatGameArcade from "../assets/music/that-game-arcade.mp3";
import rainUniversfield from "../assets/music/rain-universfield.mp3";
import birdsForest from "../assets/music/birds-forest.mp3";
import cozyForest from "../assets/music/black-box-cozy-forest.mp3";
import loFiNewBeginnings from "../assets/music/lofi-new-beginnings.mp3";
import loFiMusic from "../assets/music/lofi-music.mp3";
import loFi from "../assets/music/lo-fi.mp3";
import backgroundMusic from "../assets/music/background-music.mp3";

const STORAGE_KEY =
  "portfolio-music-player";

const audio = ref(null);

const playerRoot = ref(null);

const isOpen = ref(false);
const isPlaying = ref(false);
const isShuffle = ref(false);

const currentTrackIndex = ref(0);

const currentTime = ref(0);
const duration = ref(0);

const volume = ref(0.62);
const isMuted = ref(false);

const repeatMode = ref("all");


/* =========================================
   TRACKS
   ========================================= */

const tracks = [
  {
    title: "Ambient Forest Rain",
    artist: "NourishedByMusic",
    file: ambientForestRain,
    url:
      "https://pixabay.com/music/ambient-ambient-forest-rain-375365/",
    credit:
      "Music by NourishedByMusic via Pixabay"
  },

  {
    title: "Jazz Cafe Music_61Sec",
    artist: "prettyjohn1",
    file: jazzCafe,
    url:
      "https://pixabay.com/music/bossa-nova-jazz-cafe-music-61sec-505062/",
    credit:
      "Music by prettyjohn1 via Pixabay"
  },

  {
    title: "That Game Arcade",
    artist: "moodmode",
    file: thatGameArcade,
    url:
      "https://pixabay.com/music/upbeat-that-game-arcade-236111/",
    credit:
      "Music by moodmode via Pixabay"
  },

  {
    title: "Rain",
    artist: "Universfield",
    file: rainUniversfield,
    url:
      "https://pixabay.com/music/ambient-rain-351782/",
    credit:
      "Music by Universfield via Pixabay"
  },

  {
    title: "Birds' forest",
    artist: "ShidenBeatsMusic",
    file: birdsForest,
    url:
      "https://pixabay.com/music/meditationspiritual-birds39-forest-20772/",
    credit:
      "Music by ShidenBeatsMusic via Pixabay"
  },

  {
    title: "BLACK BOX - Cozy Forest",
    artist: "BLACKBOX",
    file: cozyForest,
    url:
      "https://pixabay.com/music/meditationspiritual-black-box-cozy-forest-122347/",
    credit:
      "Music: BLACK BOX - Cozy Forest by BLACKBOX via Pixabay"
  },

  {
    title: "lo-fi New Beginnings",
    artist: "Arthurpeterson",
    file: loFiNewBeginnings,
    url:
      "https://pixabay.com/music/modern-classical-lo-fi-new-beginnings-230738/",
    credit:
      "Music by Arthurpeterson via Pixabay"
  },

  {
    title: "LoFi - LoFi Music",
    artist: "prettyjohn1",
    file: loFiMusic,
    url:
      "https://pixabay.com/music/beats-lofi-lofi-music-525021/",
    credit:
      "Music by prettyjohn1 via Pixabay"
  },

  {
    title: "Lo Fi",
    artist: "prettyjohn1",
    file: loFi,
    url:
      "https://pixabay.com/music/beats-lo-fi-580020/",
    credit:
      "Music by prettyjohn1 via Pixabay"
  },

  {
    title: "Background Music",
    artist: "prettyjohn1",
    file: backgroundMusic,
    url:
      "https://pixabay.com/music/bossa-nova-background-music-505061/",
    credit:
      "Music by prettyjohn1 via Pixabay"
  }
];


const currentTrack = computed(
  () => tracks[currentTrackIndex.value]
);


/* =========================================
   TIME
   ========================================= */

function formatTime(seconds) {
  if (
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "0:00";
  }

  const totalSeconds =
    Math.floor(seconds);

  const minutes =
    Math.floor(
      totalSeconds / 60
    );

  const remainingSeconds =
    totalSeconds % 60;

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}


/* =========================================
   PLAYBACK
   ========================================= */

async function playAudio() {
  if (!audio.value) {
    return;
  }

  try {
    await audio.value.play();

    isPlaying.value = true;
  } catch (error) {
    console.warn(
      "Portfolio music could not start:",
      error
    );

    isPlaying.value = false;
  }
}


function pauseAudio() {
  if (!audio.value) {
    return;
  }

  audio.value.pause();

  isPlaying.value = false;
}


async function togglePlay() {
  if (isPlaying.value) {
    pauseAudio();

    return;
  }

  isOpen.value = true;

  await playAudio();
}


/* =========================================
   STICKER CONTROL
   ========================================= */

async function toggleStickerMusic() {
  if (isPlaying.value) {
    pauseAudio();

    return;
  }

  isOpen.value = true;

  await nextTick();

  await playAudio();
}


/* =========================================
   TRACK LOADING
   ========================================= */

async function loadTrack(
  index,
  shouldPlay = false
) {
  const normalizedIndex =
    Math.min(
      Math.max(index, 0),
      tracks.length - 1
    );

  currentTrackIndex.value =
    normalizedIndex;

  currentTime.value = 0;
  duration.value = 0;

  await nextTick();

  if (!audio.value) {
    return;
  }

  audio.value.load();

  if (shouldPlay) {
    await playAudio();
  }
}


/* =========================================
   TRACK SELECTION
   ========================================= */

async function selectTrack(index) {
  isOpen.value = true;

  await loadTrack(
    index,
    true
  );
}


async function previousTrack() {
  if (currentTime.value > 3) {
    skip(
      -currentTime.value
    );

    return;
  }

  const previousIndex =
    currentTrackIndex.value <= 0
      ? tracks.length - 1
      : currentTrackIndex.value - 1;

  await loadTrack(
    previousIndex,
    true
  );
}


async function nextTrack(
  shouldPlay = true
) {
  let nextIndex;

  if (isShuffle.value) {
    nextIndex =
      randomTrackIndex();
  } else {
    nextIndex =
      currentTrackIndex.value + 1;

    if (
      nextIndex >=
      tracks.length
    ) {
      if (
        repeatMode.value ===
        "off"
      ) {
        pauseAudio();

        if (audio.value) {
          audio.value.currentTime =
            0;
        }

        currentTime.value = 0;

        return;
      }

      nextIndex = 0;
    }
  }

  await loadTrack(
    nextIndex,
    shouldPlay
  );
}


function randomTrackIndex() {
  if (tracks.length <= 1) {
    return 0;
  }

  let nextIndex =
    currentTrackIndex.value;

  while (
    nextIndex ===
    currentTrackIndex.value
  ) {
    nextIndex =
      Math.floor(
        Math.random() *
          tracks.length
      );
  }

  return nextIndex;
}


/* =========================================
   PROGRESS
   ========================================= */

function handleLoadedMetadata() {
  if (!audio.value) {
    return;
  }

  duration.value =
    Number.isFinite(
      audio.value.duration
    )
      ? audio.value.duration
      : 0;
}


function handleTimeUpdate() {
  if (!audio.value) {
    return;
  }

  currentTime.value =
    audio.value.currentTime;
}


function seek() {
  if (!audio.value) {
    return;
  }

  audio.value.currentTime =
    Number(
      currentTime.value
    ) || 0;
}


function skip(seconds) {
  if (!audio.value) {
    return;
  }

  const target =
    audio.value.currentTime +
    seconds;

  audio.value.currentTime =
    Math.min(
      Math.max(
        target,
        0
      ),
      duration.value ||
        Infinity
    );
}


/* =========================================
   TRACK END
   ========================================= */

async function handleEnded() {
  if (
    repeatMode.value ===
    "one"
  ) {
    if (audio.value) {
      audio.value.currentTime = 0;
    }

    await playAudio();

    return;
  }

  await nextTrack(true);
}


/* =========================================
   SHUFFLE
   ========================================= */

function toggleShuffle() {
  isShuffle.value =
    !isShuffle.value;
}


/* =========================================
   REPEAT
   ========================================= */

function cycleRepeat() {
  if (
    repeatMode.value ===
    "off"
  ) {
    repeatMode.value = "all";

    return;
  }

  if (
    repeatMode.value ===
    "all"
  ) {
    repeatMode.value = "one";

    return;
  }

  repeatMode.value = "off";
}


/* =========================================
   VOLUME
   ========================================= */

function changeVolume() {
  if (!audio.value) {
    return;
  }

  audio.value.volume =
    Number(
      volume.value
    );

  if (
    Number(volume.value) >
    0
  ) {
    isMuted.value = false;

    audio.value.muted =
      false;
  }
}


function toggleMute() {
  isMuted.value =
    !isMuted.value;

  if (!audio.value) {
    return;
  }

  audio.value.muted =
    isMuted.value;
}


/* =========================================
   ERROR
   ========================================= */

function handleAudioError() {
  isPlaying.value = false;
}


/* =========================================
   OUTSIDE CLICK
   ========================================= */

function handleDocumentPointerdown(
  event
) {
  if (
    !isOpen.value ||
    !playerRoot.value
  ) {
    return;
  }

  if (
    !playerRoot.value.contains(
      event.target
    )
  ) {
    isOpen.value = false;
  }
}


/* =========================================
   PERSISTENCE
   ========================================= */

function restorePreferences() {
  try {
    const saved =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        ) || "null"
      );

    if (!saved) {
      return;
    }

    if (
      Number.isFinite(
        saved.trackIndex
      ) &&
      saved.trackIndex >= 0 &&
      saved.trackIndex <
        tracks.length
    ) {
      currentTrackIndex.value =
        saved.trackIndex;
    }

    if (
      Number.isFinite(
        saved.volume
      )
    ) {
      volume.value =
        Math.min(
          1,
          Math.max(
            0,
            saved.volume
          )
        );
    }

    if (
      typeof saved.isMuted ===
      "boolean"
    ) {
      isMuted.value =
        saved.isMuted;
    }

    if (
      typeof saved.isShuffle ===
      "boolean"
    ) {
      isShuffle.value =
        saved.isShuffle;
    }

    if (
      [
        "off",
        "all",
        "one"
      ].includes(
        saved.repeatMode
      )
    ) {
      repeatMode.value =
        saved.repeatMode;
    }
  } catch {
    // Ignore invalid saved preferences.
  }
}


function savePreferences() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        trackIndex:
          currentTrackIndex.value,

        volume:
          Number(volume.value),

        isMuted:
          isMuted.value,

        isShuffle:
          isShuffle.value,

        repeatMode:
          repeatMode.value
      })
    );
  } catch {
    // Ignore storage failures.
  }
}


watch(
  [
    currentTrackIndex,
    volume,
    isMuted,
    isShuffle,
    repeatMode
  ],
  savePreferences
);


/* =========================================
   LIFECYCLE
   ========================================= */

onMounted(() => {
  restorePreferences();

  if (audio.value) {
    audio.value.volume =
      Number(volume.value);

    audio.value.muted =
      isMuted.value;
  }

  document.addEventListener(
    "pointerdown",
    handleDocumentPointerdown
  );
});


onBeforeUnmount(() => {
  document.removeEventListener(
    "pointerdown",
    handleDocumentPointerdown
  );

  if (audio.value) {
    audio.value.pause();
  }
});
</script>

<style scoped>
/* =========================================
   MUSIC PLAYER
   ========================================= */

.music-player {
  position: fixed;

  right: clamp(
    1rem,
    2.8vw,
    2rem
  );

  bottom: max(
    1rem,
    env(safe-area-inset-bottom)
  );

  z-index: 500;

  display: grid;

  justify-items: end;

  pointer-events: none;
}


/* =========================================
   STICKER
   ========================================= */

.music-player__sticker {
  position: relative;

  display: grid;

  width: clamp(
    6rem,
    9vw,
    8.2rem
  );

  aspect-ratio: 1.42 / 1;

  padding: 0;

  border: 0;

  background: transparent;

  cursor: pointer;

  pointer-events: auto;

  filter:
    drop-shadow(
      0 0.5rem 0.8rem
      rgba(
        35,
        36,
        36,
        0.15
      )
    );

  transition:
    transform 180ms
      cubic-bezier(
        0.2,
        0.85,
        0.25,
        1
      ),
    filter 180ms ease;
}

.music-player__sticker:hover {
  transform:
    rotate(-2deg)
    translateY(-3px);

  filter:
    drop-shadow(
      0 0.7rem 1rem
      rgba(
        35,
        36,
        36,
        0.19
      )
    );
}

.music-player__sticker:focus-visible {
  outline:
    2px solid
    #8e66a9;

  outline-offset: 3px;

  border-radius: 0.7rem;
}

.music-player__sticker-frame {
  position: relative;

  display: grid;

  width: 100%;
  height: 100%;

  place-items: center;

  overflow: hidden;
}

.music-player__sticker-image {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 350%;

  max-width: none;

  height: auto;

  transform:
    translate(
      -50%,
      -50%
    );

  pointer-events: none;

  user-select: none;
}


/* =========================================
   POPUP PANEL
   ========================================= */

.music-player__panel {
  position: absolute;

  right: 0;

  bottom:
    calc(
      100% + 0.45rem
    );

  width: min(
    23rem,
    calc(100vw - 1.5rem)
  );

  max-height:
    min(
      74vh,
      47rem
    );

  overflow:
    hidden auto;

  padding:
    1.2rem;

  border:
    1px solid
    rgba(
      35,
      36,
      36,
      0.16
    );

  border-radius:
    0.15rem;

  background:
    linear-gradient(
      90deg,
      rgba(
        255,
        255,
        255,
        0.1
      ),
      transparent 10%,
      transparent 90%,
      rgba(
        0,
        0,
        0,
        0.025
      )
    ),
    #dedede;

  color:
    var(--welcome-brown);

  box-shadow:
    0 1rem 2.8rem
    rgba(
      35,
      36,
      36,
      0.17
    );

  pointer-events: auto;

  transform:
    rotate(-0.45deg);
}

.music-player__panel::before {
  content: "";

  position: absolute;

  inset: 0;

  pointer-events: none;

  opacity: 0.2;

  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 2.95rem,
      rgba(
        35,
        36,
        36,
        0.1
      ) 3rem,
      transparent 3.05rem
    );
}


/* =========================================
   HEADER
   ========================================= */

.music-player__header {
  position: relative;

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 1rem;

  padding-bottom: 0.9rem;

  border-bottom:
    1px solid
    rgba(
      35,
      36,
      36,
      0.18
    );
}

.music-player__kicker,
.music-player__now-label {
  display: block;

  font-family:
    var(--font-google-code);

  font-size:
    0.56rem;

  font-weight: 700;

  letter-spacing:
    0.16em;

  opacity: 0.46;
}

.music-player__heading {
  position: relative;

  margin:
    0.35rem 0 0;

  font-family:
    var(--font-coda);

  font-size:
    clamp(
      1.5rem,
      5vw,
      2rem
    );

  line-height: 0.95;

  letter-spacing:
    -0.04em;

  color:
    #8e66a9;
}

.music-player__close {
  position: relative;

  display: grid;

  width: 2rem;
  height: 2rem;

  place-items: center;

  border:
    1px solid
    rgba(
      35,
      36,
      36,
      0.18
    );

  background:
    rgba(
      255,
      255,
      255,
      0.4
    );

  color:
    var(--welcome-brown);

  cursor: pointer;

  font-size: 1.3rem;

  line-height: 1;
}

.music-player__close:hover {
  background:
    rgba(
      199,
      198,
      142,
      0.35
    );
}


/* =========================================
   NOW PLAYING
   ========================================= */

.music-player__now-playing {
  position: relative;

  padding:
    1.2rem 0 1rem;
}

.music-player__track-title {
  margin:
    0.3rem 0 0.2rem;

  font-family:
    var(--font-coda);

  font-size:
    clamp(
      1.35rem,
      5vw,
      1.8rem
    );

  line-height: 1;

  letter-spacing:
    -0.035em;

  color:
    var(--welcome-brown);

  overflow-wrap:
    anywhere;
}

.music-player__artist {
  margin: 0;

  font-family:
    var(--font-crafty);

  font-size:
    1.05rem;

  line-height: 1.25;

  color:
    #8e66a9;
}

.music-player__credit {
  display: inline-block;

  margin-top:
    0.55rem;

  color:
    var(--welcome-brown);

  font-family:
    var(--font-google-code);

  font-size:
    0.56rem;

  line-height:
    1.4;

  letter-spacing:
    0.04em;

  text-decoration:
    underline;

  text-decoration-thickness:
    1px;

  text-underline-offset:
    0.16em;

  opacity:
    0.52;
}

.music-player__credit:hover {
  opacity: 1;

  color:
    #8e66a9;
}


/* =========================================
   RANGE INPUTS
   ========================================= */

.music-player__progress {
  position: relative;

  display: grid;

  grid-template-columns:
    auto
    minmax(
      0,
      1fr
    )
    auto;

  align-items: center;

  gap: 0.55rem;
}

.music-player__time {
  min-width: 2.3rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  opacity:
    0.45;
}

.music-player__time:last-child {
  text-align: right;
}

.music-player__range {
  width: 100%;

  min-width: 0;

  height: 1.15rem;

  margin: 0;

  accent-color:
    #8e66a9;

  cursor: pointer;
}

.music-player__range--progress {
  accent-color:
    #8e66a9;
}


/* =========================================
   MAIN CONTROLS
   ========================================= */

.music-player__controls {
  position: relative;

  display: grid;

  grid-template-columns:
    repeat(
      5,
      minmax(
        0,
        1fr
      )
    );

  align-items: center;

  gap: 0.35rem;

  padding:
    0.9rem 0;
}

.music-player__icon-button,
.music-player__play-button,
.music-player__volume-button {
  display: grid;

  place-items: center;

  border: 0;

  background:
    transparent;

  color:
    var(--welcome-brown);

  cursor: pointer;
}

.music-player__icon-button {
  min-width: 2.1rem;
  min-height: 2.1rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.72rem;

  opacity:
    0.65;

  transition:
    transform 140ms ease,
    opacity 140ms ease;
}

.music-player__icon-button:hover,
.music-player__icon-button.is-active {
  opacity: 1;

  color:
    #8e66a9;

  transform:
    translateY(-1px);
}

.music-player__play-button {
  width: 3.2rem;
  height: 3.2rem;

  justify-self: center;

  border:
    2px solid
    var(--welcome-brown);

  border-radius: 50%;

  background:
    #c7c68e;

  color:
    var(--welcome-brown);

  font-size:
    0.95rem;

  box-shadow:
    0 0.35rem 0.8rem
    rgba(
      35,
      36,
      36,
      0.12
    );

  transition:
    transform 150ms ease,
    box-shadow 150ms ease;
}

.music-player__play-button:hover {
  transform:
    translateY(-2px)
    rotate(-2deg);

  box-shadow:
    0 0.55rem 1rem
    rgba(
      35,
      36,
      36,
      0.15
    );
}


/* =========================================
   SKIP
   ========================================= */

.music-player__skip-row {
  position: relative;

  display: grid;

  grid-template-columns:
    1fr
    auto
    1fr;

  align-items: center;

  gap: 0.65rem;

  padding-bottom:
    0.9rem;
}

.music-player__skip {
  padding:
    0.4rem 0.5rem;

  border:
    1px solid
    rgba(
      35,
      36,
      36,
      0.15
    );

  background:
    rgba(
      255,
      255,
      255,
      0.35
    );

  color:
    var(--welcome-brown);

  cursor: pointer;

  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  letter-spacing:
    0.04em;
}

.music-player__skip:hover {
  background:
    rgba(
      142,
      102,
      169,
      0.1
    );
}

.music-player__skip:last-child {
  justify-self: end;
}

.music-player__status {
  font-family:
    var(--font-google-code);

  font-size:
    0.53rem;

  font-weight: 700;

  letter-spacing:
    0.1em;

  color:
    #8e66a9;

  opacity:
    0.7;
}


/* =========================================
   VOLUME
   ========================================= */

.music-player__volume {
  position: relative;

  display: grid;

  grid-template-columns:
    auto
    minmax(
      0,
      1fr
    )
    auto;

  align-items: center;

  gap: 0.45rem;

  padding:
    0.7rem 0;

  border-top:
    1px solid
    rgba(
      35,
      36,
      36,
      0.12
    );

  border-bottom:
    1px solid
    rgba(
      35,
      36,
      36,
      0.12
    );
}

.music-player__volume-button {
  width: 1.8rem;
  height: 1.8rem;

  font-size:
    0.88rem;
}

.music-player__volume-value {
  min-width: 2.3rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.53rem;

  text-align:
    right;

  opacity:
    0.45;
}


/* =========================================
   PLAYLIST
   ========================================= */

.music-player__playlist {
  position: relative;

  margin-top:
    0.95rem;
}

.music-player__playlist-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  margin-bottom:
    0.45rem;

  font-family:
    var(--font-google-code);

  font-size:
    0.53rem;

  font-weight: 700;

  letter-spacing:
    0.11em;

  opacity:
    0.43;
}

.music-player__track-list {
  display: grid;

  gap: 0.25rem;
}

.music-player__track {
  position: relative;

  display: grid;

  grid-template-columns:
    1.8rem
    minmax(
      0,
      1fr
    )
    auto;

  align-items: center;

  width: 100%;

  min-width: 0;

  gap: 0.65rem;

  padding:
    0.55rem 0.5rem;

  border:
    1px solid
    transparent;

  background:
    transparent;

  color:
    var(--welcome-brown);

  text-align: left;

  cursor: pointer;
}

.music-player__track:hover {
  background:
    rgba(
      255,
      255,
      255,
      0.35
    );

  border-color:
    rgba(
      35,
      36,
      36,
      0.1
    );
}

.music-player__track.is-current {
  background:
    rgba(
      199,
      198,
      142,
      0.27
    );

  border-color:
    rgba(
      71,
      56,
      36,
      0.12
    );
}

.music-player__track-number {
  font-family:
    var(--font-google-code);

  font-size:
    0.55rem;

  opacity:
    0.38;
}

.music-player__track-copy {
  min-width: 0;
}

.music-player__track-copy strong {
  display: block;

  overflow: hidden;

  color:
    var(--welcome-brown);

  font-family:
    var(--font-google-code);

  font-size:
    0.62rem;

  font-weight: 600;

  line-height:
    1.25;

  text-overflow:
    ellipsis;

  white-space:
    nowrap;
}

.music-player__track-copy small {
  display: block;

  margin-top:
    0.12rem;

  color:
    #8e66a9;

  font-family:
    var(--font-crafty);

  font-size:
    0.72rem;

  line-height:
    1.1;

  overflow:
    hidden;

  text-overflow:
    ellipsis;

  white-space:
    nowrap;
}

.music-player__track-state {
  min-width:
    1rem;

  color:
    #8e66a9;

  font-family:
    var(--font-google-code);

  font-size:
    0.7rem;

  text-align:
    center;
}


/* =========================================
   FOOTER / LICENCE
   ========================================= */

.music-player__footer {
  position: relative;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 0.8rem;

  margin-top:
    0.9rem;

  padding-top:
    0.8rem;

  border-top:
    1px solid
    rgba(
      35,
      36,
      36,
      0.12
    );

  font-family:
    var(--font-google-code);

  font-size:
    0.48rem;

  letter-spacing:
    0.07em;

  line-height:
    1.4;

  opacity:
    0.48;
}

.music-player__footer strong {
  color:
    #8e66a9;
}

.music-player__footer a {
  color:
    var(--welcome-brown);

  text-decoration:
    underline;

  text-underline-offset:
    0.15em;
}


/* =========================================
   MOBILE
   ========================================= */

@media (max-width: 720px) {
  .music-player {
    right:
      0.7rem;

    bottom:
      max(
        0.7rem,
        env(safe-area-inset-bottom)
      );
  }

  .music-player__sticker {
    width:
      6.6rem;
  }

  .music-player__panel {
    width:
      min(
        calc(100vw - 1rem),
        25rem
      );

    max-height:
      min(
        76vh,
        42rem
      );

    padding:
      1rem;
  }

  .music-player__heading {
    font-size:
      1.55rem;
  }
}


/* =========================================
   SMALL MOBILE
   ========================================= */

@media (max-width: 480px) {
  .music-player {
    right:
      0.45rem;
  }

  .music-player__sticker {
    width:
      5.7rem;
  }

  .music-player__panel {
    width:
      calc(100vw - 0.8rem);

    right:
      -0.1rem;

    max-height:
      72vh;

    padding:
      0.85rem;
  }

  .music-player__track-copy strong {
    font-size:
      0.58rem;
  }

  .music-player__track-copy small {
    font-size:
      0.67rem;
  }
}


/* =========================================
   REDUCED MOTION
   ========================================= */

@media (prefers-reduced-motion: reduce) {
  .music-player__sticker,
  .music-player__play-button,
  .music-player__icon-button {
    transition: none;
  }
}
</style>