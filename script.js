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

if (form) {form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton.disabled) return;

    const data = {
      name: document.getElementById("name")?.value.trim() || "",
      whatsapp: document.getElementById("whatsapp")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      story: document.getElementById("story")?.value.trim() || ""
    };

    if (!data.name || !data.whatsapp || !data.email || !data.story) {
      alert("Please fill in all the details.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

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
        `We've received your story details.\n\n` +
        `We'll contact you on WhatsApp regarding your storybook.`
      );

      form.reset();

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Create My Chapter →";
    }
  });
  
}






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