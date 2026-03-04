const STORAGE_KEY = "welcome-app-settings-v1";
const DEFAULT_SETTINGS = {
  welcomeText: "欢迎来到我的 Web 应用！",
  hour12: false
};

const welcomeTextEl = document.getElementById("welcomeText");
const currentTimeEl = document.getElementById("currentTime");
const settingsDialogEl = document.getElementById("settingsDialog");
const openSettingsBtnEl = document.getElementById("openSettingsBtn");
const settingsFormEl = document.getElementById("settingsForm");
const welcomeInputEl = document.getElementById("welcomeInput");
const timeFormatSelectEl = document.getElementById("timeFormatSelect");
const resetBtnEl = document.getElementById("resetBtn");
const cancelBtnEl = document.getElementById("cancelBtn");
const toastEl = document.getElementById("toast");

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsed = JSON.parse(raw);
    return {
      welcomeText: typeof parsed.welcomeText === "string" && parsed.welcomeText.trim()
        ? parsed.welcomeText.trim()
        : DEFAULT_SETTINGS.welcomeText,
      hour12: Boolean(parsed.hour12)
    };
  } catch (_error) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (_error) {
    // Ignore storage failures and keep app usable.
  }
}

let settings = loadSettings();
let timerId = null;
let toastTimerId = null;

function formatTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: settings.hour12
  }).format(date);
}

function renderWelcome() {
  welcomeTextEl.textContent = settings.welcomeText;
}

function renderTime() {
  currentTimeEl.textContent = formatTime(new Date());
}

function startClock() {
  if (timerId !== null) {
    window.clearInterval(timerId);
  }
  renderTime();
  timerId = window.setInterval(renderTime, 1000);
}

function syncFormFromSettings() {
  welcomeInputEl.value = settings.welcomeText;
  timeFormatSelectEl.value = String(settings.hour12);
}

function openSettingsDialog() {
  syncFormFromSettings();
  settingsDialogEl.classList.remove("hidden");
  welcomeInputEl.focus();
}

function closeSettingsDialog() {
  settingsDialogEl.classList.add("hidden");
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");

  if (toastTimerId !== null) {
    window.clearTimeout(toastTimerId);
  }

  toastTimerId = window.setTimeout(() => {
    toastEl.classList.add("hidden");
  }, 1800);
}

openSettingsBtnEl.addEventListener("click", openSettingsDialog);
cancelBtnEl.addEventListener("click", closeSettingsDialog);

settingsDialogEl.addEventListener("click", (event) => {
  if (event.target === settingsDialogEl) {
    closeSettingsDialog();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !settingsDialogEl.classList.contains("hidden")) {
    closeSettingsDialog();
  }
});

settingsFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const submittedWelcomeText = welcomeInputEl.value.trim();
  settings = {
    welcomeText: submittedWelcomeText || DEFAULT_SETTINGS.welcomeText,
    hour12: timeFormatSelectEl.value === "true"
  };

  saveSettings(settings);
  renderWelcome();
  renderTime();
  closeSettingsDialog();
  showToast("设置已保存");
});

resetBtnEl.addEventListener("click", () => {
  settings = { ...DEFAULT_SETTINGS };
  saveSettings(settings);
  renderWelcome();
  renderTime();
  syncFormFromSettings();
  showToast("已恢复默认设置");
});

renderWelcome();
startClock();
