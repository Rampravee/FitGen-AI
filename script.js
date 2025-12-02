// ===============================
// DROPDOWN MENU TOGGLE
// ===============================
const avatarBtn = document.getElementById("avatarBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

avatarBtn.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "flex" ? "none" : "flex";
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!avatarBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

// ===============================
// SECTION SWITCHING
// ===============================
const sectionButtons = dropdownMenu.querySelectorAll("button[data-section]");
const sections = document.querySelectorAll(".section");

sectionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-section");

    sections.forEach((sec) => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });

    dropdownMenu.style.display = "none";
  });
});

// ===============================
// LOGOUT PLACEHOLDER
// ===============================
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("Logout system will be connected later.");
});

// ===============================
// FORM + BMI + WORKOUT + ACCORDION
// ===============================
const form = document.getElementById("fitnessForm");
const summaryContent = document.getElementById("summaryContent");
const workoutContent = document.getElementById("workoutContent");
const userNameDisplay = document.getElementById("userNameDisplay");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const goal = document.getElementById("goal").value;
  const gender = document.getElementById("gender").value;
  const diet = document.getElementById("diet").value;
  const time = document.getElementById("time").value;

  userNameDisplay.textContent = name || "Member";

  // BMI
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  // Calories
  let calories = 2300;
  if (goal === "Fat Loss") calories = 1900;
  if (goal === "Muscle Gain") calories = 2800;

  document.getElementById("bmiCard").textContent = bmi;
  document.getElementById("calCard").textContent = calories;
  document.getElementById("goalCard").textContent = goal || "--";

  // ===============================
  // WORKOUT DATA
  // ===============================
  let workoutPlan = {};

  if (goal === "Muscle Gain") {
    workoutPlan = {
      "Monday – Chest & Triceps": [
        ["Bench Press", "4 × 10"],
        ["Incline Dumbbell Press", "3 × 12"],
        ["Chest Fly", "3 × 12"],
        ["Tricep Dips", "3 × 12"]
      ],
      "Tuesday – Back & Biceps": [
        ["Lat Pulldown", "4 × 10"],
        ["Seated Row", "3 × 12"],
        ["Barbell Curl", "3 × 10"],
        ["Hammer Curl", "3 × 12"]
      ],
      "Wednesday – Legs": [
        ["Squats", "4 × 10"],
        ["Leg Press", "3 × 12"],
        ["Lunges", "3 × 12"],
        ["Calf Raises", "3 × 15"]
      ],
      "Thursday – Shoulders": [
        ["Shoulder Press", "4 × 10"],
        ["Lateral Raises", "3 × 12"],
        ["Front Raises", "3 × 12"]
      ],
      "Friday – Arms & Core": [
        ["Bicep Curl", "4 × 10"],
        ["Tricep Extension", "3 × 12"],
        ["Plank", "3 × 40 sec"],
        ["Hanging Leg Raise", "3 × 12"]
      ]
    };
  } else {
    workoutPlan = {
      "Monday – Full Body": [
        ["Jumping Jacks", "4 × 30 sec"],
        ["Push-ups", "3 × 12"],
        ["Bodyweight Squats", "3 × 15"]
      ],
      "Tuesday – Cardio & Core": [
        ["High Knees", "4 × 30 sec"],
        ["Plank", "3 × 40 sec"],
        ["Mountain Climbers", "3 × 20"]
      ],
      "Wednesday – Lower Body": [
        ["Squats", "4 × 15"],
        ["Lunges", "3 × 12"],
        ["Glute Bridge", "3 × 15"]
      ],
      "Thursday – Upper Body": [
        ["Push-ups", "4 × 12"],
        ["Shoulder Taps", "3 × 20"],
        ["Arm Circles", "3 × 30 sec"]
      ],
      "Friday – Fat Burn HIIT": [
        ["Burpees", "3 × 10"],
        ["Jump Squats", "3 × 12"],
        ["Plank Hold", "3 × 45 sec"]
      ]
    };
  }

  // ===============================
  // ACCORDION UI RENDERING
  // ===============================
  workoutContent.innerHTML = "";

  for (let day in workoutPlan) {
    const safeId = day.replace(/[^a-zA-Z]/g, "_");

    let html = `
      <div class="day-block">
        <div class="day-header" data-target="${safeId}">
          ${day}
          <span>+</span>
        </div>
        <div class="day-workouts" id="${safeId}" style="display:none;">
    `;

    workoutPlan[day].forEach(ex => {
      html += `
        <div class="exercise-row">
          <div>${ex[0]}</div>
          <span>${ex[1]}</span>
        </div>
      `;
    });

    html += `</div></div>`;
    workoutContent.innerHTML += html;
  }

  document.querySelectorAll(".day-header").forEach(header => {
    header.addEventListener("click", () => {
      const id = header.getAttribute("data-target");
      const panel = document.getElementById(id);
      const plus = header.querySelector("span");

      if (panel.style.display === "block") {
        panel.style.display = "none";
        plus.textContent = "+";
      } else {
        panel.style.display = "block";
        plus.textContent = "−";
      }
    });
  });

  // ===============================
  // SUMMARY
  // ===============================
  summaryContent.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Goal:</strong> ${goal}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Diet:</strong> ${diet}</p>
    <p><strong>Workout Time:</strong> ${time}</p>
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Calories:</strong> ${calories} kcal</p>
    <p style="margin-top:8px;color:#9ca3af;font-size:13px;">
      Go to <b>Workout Plans</b> and click a day to view exercises.
    </p>
  `;
});


