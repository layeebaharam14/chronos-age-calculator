/**
 * CHRONOS - REAL-TIME GLASSMORPHIC AGE CALCULATOR ENGINE
 * High-precision temporal calculation, planetary metrics, zodiac computation, and animations.
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const birthDateInput = document.getElementById('birth-date');
  const birthTimeInput = document.getElementById('birth-time');
  const liveStatusText = document.getElementById('live-status-text');

  // Chronometer Outputs
  const valYears = document.getElementById('val-years');
  const valMonths = document.getElementById('val-months');
  const valDays = document.getElementById('val-days');
  const valHours = document.getElementById('val-hours');
  const valMinutes = document.getElementById('val-minutes');
  const valSeconds = document.getElementById('val-seconds');
  const valMillis = document.getElementById('val-millis');
  const generationBadge = document.getElementById('generation-badge');

  // Next Birthday Elements
  const nextBdayDate = document.getElementById('next-bday-date');
  const nextBdayLabel = document.getElementById('next-bday-label');
  const bdayDays = document.getElementById('bday-days');
  const bdayHours = document.getElementById('bday-hours');
  const bdayMins = document.getElementById('bday-mins');
  const bdaySecs = document.getElementById('bday-secs');
  const bdayProgressBar = document.getElementById('bday-progress-bar');
  const bdayProgressPct = document.getElementById('bday-progress-pct');

  // Milestone Highlight Elements (Completed Years, Which Birthday, 21st Birthday)
  const displayCompletedYears = document.getElementById('display-completed-years');
  const displayLivingYear = document.getElementById('display-living-year');
  const displayWhichBday = document.getElementById('display-which-bday');
  const displayBdayInSub = document.getElementById('display-bday-in-sub');
  const display21stStatus = document.getElementById('display-21st-status');
  const display21stDetail = document.getElementById('display-21st-detail');
  const card21stBirthday = document.getElementById('card-21st-birthday');

  // Exclusive Birthday Celebration Banner Elements
  const exclusiveBdayBanner = document.getElementById('exclusive-bday-banner');
  const bannerIcon = document.getElementById('banner-icon');
  const bannerBadge = document.getElementById('banner-badge');
  const bannerTitle = document.getElementById('banner-title');
  const bannerDesc = document.getElementById('banner-desc');
  const bannerCelebrateBtn = document.getElementById('banner-celebrate-btn');

  // Cumulative Metrics
  const totalDays = document.getElementById('total-days');
  const totalHours = document.getElementById('total-hours');
  const totalMinutes = document.getElementById('total-minutes');
  const totalHeartbeats = document.getElementById('total-heartbeats');
  const totalBreaths = document.getElementById('total-breaths');
  const totalSleep = document.getElementById('total-sleep');
  const solarDistance = document.getElementById('solar-distance');
  const totalMeals = document.getElementById('total-meals');

  // Astrological Elements
  const zodiacSymbol = document.getElementById('zodiac-symbol');
  const zodiacName = document.getElementById('zodiac-name');
  const zodiacDates = document.getElementById('zodiac-dates');
  const zodiacTrait = document.getElementById('zodiac-trait');

  const chineseSymbol = document.getElementById('chinese-symbol');
  const chineseName = document.getElementById('chinese-name');
  const chineseElement = document.getElementById('chinese-element');
  const chineseTrait = document.getElementById('chinese-trait');

  const birthWeekday = document.getElementById('birth-weekday');
  const birthWeekdayMeta = document.getElementById('birth-weekday-meta');
  const birthWeekdayQuote = document.getElementById('birth-weekday-quote');

  // Planetary Age Elements
  const planetMercury = document.getElementById('planet-mercury');
  const planetVenus = document.getElementById('planet-venus');
  const planetMars = document.getElementById('planet-mars');
  const planetJupiter = document.getElementById('planet-jupiter');
  const planetSaturn = document.getElementById('planet-saturn');
  const planetNeptune = document.getElementById('planet-neptune');

  // Milestones Container
  const milestonesContainer = document.getElementById('milestones-container');

  // Actions & Extras
  const celebrateBtn = document.getElementById('celebrate-btn');
  const copySummaryBtn = document.getElementById('copy-summary-btn');
  const toastMsg = document.getElementById('toast-msg');
  const themeButtons = document.querySelectorAll('.theme-btn');
  const presetChips = document.querySelectorAll('.preset-chip');

  // Animation Frame Handle
  let animationFrameId = null;

  // --- Helper: Format Number with commas ---
  function formatNum(num) {
    return Math.floor(num).toLocaleString('en-US');
  }

  function padZero(num, length = 2) {
    return String(Math.floor(num)).padStart(length, '0');
  }

  // --- Helper: Format Ordinal Numbers (1st, 2nd, 3rd, 21st, etc.) ---
  function getOrdinal(num) {
    const n = Math.floor(num);
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  // --- Western Zodiac Calculation ---
  function getZodiacSign(day, month) {
    const zodiacs = [
      { name: 'Capricorn', symbol: '♑', start: [1, 1], end: [1, 19], dates: 'Dec 22 - Jan 19', trait: 'Element: Earth • Disciplined, ambitious, patient' },
      { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18], dates: 'Jan 20 - Feb 18', trait: 'Element: Air • Innovative, humanitarian, visionary' },
      { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20], dates: 'Feb 19 - Mar 20', trait: 'Element: Water • Intuitive, empathetic, creative' },
      { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19], dates: 'Mar 21 - Apr 19', trait: 'Element: Fire • Bold, dynamic, courageous' },
      { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20], dates: 'Apr 20 - May 20', trait: 'Element: Earth • Grounded, reliable, sensual' },
      { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20], dates: 'May 21 - Jun 20', trait: 'Element: Air • Curious, versatile, witty' },
      { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22], dates: 'Jun 21 - Jul 22', trait: 'Element: Water • Nurturing, protective, deeply intuitive' },
      { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22], dates: 'Jul 23 - Aug 22', trait: 'Element: Fire • Radiant, generous, magnetic leader' },
      { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22], dates: 'Aug 23 - Sep 22', trait: 'Element: Earth • Meticulous, analytical, refined' },
      { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22], dates: 'Sep 23 - Oct 22', trait: 'Element: Air • Harmonious, diplomatic, aesthetic' },
      { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21], dates: 'Oct 23 - Nov 21', trait: 'Element: Water • Passionate, strategic, transformative' },
      { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21], dates: 'Nov 22 - Dec 21', trait: 'Element: Fire • Adventurous, philosophical, optimistic' },
      { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [12, 31], dates: 'Dec 22 - Jan 19', trait: 'Element: Earth • Disciplined, ambitious, patient' }
    ];

    for (const z of zodiacs) {
      const [startM, startD] = z.start;
      const [endM, endD] = z.end;
      if (month === startM && day >= startD) return z;
      if (month === endM && day <= endD) return z;
    }
    return zodiacs[0];
  }

  // --- Chinese Zodiac Calculation ---
  function getChineseZodiac(year) {
    const animals = [
      { name: 'Rat', symbol: '🐀', element: 'Water / Yang', trait: 'Quick-witted, resourceful, adaptable' },
      { name: 'Ox', symbol: '🐂', element: 'Earth / Yin', trait: 'Steadfast, trustworthy, methodical' },
      { name: 'Tiger', symbol: '🐅', element: 'Wood / Yang', trait: 'Brave, charismatic, passionate' },
      { name: 'Rabbit', symbol: '🐇', element: 'Wood / Yin', trait: 'Gentle, gracious, elegant' },
      { name: 'Dragon', symbol: '🐉', element: 'Earth / Yang', trait: 'Charismatic, powerful, noble' },
      { name: 'Snake', symbol: '🐍', element: 'Fire / Yin', trait: 'Wise, perceptive, enigmatic' },
      { name: 'Horse', symbol: '🐎', element: 'Fire / Yang', trait: 'Independent, vibrant, free-spirited' },
      { name: 'Goat', symbol: '🐐', element: 'Earth / Yin', trait: 'Artistic, gentle, empathetic' },
      { name: 'Monkey', symbol: '🐒', element: 'Metal / Yang', trait: 'Clever, playful, innovative' },
      { name: 'Rooster', symbol: '🐓', element: 'Metal / Yin', trait: 'Decisive, observant, articulate' },
      { name: 'Dog', symbol: '🐕', element: 'Earth / Yang', trait: 'Loyal, sincere, just' },
      { name: 'Pig', symbol: '🐖', element: 'Water / Yin', trait: 'Generous, earnest, joyful' }
    ];
    // Base reference: 1900 was Year of the Rat
    const index = (year - 1900) % 12;
    return animals[index < 0 ? (index + 12) % 12 : index];
  }

  // --- Generation Identifier ---
  function getGeneration(year) {
    if (year >= 2025) return 'Generation Beta';
    if (year >= 2013) return 'Generation Alpha';
    if (year >= 1997) return 'Generation Z (Zoomer)';
    if (year >= 1981) return 'Millennial (Gen Y)';
    if (year >= 1965) return 'Generation X';
    if (year >= 1946) return 'Baby Boomer';
    if (year >= 1928) return 'Silent Generation';
    return 'Greatest Generation';
  }

  // --- Day of Week Details & Poem Lore ---
  const weekdayLore = [
    { day: 'Sunday', symbol: '☀️', meta: 'Day of the Sun', quote: '"Blythe, bonny, and good and gay"' },
    { day: 'Monday', symbol: '🌙', meta: 'Day of the Moon', quote: '"Fair of face, graceful and bright"' },
    { day: 'Tuesday', symbol: '⚡', meta: 'Day of Mars / Tiw', quote: '"Full of grace, strength, and drive"' },
    { day: 'Wednesday', symbol: '🪐', meta: 'Day of Mercury / Woden', quote: '"Full of wisdom, wit, and thought"' },
    { day: 'Thursday', symbol: '⚡', meta: 'Day of Jupiter / Thor', quote: '"Born with a long way to go & explore"' },
    { day: 'Friday', symbol: '✨', meta: 'Day of Venus / Frigg', quote: '"Loving, charming, and giving"' },
    { day: 'Saturday', symbol: '⭐', meta: 'Day of Saturn', quote: '"Works hard for a living, resilient & true"' }
  ];

  // --- Milestones Definition ---
  const milestonesList = [
    { age: 1, title: 'First Orbit Completed', desc: 'First word, first step into the universe.' },
    { age: 5, title: 'Early Childhood Epoch', desc: 'School adventures & vivid imagination begins.' },
    { age: 10, title: 'First Full Decade', desc: 'Double digits unlocked! Cognitive leap forward.' },
    { age: 16, title: 'Sweet Sixteen', desc: 'Independence, discovery, and teenage energy.' },
    { age: 18, title: 'Legal Adulthood', desc: 'Full sovereign individual rights achieved.' },
    { age: 21, title: 'Universal Majority', desc: 'Key milestone across all global jurisdictions.' },
    { age: 25, title: 'Quarter-Century (25 yrs)', desc: 'Prefrontal brain cortex reaches peak maturation.' },
    { age: 30, title: 'Thriving Thirties', desc: 'Mastery over career, relationships & identity.' },
    { age: 40, title: 'Quadragenarian (40 yrs)', desc: 'Peak authority, prime experience & worldly wisdom.' },
    { age: 50, title: 'Golden Half-Century', desc: '50 orbits of Earth around the golden sun!' },
    { age: 65, title: 'Sapphire Epoch (65 yrs)', desc: 'Wise retirement & legacy cultivation horizon.' },
    { age: 75, title: 'Diamond Jubilee (75 yrs)', desc: 'Three quarters of a full century of history witnessed.' },
    { age: 100, title: 'Centenarian Pioneer', desc: 'Living through a full 100 years of civilization evolution!' }
  ];

  function renderMilestones(currentExactAge) {
    milestonesContainer.innerHTML = '';

    milestonesList.forEach((m) => {
      const isAchieved = currentExactAge >= m.age;
      const isCurrent = currentExactAge < m.age && (m.age - currentExactAge) <= 1.5;
      
      const item = document.createElement('div');
      item.className = `milestone-item ${isAchieved ? 'achieved' : isCurrent ? 'current' : 'upcoming'}`;

      let statusBadge = '';
      if (isAchieved) {
        statusBadge = `<span class="milestone-badge-pill">✓ Achieved (${m.age} yrs)</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="milestone-badge-pill">🔥 Upcoming Next!</span>`;
      } else {
        statusBadge = `<span class="milestone-badge-pill">⏳ Ahead (${m.age} yrs)</span>`;
      }

      item.innerHTML = `
        ${statusBadge}
        <div class="milestone-title">${m.title}</div>
        <div class="milestone-desc">${m.desc}</div>
      `;
      milestonesContainer.appendChild(item);
    });
  }

  // --- Precise Real-Time Calculation Loop ---
  function updateChronometer() {
    const dateVal = birthDateInput.value;
    if (!dateVal) {
      animationFrameId = requestAnimationFrame(updateChronometer);
      return;
    }

    const timeVal = birthTimeInput.value || '00:00:00';
    const [hours, minutes, seconds = '00'] = timeVal.split(':');
    
    // Construct local Date
    const [yearStr, monthStr, dayStr] = dateVal.split('-');
    const birthDate = new Date(
      parseInt(yearStr, 10),
      parseInt(monthStr, 10) - 1,
      parseInt(dayStr, 10),
      parseInt(hours, 10) || 0,
      parseInt(minutes, 10) || 0,
      parseInt(seconds, 10) || 0
    );

    const now = new Date();
    const diffMillis = now.getTime() - birthDate.getTime();

    if (diffMillis < 0) {
      // Future date chosen
      liveStatusText.textContent = 'Selected date is in the future!';
      valYears.textContent = '00';
      valMonths.textContent = '00';
      valDays.textContent = '00';
      valHours.textContent = '00';
      valMinutes.textContent = '00';
      valSeconds.textContent = '00';
      valMillis.textContent = '000';
      if (displayCompletedYears) displayCompletedYears.textContent = '--';
      if (displayLivingYear) displayLivingYear.textContent = 'Date is in future';
      if (displayWhichBday) displayWhichBday.textContent = '--';
      if (displayBdayInSub) displayBdayInSub.textContent = 'Awaiting valid date';
      if (display21stStatus) display21stStatus.textContent = '--';
      if (display21stDetail) display21stDetail.textContent = 'Awaiting valid birthdate';
      if (exclusiveBdayBanner) exclusiveBdayBanner.classList.add('hidden');
      animationFrameId = requestAnimationFrame(updateChronometer);
      return;
    } else {
      liveStatusText.textContent = 'Real-time chronometer streaming live';
    }

    // Exact Calendar Difference (Years, Months, Days)
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    let d = now.getDate() - birthDate.getDate();

    if (d < 0) {
      m -= 1;
      // Get previous month's total days
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      d += prevMonthLastDay;
    }

    if (m < 0) {
      y -= 1;
      m += 12;
    }

    // Time difference within the current day
    let h = now.getHours() - birthDate.getHours();
    let min = now.getMinutes() - birthDate.getMinutes();
    let s = now.getSeconds() - birthDate.getSeconds();
    let ms = now.getMilliseconds() - birthDate.getMilliseconds();

    if (ms < 0) {
      s -= 1;
      ms += 1000;
    }
    if (s < 0) {
      min -= 1;
      s += 60;
    }
    if (min < 0) {
      h -= 1;
      min += 60;
    }
    if (h < 0) {
      h += 24;
      // Note: day already accounted in calendar diff
    }

    // Update Main Hero Counters
    valYears.textContent = padZero(y);
    valMonths.textContent = padZero(m);
    valDays.textContent = padZero(d);
    valHours.textContent = padZero(h);
    valMinutes.textContent = padZero(min);
    valSeconds.textContent = padZero(s);
    valMillis.textContent = padZero(ms, 3);

    // Exact Age in Years as floating point
    const exactYears = diffMillis / (1000 * 60 * 60 * 24 * 365.2425);

    // Cumulative Calculations
    const totalSecsElapsed = Math.floor(diffMillis / 1000);
    const totalMinsElapsed = Math.floor(diffMillis / (1000 * 60));
    const totalHoursElapsed = Math.floor(diffMillis / (1000 * 60 * 60));
    const totalDaysElapsed = Math.floor(diffMillis / (1000 * 60 * 60 * 24));

    totalDays.textContent = formatNum(totalDaysElapsed);
    totalHours.textContent = formatNum(totalHoursElapsed);
    totalMinutes.textContent = formatNum(totalMinsElapsed);

    // Heartbeats (~80 bpm average)
    totalHeartbeats.textContent = formatNum(totalMinsElapsed * 80);

    // Breaths (~16 breaths per min average)
    totalBreaths.textContent = formatNum(totalMinsElapsed * 16);

    // Sleep (about 33.3% of life = 1/3)
    const sleepYears = (exactYears * 0.333).toFixed(1);
    const sleepHours = formatNum(totalHoursElapsed * 0.333);
    totalSleep.textContent = `${sleepYears} yrs (${sleepHours} hrs)`;

    // Solar Distance (Earth orbits Sun at ~940 million km per year)
    const kmTraveled = (exactYears * 940000000);
    if (kmTraveled > 1e9) {
      solarDistance.textContent = `${(kmTraveled / 1e9).toFixed(2)} Billion km`;
    } else {
      solarDistance.textContent = `${(kmTraveled / 1e6).toFixed(1)} Million km`;
    }

    // Meals (~3 meals/day)
    totalMeals.textContent = formatNum(totalDaysElapsed * 3);

    // --- Next Birthday Calculation ---
    const thisYear = now.getFullYear();
    let nextBday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);
    
    // If birthday already happened this year, next is next year
    if (now.getTime() > nextBday.getTime()) {
      nextBday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);
    }

    const msUntilBday = nextBday.getTime() - now.getTime();
    const bDays = Math.floor(msUntilBday / (1000 * 60 * 60 * 24));
    const bHours = Math.floor((msUntilBday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const bMins = Math.floor((msUntilBday % (1000 * 60 * 60)) / (1000 * 60));
    const bSecs = Math.floor((msUntilBday % (1000 * 60)) / 1000);

    bdayDays.textContent = bDays;
    bdayHours.textContent = bHours;
    bdayMins.textContent = bMins;
    bdaySecs.textContent = bSecs;

    // Date formatted string
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    nextBdayDate.textContent = nextBday.toLocaleDateString('en-US', options);

    // Current Year Progress (Percentage between last birthday and next birthday)
    let lastBday = new Date(nextBday.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());
    const totalSpan = nextBday.getTime() - lastBday.getTime();
    const passedSpan = now.getTime() - lastBday.getTime();
    const pct = Math.min(100, Math.max(0, (passedSpan / totalSpan) * 100));
    bdayProgressBar.style.width = `${pct.toFixed(2)}%`;
    bdayProgressPct.textContent = `${pct.toFixed(1)}%`;

    // --- Exactly How Many Years Completed & Living Year ---
    const completedYears = y;
    const livingYear = y + 1;
    displayCompletedYears.textContent = `${completedYears} ${completedYears === 1 ? 'Year' : 'Years'} Full`;
    displayLivingYear.textContent = `Currently in your ${getOrdinal(livingYear)} year of life`;

    // --- Which Birthday is Next ---
    const nextBdayNum = completedYears + 1;
    const nextOrdinal = getOrdinal(nextBdayNum);
    displayWhichBday.textContent = `${nextOrdinal} Birthday`;
    if (bDays === 0) {
      displayBdayInSub.textContent = `🎉 Today is your ${nextOrdinal} Birthday!`;
      if (nextBdayLabel) nextBdayLabel.textContent = `🎉 Today's Birthday Celebration!`;
    } else {
      displayBdayInSub.textContent = `In ${bDays} days (${bHours}h ${bMins}m)`;
      if (nextBdayLabel) nextBdayLabel.textContent = `Countdown to ${nextOrdinal} Birthday:`;
    }

    // --- 21st Birthday Milestone Calculation ---
    const bday21 = new Date(birthDate.getFullYear() + 21, birthDate.getMonth(), birthDate.getDate(), birthDate.getHours(), birthDate.getMinutes(), 0);
    const bday21Formatted = bday21.toLocaleDateString('en-US', options);

    if (completedYears > 21) {
      card21stBirthday.classList.remove('active-now');
      const yearsAgo = completedYears - 21;
      display21stStatus.textContent = `Achieved ✓`;
      display21stDetail.textContent = `Turned 21 on ${bday21Formatted} (${yearsAgo} ${yearsAgo === 1 ? 'yr' : 'yrs'} ago)`;
    } else if (completedYears === 21) {
      card21stBirthday.classList.add('active-now');
      display21stStatus.textContent = `Currently 21! 🥂`;
      display21stDetail.textContent = `Turned 21 on ${bday21Formatted} • Milestone year!`;
    } else {
      card21stBirthday.classList.remove('active-now');
      const msUntil21 = bday21.getTime() - now.getTime();
      const daysUntil21 = Math.floor(msUntil21 / (1000 * 60 * 60 * 24));
      const yearsRemaining = 21 - completedYears;
      display21stStatus.textContent = `In ${formatNum(daysUntil21)} days`;
      display21stDetail.textContent = `21st on ${bday21Formatted} (~${yearsRemaining} ${yearsRemaining === 1 ? 'yr' : 'yrs'} to go)`;
    }

    // --- Exclusive Celebration Banner (Birthday, Birthday Week, Birthday Month) ---
    updateExclusiveBirthdayGreeting(birthDate, completedYears);

    // Planetary Ages
    planetMercury.textContent = (exactYears / 0.2408467).toFixed(2) + ' yrs';
    planetVenus.textContent = (exactYears / 0.61519726).toFixed(2) + ' yrs';
    planetMars.textContent = (exactYears / 1.8808158).toFixed(2) + ' yrs';
    planetJupiter.textContent = (exactYears / 11.862615).toFixed(2) + ' yrs';
    planetSaturn.textContent = (exactYears / 29.447498).toFixed(2) + ' yrs';
    planetNeptune.textContent = (exactYears / 164.79132).toFixed(2) + ' yrs';

    // Continue high frequency animation loop
    animationFrameId = requestAnimationFrame(updateChronometer);
  }

  // --- Exclusive Celebration: Birthday, Birthday Week & Birthday Month ---
  function updateExclusiveBirthdayGreeting(birthDate, completedYears) {
    if (!exclusiveBdayBanner) return;

    const now = new Date();
    const bMonth = birthDate.getMonth();
    const bDay = birthDate.getDate();
    const nowMonth = now.getMonth();
    const nowDay = now.getDate();

    // 1. Is it the exact birthday today?
    const isExactBirthday = (bMonth === nowMonth && bDay === nowDay);

    // Calculate distance to birthday in the current year
    const thisYearBday = new Date(now.getFullYear(), bMonth, bDay);
    const msDiff = Math.abs(now.getTime() - thisYearBday.getTime());
    const dayDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

    // 2. Is it birthday week? (within 7 days of the birthday)
    const isBirthdayWeek = (!isExactBirthday && dayDiff <= 7);

    // 3. Is it birthday month? (same month, but outside 7 day week)
    const isBirthdayMonth = (bMonth === nowMonth && !isExactBirthday && !isBirthdayWeek);

    // Reset theme modifier classes
    exclusiveBdayBanner.classList.remove('hidden', 'theme-week', 'theme-month');

    if (isExactBirthday) {
      // 🎂 Level 1: TODAY IS YOUR EXACT BIRTHDAY!
      const ageNow = completedYears;
      bannerIcon.textContent = '🎂';
      bannerBadge.textContent = `🎉 TODAY IS YOUR ${getOrdinal(ageNow).toUpperCase()} BIRTHDAY!`;
      bannerTitle.textContent = `Happy ${getOrdinal(ageNow)} Birthday! 🥂✨`;
      bannerDesc.textContent = `May your new solar orbit around the Sun overflow with radiant happiness, robust health, love, and extraordinary breakthroughs. Today is 100% YOUR special day — celebrate in style!`;

      // Auto fire celebratory confetti once
      if (!window.__birthdayConfettiFired) {
        window.__birthdayConfettiFired = true;
        setTimeout(triggerCelebration, 500);
      }
    } else if (isBirthdayWeek) {
      // 🎈 Level 2: BIRTHDAY WEEK
      exclusiveBdayBanner.classList.add('theme-week');
      bannerIcon.textContent = '🎈';
      bannerBadge.textContent = `✨ IT'S YOUR BIRTHDAY WEEK!`;
      bannerTitle.textContent = `Happy Birthday Week! 🌟`;
      bannerDesc.textContent = `The countdown is on and your celebration epoch has officially begun! One day is never enough to celebrate your remarkable life — cherish every single moment of your birthday week!`;
    } else if (isBirthdayMonth) {
      // 🗓️ Level 3: BIRTHDAY MONTH
      exclusiveBdayBanner.classList.add('theme-month');
      bannerIcon.textContent = '🗓️';
      bannerBadge.textContent = `🎁 IT'S YOUR BIRTHDAY MONTH!`;
      bannerTitle.textContent = `Welcome to Your Birthday Month! 🌟`;
      bannerDesc.textContent = `This entire month belongs to your story, growth, and cosmic milestones. Make every day of this month count, treat yourself, and enjoy the positive vibes!`;
    } else {
      // 🚫 Level 4: OUTSIDE BIRTHDAY MONTH/WEEK -> EXCLUSIVELY HIDDEN
      exclusiveBdayBanner.classList.add('hidden');
    }
  }

  // --- Static/Metadata Updater (Zodiac, Weekday, Milestones) ---
  function updateMetadata() {
    const dateVal = birthDateInput.value;
    if (!dateVal) return;

    const [yearStr, monthStr, dayStr] = dateVal.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);

    const birthDate = new Date(year, month - 1, day);
    const now = new Date();
    const exactYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.2425);

    // Generation
    generationBadge.textContent = getGeneration(year);

    // Western Zodiac
    const western = getZodiacSign(day, month);
    zodiacSymbol.textContent = western.symbol;
    zodiacName.textContent = western.name;
    zodiacDates.textContent = western.dates;
    zodiacTrait.textContent = western.trait;

    // Chinese Zodiac
    const chinese = getChineseZodiac(year);
    chineseSymbol.textContent = chinese.symbol;
    chineseName.textContent = chinese.name;
    chineseElement.textContent = chinese.element;
    chineseTrait.textContent = chinese.trait;

    // Day of the Week Born
    const dayOfWeek = birthDate.getDay();
    const lore = weekdayLore[dayOfWeek];
    birthWeekday.textContent = `${lore.day}'s Child`;
    birthWeekdayMeta.textContent = lore.meta;
    birthWeekdayQuote.textContent = lore.quote;
    document.getElementById('day-born-symbol').textContent = lore.symbol;

    // Life Milestones
    renderMilestones(exactYears);

    // Save to localStorage
    try {
      localStorage.setItem('chronos_birth_date', dateVal);
      localStorage.setItem('chronos_birth_time', birthTimeInput.value || '00:00:00');
    } catch (e) {
      // Storage unavailable, ignore
    }
  }

  // --- Confetti Celebration ---
  function triggerCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#9b51e0', '#ff007f', '#ffd200']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    }
  }

  // --- Copy Summary to Clipboard ---
  function copyAgeSummary() {
    const y = valYears.textContent;
    const m = valMonths.textContent;
    const d = valDays.textContent;
    const gen = generationBadge.textContent;
    const western = zodiacName.textContent;
    const chinese = chineseName.textContent;
    const completedStr = displayCompletedYears ? displayCompletedYears.textContent : `${y} Years`;
    const nextBdayStr = displayWhichBday ? displayWhichBday.textContent : 'Next Birthday';
    const bday21Str = display21stStatus ? `${display21stStatus.textContent} (${display21stDetail.textContent})` : '';

    const summaryText = `✨ Chronos Age Profile ✨\n` +
      `Completed: ${completedStr} (Currently in ${displayLivingYear.textContent})\n` +
      `Next Milestone: ${nextBdayStr} (${displayBdayInSub.textContent})\n` +
      `21st Birthday: ${bday21Str}\n` +
      `Current Chrono: ${y} years, ${m} months, ${d} days old\n` +
      `Era: ${gen} | Zodiac: ${western} | Chinese: ${chinese}\n` +
      `Total Days Lived: ${totalDays.textContent} days\n` +
      `Calculated in real-time with Chronos.`;

    navigator.clipboard.writeText(summaryText).then(() => {
      toastMsg.classList.add('show');
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 2500);
    }).catch(() => {
      alert(summaryText);
    });
  }

  // --- Theme Switching ---
  function initThemeSwitcher() {
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const themeName = btn.getAttribute('data-theme-name');
        document.body.setAttribute('data-theme', themeName);

        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        try {
          localStorage.setItem('chronos_theme', themeName);
        } catch (e) {}
      });
    });

    // Load saved theme
    try {
      const savedTheme = localStorage.getItem('chronos_theme');
      if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        themeButtons.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-theme-name') === savedTheme);
        });
      }
    } catch (e) {}
  }

  // --- Preset Date Chips ---
  function initPresets() {
    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const preset = chip.getAttribute('data-age-preset');
        const now = new Date();

        if (preset === 'today-birthday') {
          // Exactly today's date, 20 years ago
          const target = new Date(now.getFullYear() - 20, now.getMonth(), now.getDate());
          const yyyy = target.getFullYear();
          const mm = String(target.getMonth() + 1).padStart(2, '0');
          const dd = String(target.getDate()).padStart(2, '0');
          birthDateInput.value = `${yyyy}-${mm}-${dd}`;
          window.__birthdayConfettiFired = false;
        } else if (preset === 'bday-week') {
          // 3 days away in current month, 22 years ago
          let targetDay = now.getDate() + 3;
          const maxDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          if (targetDay > maxDays) targetDay = now.getDate() - 3;
          if (targetDay < 1) targetDay = 1;
          const target = new Date(now.getFullYear() - 22, now.getMonth(), targetDay);
          const yyyy = target.getFullYear();
          const mm = String(target.getMonth() + 1).padStart(2, '0');
          const dd = String(target.getDate()).padStart(2, '0');
          birthDateInput.value = `${yyyy}-${mm}-${dd}`;
          window.__birthdayConfettiFired = false;
        } else if (preset === 'bday-month') {
          // 15 days away in same month (outside 7-day week), 25 years ago
          let targetDay = (now.getDate() > 15) ? 1 : 28;
          if (Math.abs(targetDay - now.getDate()) <= 7) {
            targetDay = (now.getDate() <= 10) ? 25 : 2;
          }
          const target = new Date(now.getFullYear() - 25, now.getMonth(), targetDay);
          const yyyy = target.getFullYear();
          const mm = String(target.getMonth() + 1).padStart(2, '0');
          const dd = String(target.getDate()).padStart(2, '0');
          birthDateInput.value = `${yyyy}-${mm}-${dd}`;
          window.__birthdayConfettiFired = false;
        } else if (preset === 'today-relative') {
          const twentyAgo = new Date(now.getFullYear() - 20, now.getMonth(), now.getDate());
          birthDateInput.value = twentyAgo.toISOString().split('T')[0];
          window.__birthdayConfettiFired = false;
        } else {
          birthDateInput.value = preset;
          window.__birthdayConfettiFired = false;
        }

        updateMetadata();
        triggerCelebration();
      });
    });
  }

  // --- Initialization ---
  function init() {
    // Set max date on birth date input to today
    const todayStr = new Date().toISOString().split('T')[0];
    birthDateInput.setAttribute('max', todayStr);

    // Check saved birthdate or set default (e.g. 2000-01-01)
    let savedDate = null;
    let savedTime = '12:00:00';
    try {
      savedDate = localStorage.getItem('chronos_birth_date');
      savedTime = localStorage.getItem('chronos_birth_time') || '12:00:00';
    } catch (e) {}

    birthDateInput.value = savedDate || '2001-06-15';
    birthTimeInput.value = savedTime || '12:00:00';

    // Event listeners
    birthDateInput.addEventListener('input', () => {
      window.__birthdayConfettiFired = false;
      updateMetadata();
    });
    birthDateInput.addEventListener('change', () => {
      window.__birthdayConfettiFired = false;
      updateMetadata();
    });
    birthTimeInput.addEventListener('input', updateMetadata);
    birthTimeInput.addEventListener('change', updateMetadata);

    celebrateBtn.addEventListener('click', triggerCelebration);
    copySummaryBtn.addEventListener('click', copyAgeSummary);

    if (bannerCelebrateBtn) {
      bannerCelebrateBtn.addEventListener('click', triggerCelebration);
    }

    if (card21stBirthday) {
      card21stBirthday.style.cursor = 'pointer';
      card21stBirthday.setAttribute('title', 'Click to celebrate 21st Milestone! 🥂');
      card21stBirthday.addEventListener('click', triggerCelebration);
    }

    initThemeSwitcher();
    initPresets();

    // Initial render
    updateMetadata();

    // Start live chronometer loop
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateChronometer);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
