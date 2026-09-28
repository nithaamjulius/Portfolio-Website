<template>
  <section class="contact-page">
    <div class="contact-page__paper">
      <div class="contact-page__content">
        <!-- =========================================
             JOURNAL HEADER
             ========================================= -->

        <header class="contact-page__header">
          <div class="contact-page__entry-label">
            <span>JOURNAL ENTRY</span>

            <strong>06</strong>
          </div>

          <div class="contact-page__date">CONTACT / NOTES / SAY HELLO</div>
        </header>

        <!-- =========================================
             HERO
             ========================================= -->

        <section class="contact-page__hero">
          <div class="contact-page__hero-copy">
            <p class="contact-page__eyebrow">LEAVE A NOTE</p>

            <h1 class="contact-page__title">
              Say
              <span>hello.</span>
            </h1>

            <p class="contact-page__intro">
              Have something you'd like to talk about, ask, build, collaborate
              on, or simply say? Leave me a note and I'll get back to you.
            </p>

            <div class="contact-page__scribble">
              <span> write something → send it → see where it goes </span>
            </div>
          </div>

          <!-- Mail sticker -->

          <div class="contact-page__mail-sticker" aria-hidden="true">
            <span> OPEN </span>

            <strong> MAIL </strong>

            <small> DROP A NOTE </small>
          </div>
        </section>

        <!-- =========================================
             DIVIDER
             ========================================= -->

        <div class="contact-page__divider" aria-hidden="true">
          <span></span>
        </div>

        <!-- =========================================
             CONTACT AREA
             ========================================= -->

        <section class="contact-page__main">
          <!-- =======================================
               FORM
               ======================================= -->

          <div class="contact-page__form-side">
            <div class="contact-page__section-heading">
              <span class="contact-page__small-label">
                01 / WRITE YOUR NOTE
              </span>

              <h2>Leave something in the margins.</h2>

              <p>
                Fill in the little form below and your message will be sent
                directly to me.
              </p>
            </div>

            <!-- Success message -->

            <div
              v-if="formStatus === 'success'"
              class="contact-form__success"
              role="status"
              aria-live="polite"
            >
              <div class="contact-form__success-mark" aria-hidden="true">✓</div>

              <div>
                <span> NOTE DELIVERED </span>

                <h3>Thanks for reaching out.</h3>

                <p>
                  Your message has been sent successfully. I'll get back to you
                  when I can.
                </p>

                <button type="button" @click="resetForm">
                  SEND ANOTHER NOTE
                </button>
              </div>
            </div>

            <!-- Form -->

            <form
              v-else
              class="contact-form"
              action="https://formspree.io/f/mkjgpebv"
              method="POST"
              @submit.prevent="submitForm"
            >
              <!-- Form subject -->

              <input
                type="hidden"
                name="subject"
                value="Portfolio note from {{ name }} — {{ topic }}"
              />

              <!-- Honeypot -->

              <div class="contact-form__honeypot" aria-hidden="true">
                <label for="website"> Website </label>

                <input
                  id="website"
                  v-model="form.website"
                  type="text"
                  name="_gotcha"
                  tabindex="-1"
                  autocomplete="off"
                />
              </div>

              <!-- Name -->

              <div class="contact-form__field">
                <label for="contact-name"> YOUR NAME </label>

                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="What should I call you?"
                  autocomplete="name"
                  required
                  :disabled="isSubmitting"
                />
              </div>

              <!-- Email -->

              <div class="contact-form__field">
                <label for="contact-email"> YOUR EMAIL </label>

                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                  required
                  :disabled="isSubmitting"
                />

                <small> So I know where to reply. </small>
              </div>

              <!-- Topic -->

              <div class="contact-form__field">
                <label for="contact-topic"> WHAT'S THIS ABOUT? </label>

                <select
                  id="contact-topic"
                  v-model="form.topic"
                  name="topic"
                  required
                  :disabled="isSubmitting"
                >
                  <option disabled value="">Choose a topic</option>

                  <option value="Project">A project</option>

                  <option value="Collaboration">Collaboration</option>

                  <option value="Internship / Opportunity">
                    Internship / opportunity
                  </option>

                  <option value="Portfolio">
                    Something about this portfolio
                  </option>

                  <option value="Just saying hello">Just saying hello</option>

                  <option value="Other">Something else</option>
                </select>
              </div>

              <!-- Message -->

              <div class="contact-form__field">
                <label for="contact-message"> YOUR NOTE </label>

                <textarea
                  id="contact-message"
                  v-model="form.message"
                  name="message"
                  rows="9"
                  maxlength="2000"
                  placeholder="Write whatever you'd like me to know..."
                  required
                  :disabled="isSubmitting"
                ></textarea>

                <div class="contact-form__field-footer">
                  <small> {{ form.message.length }}/2000 </small>

                  <small> No need to make it formal. </small>
                </div>
              </div>

              <!-- Error -->

              <div
                v-if="formStatus === 'error'"
                class="contact-form__error"
                role="alert"
                aria-live="assertive"
              >
                <strong> SOMETHING WENT WRONG </strong>

                <p>
                  {{ formError }}
                </p>
              </div>

              <!-- Submit -->

              <div class="contact-form__submit-area">
                <button
                  type="submit"
                  class="contact-form__submit"
                  :disabled="isSubmitting"
                >
                  <span>
                    {{ isSubmitting ? "SENDING NOTE..." : "SEND NOTE" }}
                  </span>

                  <strong>
                    {{ isSubmitting ? "…" : "↗" }}
                  </strong>
                </button>

                <span> SENT SECURELY THROUGH FORMSPREE </span>
              </div>
            </form>
          </div>

          <!-- =======================================
               CONTACT DETAILS
               ======================================= -->

          <aside class="contact-page__details">
            <div class="contact-page__details-note">
              <span class="contact-page__small-label">
                02 / OTHER WAYS TO REACH ME
              </span>

              <h2>Prefer a shorter note?</h2>

              <p>You can also reach me directly through the details below.</p>
            </div>

            <!-- Email -->

            <a
              href="mailto:nithaamjulius06@gmail.com"
              class="contact-card contact-card--email"
            >
              <div class="contact-card__icon">@</div>

              <div>
                <span> EMAIL </span>

                <strong> nithaamjulius06@gmail.com </strong>
              </div>

              <span class="contact-card__arrow"> ↗ </span>
            </a>

            <!-- GitHub -->

            <a
              href="https://github.com/nithaamjulius"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--github"
            >
              <div class="contact-card__icon">&lt;/&gt;</div>

              <div>
                <span> GITHUB </span>

                <strong> nithaamjulius </strong>
              </div>

              <span class="contact-card__arrow"> ↗ </span>
            </a>

            <!-- LinkedIn -->

            <a
              href="https://www.linkedin.com/in/nithaam-julius-20b368403/"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-card contact-card--linkedin"
            >
              <div class="contact-card__icon">in</div>

              <div>
                <span> LINKEDIN </span>

                <strong> Nithaam Julius </strong>
              </div>

              <span class="contact-card__arrow"> ↗ </span>
            </a>

            <!-- Availability -->

            <div class="contact-card contact-card--availability">
              <div class="contact-card__icon">+</div>

              <div>
                <span> CURRENTLY </span>

                <strong> Open to opportunities </strong>

                <p>
                  Especially opportunities that let me keep learning, building
                  and growing as a developer.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <!-- =========================================
             THINGS TO TALK ABOUT
             ========================================= -->

        <div class="contact-page__divider" aria-hidden="true">
          <span></span>
        </div>

        <section class="contact-page__topics">
          <div class="contact-page__topics-copy">
            <span class="contact-page__small-label">
              03 / THINGS WE COULD TALK ABOUT
            </span>

            <h2>There are no required talking points.</h2>

            <p>
              A project idea, a collaboration, an opportunity, something you
              liked, something you think I should improve, or simply a hello.
            </p>
          </div>

          <div class="contact-page__topic-cloud">
            <span> PROJECTS </span>

            <span> COLLABORATION </span>

            <span> INTERNSHIPS </span>

            <span> WEB DEVELOPMENT </span>

            <span> DESIGN </span>

            <span> IDEAS </span>

            <span> QUESTIONS </span>

            <span> JUST HELLO </span>
          </div>
        </section>

        <!-- =========================================
             LITTLE NOTE
             ========================================= -->

        <section class="contact-page__little-note">
          <div class="contact-page__little-note-copy">
            <span class="contact-page__small-label"> JOURNAL NOTE </span>

            <h2>Thanks for stopping by.</h2>

            <p>
              Whether you came here because of a project, an opportunity,
              curiosity, or absolutely no reason at all — I'm glad you did.
            </p>
          </div>

          <div class="contact-page__note-sticker" aria-hidden="true">
            <span> TALK </span>

            <strong> SOON? </strong>
          </div>
        </section>

        <!-- =========================================
             NAVIGATION
             ========================================= -->

        <section class="contact-page__navigation">
          <button
            type="button"
            class="contact-page__nav-button contact-page__nav-button--back"
            @click="goToResume"
          >
            <span>←</span>
            BACK TO RESUME
          </button>

          <button
            type="button"
            class="contact-page__nav-button"
            @click="goToHome"
          >
            START AGAIN
            <span>↗</span>
          </button>
        </section>

        <!-- =========================================
             FOOTER
             ========================================= -->

        <footer class="contact-page__footer">
          <span> ENTRY 06 / END </span>

          <span> THE END? NOT REALLY. </span>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, reactive, ref } from "vue";

