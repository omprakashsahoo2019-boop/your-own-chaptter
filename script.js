/* =========================
   YOUR OWN CHAPTER
   JAVASCRIPT
========================= */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1F0umji9KSRdGJrOw3-J573bO_9RQNH9o2PA8dnxmUA2K6Y1-qbsx6g1sxf78QPHg/exec"
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      navLinks.classList.toggle("mobile-open");

      if (navLinks.classList.contains("mobile-open")) {
        menuBtn.textContent = "✕";
      } else {
        menuBtn.textContent = "☰";
      }

    });

  }


  /* =========================
     CUSTOM STORY OPTION
  ========================= */

  const storyType = document.getElementById("storyType");
  const customStoryBox = document.getElementById("customStoryBox");
  const customStory = document.getElementById("customStory");

  if (storyType && customStoryBox) {

    storyType.addEventListener("change", () => {

      if (storyType.value === "📚 Custom Story") {

        customStoryBox.classList.remove("hidden");

        if (customStory) {
          customStory.required = true;
        }

      } else {

        customStoryBox.classList.add("hidden");

        if (customStory) {
          customStory.required = false;
          customStory.value = "";
        }

      }

    });

  }


  /* =========================
     PHOTO UPLOAD
  ========================= */

  const photoInput = document.getElementById("photos");

  if (photoInput) {

    photoInput.addEventListener("change", () => {

      const uploadBox = document.querySelector(".upload-box strong");

      if (!uploadBox) return;

      if (photoInput.files.length === 0) {

        uploadBox.textContent = "Choose photos";

      } else if (photoInput.files.length === 1) {

        uploadBox.textContent =
          photoInput.files[0].name;

      } else {

        uploadBox.textContent =
          `${photoInput.files.length} photos selected`;

      }

    });

  }


  /* =========================
     FORM SUBMISSION
  ========================= */

  const form = document.getElementById("storyForm");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("name")?.value.trim() || "",
      whatsapp: document.getElementById("whatsapp")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",

      storyType: document.getElementById("storyType")?.value || "",
      forWho: document.getElementById("forWho")?.value || "",
      occasion: document.getElementById("occasion")?.value || "",
      feeling: document.getElementById("feeling")?.value || "",
      language: document.getElementById("language")?.value || "",
      length: document.getElementById("length")?.value || "",

      customStory: document.getElementById("customStory")?.value.trim() || "",
      story: document.getElementById("story")?.value.trim() || "",
      special: document.getElementById("special")?.value.trim() || ""
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      alert(
        `Thank you, ${data.name}! ❤️\n\n` +
        `We've received the details of your story.\n\n` +
        `We'll contact you on WhatsApp regarding your storybook.`
      );

      form.reset();

      if (customStoryBox) {
        customStoryBox.classList.add("hidden");
      }

      if (customStory) {
        customStory.required = false;
      }

    } catch (error) {
      alert(
        "Something went wrong while sending your enquiry.\n\n" +
        "Please try again."
      );

      console.error(error);
    }
  });
}

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      const name =
        document.getElementById("name")?.value.trim();

      const whatsapp =
        document.getElementById("whatsapp")?.value.trim();

      const story =
        document.getElementById("story")?.value.trim();

      if (!name || !whatsapp || !story) {

        alert(
          "Please fill in your name, WhatsApp number and story."
        );

        return;
      }


      /*
       * This is currently a demo submission.
       * Later we can connect this form to
       * WhatsApp, Email, Google Sheets or a backend.
       */

      alert(
        `Thank you, ${name}! ❤️\n\n` +
        `We've received the details of your story.\n\n` +
        `We'll contact you on WhatsApp regarding your storybook.`
      );


      form.reset();

      if (customStoryBox) {
        customStoryBox.classList.add("hidden");
      }

      if (customStory) {
        customStory.required = false;
      }

      if (photoInput) {
        const uploadBox =
          document.querySelector(".upload-box strong");

        if (uploadBox) {
          uploadBox.textContent = "Choose photos";
        }
      }

    });




  /* =========================
     CLOSE MOBILE MENU
  ========================= */

 const navAnchors = document.querySelectorAll(".nav-links a");

  navAnchors.forEach((link) => {

    link.addEventListener("click", () => {

      if (navLinks) {
        navLinks.classList.remove("mobile-open");
      }

      if (menuBtn) {
        menuBtn.textContent = "☰";
      }

    });

  });


  /* =========================
     SMOOTH SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================
     SIMPLE SCROLL REVEAL
  ========================= */

  const revealElements = document.querySelectorAll(
    ".story-card, .step, .feature, .memory-card, .chapter-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

});