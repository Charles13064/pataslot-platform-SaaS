    // ====== CONFIG: PICK ONE SET ======
    // 1. Casual
    /* 
    const benefitTitles = [
      "Reply customers while you sleep 💤",
      "Let the bot answer 'What’s the price?'",
      "Everyone’s on WhatsApp. Meet them there",
      "One bot = 5 support agents",
      "Turn chats into sales in 2 taps"
    ];
    */
    // 2. Corporate - 
    // const benefitTitles = [
    // "24/7 Customer Support on WhatsApp",
    // "Automate Inquiries. Reduce Response Time",
    // "Engage Customers on Their Preferred Channel",
    // "Scalable Messaging. Predictable Costs.",
    // "Drive Conversions Directly in WhatsApp"
    // ];

/*
    // 3. Nairobi/KE 
    const benefitTitles = [
    "Jibu customers hata usiku 🌙",
    "Stop typing the same reply 100 times",
    "Wateja wako wako WhatsApp already",
    "Grow bila kuongeza staff",
    "Lipa, order, book — all on WhatsApp",
    "Uza bidhaa zako 24/7 bila kusimama 💸",
    "Never lose a customer lead again",
    "Tuma invoices na risiti ki-otomatiki 🧾",
    "Bring your entire shop inside the chat",
    "Weka biashara yako kwa autopilot leo 🚀",
    "No more missing DMs or forgotten orders"
    ];

    const flashTitles = [
    "👋 Come back! Start your free trial",
    "🚀 Teams using PataSlot reply 5x faster",
    "Last chance: Join PataSlot today",
    "⏰ Offer ending soon! Claim your discount",
    "Don't miss out on automating your business",
    "🔥 500+ Kenyan shops trust PataSlot",
    "Ready to close deals while you sleep? 😴",
    "Setup takes only 2 minutes. Try it now!",
    "👉 Click here to launch your WhatsApp bot",
    "Stop wasting hours on manual replies",
    "Your competitors are already responding ⚡"
    ];

    // ====== LOGIC ======
    const originalTitle = document.title;
    let i = 0;
    let flashInterval;
    let benefitInterval;

    // Normal rotation when tab is active
    function startBenefitRotation() {
      benefitInterval = setInterval(() => {
        document.title = benefitTitles[i % benefitTitles.length];
        i++;
      }, 3000); // change every 3 seconds
    }

    // Flash rotation when tab is hidden
    function startFlashRotation() {
      let j = 0;
      flashInterval = setInterval(() => {
        document.title = flashTitles[j % flashTitles.length];
        j++;
      }, 1500); // flash faster
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(benefitInterval);
        startFlashRotation();
      } else {
        clearInterval(flashInterval);
        document.title = originalTitle; // reset for 1 sec
        setTimeout(() => {
          i = 0;
          startBenefitRotation();
        }, 1000);
      }
    });

    // start on load
    startBenefitRotation();

    */

    //Random Tab Title
    // ====== CONFIG: PICK ONE SET ====== // 

// 1. Casual 
/* const benefitTitles = [ "Reply customers while you sleep 💤", "Let the bot answer 'What’s the price?'", "Everyone’s on WhatsApp. Meet them there", "One bot = 5 support agents", "Turn chats into sales in 2 taps" ]; */ 

// 2. Corporate
/* const benefitTitles = [ "24/7 Customer Support on WhatsApp", "Automate Inquiries. Reduce Response Time", "Engage Customers on Their Preferred Channel", "Scalable Messaging. Predictable Costs.", "Drive Conversions Directly in WhatsApp" ]; */ 

// 3. Nairobi/KE
const benefitTitles = [
  "Jibu customers hata usiku 🌙",
  "Stop typing the same reply 100 times",
  "Wateja wako on WhatsApp ?",
  "Human handoff 🤖",
  "Grow bila kuongeza staff",
  "Lipa, order, book — all on WhatsApp",
  "Uza bidhaa zako 24/7 bila kusimama 💸",
  "Never lose a customer lead again",
  "Cheki all analytics kwa dashboard yako📊",
  "Bring your entire shop inside the chat",
  "Weka biashara yako kwa autopilot leo 🚀",
  "No more missing DMs or forgotten orders"
];

const flashTitles = [
  "👋 Come back! Start your free trial",
  "🚀 Teams using PataSlot reply 5x faster",
  "Last chance: Join PataSlot today",
  "⏰ Offer ending soon! Claim your discount",
  "Don't miss out on automating your business",
  "🔥 Kenyan shops trust PataSlot",
  "Ready to close deals while you sleep? 😴",
  "Setup takes only 10 minutes. Try it now!",
  "Ready to launch your WhatsApp bot",
  "Stop wasting hours on manual replies",
  "Your competitors are already responding ⚡"
];

// ====== LOGIC ====== 
const originalTitle = document.title;
let flashInterval;
let benefitInterval;

// Working arrays that will hold the shuffled sequences
let shuffledBenefits = [];
let shuffledFlashes = [];

// Index pointers to keep track of current position within the shuffled lists
let benefitIdx = 0;
let flashIdx = 0;

/**
 * Shuffles an array in place using the modern Fisher-Yates algorithm.
 * Creating a copy ([...array]) preserves the integrity of your original asset configurations.
 * @param {Array} array - Source array to randomize
 * @returns {Array} A completely brand new shuffled array
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements smoothly
  }
  return arr;
}

/**
 * Initializes or recreates the randomized display order cycles
 */
function initializeSequences() {
  shuffledBenefits = shuffleArray(benefitTitles);
  shuffledFlashes = shuffleArray(flashTitles);
  benefitIdx = 0;
  flashIdx = 0;
}

// Pre-shuffle everything right out of the gate on script execution
initializeSequences();

// Shuffled rotation when the browser tab is active
function startBenefitRotation() {
  benefitInterval = setInterval(() => {
    // If we've shown every title in the deck, reshuffle to get a fresh variation
    if (benefitIdx >= shuffledBenefits.length) {
      shuffledBenefits = shuffleArray(benefitTitles);
      benefitIdx = 0;
    }
    
    // Assign the title and move the pointer forward
    document.title = shuffledBenefits[benefitIdx];
    benefitIdx++;
  }, 3000); // Transitions text every 3 seconds
}

// Shuffled rotation when the browser tab is hidden
function startFlashRotation() {
  flashInterval = setInterval(() => {
    // If we've cycled through all notification alerts, reshuffle the stack
    if (flashIdx >= shuffledFlashes.length) {
      shuffledFlashes = shuffleArray(flashTitles);
      flashIdx = 0;
    }
    
    // Assign the alert and move the pointer forward
    document.title = shuffledFlashes[flashIdx];
    flashIdx++;
  }, 1500); // Flashes quickly every 1.5 seconds
}

// Tab visibility tracking to pause and switch modes cleanly
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Stop the active homepage loops instantly
    clearInterval(benefitInterval);
    // Start running the attention-grabbing alert array
    startFlashRotation();
  } else {
    // Stop the background flash notifications instantly
    clearInterval(flashInterval);
    // Instantly restore page tab layout back to normal
    document.title = originalTitle; 
    
    // Completely reshuffle cycles when returning so loops don't look repetitive
    initializeSequences();
    
    // Delay restarting the active view loop by 1 second for a natural transition
    setTimeout(() => {
      startBenefitRotation();
    }, 1000);
  }
});

// Kick off the initial active tab loop cycle on load
startBenefitRotation();
