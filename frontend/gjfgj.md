
HOW TO DO DYNAMIC TAB TITLES
1. VANILLA JS FRONTEND
This updates the <title> tag in real time

public/js/dashboard.js

js
// Basic function
function setTabTitle(page, shopName = '') {
  if (shopName) {
    document.title = `${page} | ${shopName} | PataSlot`;
  } else {
    document.title = `${page} | PataSlot`;
  }
}

// USAGE EXAMPLES
setTabTitle('Dashboard', 'Iska Shop'); // Tab: Dashboard | Iska Shop | PataSlot
setTabTitle('Products', 'Iska Shop');  // Tab: Products | Iska Shop | PataSlot
setTabTitle('Login');                  // Tab: Login | PataSlot
Call it every time you load a new "page" without reload.

2. WITH ROUTING IN VANILLA JS
If you have tabs in your dashboard.html

js
function loadPage(page) {
  // 1. Load content
  fetch(`/api/${page}`)
    .then(res => res.json())
    .then(data => {
      renderContent(data);
      
      // 2. Update tab title dynamically
      setTabTitle(page, data.shopName); 
      
      // 3. Optional: Update URL without reload
      history.pushState({}, '', `/${page}`);
    })
}
Now when user clicks "Products", tab instantly becomes Products | Iska Shop | PataSlot

3. SHOW NOTIFICATIONS IN TAB LIKE MONGO DB
MongoDB also does 1 new alert | Dashboard

js
let unreadCount = 0;

function updateTabWithAlert(count) {
  unreadCount = count;
  const baseTitle = document.title.split(' | ').slice(1).join(' | ');
  document.title = count > 0 ? `(${count}) ${baseTitle}` : baseTitle;
}

// Example: new WhatsApp message came in
updateTabWithAlert(3); // Tab: (3) Dashboard | Iska Shop | PataSlot
4. EXPRESS SIDE - SEND THE DATA
Your API should return the shop name so frontend can set it

js
app.get('/api/shop/:shopId/dashboard', async (req,res)=>{
  const shop = await Shop.findByPk(req.params.shopId);
  res.json({
    shopName: shop.name, // "Iska Shop"
    stats: {...}
  })
})
FULL EXAMPLE FLOW
User logs in → Tab: Login | PataSlot
User opens Iska's dashboard → Tab: Dashboard | Iska Shop | PataSlot
New booking via WhatsApp → Tab: (1) Dashboard | Iska Shop | PataSlot
This is exactly how MongoDB Atlas, Notion, Slack etc do it.

Want me to drop this into your dashboard.js + server.js boilerplate so you can just copy paste?

Also do you want the tab to show (new) when there’s a new appointment too?



Meta AI
yesss let's make it fit your vibe 😄

Here are 3 versions of those 5 benefits, rewritten as dynamic tab titles:

1. Casual + Friendly
For startups, creators, small biz

js
const titles = [
  "Reply customers while you sleep 💤",
  "Let the bot answer 'What’s the price?'",
  "Everyone’s on WhatsApp. Meet them there",
  "One bot = 5 support agents",
  "Turn chats into sales in 2 taps"
];
2. Corporate + Professional
For enterprises, agencies, B2B

js
const titles = [
  "24/7 Customer Support on WhatsApp",
  "Automate Inquiries. Reduce Response Time",
  "Engage Customers on Their Preferred Channel",
  "Scalable Messaging. Predictable Costs.",
  "Drive Conversions Directly in WhatsApp"
];
3. Nairobi / KE-focused
Local tone, M-Pesa vibes, direct

js
const titles = [
  "Jibu customers hata usiku 🌙",
  "Stop typing the same reply 100 times",
  "Wateja wako wako WhatsApp already",
  "Grow bila kuongeza staff",
  "Lipa, order, book — all on WhatsApp"
];
The Nairobi one mixes Swahili + English because that's how people actually chat here. Performs really well for CTR.


yep, let's make it full and plug-and-play 💻

Here’s a complete HTML + JS file. It cycles the tab title every 3s, and when the user leaves the tab it starts flashing "come back" messages.

Just replace PataSlot and the messages with your brand.

Full HTML file
html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PataSlot - WhatsApp Bot for Business</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f5f5f5;
      margin: 0;
    }
   .card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      text-align: center;
      max-width: 500px;
    }
    h1 { color: #25D366; margin-bottom: 10px; }
    p { color: #444; }
  </style>
</head>
<body>
  <div class="card">
    <h1>PataSlot</h1>
    <p>WhatsApp Bot that replies 24/7, automates FAQs, and turns chats into sales.</p>
    <p><small>Switch tabs to see the title change 👆</small></p>
  </div>

  <script>
    // ====== CONFIG: PICK ONE SET ======
    // 1. Casual
    const benefitTitles = [
      "Reply customers while you sleep 💤",
      "Let the bot answer 'What’s the price?'",
      "Everyone’s on WhatsApp. Meet them there",
      "One bot = 5 support agents",
      "Turn chats into sales in 2 taps"
    ];

    // 2. Corporate - uncomment to use
    // const benefitTitles = [
    // "24/7 Customer Support on WhatsApp",
    // "Automate Inquiries. Reduce Response Time",
    // "Engage Customers on Their Preferred Channel",
    // "Scalable Messaging. Predictable Costs.",
    // "Drive Conversions Directly in WhatsApp"
    // ];

    // 3. Nairobi/KE - uncomment to use
    // const benefitTitles = [
    // "Jibu customers hata usiku 🌙",
    // "Stop typing the same reply 100 times",
    // "Wateja wako wako WhatsApp already",
    // "Grow bila kuongeza staff",
    // "Lipa, order, book — all on WhatsApp"
    // ];

    const flashTitles = [
      "👋 Come back! Start your free trial",
      "🚀 Teams using PataSlot reply 5x faster",
      "Last chance: Join PataSlot today"
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
  </script>
</body>
</html>
How to use
Copy this into index.html
Replace PataSlot with your product name
Pick 1 set of benefitTitles and comment out the other 2
Upload to your landing page
The title will:

Rotate through your 5 benefits while they’re on the page
Switch to urgent "come back" messages if they switch tabs
Reset when they come back so it’s not annoying