const navigateWithTransition = inject("navigateWithTransition");

const FORM_ENDPOINT = "https://formspree.io/f/mkjgpebv";

const isSubmitting = ref(false);

const formStatus = ref("idle");

const formError = ref("");

const form = reactive({
  name: "",
  email: "",
  topic: "",
  message: "",
  website: "",
});

async function submitForm() {
  formStatus.value = "idle";

  formError.value = "";

  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.topic ||
    !form.message.trim()
  ) {
    formStatus.value = "error";

    formError.value =
      "Please complete all required fields before sending your note.";

    return;
  }

  if (form.message.trim().length < 5) {
    formStatus.value = "error";

    formError.value =
      "Your note is a little too short. Add a bit more before sending it.";

    return;
  }

  /*
   * If the hidden honeypot field is filled,
   * silently stop the submission.
   */
  if (form.website.trim()) {
    formStatus.value = "success";

    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: form.name.trim(),

        email: form.email.trim(),

        topic: form.topic,

        message: form.message.trim(),

        subject: `Portfolio note from ${form.name.trim()} — ${form.topic}`,
      }),
    });

    let result = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      const apiMessage = result?.errors
        ?.map((error) => error.message)
        .join(" ");

      throw new Error(apiMessage || "Formspree could not process the message.");
    }

    formStatus.value = "success";

    resetFields();
  } catch (error) {
    console.error("Contact form submission failed:", error);

    formStatus.value = "error";

    formError.value =
      error?.message ||
      "The note could not be sent. Please try again or contact me directly by email.";
  } finally {
    isSubmitting.value = false;
  }
}

