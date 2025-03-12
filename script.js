// Global variables and initialization
let watchedAdsCount = 0;
let earnedPoints = 0.0;
const maxAdsPerDay = 300;
const cooldownHours = 12;
let autoAdInterval;
let lastResetTime = parseInt(localStorage.getItem('lastResetTime')) || new Date().getTime();
let lastRewardedAdTime = parseInt(localStorage.getItem('lastRewardedAdTime')) || 0;
let cooldownInterval;
let autoWatchCount = parseInt(localStorage.getItem('autoWatchCount')) || 0;
let directWatchCount = parseInt(localStorage.getItem('directWatchCount')) || 0;

// DOM Elements
const progressBar = document.getElementById('progress-bar');
const watchAdButton = document.getElementById('watch-ad-btn');
const autoAdButton = document.getElementById('auto-ad-btn');
const stopAutoButton = document.getElementById('stop-auto-btn');
const timerElement = document.getElementById('timer');
const rewardedAdButton = document.getElementById('showAd');
const cooldownTimer = document.getElementById('cooldownTimer');

// Load saved data
function loadSavedData() {
  watchedAdsCount = parseInt(localStorage.getItem('watchedAdsCount')) || 0;
  earnedPoints = parseFloat(localStorage.getItem('earnedPoints')) || 0;
  updateUI();
}

// Update UI elements
function updateUI() {
  document.getElementById('watched-ads').textContent = watchedAdsCount;
  document.getElementById('earned-points').textContent = earnedPoints.toFixed(2);
  updateProgressBar();
  checkAdLimit();
}

// Update progress bar
function updateProgressBar() {
  const progress = (watchedAdsCount / maxAdsPerDay) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// Check ad limit and update UI
function checkAdLimit() {
  const now = new Date().getTime();
  const elapsed = now - lastResetTime;
  const cooldownPeriod = cooldownHours * 60 * 60 * 1000;

  if (watchedAdsCount >= maxAdsPerDay) {
    if (elapsed < cooldownPeriod) {
      const timeRemaining = cooldownPeriod - elapsed;
      timerElement.textContent = `Cooldown: ${formatTimeRemaining(timeRemaining)}`;
      disableAdButtons(true);
    } else {
      resetDaily();
    }
  } else {
    timerElement.textContent = '';
    disableAdButtons(false);
  }
}

// Reset daily counters
function resetDaily() {
  watchedAdsCount = 0;
  lastResetTime = new Date().getTime();
  localStorage.setItem('lastResetTime', lastResetTime);
  localStorage.setItem('watchedAdsCount', watchedAdsCount);
  updateUI();
}

// Watch Ad function
function watchAd() {
  if (watchedAdsCount < maxAdsPerDay && typeof show_9041728 === 'function') {
    show_9041728()
      .then(() => {
        watchedAdsCount++;
        earnedPoints += 0.1;
        localStorage.setItem('watchedAdsCount', watchedAdsCount);
        localStorage.setItem('earnedPoints', earnedPoints.toFixed(2));
        updateUI();
      })
      .catch((err) => {
        console.error('Ad failed to load:', err);
        alert('Failed to load ad. Please try again.');
      });
  }
}

// Show Rewarded Ad with cooldown
function showMonetagAd() {
  const now = new Date().getTime();
  const timeSinceLastAd = now - lastRewardedAdTime;
  const cooldownPeriod = 30000;

  if (timeSinceLastAd >= cooldownPeriod && typeof show_9041728 === 'function') {
    show_9041728('pop')
      .then(() => {
        console.log('Rewarded ad shown successfully');
        lastRewardedAdTime = now;
        localStorage.setItem('lastRewardedAdTime', lastRewardedAdTime);
        directWatchCount++;
        localStorage.setItem('directWatchCount', directWatchCount);
        startCooldownTimer();
      })
      .catch((err) => {
        console.error('Rewarded ad failed to load:', err);
        alert('Failed to load rewarded ad. Please try again.');
      });
  }
}

// Start cooldown timer
function startCooldownTimer() {
  rewardedAdButton.disabled = true;
  let timeLeft = 30;
  cooldownTimer.textContent = `${timeLeft}s`;

  if (cooldownInterval) clearInterval(cooldownInterval);

  cooldownInterval = setInterval(() => {
    timeLeft--;
    cooldownTimer.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(cooldownInterval);
      rewardedAdButton.disabled = false;
      cooldownTimer.textContent = 'Start';
    }
  }, 1000);
}

// Initialize
loadSavedData();
setInterval(checkAdLimit, 60000);
