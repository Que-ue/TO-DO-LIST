// ========= FOCUS PAGE SCRIPT ==========

if (window.location.pathname.includes("focus.html")) {

  let timer;

  let timeLeft = 1500;

  let isRunning = false;

  function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    document.getElementById("minutes").textContent =
      String(minutes).padStart(2, '0');

    document.getElementById("seconds").textContent =
      String(seconds).padStart(2, '0');


    // Update progress ring

    const progress = document.getElementById("timerProgress");

    if (progress) {

      const inputMinutes =
        parseInt(document.getElementById("customTime").value, 10) || 25;

      const totalTime = inputMinutes * 60;

      const circumference = 2 * Math.PI * 116;

      const percentage = timeLeft / totalTime;

      progress.style.strokeDasharray = circumference;

      progress.style.strokeDashoffset =
        circumference * (1 - percentage);
    }
  }


  window.startPomodoro = function () {

    if (isRunning) return;

    const inputMinutes =
      parseInt(document.getElementById("customTime").value, 10);

    if (!isNaN(inputMinutes)) {

      timeLeft = inputMinutes * 60;

    }

    timer = setInterval(() => {

      if (timeLeft > 0) {

        timeLeft--;

        updateTimerDisplay();

      } else {

        clearInterval(timer);

        isRunning = false;

        alert("Time's up! 🎉 Take a break, princess!");

      }

    }, 1000);

    isRunning = true;

    updateTimerDisplay();
  };


  window.pausePomodoro = function () {

    clearInterval(timer);

    isRunning = false;

  };


  window.resetPomodoro = function () {

    clearInterval(timer);

    isRunning = false;

    const inputMinutes =
      parseInt(document.getElementById("customTime").value, 10);

    timeLeft =
      (isNaN(inputMinutes) ? 25 : inputMinutes) * 60;

    updateTimerDisplay();
  };


  updateTimerDisplay();

} 

// ========= AFFIRMATIONS ==========
const affirmations = [
  "You're doing amazing, sweetie 💅",
  "You're one pomodoro away from ruling the world 👑",
  "You slay even when you rest 😌",
  "You are made of sugar, spice, and JavaScript 🧁",
  "You've got this, cutie 🍓",
  "Progress over perfection 🌸",
  "Every tick is a step closer to your dreams ✨"
];