function resetFields() {
  form.name = "";

  form.email = "";

  form.topic = "";

  form.message = "";

  form.website = "";
}

function resetForm() {
  formStatus.value = "idle";

  formError.value = "";

  resetFields();
}

function navigateTo(path) {
  if (typeof navigateWithTransition === "function") {
    navigateWithTransition(path);

    return;
  }

  window.location.href = path;
}

function goToResume() {
  navigateTo("/resume");
}

function goToHome() {
  navigateTo("/home");
}
</script>

<style scoped>
/* =========================================
   CONTACT PAGE
   ========================================= */

.contact-page {
  position: relative;

  min-height: calc(100svh - 6.2rem);

  overflow: hidden;

  background: var(--paper);

  color: var(--welcome-brown);
}

.contact-page__paper {
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

.contact-page__paper::before {
  content: "";

  position: absolute;

  inset: 0;

  z-index: -1;

  opacity: 0.28;

  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 47px,
    rgba(35, 36, 36, 0.16) 48px,
    transparent 49px
  );
}

.contact-page__paper::after {
  content: "";

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

.contact-page__content {
  width: min(1180px, 92vw);

  margin: 0 auto;

  padding: clamp(2rem, 4vw, 4.5rem) 0 4rem;
}

/* =========================================
   HEADER
   ========================================= */

.contact-page__header {
  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 1.5rem;

  padding-bottom: 1rem;

  border-bottom: 1px solid rgba(35, 36, 36, 0.2);
}

.contact-page__entry-label {
  display: flex;

  align-items: center;

  gap: 0.8rem;

  font-family: var(--font-google-code);

  font-size: 0.75rem;

  letter-spacing: 0.14em;
}

.contact-page__entry-label strong {
  display: inline-grid;

  width: 2rem;

  height: 2rem;

  place-items: center;

  border: 1px solid rgba(35, 36, 36, 0.24);

  border-radius: 50%;

  font-size: 0.72rem;
}

.contact-page__date {
  max-width: 22rem;

  font-family: var(--font-google-code);

  font-size: 0.66rem;

  letter-spacing: 0.1em;

  text-align: right;

  opacity: 0.45;
}

/* =========================================
   HERO
   ========================================= */

.contact-page__hero {
  position: relative;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 3rem;

  min-height: 29rem;

  padding: clamp(4rem, 7vw, 7rem) 0 clamp(3rem, 6vw, 5rem);
}

.contact-page__hero-copy {
  max-width: 50rem;
}

.contact-page__eyebrow {
  margin: 0 0 1rem;

  font-family: var(--font-google-code);

  font-size: 0.72rem;

  font-weight: 600;

  letter-spacing: 0.2em;

  opacity: 0.42;
}

.contact-page__title {
  margin: 0;

  max-width: 7ch;

  font-family: var(--font-coda);

  font-size: clamp(4rem, 8vw, 7.8rem);

  line-height: 0.86;

  letter-spacing: -0.06em;
}

.contact-page__title span {
  display: block;

  color: #8e66a9;

  transform: translateX(0.06em);
}

.contact-page__intro {
  max-width: 42rem;

  margin: 2rem 0 0;

  font-family: var(--font-crafty);

  font-size: clamp(1.2rem, 1.9vw, 1.6rem);

  line-height: 1.5;
}

.contact-page__scribble {
  width: fit-content;

  margin-top: 1.5rem;

  font-family: var(--font-bonbon);

  font-size: clamp(1.25rem, 2vw, 1.6rem);

  transform: rotate(-3deg);
}

.contact-page__mail-sticker {
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
    0 14px 24px rgba(35, 36, 36, 0.12),
    0 2px 4px rgba(35, 36, 36, 0.08);

  font-family: var(--font-google-code);

  transform: rotate(8deg);
}

.contact-page__mail-sticker span {
  font-size: 0.62rem;

  letter-spacing: 0.16em;
}

.contact-page__mail-sticker strong {
  color: #c7c68e;

  font-size: 1.45rem;

  letter-spacing: 0.06em;
}

.contact-page__mail-sticker small {
  margin-top: 0.3rem;

  font-size: 0.53rem;

  letter-spacing: 0.1em;

  opacity: 0.65;
}

/* =========================================
   DIVIDER
   ========================================= */

.contact-page__divider {
  display: grid;

  grid-template-columns:
    1fr
    1fr;

  gap: 1rem;
}

.contact-page__divider span {
  height: 1px;

  background: rgba(35, 36, 36, 0.28);
}

/* =========================================
   MAIN CONTACT LAYOUT
   ========================================= */

.contact-page__main {
  display: grid;

  grid-template-columns:
    minmax(0, 1.3fr)
    minmax(18rem, 0.7fr);

  gap: clamp(2.5rem, 7vw, 7rem);

  padding: clamp(4rem, 7vw, 6rem) 0;
}

/* =========================================
   FORM SIDE
   ========================================= */

.contact-page__form-side {
  min-width: 0;
}

.contact-page__section-heading {
  max-width: 45rem;

  margin-bottom: 2rem;
}

.contact-page__small-label {
  font-family: var(--font-google-code);

  font-size: 0.65rem;

  letter-spacing: 0.16em;

  opacity: 0.45;
}

.contact-page__section-heading h2 {
  margin: 0.65rem 0 0.8rem;

  font-family: var(--font-coda);

  font-size: clamp(2.3rem, 5vw, 4rem);

  line-height: 0.98;

  letter-spacing: -0.04em;
}

.contact-page__section-heading p {
  max-width: 40rem;

  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1.1rem;

  line-height: 1.55;
}

/* =========================================
   FORM
   ========================================= */

.contact-form {
  display: grid;

  gap: 1.3rem;

  padding: clamp(1.4rem, 4vw, 2.5rem);

  border: 1px solid rgba(35, 36, 36, 0.16);

  background: rgba(255, 255, 255, 0.4);

  box-shadow: 0 18px 32px rgba(35, 36, 36, 0.07);

  transform: rotate(-0.4deg);
}

.contact-form__field {
  display: grid;

  gap: 0.45rem;
}

.contact-form__field label {
  font-family: var(--font-google-code);

  font-size: 0.6rem;

  font-weight: 700;

  letter-spacing: 0.12em;

  opacity: 0.5;
}

.contact-form__field input,
.contact-form__field select,
.contact-form__field textarea {
  width: 100%;

  box-sizing: border-box;

  padding: 0.8rem 0.85rem;

  border: 1px solid rgba(35, 36, 36, 0.18);

  border-radius: 0;

  outline: none;

  background: rgba(255, 255, 255, 0.72);

  color: var(--welcome-brown);

  font-family: var(--font-crafty);

  font-size: 1.05rem;

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.contact-form__field input:focus,
.contact-form__field select:focus,
.contact-form__field textarea:focus {
  border-color: #8e66a9;

  box-shadow: 0 0 0 3px rgba(142, 102, 169, 0.1);
}

.contact-form__field input:disabled,
.contact-form__field select:disabled,
.contact-form__field textarea:disabled {
  opacity: 0.65;

  cursor: not-allowed;
}

.contact-form__field textarea {
  resize: vertical;

  min-height: 12rem;

  line-height: 1.5;
}

.contact-form__field small {
  font-family: var(--font-google-code);

  font-size: 0.56rem;

  opacity: 0.43;
}

.contact-form__field-footer {
  display: flex;

  justify-content: space-between;

  gap: 1rem;
}

.contact-form__honeypot {
  position: absolute;

  width: 1px;

  height: 1px;

  overflow: hidden;

  opacity: 0;

  pointer-events: none;
}

/* =========================================
   SUBMIT
   ========================================= */

.contact-form__submit-area {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding-top: 0.5rem;
}

.contact-form__submit {
  display: inline-flex;

  align-items: center;

  gap: 0.9rem;

  padding: 0.85rem 1rem;

  border: 1px solid rgba(35, 36, 36, 0.2);

  background: var(--welcome-brown);

  color: #dedede;

  cursor: pointer;

  font-family: var(--font-google-code);

  font-size: 0.64rem;

  font-weight: 700;

  letter-spacing: 0.1em;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.contact-form__submit:hover:not(:disabled) {
  transform: translateY(-2px) rotate(-0.5deg);

  box-shadow: 0 8px 15px rgba(35, 36, 36, 0.12);
}

.contact-form__submit:disabled {
  cursor: not-allowed;

  opacity: 0.6;
}

.contact-form__submit strong {
  font-size: 1rem;
}

.contact-form__submit-area > span {
  font-family: var(--font-google-code);

  font-size: 0.51rem;

  letter-spacing: 0.06em;

  text-align: right;

  opacity: 0.4;
}

/* =========================================
   SUCCESS / ERROR
   ========================================= */

.contact-form__success {
  display: grid;

  grid-template-columns:
    auto
    minmax(0, 1fr);

  gap: 1.3rem;

  align-items: start;

  padding: 2rem;

  border: 1px solid rgba(96, 115, 58, 0.22);

  background: rgba(199, 198, 142, 0.22);

  box-shadow: 0 18px 32px rgba(35, 36, 36, 0.06);

  transform: rotate(-0.4deg);
}

.contact-form__success-mark {
  display: grid;

  width: 3rem;

  height: 3rem;

  place-items: center;

  border-radius: 50%;

  background: #8e66a9;

  color: #fff;

  font-family: var(--font-google-code);

  font-size: 1.2rem;

  font-weight: 700;
}

.contact-form__success span,
.contact-form__error strong {
  font-family: var(--font-google-code);

  font-size: 0.58rem;

  font-weight: 700;

  letter-spacing: 0.1em;

  opacity: 0.5;
}

.contact-form__success h3 {
  margin: 0.45rem 0 0.55rem;

  font-family: var(--font-coda);

  font-size: 2rem;

  line-height: 1;
}

.contact-form__success p {
  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1rem;

  line-height: 1.5;
}

.contact-form__success button {
  margin-top: 1rem;

  padding: 0.65rem 0.8rem;

  border: 1px solid rgba(35, 36, 36, 0.18);

  background: rgba(255, 255, 255, 0.6);

  color: var(--welcome-brown);

  cursor: pointer;

  font-family: var(--font-google-code);

  font-size: 0.58rem;

  font-weight: 700;

  letter-spacing: 0.08em;
}

.contact-form__error {
  padding: 1rem 1.1rem;

  border: 1px solid rgba(154, 76, 69, 0.25);

  background: rgba(154, 76, 69, 0.06);
}

.contact-form__error strong {
  color: #9a4c45;
}

.contact-form__error p {
  margin: 0.4rem 0 0;

  color: #7d3f3a;

  font-family: var(--font-crafty);

  font-size: 0.95rem;

  line-height: 1.45;
}

/* =========================================
   DETAILS
   ========================================= */

.contact-page__details {
  display: grid;

  align-content: start;

  gap: 1rem;

  padding-top: 2rem;
}

.contact-page__details-note {
  margin-bottom: 0.8rem;
}

.contact-page__details-note h2 {
  margin: 0.6rem 0 0.7rem;

  font-family: var(--font-coda);

  font-size: clamp(2rem, 4vw, 3.2rem);

  line-height: 1;
}

.contact-page__details-note p {
  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1.05rem;

  line-height: 1.5;
}

/* =========================================
   CONTACT CARDS
   ========================================= */

.contact-card {
  display: grid;

  grid-template-columns:
    auto
    minmax(0, 1fr)
    auto;

  align-items: center;

  gap: 0.9rem;

  padding: 1rem;

  border: 1px solid rgba(35, 36, 36, 0.14);

  color: var(--welcome-brown);

  text-decoration: none;

  background: rgba(255, 255, 255, 0.36);

  box-shadow: 0 8px 16px rgba(35, 36, 36, 0.05);

  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.contact-card:hover {
  transform: translateY(-2px) rotate(0.4deg);

  box-shadow: 0 12px 20px rgba(35, 36, 36, 0.08);
}

.contact-card__icon {
  display: grid;

  width: 2.8rem;

  height: 2.8rem;

  place-items: center;

  border: 2px solid #fff;

  border-radius: 50%;

  background: #8e66a9;

  color: #fff;

  font-family: var(--font-google-code);

  font-size: 0.68rem;

  font-weight: 700;
}

.contact-card--github .contact-card__icon {
  background: var(--welcome-brown);
}

.contact-card--availability .contact-card__icon {
  background: #c7c68e;

  color: var(--welcome-brown);
}

.contact-card div:nth-child(2) {
  min-width: 0;
}

.contact-card span:not(.contact-card__arrow) {
  display: block;

  font-family: var(--font-google-code);

  font-size: 0.55rem;

  font-weight: 700;

  letter-spacing: 0.1em;

  opacity: 0.45;
}

.contact-card strong {
  display: block;

  margin-top: 0.2rem;

  overflow-wrap: anywhere;

  font-family: var(--font-coda);

  font-size: 1rem;

  line-height: 1.15;
}

.contact-card__arrow {
  font-family: var(--font-google-code);

  font-size: 1rem;
}

.contact-card--availability {
  grid-template-columns:
    auto
    minmax(0, 1fr);

  cursor: default;
}

.contact-card--availability:hover {
  transform: none;

  box-shadow: 0 8px 16px rgba(35, 36, 36, 0.05);
}

.contact-card--availability p {
  margin: 0.55rem 0 0;

  font-family: var(--font-crafty);

  font-size: 0.92rem;

  line-height: 1.45;
}

/* =========================================
   TOPICS
   ========================================= */

.contact-page__topics {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(20rem, 0.9fr);

  align-items: center;

  gap: 3rem;

  padding: clamp(4rem, 7vw, 6rem) 0;
}

.contact-page__topics-copy {
  max-width: 42rem;
}

.contact-page__topics-copy h2 {
  margin: 0.65rem 0 0.9rem;

  font-family: var(--font-coda);

  font-size: clamp(2.3rem, 5vw, 4rem);

  line-height: 0.98;

  letter-spacing: -0.04em;
}

.contact-page__topics-copy p {
  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1.1rem;

  line-height: 1.55;
}

.contact-page__topic-cloud {
  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  gap: 0.65rem;

  padding: 1.5rem;

  transform: rotate(1deg);
}

.contact-page__topic-cloud span {
  padding: 0.55rem 0.7rem;

  border: 1px dashed rgba(35, 36, 36, 0.22);

  background: rgba(255, 255, 255, 0.42);

  font-family: var(--font-google-code);

  font-size: 0.58rem;

  letter-spacing: 0.07em;
}

.contact-page__topic-cloud span:nth-child(2) {
  background: rgba(142, 102, 169, 0.1);

  transform: rotate(-2deg);
}

.contact-page__topic-cloud span:nth-child(4) {
  background: rgba(199, 198, 142, 0.27);

  transform: rotate(2deg);
}

.contact-page__topic-cloud span:nth-child(6) {
  background: rgba(142, 102, 169, 0.1);

  transform: rotate(1deg);
}

/* =========================================
   LITTLE NOTE
   ========================================= */

.contact-page__little-note {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 2.5rem;

  padding: clamp(3rem, 6vw, 5rem) 0;
}

.contact-page__little-note-copy {
  max-width: 48rem;
}

.contact-page__little-note h2 {
  margin: 0.65rem 0 0.9rem;

  font-family: var(--font-coda);

  font-size: clamp(2.2rem, 4vw, 3.6rem);

  line-height: 1;
}

.contact-page__little-note p {
  margin: 0;

  font-family: var(--font-crafty);

  font-size: 1.1rem;

  line-height: 1.55;
}

.contact-page__note-sticker {
  display: grid;

  min-width: 9rem;

  min-height: 9rem;

  place-items: center;

  align-content: center;

  padding: 1rem;

  border: 3px solid #fff;

  background: #c7c68e;

  color: var(--welcome-brown);

  box-shadow: 0 10px 18px rgba(35, 36, 36, 0.12);

  font-family: var(--font-coda);

  font-size: 0.8rem;

  text-align: center;

  transform: rotate(-7deg);
}

.contact-page__note-sticker strong {
  color: #8e66a9;

  font-size: 1.2rem;
}

/* =========================================
   NAVIGATION
   ========================================= */

.contact-page__navigation {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding: 2rem 0 1rem;
}

.contact-page__nav-button {
  display: inline-flex;

  align-items: center;

  gap: 0.85rem;

  padding: 0.8rem 1rem;

  border: 1px solid rgba(35, 36, 36, 0.18);

  background: rgba(255, 255, 255, 0.2);

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

.contact-page__nav-button:hover {
  transform: translateY(-2px);

  box-shadow: 0 7px 14px rgba(35, 36, 36, 0.08);
}

.contact-page__nav-button--back {
  background: var(--welcome-brown);

  color: #dedede;
}

/* =========================================
   FOOTER
   ========================================= */

.contact-page__footer {
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
  .contact-page__hero {
    align-items: flex-start;

    flex-direction: column;

    min-height: auto;
  }

  .contact-page__mail-sticker {
    align-self: flex-end;
  }

  .contact-page__main {
    grid-template-columns: 1fr;
  }

  .contact-page__details {
    padding-top: 0;
  }

  .contact-page__topics {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .contact-page__content {
    width: min(94vw, 1180px);
  }

  .contact-page__header {
    align-items: flex-start;

    flex-direction: column;
  }

  .contact-page__date {
    text-align: left;
  }

  .contact-page__title {
    font-size: clamp(3.6rem, 16vw, 6rem);
  }

  .contact-page__form-side {
    width: 100%;
  }

  .contact-form {
    transform: none;
  }

  .contact-form__submit-area {
    align-items: stretch;

    flex-direction: column;
  }

  .contact-form__submit {
    justify-content: center;
  }

  .contact-form__submit-area > span {
    text-align: left;
  }

  .contact-form__field-footer {
    align-items: flex-start;

    flex-direction: column;
  }

  .contact-form__success {
    grid-template-columns: 1fr;
  }

  .contact-page__little-note {
    align-items: flex-start;

    flex-direction: column;
  }

  .contact-page__note-sticker {
    align-self: flex-end;
  }

  .contact-page__navigation {
    align-items: stretch;

    flex-direction: column;
  }

  .contact-page__nav-button {
    justify-content: center;
  }

  .contact-page__footer {
    flex-direction: column;
  }
}

/* =========================================
   PRINT
   ========================================= */

@media print {
  .contact-page__paper::before,
  .contact-page__paper::after {
    display: none;
  }

  .contact-page__header,
  .contact-page__hero,
  .contact-page__navigation,
  .contact-page__footer {
    display: none;
  }
}
</style>
