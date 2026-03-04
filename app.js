const DEFAULT_WELCOME_TEXT = "欢迎爸爸";
const WELCOME_STORAGE_KEY = "welcome_text";

const welcomeTextEl = document.getElementById("welcomeText");
const currentTimeEl = document.getElementById("currentTime");
const toggleSettingsBtn = document.getElementById("toggleSettings");
const settingsPanelEl = document.getElementById("settingsPanel");
const welcomeInputEl = document.getElementById("welcomeInput");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const statusMessageEl = document.getElementById("statusMessage");

function formatNow() {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

function getSavedWelcomeText() {
  try {
    const value = localStorage.getItem(WELCOME_STORAGE_KEY);
    if (value && value.trim()) {
      return value.trim();
    }
  } catch (error) {
    console.error("读取欢迎文本失败:", error);
  }
  return DEFAULT_WELCOME_TEXT;
}

function setWelcomeText(text) {
  welcomeTextEl.textContent = text;
  welcomeInputEl.value = text;
}

function updateClock() {
  currentTimeEl.textContent = formatNow();
}

function setStatus(message, isError = false) {
  statusMessageEl.textContent = message;
  statusMessageEl.style.color = isError ? "#b91c1c" : "#047857";
}

toggleSettingsBtn.addEventListener("click", () => {
  settingsPanelEl.classList.toggle("hidden");
  if (!settingsPanelEl.classList.contains("hidden")) {
    welcomeInputEl.focus();
  }
});

saveBtn.addEventListener("click", () => {
  const nextText = welcomeInputEl.value.trim();
  if (!nextText) {
    setStatus("欢迎文本不能为空", true);
    return;
  }

  try {
    localStorage.setItem(WELCOME_STORAGE_KEY, nextText);
    setWelcomeText(nextText);
    setStatus("已保存");
  } catch (error) {
    console.error("保存欢迎文本失败:", error);
    setStatus("保存失败，请检查浏览器设置", true);
  }
});

resetBtn.addEventListener("click", () => {
  try {
    localStorage.removeItem(WELCOME_STORAGE_KEY);
    setWelcomeText(DEFAULT_WELCOME_TEXT);
    setStatus("已恢复默认文本");
  } catch (error) {
    console.error("重置欢迎文本失败:", error);
    setStatus("恢复失败，请检查浏览器设置", true);
  }
});

setWelcomeText(getSavedWelcomeText());
updateClock();
setInterval(updateClock, 1000);