function newAffirmation() {
  const index = Math.floor(Math.random() * affirmations.length);
  document.getElementById("affirmationText").textContent = affirmations[index];
}
// ========= TO-DO LIST SCRIPT ==========
if (window.location.pathname.includes("todo.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Optional: Enter key triggers add
    document.getElementById("taskInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") addTask();
    });
  });

  window.addTask = function () {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, completed: false };
    saveTask(task);
    renderTask(task);
    input.value = "";
  };

  function renderTask(task) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(this)">✔</button>
        <button onclick="deleteTask(this)">🗑</button>
      </div>
    `;
    if (task.completed) li.classList.add("completed");
    document.getElementById("taskList").appendChild(li);
  }

  window.toggleTask = function (button) {
    const li = button.closest("li");
    li.classList.toggle("completed");
    updateStorage();
  };

  window.deleteTask = function (button) {
    const li = button.closest("li");
    li.remove();
    updateStorage();
  };

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(renderTask);
  }

  function updateStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      tasks.push({
        text: li.querySelector("span").innerText,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
// ========= NOTES PAGE SCRIPT ==========
if (window.location.pathname.includes("notes.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const notesArea = document.getElementById("notesArea");
    const saved = localStorage.getItem("myNotes");
    if (saved) {
      notesArea.innerHTML = saved;
    }
  });
  // ======== TEXT FORMATTING ========
  window.formatText = function (command, value = null) {
    document.execCommand(command, false, value);
    document.getElementById("notesArea").focus();
  };
  // ======== TEXT COLOR ========
  window.changeColor = function (color) {
    document.execCommand("foreColor", false, color);
    document.getElementById("notesArea").focus();
  };
  // ======== HIGHLIGHT ========
  window.highlightText = function (color) {
    document.execCommand("hiliteColor", false, color);
    document.getElementById("notesArea").focus();
  };
  // ======== EMOJI ========
  window.insertEmoji = function (emoji) {
    document.execCommand("insertText", false, emoji);
    document.getElementById("notesArea").focus();
  };
  // ======== SAVE NOTES ========
  window.saveNotes = function () {
    const notes = document.getElementById("notesArea").innerHTML;
    localStorage.setItem("myNotes", notes);
    alert("💾 Notes saved successfully!");
  };
  // ======== CLEAR NOTES ========
  window.clearNotes = function () {
    if (confirm("Clear all your notes? 🥺")) {
      document.getElementById("notesArea").innerHTML = "";
      localStorage.removeItem("myNotes");
      alert("🗑️ Notes cleared!");

    }
  };
}
// ========== TODAY PAGE ==========
let sleep = 0;
let water = 0;
// ========== DATE ==========
function showTodayDate() {
  const dateElement = document.getElementById('todayDate');
  if (!dateElement) return;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  dateElement.innerText = formattedDate;
}
// ========== SLEEP TRACKER ==========
function changeSleep(delta) {
  sleep = Math.max(0, Math.min(24, sleep + delta));
  document.getElementById('sleepValue').innerText = sleep;
  let emoji = '😖';
  if (sleep >= 5 && sleep <= 7) {
    emoji = '🥱';
  } else if (sleep >= 8 && sleep <= 11) {
    emoji = '😁';
  } else if (sleep >= 12) {
    emoji = '😨';
  }
  document.getElementById('sleepEmoji').innerText = emoji;
  // Progress toward 8-hour goal
  const progress = document.getElementById('sleepProgress');
  if (progress) {
    const percentage = Math.min((sleep / 8) * 100, 100);
    progress.style.width = percentage + '%';
  }
}
// ========== WATER TRACKER ==========
function changeWater(delta) {
  water = Math.max(0, Math.min(15, water + delta));
  document.getElementById('waterValue').innerText = water;
  let emoji = '💀';
  if (water >= 4 && water <= 8) {
    emoji = '💧';
  } else if (water >= 9) {
    emoji = '😚';
  }
  document.getElementById('waterEmoji').innerText = emoji;
  // Progress toward 8-glass goal
  const progress = document.getElementById('waterProgress');
  if (progress) {
    const percentage = Math.min((water / 8) * 100, 100);
    progress.style.width = percentage + '%';
  }
}
// ========== MOOD TRACKER ==========
function selectMood(mood, button) {
  document.getElementById('selectedMood').innerText = mood;
  // Remove highlight from every mood
  document
    .querySelectorAll('.mood-options button')
    .forEach(btn => {
      btn.classList.remove('selected');
    });
  // Highlight selected mood
  if (button) {
    button.classList.add('selected');
  }
}
// ========== NOTIFICATION ==========
function showTodayNotification(message) {
  const notification =
    document.getElementById('todayNotification');
  if (!notification) return;
  notification.innerText = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2500);
}
// ========== SAVE TODAY ==========
function saveToday() {
  const gratitude =
    document.getElementById('gratitudeInput').value;
  const summary =
    document.getElementById('summaryInput').value;
  const mood =
    document.getElementById('selectedMood').innerText;
  localStorage.setItem(
    'todayData',
    JSON.stringify({
      summary,
      gratitude,
      sleep,
      water,
      mood
    })
  );
  showTodayNotification(
    'Saved successfully 💾✨'
  );
}
// ========== CLEAR TODAY ==========
function clearToday() {
  if (!confirm('Clear everything?')) {
    return;
  }
  document.getElementById(
    'gratitudeInput'
  ).value = '';
  document.getElementById(
    'summaryInput'
  ).value = '';
  sleep = 0;
  water = 0;
  changeSleep(0);
  changeWater(0);
  document.getElementById(
    'selectedMood'
  ).innerText = '👅';
  document
    .querySelectorAll('.mood-options button')
    .forEach(btn => {
      btn.classList.remove('selected');
    });
  localStorage.removeItem('todayData');
  showTodayNotification(
    'Cleared! 🗑️✨'
  );
}
// ========== LOAD SAVED DATA ==========
function loadToday() {
  const saved =
    JSON.parse(
      localStorage.getItem('todayData')
    );
  if (!saved) return;
  document.getElementById(
    'gratitudeInput'
  ).value =
    saved.gratitude || '';
  document.getElementById(
    'summaryInput'
  ).value =
    saved.summary || '';
  sleep = saved.sleep || 0;
  water = saved.water || 0;
  changeSleep(0);
  changeWater(0);
  const savedMood =
    saved.mood || '👅';

  document.getElementById(
    'selectedMood'
  ).innerText =
    savedMood;

  // Highlight saved mood
  document
    .querySelectorAll('.mood-options button')
    .forEach(button => {
      if (
        button.innerText.trim() ===
        savedMood
      ) {
        button.classList.add('selected');
      }
    });
}
// ========== INITIALIZE TODAY PAGE ==========
if (
  window.location.pathname.includes('today.html')
) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      showTodayDate();
      loadToday();
    }
  );
}