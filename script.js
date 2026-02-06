// SELECT ALL SKILLS
const skills = document.querySelectorAll("#skills .skill");

// FUNCTION TO ANIMATE A SINGLE SKILL
function animateSkill(skill) {
  const progress = skill.querySelector(".progress");
  if (!progress) return;

  const percent = parseInt(progress.getAttribute("data-percent"));

  // Animate bar width
  progress.style.width = percent + "%";

  // Add percentage span if not exists
  let percentSpan = skill.querySelector(".percent");
  if (!percentSpan) {
    percentSpan = document.createElement("span");
    percentSpan.classList.add("percent");
    skill.querySelector("span").appendChild(percentSpan);
  }

  // Animate percentage counting smoothly using requestAnimationFrame
  let start = null;
  const duration = 1500; // 1.5s duration
  function step(timestamp) {
    if (!start) start = timestamp;
    const progressTime = timestamp - start;
    const current = Math.min(Math.round((progressTime / duration) * percent), percent);
    percentSpan.textContent = current + "%";
    if (current < percent) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);

  // Mark skill as animated to prevent repeat
  skill.classList.add("animated");
}

// INTERSECTION OBSERVER TO TRIGGER SKILL ANIMATION
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
      animateSkill(entry.target);
    }
  });
}, {
  threshold: 0.5 // 50% of the skill must be visible
});

// OBSERVE EACH SKILL
skills.forEach(skill => observer.observe(skill));
