// ========== DATA ==========
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const COLORS = {
  ppc: '#414bc8', design: '#92cec1', merch: '#e8825c',
  events: '#2ba88a', website: '#5b9bd5', content: '#7b6fa6', contingency: '#d7b4c0'
};
const C = {
  bg:'#efefef', card:'#ffffff', border:'#d6d6df', text:'#454559', dim:'#7a7a8e',
  blue:'#414bc8', teal:'#92cec1', green:'#2ba88a', red:'#c0415d', purple:'#7b6fa6',
  orange:'#e8825c', pink:'#d7b4c0', navy:'#454559', sky:'#5b9bd5'
};
const CAT_LABELS = {
  ppc: 'PPC + Ads', design: 'Design', merch: 'Printing / Merch',
  events: 'Events', website: 'Website, Software + AI', content: 'Content', contingency: 'Contingency'
};
const CAT_KEYS = ['ppc','design','merch','events','website','content','contingency'];

// FY 2025/26 data
const data2026 = {
  totalBudget: 100288,
  categories: {
    ppc: {
      budget: 21000, actual: 18753,
      monthlyBudget: [1650,1500,1000,1000,2000,2000,2000,2000,2000,2000,2000,2000],
      monthlyActual: [2842,2092,1604,1822,0,2288,2000,1833,2159,2000,0,0],
      items: {
        'LinkedIn Ads': { budget: 1000, actual: 1290, monthlyBudget: [83,83,83,83,83,83,83,83,83,83,83,87], monthlyActual: [779,511,0,0,0,0,0,0,0,0,0,0] },
        'Twitter Ads': { budget: 0, actual: 125, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,50,75,0,0,0,0,0,0,0,0,0] },
        'Ad Setup/Maintenance': { budget: 0, actual: 0, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] },
        'Google Search': { budget: 20000, actual: 17225, monthlyBudget: [1567,1417,917,917,1917,1917,1917,1917,1917,1917,1917,1853], monthlyActual: [2063,1531,1529,1822,0,2288,2000,1833,2159,2000,0,0] },
        'Misc/Fiverr': { budget: 0, actual: 113, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [113,0,0,0,0,0,0,0,0,0,0,0] }
      }
    },
    design: {
      budget: 575, actual: 350.5,
      monthlyBudget: [0,400,0,175,0,0,0,0,0,0,0,0],
      monthlyActual: [0,0,0,175,0,88,0,0,0,87.5,0,0],
      items: {
        'Design of Content': { budget: 0, actual: 175.5, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,88,0,0,0,87.5,0,0] },
        'Fonts + Assets': { budget: 400, actual: 0, monthlyBudget: [0,400,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] },
        'Visual Identity': { budget: 175, actual: 175, monthlyBudget: [0,0,0,175,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,175,0,0,0,0,0,0,0,0] }
      }
    },
    merch: {
      budget: 500, actual: 1651,
      monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0],
      monthlyActual: [0,174,0,133,0,500,124,0,0,720,0,0],
      items: {
        'Printing': { budget: 0, actual: 124, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,124,0,0,0,0,0] },
        'Merch': { budget: 0, actual: 1527, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,174,0,133,0,500,0,0,0,720,0,0] }
      }
    },
    events: {
      budget: 35285, actual: 27162.24,
      monthlyBudget: [3000,1000,20000,5000,1000,1600,1860,1275,0,275,0,275],
      monthlyActual: [3044.86,1156,13383,4167,0,2748,371,1882.38,0,410,0,0],
      items: {
        'EthCC': { budget: 20000, actual: 13539, monthlyBudget: [0,0,20000,0,0,0,0,0,0,0,0,0], monthlyActual: [0,156,13383,0,0,0,0,0,0,0,0,0] },
        'Token2049': { budget: 3000, actual: 3044.86, monthlyBudget: [3000,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [3044.86,0,0,0,0,0,0,0,0,0,0,0] },
        'Crypto Football League': { budget: 3200, actual: 3200, monthlyBudget: [0,0,0,0,0,1600,0,1600,0,0,0,0], monthlyActual: [0,0,0,0,0,1600,0,1600,0,0,0,0] },
        'MonDAO': { budget: 3000, actual: 2000, monthlyBudget: [0,1000,0,0,1000,0,0,0,1000,0,0,0], monthlyActual: [0,1000,0,0,1000,0,0,0,1000,0,0,0] },
        'Zebu': { budget: 5260, actual: 5538, monthlyBudget: [0,0,0,5260,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,4167,0,0,371,0,0,0,0,0] },
        'Misc Event Tix': { budget: 0, actual: 135, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,135,0,0] },
        'Girls Brunch': { budget: 825, actual: 705.38, monthlyBudget: [0,0,0,0,0,275,0,275,0,275,0,0], monthlyActual: [0,0,0,0,0,148,0,282.38,0,275,0,0] }
      }
    },
    website: {
      budget: 15928, actual: 14893,
      monthlyBudget: [201,190,310,465,283,265,265,265,265,365,362,362],
      monthlyActual: [197,186,344,336,265,295,287,354,333,432,362,362],
      items: {
        'Maintenance': { budget: 11130, actual: 11140, monthlyBudget: [928,928,928,928,928,928,928,928,928,928,928,922], monthlyActual: [920,920,930,930,930,930,930,930,930,930,930,930] },
        'Build': { budget: 1200, actual: 0, monthlyBudget: [100,100,100,100,100,100,100,100,100,100,100,100], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] },
        'Canva': { budget: 100, actual: 100, monthlyBudget: [0,0,0,0,0,0,0,0,0,100,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,100,0,0] },
        'Twitter Premium': { budget: 1920, actual: 1920, monthlyBudget: [160,160,160,160,160,160,160,160,160,160,160,160], monthlyActual: [160,160,160,160,160,160,160,160,160,160,160,160] },
        'CapCut': { budget: 233, actual: 55, monthlyBudget: [19,19,19,19,19,19,19,19,19,19,19,24], monthlyActual: [11,0,0,0,0,0,22,22,0,0,0,0] },
        'ChatGPT': { budget: 204, actual: 202, monthlyBudget: [17,17,17,17,17,17,17,17,17,17,17,17], monthlyActual: [17,17,17,17,17,15,17,17,17,17,17,17] },
        'MISC': { budget: 0, actual: 339, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,34,71,0,32,0,67,68,67,0,0] },
        'AmIonAI': { budget: 869, actual: 869, monthlyBudget: [0,0,0,75,75,75,75,75,75,75,172,172], monthlyActual: [0,0,0,75,75,75,75,75,75,75,172,172] },
        'QRFY': { budget: 120, actual: 120, monthlyBudget: [0,0,120,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,120,0,0,0,0,0,0,0,0,0] },
        'Calendly': { budget: 152, actual: 148, monthlyBudget: [13,13,13,13,13,13,13,13,13,13,13,9], monthlyActual: [9,9,13,13,13,13,13,13,13,13,13,13] }
      }
    },
    content: {
      budget: 24000, actual: 24055,
      monthlyBudget: [0,5,6005,6005,5,5,5,6005,6005,5,5,5],
      monthlyActual: [0,5,6005,6005,5,5,5,6005,6005,5,5,5],
      items: {
        'Video Editing': { budget: 0, actual: 0, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] },
        'Gravity7': { budget: 24000, actual: 24000, monthlyBudget: [0,0,6000,6000,0,0,0,6000,6000,0,0,0], monthlyActual: [0,0,6000,6000,0,0,0,6000,6000,0,0,0] },
        'Memelord Technologies': { budget: 0, actual: 55, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,5,5,5,5,5,5,5,5,5,5,5] }
      }
    },
    contingency: {
      budget: 3000, actual: 0,
      monthlyBudget: [250,250,250,250,250,250,250,250,250,250,250,250],
      monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0],
      items: { 'Contingency Fund': { budget: 3000, actual: 0, monthlyBudget: [250,250,250,250,250,250,250,250,250,250,250,250], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] } }
    }
  }
};

// FY 2023/24 (45k budget)
const data2024_45k = {
  totalBudget: 44250,
  categories: {
    ppc: {
      budget: 8000, actual: 10651.34,
      monthlyBudget: [750,600,600,750,1000,500,600,300,300,300,300,300],
      monthlyActual: [551.34,1386,1110,2372,598,0,120,0,74,1200,1785,1455],
      items: {
        'LinkedIn Ads': { budget: 3800, actual: 4019, monthlyBudget: [317,317,317,317,317,317,317,317,317,317,317,263], monthlyActual: [315,318,570,1082,598,0,120,0,0,0,561,455] },
        'Twitter Ads': { budget: 0, actual: 260, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,47,8,205,0] },
        'Ad Setup/Maintenance': { budget: 300, actual: 487, monthlyBudget: [25,25,25,25,25,25,25,25,25,25,25,25], monthlyActual: [133,236,0,118,0,0,0,0,0,0,0,0] },
        'Google Search': { budget: 1800, actual: 5885.34, monthlyBudget: [150,150,150,150,150,150,150,150,150,150,150,150], monthlyActual: [103.34,832,540,1172,0,0,0,0,27,1192,1019,1000] }
      }
    },
    design: {
      budget: 1500, actual: 415,
      monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0],
      monthlyActual: [54,11,0,0,0,0,350,0,0,0,0,0],
      items: {
        'Design of Content': { budget: 0, actual: 22, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [11,11,0,0,0,0,0,0,0,0,0,0] },
        'Fonts + Assets': { budget: 0, actual: 43, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [43,0,0,0,0,0,0,0,0,0,0,0] },
        'Visual Identity': { budget: 500, actual: 350, monthlyBudget: [0,0,0,0,0,0,500,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,350,0,0,0,0,0] }
      }
    },
    merch: {
      budget: 500, actual: 228.96,
      monthlyBudget: [0,0,0,0,0,250,0,0,0,0,0,0],
      monthlyActual: [0,0,0,0,0,228.96,0,0,0,0,0,0],
      items: {
        'Printing': { budget: 250, actual: 0, monthlyBudget: [0,0,0,0,0,250,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] },
        'Merch': { budget: 250, actual: 228.96, monthlyBudget: [0,0,0,0,0,250,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,228.96,0,0,0,0,0,0] }
      }
    },
    events: {
      budget: 20000, actual: 15050,
      monthlyBudget: [0,0,0,0,3300,0,10800,0,0,0,0,500],
      monthlyActual: [0,450,0,0,3300,0,10800,0,0,0,0,500],
      items: {
        'Farwaycon': { budget: 1000, actual: 450, monthlyBudget: [0,1000,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,450,0,0,0,0,0,0,0,0,0,0] },
        'Zebu Live': { budget: 15000, actual: 10800, monthlyBudget: [0,0,0,0,0,0,15000,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,10800,0,0,0,0,0] },
        'Women of Web3': { budget: 4000, actual: 3300, monthlyBudget: [0,0,0,0,4000,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,3300,0,0,0,0,0,0,0] },
        'Other': { budget: 0, actual: 500, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,500] }
      }
    },
    website: {
      budget: 12540, actual: 10710,
      monthlyBudget: [147,151,180,180,53,53,53,205,205,301,205,277],
      monthlyActual: [158,160,163,36,49,24,24,195,315,328,200,318],
      items: {
        'Maintenance': { budget: 9000, actual: 7360, monthlyBudget: [750,750,750,750,750,750,750,750,750,750,750,750], monthlyActual: [0,0,0,0,920,920,920,920,920,920,920,920] },
        'Build': { budget: 1500, actual: 1380, monthlyBudget: [0,1500,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,1380,0,0,0,0,0,0,0,0,0,0] },
        'Twitter Premium': { budget: 856, actual: 880, monthlyBudget: [71,71,71,71,71,71,71,71,71,71,71,75], monthlyActual: [8,8,8,8,8,8,8,168,168,168,160,160] },
        'ChatGPT': { budget: 192, actual: 194, monthlyBudget: [16,16,16,16,16,16,16,16,16,16,16,16], monthlyActual: [17,16,16,16,16,16,16,16,16,16,17,16] },
        'Calendly': { budget: 126, actual: 44, monthlyBudget: [11,11,11,11,11,11,11,11,11,11,11,5], monthlyActual: [0,0,0,12,0,0,0,0,0,9,12,11] }
      }
    },
    content: {
      budget: 3000, actual: 2781,
      monthlyBudget: [500,500,500,500,0,0,0,0,0,0,0,0],
      monthlyActual: [633,602,775,500,0,0,63,11,0,197,0,0],
      items: {
        'Video Editing': { budget: 0, actual: 349, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,275,0,0,0,63,11,0,0,0,0] },
        'Blog Writing (Aaron)': { budget: 3000, actual: 2000, monthlyBudget: [500,500,500,500,0,0,0,0,0,0,0,0], monthlyActual: [500,500,500,500,0,0,0,0,0,0,0,0] },
        'MISC/Fiverr': { budget: 0, actual: 235, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [133,102,0,0,0,0,0,0,0,0,0,0] },
        'Survey Incentive': { budget: 0, actual: 197, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,197,0,0] }
      }
    },
    contingency: {
      budget: 0, actual: 0,
      monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0],
      monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0],
      items: { 'Contingency Fund': { budget: 0, actual: 0, monthlyBudget: [0,0,0,0,0,0,0,0,0,0,0,0], monthlyActual: [0,0,0,0,0,0,0,0,0,0,0,0] } }
    }
  }
};

const datasets = { '2026': data2026, '2024-45k': data2024_45k };

// ========== DEAL DATA (from Plexus Dashboard) ==========
const deals2526 = [
  { date:'Feb 26', company:'Liquid Credit', role:'Blockchain Engineer', fee:37286, source:'Google', consultant:'Olly' },
  { date:'Jan 26', company:'Arena Entertainment', role:'Chief Blockchain Architect', fee:35795, source:'ChatGPT', consultant:'Olly' },
  { date:'Nov 25', company:'FortyIQ', role:'Senior Copywriter', fee:2475, source:'Twitter', consultant:'Will' },
  { date:'Oct 25', company:'Sherlock Protocol', role:'Senior Python Engineer', fee:36300, source:'EthCC', consultant:'Jayden' },
  { date:'Oct 25', company:'Perle', role:'Community Lead', fee:4121, source:'Telegram', consultant:'Josh' },
  { date:'Sep 25', company:'The Kollab', role:'Head of BD APAC', fee:23340, source:'Google', consultant:'Sigrid' },
  { date:'Sep 25', company:'The Kollab', role:'BDM', fee:8870, source:'Google', consultant:'Sigrid' },
  { date:'Sep 25', company:'Oshi', role:'IP Licensing Manager', fee:15524, source:'Google', consultant:'Jay' },
  { date:'Aug 25', company:'Zodia Custody', role:'Blockchain Engineer', fee:37700, source:'Google', consultant:'Will' },
  { date:'Aug 25', company:'Synfutures', role:'Content + PR Lead', fee:8850, source:'EthCC', consultant:'Jayden' },
  { date:'Jul 25', company:'Sandbox', role:'Head of Marketing', fee:22010, source:'Sarah Panel', consultant:'Jay' },
  { date:'Jul 25', company:'BTR.fi', role:'CTO', fee:55692, source:'ChatGPT', consultant:'Tyler' },
  { date:'Jul 25', company:'BTR.fi', role:'Senior Fullstack', fee:22300, source:'ChatGPT', consultant:'Tyler' },
  { date:'Jun 25', company:'Merso', role:'Senior Portfolio Manager', fee:31836, source:'ChatGPT', consultant:'Jay' },
  { date:'Jun 25', company:'Merso', role:'Senior Portfolio Manager', fee:28740, source:'ChatGPT', consultant:'Jay' },
  { date:'Jun 25', company:'Merso', role:'Senior Portfolio Manager', fee:20800, source:'ChatGPT', consultant:'Jay' },
  { date:'Jun 25', company:'BTR.fi', role:'CEO', fee:64780, source:'ChatGPT', consultant:'Tyler' },
];

const deals2425 = [
  { date:'Mar 25', company:'Shuriken', role:'Senior Devops Engineer', fee:29020, source:'Twitter', consultant:'' },
  { date:'Mar 25', company:'Soak Ltd', role:'Retainer - Trading Engineer', fee:7740, source:'Calendly', consultant:'' },
  { date:'Mar 25', company:'Cyfrin', role:'QA Engineer', fee:18578, source:'Calendly', consultant:'' },
  { date:'Feb 25', company:'Shuriken', role:'Lead React Native Engineer', fee:35405, source:'Twitter', consultant:'' },
  { date:'Feb 25', company:'Shuriken', role:'Senior Devops Engineer', fee:34393, source:'Twitter', consultant:'' },
  { date:'Jan 25', company:'Shuriken', role:'Head of Growth', fee:37500, source:'Twitter', consultant:'' },
  { date:'Jan 25', company:'Shuriken', role:'Growth Marketing Manager', fee:19674, source:'Twitter', consultant:'' },
  { date:'Jan 25', company:'Shuriken', role:'Senior Front End', fee:23609, source:'Twitter', consultant:'' },
  { date:'Oct 24', company:'Cyfrin', role:'Content Writer', fee:13106, source:'Calendly', consultant:'' },
  { date:'Oct 24', company:'Shuriken', role:'Content Marketer', fee:17500, source:'Twitter', consultant:'' },
  { date:'Oct 24', company:'Shuriken', role:'Full Stack Engineer', fee:27500, source:'Twitter', consultant:'' },
  { date:'Aug 24', company:'NoOnes', role:'Product Lead', fee:24000, source:'Twitter', consultant:'' },
  { date:'Aug 24', company:'Chainway', role:'Rust Engineer', fee:8250, source:'Report Lead', consultant:'' },
];

// Map deal sources → budget categories
const SOURCE_TO_CATEGORY = {
  'Google':       'ppc',
  'Twitter':      'ppc',
  'ChatGPT':      'website',
  'EthCC':        'events',
  'Token2049':    'events',
  'Sarah Panel':  'events',
  'BGA/Sandbox':  'events',
  'Calendly':     'website',
  'Website':      'website',
  'Report Lead':  'content',
  'Email':        'content',
  'Farcaster':    'content',
  'Telegram':     'content',
  'Mondao':       'events',
  'Referral':     null,       // organic — no direct spend
  'Inbound':      null,
  'Sarah Sourced':null,
  'Sarah Meeting':'events',
  'Sarah':        'events',
};

const dealsByYear = { '2026': deals2526, '2024-45k': deals2425 };

// ========== STATE ==========
let currentYear = '2026'; // for Tracking/Analysis/Details tabs only
let totalBudget = 100288; // modelling starts from FY 2025/26 baseline
let sliderValues = {};
let lockedCategories = new Set();
let charts = {};

// Budget Modelling always uses data2026 (FY 2025/26) as baseline
function getModelBaseline() { return data2026; }
// Other tabs use the year selector
function getData() { return datasets[currentYear]; }
function fmt(n) { return '\u00A3' + Math.round(n).toLocaleString('en-GB'); }

// ========== TABS ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + btn.dataset.tab).classList.remove('hidden');
    if (btn.dataset.tab === 'tracking') renderTracking();
    if (btn.dataset.tab === 'details') renderDetails();
    if (btn.dataset.tab === 'roi') renderROI();
  });
});

// ========== YEAR SELECT ==========
// Year selector only affects Tracking, Analysis, Details — NOT the modelling tab
document.getElementById('yearSelect').addEventListener('change', (e) => {
  currentYear = e.target.value;
  // Re-render whichever non-modelling tab is active
  const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab;
  if (activeTab === 'tracking') renderTracking();
  if (activeTab === 'details') renderDetails();
  if (activeTab === 'roi') renderROI();
});

// ========== TOTAL BUDGET SLIDER ==========
function syncTotalBudgetUI() {
  document.getElementById('totalBudgetSlider').value = totalBudget;
  document.getElementById('totalBudgetInput').value = Math.round(totalBudget);
  document.getElementById('totalBudgetDisplay').textContent = fmt(totalBudget);
  // Update slider gradient
  const pct = ((totalBudget - 10000) / (100000 - 10000)) * 100;
  document.getElementById('totalBudgetSlider').style.background =
    `linear-gradient(to right, ${C.blue} ${pct}%, ${C.border} ${pct}%)`;
}

document.getElementById('totalBudgetSlider').addEventListener('input', (e) => {
  totalBudget = parseInt(e.target.value);
  syncTotalBudgetUI();
  redistributeBudget();
  updatePlanner();
  saveToLocalStorage();
});

document.getElementById('totalBudgetInput').addEventListener('input', (e) => {
  let val = parseInt(e.target.value) || 10000;
  val = Math.max(10000, Math.min(val, 500000));
  totalBudget = val;
  syncTotalBudgetUI();
  redistributeBudget();
  updatePlanner();
  saveToLocalStorage();
});

// ========== REDISTRIBUTION LOGIC ==========
// When total budget changes, redistribute proportionally among unlocked categories
function redistributeBudget() {
  const lockedTotal = CAT_KEYS.reduce((s, k) => s + (lockedCategories.has(k) ? (sliderValues[k] || 0) : 0), 0);
  const available = Math.max(0, totalBudget - lockedTotal);
  const unlocked = CAT_KEYS.filter(k => !lockedCategories.has(k));

  const unlockedTotal = unlocked.reduce((s, k) => s + (sliderValues[k] || 0), 0);

  unlocked.forEach(key => {
    if (unlockedTotal > 0) {
      sliderValues[key] = Math.round((sliderValues[key] / unlockedTotal) * available);
    } else {
      sliderValues[key] = Math.round(available / unlocked.length);
    }
    updateSliderUI(key);
  });
}

// When a single category slider changes, adjust other unlocked categories
function adjustOthers(changedKey, newValue) {
  const oldValue = sliderValues[changedKey];
  const delta = newValue - oldValue;
  sliderValues[changedKey] = newValue;

  const unlocked = CAT_KEYS.filter(k => k !== changedKey && !lockedCategories.has(k));
  if (unlocked.length === 0) {
    // Nothing else to adjust
    updateSliderUI(changedKey);
    return;
  }

  const unlockedTotal = unlocked.reduce((s, k) => s + (sliderValues[k] || 0), 0);
  const newUnlockedTotal = Math.max(0, unlockedTotal - delta);

  unlocked.forEach(key => {
    if (unlockedTotal > 0) {
      sliderValues[key] = Math.max(0, Math.round((sliderValues[key] / unlockedTotal) * newUnlockedTotal));
    } else {
      sliderValues[key] = Math.max(0, Math.round(newUnlockedTotal / unlocked.length));
    }
    updateSliderUI(key);
  });

  updateSliderUI(changedKey);
}

function updateSliderUI(key) {
  const slider = document.getElementById(`slider-${key}`);
  const numInput = document.getElementById(`num-${key}`);
  const valLabel = document.getElementById(`val-${key}`);
  if (!slider || !numInput) return;
  const val = sliderValues[key] || 0;
  const maxVal = parseInt(slider.max);
  slider.value = val;
  numInput.value = totalBudget > 0 ? Math.round(val / totalBudget * 100) : 0;
  if (valLabel) valLabel.textContent = fmt(val);
  slider.style.background = `linear-gradient(to right, ${COLORS[key]} ${(val/maxVal*100)}%, ${C.border} ${(val/maxVal*100)}%)`;
}

// ========== PLANNER ==========
function initSliders() {
  const baseline = getModelBaseline(); // always FY 2025/26
  const container = document.getElementById('slidersContainer');
  container.innerHTML = '';
  sliderValues = {};

  CAT_KEYS.forEach(key => {
    const cat = baseline.categories[key];
    if (!cat) return;
    sliderValues[key] = cat.budget;
    const maxVal = Math.max(cat.budget * 3, totalBudget * 0.6);

    const div = document.createElement('div');
    div.className = 'card p-4';
    div.id = `card-${key}`;
    const isLocked = lockedCategories.has(key);
    const yoyDiff = sliderValues[key] - cat.budget;
    div.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${COLORS[key]}"></span>
          <span class="text-sm font-semibold text-plx-text">${CAT_LABELS[key]}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[11px] text-plx-dim" title="FY 2025/26 budget">Last yr: ${fmt(cat.budget)}</span>
          <span class="text-[11px] text-plx-dim" title="FY 2025/26 actual spent">Actual: ${fmt(cat.actual)}</span>
          <span class="text-sm font-mono text-plx-text font-semibold" id="val-${key}">${fmt(cat.budget)}</span>
          <div class="flex items-center gap-0.5">
            <input type="number" id="num-${key}" value="${totalBudget > 0 ? Math.round(cat.budget / totalBudget * 100) : 0}" min="0" max="100" step="1"
              class="w-16 text-right text-sm font-mono border border-plx-border rounded-lg px-2 py-1.5 text-plx-text outline-none focus:border-plx-blue ${isLocked ? 'opacity-50' : ''}" ${isLocked ? 'disabled' : ''} />
            <span class="text-xs text-plx-dim">%</span>
          </div>
          <button id="lock-${key}" class="lock-btn w-8 h-8 rounded-lg border border-plx-border flex items-center justify-center text-plx-dim hover:border-plx-blue ${isLocked ? 'locked' : ''}" title="${isLocked ? 'Unlock' : 'Lock (fixed cost)'}">
            ${isLocked ? lockIconLocked() : lockIconUnlocked()}
          </button>
        </div>
      </div>
      <input type="range" id="slider-${key}" min="0" max="${Math.round(maxVal)}" step="100" value="${Math.round(cat.budget)}"
        class="w-full slider-track ${isLocked ? 'locked' : ''}" style="background: linear-gradient(to right, ${COLORS[key]} ${(cat.budget/maxVal*100)}%, ${C.border} ${(cat.budget/maxVal*100)}%);" />
      <div class="flex justify-between mt-1">
        <span class="text-[10px] text-plx-dim">${fmt(0)}</span>
        <span class="text-[10px] text-plx-dim">${fmt(maxVal)}</span>
      </div>
    `;
    container.appendChild(div);

    const slider = div.querySelector(`#slider-${key}`);
    const numInput = div.querySelector(`#num-${key}`);
    const lockBtn = div.querySelector(`#lock-${key}`);

    slider.addEventListener('input', () => {
      if (lockedCategories.has(key)) return;
      const val = parseInt(slider.value);
      adjustOthers(key, val);
      updatePlanner();
    });

    numInput.addEventListener('input', () => {
      if (lockedCategories.has(key)) return;
      let pctVal = parseFloat(numInput.value) || 0;
      pctVal = Math.max(0, Math.min(pctVal, 100));
      const val = Math.round(totalBudget * pctVal / 100);
      adjustOthers(key, val);
      updatePlanner();
    });

    lockBtn.addEventListener('click', () => {
      if (lockedCategories.has(key)) {
        lockedCategories.delete(key);
        lockBtn.classList.remove('locked');
        lockBtn.innerHTML = lockIconUnlocked();
        lockBtn.title = 'Lock (fixed cost)';
        slider.classList.remove('locked');
        numInput.disabled = false;
        numInput.classList.remove('opacity-50');
      } else {
        lockedCategories.add(key);
        lockBtn.classList.add('locked');
        lockBtn.innerHTML = lockIconLocked();
        lockBtn.title = 'Unlock';
        slider.classList.add('locked');
        numInput.disabled = true;
        numInput.classList.add('opacity-50');
      }
    });
  });
}

function lockIconUnlocked() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`;
}
function lockIconLocked() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
}

function updatePlanner() {
  let allocated = 0;
  const baseline = getModelBaseline();
  let refBudgetTotal = 0, refActualTotal = 0;

  CAT_KEYS.forEach(key => {
    allocated += (sliderValues[key] || 0);
    if (baseline.categories[key]) {
      refBudgetTotal += baseline.categories[key].budget;
      refActualTotal += baseline.categories[key].actual;
    }
  });

  document.getElementById('totalBudgetDisplay').textContent = fmt(totalBudget);
  document.getElementById('totalAllocated').textContent = fmt(allocated);
  const remaining = totalBudget - allocated;
  const remEl = document.getElementById('totalRemaining');
  remEl.textContent = fmt(remaining);
  remEl.className = 'text-lg font-bold ' + (remaining >= 0 ? 'under-budget' : 'over-budget');
  document.getElementById('refBudgetTotal').textContent = fmt(refBudgetTotal);
  document.getElementById('refActualTotal').textContent = fmt(refActualTotal);

  const pct = totalBudget > 0 ? Math.round(allocated / totalBudget * 100) : 0;
  document.getElementById('allocationPct').textContent = pct + '%';

  // Allocation bar
  const bar = document.getElementById('allocationBar');
  bar.innerHTML = '';
  CAT_KEYS.forEach(key => {
    const val = sliderValues[key] || 0;
    if (val <= 0) return;
    const seg = document.createElement('div');
    seg.style.width = (val / Math.max(allocated, totalBudget) * 100) + '%';
    seg.style.background = COLORS[key];
    seg.className = 'h-full transition-all duration-200';
    seg.title = `${CAT_LABELS[key]}: ${fmt(val)}`;
    bar.appendChild(seg);
  });

  // Legend
  const legend = document.getElementById('allocationLegend');
  legend.innerHTML = '';
  CAT_KEYS.forEach(key => {
    const val = sliderValues[key] || 0;
    if (val <= 0) return;
    const pctCat = allocated > 0 ? Math.round(val / allocated * 100) : 0;
    const span = document.createElement('span');
    span.className = 'flex items-center gap-1 text-[11px] text-plx-dim';
    span.innerHTML = `<span class="w-2 h-2 rounded-full flex-shrink-0" style="background:${COLORS[key]}"></span>${CAT_LABELS[key]} ${pctCat}%`;
    legend.appendChild(span);
  });

  updatePieChart();
}

function updatePieChart() {
  const vals = CAT_KEYS.map(k => sliderValues[k] || 0);
  const labels = CAT_KEYS.map(k => CAT_LABELS[k]);
  const colors = CAT_KEYS.map(k => COLORS[k]);

  if (charts.pie) charts.pie.destroy();
  charts.pie = new Chart(document.getElementById('pieChart'), {
    type: 'doughnut',
    data: { labels, datasets: [{ data: vals, backgroundColor: colors, borderWidth: 2, borderColor: '#ffffff', hoverOffset: 8 }] },
    options: {
      responsive: true, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: C.dim, font: { size: 11, family: 'system-ui' }, padding: 12, usePointStyle: true, pointStyleWidth: 8 } },
        tooltip: { callbacks: { label: (c) => { const t = CAT_KEYS.reduce((s,k)=>s+(sliderValues[k]||0),0); return `${c.label}: ${fmt(c.raw)} (${t>0?Math.round(c.raw/t*100):0}%)`; } } }
      }
    }
  });
}

// ========== TRACKING ==========
function renderTracking() {
  const data = getData();
  let tb = 0, ta = 0;
  CAT_KEYS.forEach(key => {
    const cat = data.categories[key];
    if (cat) { tb += cat.budget; ta += cat.actual; }
  });

  document.getElementById('trackBudget').textContent = fmt(tb);
  document.getElementById('trackActual').textContent = fmt(ta);
  const variance = tb - ta;
  const varEl = document.getElementById('trackVariance');
  varEl.textContent = (variance >= 0 ? '+' : '') + fmt(variance);
  varEl.className = 'text-2xl font-extrabold mt-1 ' + (variance >= 0 ? 'under-budget' : 'over-budget');

  const monthlyBudgets = new Array(12).fill(0);
  const monthlyActuals = new Array(12).fill(0);
  CAT_KEYS.forEach(key => {
    const cat = data.categories[key];
    if (!cat) return;
    for (let m = 0; m < 12; m++) {
      monthlyBudgets[m] += cat.monthlyBudget[m] || 0;
      monthlyActuals[m] += cat.monthlyActual[m] || 0;
    }
  });

  // Build cumulative data
  const cumBudget = [], cumActual = [];
  let runB = 0, runA = 0;
  for (let m = 0; m < 12; m++) {
    runB += monthlyBudgets[m]; runA += monthlyActuals[m];
    cumBudget.push(runB); cumActual.push(runA);
  }

  if (charts.tracking) charts.tracking.destroy();
  charts.tracking = new Chart(document.getElementById('trackingChart'), {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [
        { label: 'Budget Plan', data: cumBudget, borderColor: C.blue, backgroundColor: C.blue + '12', borderWidth: 2, pointRadius: 3, pointBackgroundColor: C.blue, fill: true, tension: 0.3, borderDash: [6, 3] },
        { label: 'Actual Spend', data: cumActual, borderColor: C.orange, backgroundColor: C.orange + '18', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: C.orange, fill: true, tension: 0.3 }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false }, ticks: { color: C.dim, font: { size: 11 } } },
        y: { beginAtZero: true, grid: { color: 'rgba(69,69,89,0.06)' }, ticks: { color: C.dim, callback: v => fmt(v), font: { size: 10 } } }
      },
      plugins: {
        legend: { labels: { color: C.text, usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } } },
        tooltip: { callbacks: { label: c => `${c.dataset.label}: ${fmt(c.raw)}` } }
      }
    }
  });

  // Category donut
  const catActuals = CAT_KEYS.map(k => data.categories[k]?.actual || 0);
  const activeKeys = CAT_KEYS.filter((_, i) => catActuals[i] > 0);
  const activeActuals = activeKeys.map(k => data.categories[k].actual);
  const activeColors = activeKeys.map(k => COLORS[k]);
  if (charts.trackDonut) charts.trackDonut.destroy();
  charts.trackDonut = new Chart(document.getElementById('trackingDonut'), {
    type: 'doughnut',
    data: {
      labels: activeKeys.map(k => CAT_LABELS[k]),
      datasets: [{ data: activeActuals, backgroundColor: activeColors, borderWidth: 2, borderColor: '#fff' }]
    },
    options: {
      responsive: true,
      cutout: '60%',
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', padding: 10, font: { size: 10 } } },
        tooltip: { callbacks: { label: ctx => {
          const total = ctx.dataset.data.reduce((s, v) => s + v, 0);
          return ctx.label + ': ' + fmt(ctx.parsed) + ' (' + (total > 0 ? ((ctx.parsed / total) * 100).toFixed(0) : 0) + '%)';
        }}}
      }
    }
  });

  const tbody = document.getElementById('trackingTableBody');
  tbody.innerHTML = '';
  CAT_KEYS.forEach(key => {
    const cat = data.categories[key];
    if (!cat) return;
    const v = cat.budget - cat.actual;
    const pct = cat.budget > 0 ? Math.round(cat.actual / cat.budget * 100) : (cat.actual > 0 ? 999 : 0);
    const barColor = pct > 100 ? C.red : pct > 80 ? C.orange : C.green;
    const tr = document.createElement('tr');
    tr.className = 'border-t border-plx-border/50';
    tr.innerHTML = `
      <td class="py-3 pr-4 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${COLORS[key]}"></span>
        <span class="text-plx-text font-medium">${CAT_LABELS[key]}</span>
      </td>
      <td class="text-right px-2 font-mono text-plx-dim">${fmt(cat.budget)}</td>
      <td class="text-right px-2 font-mono text-plx-text font-medium">${fmt(cat.actual)}</td>
      <td class="text-right px-2 font-mono ${v >= 0 ? 'under-budget' : 'over-budget'}">${v >= 0 ? '+' : ''}${fmt(v)}</td>
      <td class="text-right px-2"><span class="badge ${pct > 100 ? 'badge-over' : 'badge-under'}">${pct}%</span></td>
      <td class="pl-3"><div class="w-full h-2 bg-plx-bg rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:${Math.min(pct,100)}%; background:${barColor}"></div></div></td>
    `;
    tbody.appendChild(tr);
  });
}

// ========== ROI ANALYSIS ==========
function renderROI() {
  const data = getData();
  // For the planned 2027 year, show 2026 deals as reference (most recent actuals)
  const dealYear = dealsByYear[currentYear] ? currentYear : '2026';
  const deals = dealsByYear[dealYear] || [];

  // Compute revenue per category from deals
  const catRevenue = {};
  const catDeals = {};
  const sourceRevenue = {};
  CAT_KEYS.forEach(k => { catRevenue[k] = 0; catDeals[k] = 0; });
  let unattributedRevenue = 0;
  let unattributedDeals = 0;

  deals.forEach(d => {
    // Track by source
    sourceRevenue[d.source] = (sourceRevenue[d.source] || 0) + d.fee;
    // Map to category
    const catKey = SOURCE_TO_CATEGORY[d.source];
    if (catKey) {
      catRevenue[catKey] += d.fee;
      catDeals[catKey]++;
    } else {
      unattributedRevenue += d.fee;
      unattributedDeals++;
    }
  });

  const totalRevenue = deals.reduce((s, d) => s + d.fee, 0);
  const totalActual = CAT_KEYS.reduce((s, k) => s + (data.categories[k]?.actual || 0), 0);
  // For planned years with no actuals yet, use budget as reference spend
  const isPlanned = totalActual === 0 && dealYear !== currentYear;
  const totalSpend = isPlanned
    ? CAT_KEYS.reduce((s, k) => s + (data.categories[k]?.budget || 0), 0)
    : totalActual;
  const overallROI = totalSpend > 0 ? totalRevenue / totalSpend : 0;
  const costPerDeal = deals.length > 0 ? totalSpend / deals.length : 0;

  // KPI Cards
  document.getElementById('roiRevenue').textContent = fmt(totalRevenue);
  const dealNote = dealYear !== currentYear ? ` (FY 25/26 deals as reference)` : '';
  document.getElementById('roiDealCount').textContent = `${deals.length} deals closed${dealNote}`;
  document.getElementById('roiSpend').textContent = fmt(totalSpend);
  document.getElementById('roiSpendNote').textContent = isPlanned ? 'Planned budget (no actuals yet)' : 'Actual spend year-to-date';
  document.getElementById('roiOverall').textContent = overallROI.toFixed(1) + 'x';
  document.getElementById('roiCostPerDeal').textContent = fmt(costPerDeal);

  // === Revenue by Source doughnut ===
  const sourceEntries = Object.entries(sourceRevenue).sort((a, b) => b[1] - a[1]);
  const sourceColors = ['#414bc8', '#2ba88a', '#e8825c', '#5b9bd5', '#7b6fa6', '#92cec1', '#d7b4c0', '#454559', '#c0415d'];
  if (charts.roiSource) charts.roiSource.destroy();
  const roiSrcCtx = document.getElementById('roiSourceChart').getContext('2d');
  charts.roiSource = new Chart(roiSrcCtx, {
    type: 'doughnut',
    data: {
      labels: sourceEntries.map(e => e[0]),
      datasets: [{
        data: sourceEntries.map(e => e[1]),
        backgroundColor: sourceEntries.map((_, i) => sourceColors[i % sourceColors.length]),
        borderWidth: 2,
        borderColor: '#ffffff',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'right', labels: { usePointStyle: true, pointStyle: 'circle', padding: 12, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: ctx => {
              const total = ctx.dataset.data.reduce((s, v) => s + v, 0);
              const pct = total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0;
              return ctx.label + ': ' + fmt(ctx.parsed) + ' (' + pct + '%)';
            }
          }
        }
      }
    }
  });

  // === ROI Category Table ===
  const tbody = document.getElementById('roiCategoryBody');
  tbody.innerHTML = '';
  let totalBudgetSum = 0, totalSpendSum = 0, totalRevSum = 0, totalDealsSum = 0;

  // Build array and sort by efficiency (ROI descending — spent least, gained most)
  const catRows = CAT_KEYS.map(k => {
    const cat = data.categories[k];
    if (!cat) return null;
    const budget = cat.budget;
    const spend = isPlanned ? cat.budget : cat.actual;
    const rev = catRevenue[k];
    const dCount = catDeals[k];
    const roi = spend > 0 ? rev / spend : (rev > 0 ? Infinity : 0);
    return { k, budget, spend, rev, dCount, roi };
  }).filter(Boolean);

  // Sort: categories with revenue+ROI first (descending ROI), then categories with spend but no revenue, then inactive
  catRows.sort((a, b) => {
    const aActive = a.rev > 0 || a.spend > 0;
    const bActive = b.rev > 0 || b.spend > 0;
    if (aActive !== bActive) return bActive - aActive; // active first
    if (a.roi !== b.roi) {
      if (a.roi === Infinity) return -1;
      if (b.roi === Infinity) return 1;
      return b.roi - a.roi;
    }
    return 0;
  });

  catRows.forEach(({ k, budget, spend, rev, dCount, roi }) => {
    const cpd = dCount > 0 ? spend / dCount : 0;

    totalBudgetSum += budget;
    totalSpendSum += spend;
    totalRevSum += rev;
    totalDealsSum += dCount;

    const roiDisplay = rev === 0 && spend === 0 ? '—' : (roi === Infinity ? '∞' : roi.toFixed(1) + 'x');
    const roiColor = rev === 0 && spend === 0 ? '#7a7a8e' : (roi >= 1 ? '#2ba88a' : (spend > 0 ? '#c0415d' : '#7a7a8e'));
    const effPct = spend > 0 ? Math.min((rev / spend) * 100, 100) : 0;
    const effBarColor = roi >= 1 ? '#2ba88a' : '#e8825c';

    const tr = document.createElement('tr');
    tr.className = 'border-t border-plx-border';
    tr.innerHTML = `
      <td class="py-3 pr-4">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${COLORS[k]}"></span>
          <span class="font-medium text-plx-text">${CAT_LABELS[k]}</span>
        </div>
      </td>
      <td class="text-right px-2 font-mono text-plx-dim">${fmt(budget)}</td>
      <td class="text-right px-2 font-mono text-plx-text">${fmt(spend)}</td>
      <td class="text-right px-2 font-mono font-medium" style="color:#2ba88a">${rev > 0 ? fmt(rev) : '—'}</td>
      <td class="text-right px-2 font-mono">${dCount > 0 ? dCount : '—'}</td>
      <td class="text-right px-2 font-mono font-semibold" style="color:${roiColor}">${rev > 0 || spend > 0 ? roiDisplay : '—'}</td>
      <td class="text-right px-2 font-mono text-plx-dim">${dCount > 0 ? fmt(cpd) : '—'}</td>
      <td class="pl-3"><div class="w-full h-2 bg-plx-bg rounded-full overflow-hidden"><div class="h-full rounded-full transition-all" style="width:${Math.min(effPct, 100)}%; background:${effBarColor}"></div></div></td>
    `;
    tbody.appendChild(tr);
  });

  // Unattributed row
  if (unattributedRevenue > 0) {
    const tr = document.createElement('tr');
    tr.className = 'border-t border-plx-border';
    tr.innerHTML = `
      <td class="py-3 pr-4"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-plx-dim"></span><span class="font-medium text-plx-dim italic">Unattributed / Organic</span></div></td>
      <td class="text-right px-2 font-mono text-plx-dim">—</td>
      <td class="text-right px-2 font-mono text-plx-dim">—</td>
      <td class="text-right px-2 font-mono font-medium" style="color:#2ba88a">${fmt(unattributedRevenue)}</td>
      <td class="text-right px-2 font-mono">${unattributedDeals}</td>
      <td class="text-right px-2 font-mono text-plx-dim">—</td>
      <td class="text-right px-2 font-mono text-plx-dim">—</td>
      <td class="pl-3"></td>
    `;
    tbody.appendChild(tr);
    totalRevSum += unattributedRevenue;
    totalDealsSum += unattributedDeals;
  }

  // Totals row
  const totROI = totalSpendSum > 0 ? (totalRevSum / totalSpendSum).toFixed(1) + 'x' : '—';
  const totCPD = totalDealsSum > 0 ? fmt(totalSpendSum / totalDealsSum) : '—';
  const tfoot = document.createElement('tr');
  tfoot.className = 'border-t-2 border-plx-text font-bold';
  tfoot.innerHTML = `
    <td class="py-3 pr-4 text-plx-text">Total</td>
    <td class="text-right px-2 font-mono text-plx-text">${fmt(totalBudgetSum)}</td>
    <td class="text-right px-2 font-mono text-plx-text">${fmt(totalSpendSum)}</td>
    <td class="text-right px-2 font-mono" style="color:#2ba88a">${fmt(totalRevSum)}</td>
    <td class="text-right px-2 font-mono">${totalDealsSum}</td>
    <td class="text-right px-2 font-mono text-plx-blue">${totROI}</td>
    <td class="text-right px-2 font-mono text-plx-dim">${totCPD}</td>
    <td class="pl-3"></td>
  `;
  tbody.appendChild(tfoot);

  // === Deal Register Table ===
  const dealBody = document.getElementById('roiDealBody');
  dealBody.innerHTML = '';
  // Sort deals by fee descending
  const sortedDeals = [...deals].sort((a, b) => b.fee - a.fee);
  sortedDeals.forEach(d => {
    const catKey = SOURCE_TO_CATEGORY[d.source];
    const catLabel = catKey ? CAT_LABELS[catKey] : 'Organic';
    const catColor = catKey ? COLORS[catKey] : '#7a7a8e';
    const tr = document.createElement('tr');
    tr.className = 'border-t border-plx-border hover:bg-plx-bg/50 transition-colors';
    tr.innerHTML = `
      <td class="py-2.5 pr-3 text-plx-dim text-xs whitespace-nowrap">${d.date}</td>
      <td class="py-2.5 pr-3 font-medium text-plx-text">${d.company}</td>
      <td class="py-2.5 pr-3 text-plx-dim">${d.role}</td>
      <td class="py-2.5 px-2 text-right font-mono font-medium text-plx-text">${fmt(d.fee)}</td>
      <td class="py-2.5 px-2"><span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background:${catColor}15; color:${catColor}">${d.source}</span></td>
      <td class="py-2.5 px-2"><span class="text-xs text-plx-dim">${catLabel}</span></td>
      <td class="py-2.5 px-2 text-plx-dim">${d.consultant || '—'}</td>
    `;
    dealBody.appendChild(tr);
  });
}

// ========== DETAILS ==========
function renderDetails() {
  const data = getData();
  const select = document.getElementById('detailCategory');
  const currentVal = select.value;
  select.innerHTML = '';
  CAT_KEYS.forEach(key => {
    if (!data.categories[key]) return;
    const opt = document.createElement('option');
    opt.value = key; opt.textContent = CAT_LABELS[key];
    select.appendChild(opt);
  });
  if (currentVal && data.categories[currentVal]) select.value = currentVal;
  select.onchange = () => renderDetailContent();
  renderDetailContent();
}

function renderDetailContent() {
  const data = getData();
  const key = document.getElementById('detailCategory').value;
  const cat = data.categories[key];
  if (!cat) return;

  // Category budget summary bar
  const allocated = cat.budget;
  const itemBudgetTotal = Object.values(cat.items || {}).reduce((s, it) => s + (it.budget || 0), 0);
  const budgetRemaining = allocated - itemBudgetTotal;
  const actualTotal = cat.actual;
  const allocPct = allocated > 0 ? Math.min(100, Math.round(itemBudgetTotal / allocated * 100)) : 0;

  const summaryDiv = document.getElementById('categoryBudgetBar');
  summaryDiv.innerHTML = `
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${COLORS[key]}"></span>
        <span class="text-sm font-bold text-plx-text">${CAT_LABELS[key]}</span>
      </div>
      <div class="flex items-center gap-5 text-sm">
        <div><span class="text-plx-dim">Allocated:</span> <span class="editable-cell font-bold text-plx-text" id="editAllocated" data-cat="${key}" title="Click to reallocate">${fmt(allocated)}</span></div>
        <div><span class="text-plx-dim">Item Budgets:</span> <span class="font-bold text-plx-blue">${fmt(itemBudgetTotal)}</span></div>
        <div><span class="text-plx-dim">Remaining:</span> <span class="font-bold ${budgetRemaining >= 0 ? 'under-budget' : 'over-budget'}">${fmt(budgetRemaining)}</span></div>
        <div><span class="text-plx-dim">Actual Spent:</span> <span class="font-bold text-plx-orange">${fmt(actualTotal)}</span></div>
      </div>
    </div>
    <div class="w-full h-2 bg-plx-bg rounded-full overflow-hidden">
      <div class="h-full rounded-full transition-all" style="width:${allocPct}%; background:${budgetRemaining >= 0 ? C.blue : C.red}"></div>
    </div>
    ${budgetRemaining < 0 ? `<div class="text-xs over-budget mt-1.5 font-medium">Item budgets exceed category allocation by ${fmt(Math.abs(budgetRemaining))}</div>` : ''}
  `;

  // Editable table
  const tableDiv = document.getElementById('detailTable');
  let html = '<table class="w-full text-sm"><thead>';
  html += '<tr class="text-plx-dim text-xs uppercase">';
  html += '<th class="text-left py-2 pr-2" style="min-width:120px">Item</th>';
  html += '<th class="text-right py-2 px-1" style="min-width:62px">Type</th>';
  MONTHS.forEach(m => html += `<th class="text-right py-2 px-1" style="min-width:56px">${m}</th>`);
  html += '<th class="text-right py-2 px-1" style="min-width:68px">Total</th>';
  html += '<th class="text-right py-2 px-1" style="min-width:60px">Var</th>';
  html += '<th class="py-2 pl-2" style="min-width:56px"></th>';
  html += '</tr></thead><tbody>';

  Object.entries(cat.items || {}).forEach(([name, item]) => {
    const mBudget = item.monthlyBudget || new Array(12).fill(0);
    const budgetTotal = mBudget.reduce((a, b) => a + b, 0);
    const actualTotal = item.monthlyActual.reduce((a, b) => a + b, 0);
    const variance = budgetTotal - actualTotal;
    const isRecurring = item.recurring || false;
    const escapedName = name.replace(/"/g, '&quot;');

    // Budget sub-row
    html += `<tr class="border-t border-plx-border/50">`;
    html += `<td class="py-1 pr-2" rowspan="2"><span class="editable-cell text-xs text-plx-text font-medium" data-cat="${key}" data-item="${escapedName}" data-field="name">${name}</span></td>`;
    html += `<td class="text-right px-1 py-1"><span class="editable-cell font-mono text-xs text-plx-blue" data-cat="${key}" data-item="${escapedName}" data-field="budget" title="Click to set total (distributes evenly)">${fmt(budgetTotal)}</span><div class="text-[9px] text-plx-blue uppercase font-bold mt-0.5">Budget</div></td>`;
    mBudget.forEach((v, mi) => {
      html += `<td class="text-right px-1 py-1"><span class="editable-cell font-mono text-xs ${v > 0 ? 'text-plx-blue' : 'text-plx-dim'}" data-cat="${key}" data-item="${escapedName}" data-budget-month="${mi}">${v > 0 ? Math.round(v).toLocaleString('en-GB') : '\u00B7'}</span></td>`;
    });
    html += `<td class="text-right px-1 font-mono text-xs text-plx-blue font-semibold py-1">${fmt(budgetTotal)}</td>`;
    html += `<td class="text-right px-1 py-1"></td>`; // no variance on budget row
    html += `<td class="pl-2 py-1"><div class="flex items-center gap-1">`;
    html += `<button class="detail-action-btn ${isRecurring ? 'active' : ''}" data-action="recurring" data-cat="${key}" data-item="${escapedName}" title="${isRecurring ? 'Disable recurring' : 'Recurring (fixed monthly cost)'}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg></button>`;
    html += `<button class="detail-action-btn" data-action="delete" data-cat="${key}" data-item="${escapedName}" title="Remove item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
    html += `</div></td></tr>`;

    // Actual sub-row
    html += `<tr>`;
    html += `<td class="text-right px-1 py-1"><div class="text-[9px] text-plx-orange uppercase font-bold">Actual</div></td>`;
    item.monthlyActual.forEach((v, mi) => {
      html += `<td class="text-right px-1 py-1"><span class="editable-cell font-mono text-xs ${v > 0 ? 'text-plx-text' : 'text-plx-dim'}" data-cat="${key}" data-item="${escapedName}" data-month="${mi}">${v > 0 ? Math.round(v).toLocaleString('en-GB') : '\u00B7'}</span></td>`;
    });
    html += `<td class="text-right px-1 font-mono text-xs text-plx-text font-semibold py-1">${fmt(actualTotal)}</td>`;
    html += `<td class="text-right px-1 font-mono text-xs ${variance >= 0 ? 'under-budget' : 'over-budget'} py-1">${variance >= 0 ? '+' : ''}${fmt(variance)}</td>`;
    html += `<td class="py-1"></td></tr>`;
  });

  // Totals rows (budget + actual)
  const catBudgetMonthly = new Array(12).fill(0);
  const catActualMonthly = [...cat.monthlyActual];
  Object.values(cat.items || {}).forEach(item => {
    (item.monthlyBudget || []).forEach((v, i) => { catBudgetMonthly[i] += v; });
  });
  const catBudgetSum = catBudgetMonthly.reduce((a, b) => a + b, 0);
  const catActualSum = catActualMonthly.reduce((a, b) => a + b, 0);
  const catVar = catBudgetSum - catActualSum;

  // Budget totals row
  html += '<tr class="border-t-2 border-plx-border font-semibold"><td class="py-1 pr-2 text-plx-text text-xs" rowspan="2">Total</td>';
  html += `<td class="text-right px-1 py-1"><div class="text-[9px] text-plx-blue uppercase font-bold">Budget</div></td>`;
  for (let m = 0; m < 12; m++) {
    const val = catBudgetMonthly[m];
    html += `<td class="text-right px-1 font-mono text-xs text-plx-blue py-1">${val > 0 ? Math.round(val).toLocaleString('en-GB') : '\u00B7'}</td>`;
  }
  html += `<td class="text-right px-1 font-mono text-plx-blue font-bold text-xs py-1">${fmt(catBudgetSum)}</td>`;
  html += `<td class="text-right px-1 py-1"></td><td class="py-1"></td></tr>`;

  // Actual totals row
  html += '<tr class="font-semibold">';
  html += `<td class="text-right px-1 py-1"><div class="text-[9px] text-plx-orange uppercase font-bold">Actual</div></td>`;
  for (let m = 0; m < 12; m++) {
    const val = catActualMonthly[m];
    html += `<td class="text-right px-1 font-mono text-xs text-plx-text py-1">${val > 0 ? Math.round(val).toLocaleString('en-GB') : '\u00B7'}</td>`;
  }
  html += `<td class="text-right px-1 font-mono text-plx-orange font-bold text-xs py-1">${fmt(catActualSum)}</td>`;
  html += `<td class="text-right px-1 font-mono ${catVar >= 0 ? 'under-budget' : 'over-budget'} font-bold text-xs py-1">${catVar >= 0 ? '+' : ''}${fmt(catVar)}</td>`;
  html += '<td class="py-1"></td></tr></tbody></table>';
  tableDiv.innerHTML = html;

  // Attach handlers
  tableDiv.querySelectorAll('.editable-cell[data-budget-month]').forEach(cell => {
    cell.addEventListener('click', () => startEditBudgetCell(cell));
  });
  tableDiv.querySelectorAll('.editable-cell[data-month]').forEach(cell => {
    cell.addEventListener('click', () => startEditCell(cell));
  });
  tableDiv.querySelectorAll('.editable-cell[data-field="budget"]').forEach(cell => {
    cell.addEventListener('click', () => startEditBudget(cell));
  });
  tableDiv.querySelectorAll('.editable-cell[data-field="name"]').forEach(cell => {
    cell.addEventListener('click', () => startEditName(cell));
  });
  tableDiv.querySelectorAll('.detail-action-btn[data-action="recurring"]').forEach(btn => {
    btn.addEventListener('click', () => toggleRecurring(btn));
  });
  tableDiv.querySelectorAll('.detail-action-btn[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', () => deleteItem(btn));
  });
  document.getElementById('addItemBtn').onclick = () => addItem(key);

  // Editable category allocation
  const allocEl = document.getElementById('editAllocated');
  if (allocEl) allocEl.addEventListener('click', () => startEditAllocated(allocEl));
}

// Recalculate category totals from item data
function recalcCategory(catKey) {
  const data = getData();
  const cat = data.categories[catKey];
  if (!cat) return;
  for (let m = 0; m < 12; m++) {
    cat.monthlyActual[m] = Object.values(cat.items).reduce((s, it) => s + (it.monthlyActual[m] || 0), 0);
    cat.monthlyBudget[m] = Object.values(cat.items).reduce((s, it) => s + ((it.monthlyBudget && it.monthlyBudget[m]) || 0), 0);
  }
  cat.actual = cat.monthlyActual.reduce((a, b) => a + b, 0);
  Object.values(cat.items).forEach(item => {
    item.actual = item.monthlyActual.reduce((a, b) => a + b, 0);
    if (item.monthlyBudget) {
      item.budget = item.monthlyBudget.reduce((a, b) => a + b, 0);
    }
  });
}

// Edit monthly actual cell
function startEditCell(cell) {
  if (cell.querySelector('input')) return;
  const catKey = cell.dataset.cat;
  const itemName = cell.dataset.item;
  const monthIdx = parseInt(cell.dataset.month);
  const data = getData();
  const item = data.categories[catKey]?.items?.[itemName];
  if (!item) return;

  const currentVal = item.monthlyActual[monthIdx] || 0;
  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentVal > 0 ? Math.round(currentVal) : '';
  input.min = '0';
  input.step = '1';
  cell.textContent = '';
  cell.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    const newVal = parseFloat(input.value) || 0;
    if (item.recurring) {
      // Recurring: fill all months with this value
      for (let m = 0; m < 12; m++) item.monthlyActual[m] = newVal;
    } else {
      item.monthlyActual[monthIdx] = newVal;
    }
    recalcCategory(catKey);
    renderDetailContent();
    saveToLocalStorage();
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      cell.textContent = currentVal > 0 ? Math.round(currentVal).toLocaleString('en-GB') : '\u00B7';
      cell.className = `editable-cell font-mono text-xs ${currentVal > 0 ? 'text-plx-text' : 'text-plx-dim'}`;
      cell.addEventListener('click', () => startEditCell(cell));
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      input.blur();
      const nextCell = cell.closest('td').nextElementSibling?.querySelector('.editable-cell');
      if (nextCell) nextCell.click();
    }
  });
}

// Edit monthly budget cell
function startEditBudgetCell(cell) {
  if (cell.querySelector('input')) return;
  const catKey = cell.dataset.cat;
  const itemName = cell.dataset.item;
  const monthIdx = parseInt(cell.dataset.budgetMonth);
  const data = getData();
  const cat = data.categories[catKey];
  const item = cat?.items?.[itemName];
  if (!item) return;
  if (!item.monthlyBudget) item.monthlyBudget = new Array(12).fill(0);

  const currentVal = item.monthlyBudget[monthIdx] || 0;
  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentVal > 0 ? Math.round(currentVal) : '';
  input.min = '0';
  input.step = '1';
  cell.textContent = '';
  cell.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    let newVal = parseFloat(input.value) || 0;
    // Budget enforcement: cap total item budgets at category allocation
    const otherItemBudgets = Object.entries(cat.items)
      .filter(([n]) => n !== itemName)
      .reduce((s, [, it]) => s + (it.monthlyBudget || []).reduce((a,b) => a+b, 0), 0);
    const thisItemOtherMonths = item.monthlyBudget.reduce((s, v, i) => i === monthIdx ? s : s + v, 0);
    const wouldBeTotal = otherItemBudgets + thisItemOtherMonths + (item.recurring ? newVal * 12 : newVal);
    if (wouldBeTotal > cat.budget) {
      const maxAllowed = Math.max(0, cat.budget - otherItemBudgets - thisItemOtherMonths);
      newVal = item.recurring ? Math.floor(maxAllowed / 12) : maxAllowed;
    }
    if (item.recurring) {
      for (let m = 0; m < 12; m++) item.monthlyBudget[m] = newVal;
    } else {
      item.monthlyBudget[monthIdx] = newVal;
    }
    item.budget = item.monthlyBudget.reduce((a, b) => a + b, 0);
    recalcCategory(catKey);
    renderDetailContent();
    saveToLocalStorage();
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      cell.textContent = currentVal > 0 ? Math.round(currentVal).toLocaleString('en-GB') : '\u00B7';
      cell.className = `editable-cell font-mono text-xs ${currentVal > 0 ? 'text-plx-blue' : 'text-plx-dim'}`;
      cell.addEventListener('click', () => startEditBudgetCell(cell));
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      input.blur();
      const nextCell = cell.closest('td').nextElementSibling?.querySelector('.editable-cell');
      if (nextCell) nextCell.click();
    }
  });
}

// Edit item budget
function startEditBudget(cell) {
  if (cell.querySelector('input')) return;
  const catKey = cell.dataset.cat;
  const itemName = cell.dataset.item;
  const data = getData();
  const cat = data.categories[catKey];
  const item = cat?.items?.[itemName];
  if (!item) return;

  const currentVal = item.budget || 0;
  const input = document.createElement('input');
  input.type = 'number';
  input.value = currentVal > 0 ? Math.round(currentVal) : '';
  input.min = '0';
  input.step = '1';
  cell.textContent = '';
  cell.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    let newVal = parseFloat(input.value) || 0;
    // Check if this would exceed category allocation
    const otherItemBudgets = Object.entries(cat.items)
      .filter(([n]) => n !== itemName)
      .reduce((s, [, it]) => s + ((it.monthlyBudget || []).reduce((a,b) => a+b, 0) || it.budget || 0), 0);
    if (otherItemBudgets + newVal > cat.budget) {
      newVal = Math.max(0, cat.budget - otherItemBudgets);
    }
    item.budget = newVal;
    // Distribute evenly across 12 months
    if (!item.monthlyBudget) item.monthlyBudget = new Array(12).fill(0);
    const perMonth = Math.floor(newVal / 12);
    for (let m = 0; m < 12; m++) item.monthlyBudget[m] = perMonth;
    item.monthlyBudget[11] += newVal - (perMonth * 12);
    recalcCategory(catKey);
    renderDetailContent();
    saveToLocalStorage();
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      cell.textContent = fmt(currentVal);
      cell.addEventListener('click', () => startEditBudget(cell));
    }
  });
}

// Edit item name
function startEditName(cell) {
  if (cell.querySelector('input')) return;
  const catKey = cell.dataset.cat;
  const itemName = cell.dataset.item;
  const data = getData();
  const cat = data.categories[catKey];
  if (!cat?.items?.[itemName]) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = itemName;
  cell.textContent = '';
  cell.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    const newName = input.value.trim();
    if (newName && newName !== itemName && !cat.items[newName]) {
      cat.items[newName] = cat.items[itemName];
      delete cat.items[itemName];
    }
    renderDetailContent();
    saveToLocalStorage();
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      cell.textContent = itemName;
      cell.addEventListener('click', () => startEditName(cell));
    }
  });
}

// Toggle recurring (fixed monthly cost)
function toggleRecurring(btn) {
  const catKey = btn.dataset.cat;
  const itemName = btn.dataset.item;
  const data = getData();
  const item = data.categories[catKey]?.items?.[itemName];
  if (!item) return;

  item.recurring = !item.recurring;
  if (item.recurring) {
    // Fill all months with first non-zero value for actuals
    const val = item.monthlyActual.find(v => v > 0) || 0;
    if (val > 0) {
      for (let m = 0; m < 12; m++) item.monthlyActual[m] = val;
    }
    // Fill all months with first non-zero value for budgets
    if (item.monthlyBudget) {
      const bVal = item.monthlyBudget.find(v => v > 0) || 0;
      if (bVal > 0) {
        for (let m = 0; m < 12; m++) item.monthlyBudget[m] = bVal;
        item.budget = item.monthlyBudget.reduce((a, b) => a + b, 0);
      }
    }
    recalcCategory(catKey);
  }
  renderDetailContent();
  saveToLocalStorage();
}

// Add new line item
function addItem(catKey) {
  const data = getData();
  const cat = data.categories[catKey];
  if (!cat) return;

  let name = 'New Item';
  let counter = 1;
  while (cat.items[name]) name = `New Item ${++counter}`;

  cat.items[name] = {
    budget: 0, actual: 0,
    monthlyBudget: new Array(12).fill(0),
    monthlyActual: new Array(12).fill(0),
    recurring: false
  };

  renderDetailContent();
  saveToLocalStorage();

  // Auto-focus the new item's name for editing
  setTimeout(() => {
    const nameCell = document.querySelector(`.editable-cell[data-cat="${catKey}"][data-item="${name}"][data-field="name"]`);
    if (nameCell) nameCell.click();
  }, 50);
}

// Delete line item
function deleteItem(btn) {
  const catKey = btn.dataset.cat;
  const itemName = btn.dataset.item;
  const data = getData();
  const cat = data.categories[catKey];
  if (!cat?.items?.[itemName]) return;

  delete cat.items[itemName];
  recalcCategory(catKey);
  renderDetailContent();
  saveToLocalStorage();
}

// Edit category allocated budget (mid-year reallocation)
function startEditAllocated(el) {
  if (el.querySelector('input')) return;
  const catKey = el.dataset.cat;
  const data = getData();
  const cat = data.categories[catKey];
  if (!cat) return;

  const currentVal = cat.budget;
  const input = document.createElement('input');
  input.type = 'number';
  input.value = Math.round(currentVal);
  input.min = '0';
  input.step = '100';
  el.textContent = '';
  el.appendChild(input);
  input.focus();
  input.select();

  const commit = () => {
    const newVal = parseFloat(input.value) || 0;
    cat.budget = newVal;
    renderDetailContent();
    saveToLocalStorage();
  };

  input.addEventListener('blur', commit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      el.textContent = fmt(currentVal);
      el.addEventListener('click', () => startEditAllocated(el));
    }
  });
}

// ========== PERSISTENCE ==========
const STORAGE_KEY = 'plexus-budget-data';

function getSerializableState() {
  // Save full data for all years (budgets, actuals, items, recurring flags)
  const dataSnapshot = {};
  Object.entries(datasets).forEach(([yearKey, yearData]) => {
    dataSnapshot[yearKey] = {};
    CAT_KEYS.forEach(key => {
      const cat = yearData.categories[key];
      if (!cat) return;
      const catSnap = {
        budget: cat.budget,
        actual: cat.actual,
        monthlyBudget: [...cat.monthlyBudget],
        monthlyActual: [...cat.monthlyActual],
        items: {}
      };
      Object.entries(cat.items || {}).forEach(([name, item]) => {
        catSnap.items[name] = {
          budget: item.budget || 0,
          actual: item.actual || 0,
          monthlyBudget: [...(item.monthlyBudget || new Array(12).fill(0))],
          monthlyActual: [...item.monthlyActual],
          recurring: item.recurring || false
        };
      });
      dataSnapshot[yearKey][key] = catSnap;
    });
  });
  return {
    version: 2,
    savedAt: new Date().toISOString(),
    totalBudget,
    sliderValues: { ...sliderValues },
    lockedCategories: [...lockedCategories],
    currentYear,
    data: dataSnapshot
  };
}

function applyState(state) {
  if (!state || !state.version) return false;

  if (state.data) {
    // Recreate FY 2026/27 dataset if it was saved
    if (state.data['2027']) {
      const snap = state.data['2027'];
      const newData = { totalBudget: 0, categories: {} };
      CAT_KEYS.forEach(key => {
        const catSnap = snap[key];
        if (!catSnap) return;
        newData.totalBudget += catSnap.budget || 0;
        const items = {};
        Object.entries(catSnap.items || {}).forEach(([name, itemSnap]) => {
          // Migration: derive monthlyBudget from budget if missing
          let mBudget = itemSnap.monthlyBudget;
          if (!mBudget) {
            const b = itemSnap.budget || 0;
            const pm = Math.floor(b / 12);
            mBudget = new Array(12).fill(pm);
            mBudget[11] += b - (pm * 12);
          }
          items[name] = {
            budget: itemSnap.budget || 0,
            actual: itemSnap.actual || 0,
            monthlyBudget: [...mBudget],
            monthlyActual: [...(itemSnap.monthlyActual || new Array(12).fill(0))],
            recurring: itemSnap.recurring || false
          };
        });
        newData.categories[key] = {
          budget: catSnap.budget || 0,
          actual: catSnap.actual || 0,
          monthlyBudget: [...(catSnap.monthlyBudget || new Array(12).fill(0))],
          monthlyActual: [...(catSnap.monthlyActual || new Array(12).fill(0))],
          items
        };
      });
      datasets['2027'] = newData;

      // Add to year selector
      const yearSelect = document.getElementById('yearSelect');
      if (yearSelect && !yearSelect.querySelector('option[value="2027"]')) {
        const opt = document.createElement('option');
        opt.value = '2027';
        opt.textContent = 'FY 2026/27 (Planned)';
        yearSelect.insertBefore(opt, yearSelect.firstChild);
      }
    }

    // Restore other years
    Object.entries(state.data).forEach(([yearKey, yearSnapshot]) => {
      if (yearKey === '2027') return; // already handled
      const yearData = datasets[yearKey];
      if (!yearData) return;
      Object.entries(yearSnapshot).forEach(([catKey, catSnapshot]) => {
        const cat = yearData.categories[catKey];
        if (!cat) return;

        // v2 format: full restore including items, budgets, recurring
        if (state.version >= 2 && catSnapshot.budget !== undefined) {
          cat.budget = catSnapshot.budget;
          cat.actual = catSnapshot.actual;
          if (catSnapshot.monthlyBudget) cat.monthlyBudget = [...catSnapshot.monthlyBudget];
          cat.monthlyActual = [...catSnapshot.monthlyActual];
          // Replace items entirely (handles adds/deletes/renames)
          cat.items = {};
          Object.entries(catSnapshot.items || {}).forEach(([name, itemSnap]) => {
            // Migration: derive monthlyBudget from budget if missing
            let mBudget = itemSnap.monthlyBudget;
            if (!mBudget) {
              const b = itemSnap.budget || 0;
              const pm = Math.floor(b / 12);
              mBudget = new Array(12).fill(pm);
              mBudget[11] += b - (pm * 12);
            }
            cat.items[name] = {
              budget: itemSnap.budget || 0,
              actual: itemSnap.actual || 0,
              monthlyBudget: [...mBudget],
              monthlyActual: [...(itemSnap.monthlyActual || new Array(12).fill(0))],
              recurring: itemSnap.recurring || false
            };
          });
        } else {
          // v1 format: actuals only (backward compat)
          cat.actual = catSnapshot.actual;
          cat.monthlyActual = [...catSnapshot.monthlyActual];
          Object.entries(catSnapshot.items || {}).forEach(([name, itemSnap]) => {
            const item = cat.items?.[name];
            if (!item) return;
            item.actual = itemSnap.actual;
            item.monthlyActual = [...itemSnap.monthlyActual];
          });
        }
      });
    });
  }

  // Restore modelling state
  if (state.totalBudget) totalBudget = state.totalBudget;
  if (state.sliderValues) sliderValues = { ...state.sliderValues };
  if (state.lockedCategories) lockedCategories = new Set(state.lockedCategories);
  if (state.currentYear && datasets[state.currentYear]) currentYear = state.currentYear;

  return true;
}

function saveToLocalStorage() {
  try {
    const state = getSerializableState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    showSaveIndicator();
    // Also sync to server (which handles Google Sheets sync too)
    saveToServer(state);
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

let _serverSaveTimer = null;
function saveToServer(state) {
  clearTimeout(_serverSaveTimer);
  _serverSaveTimer = setTimeout(() => {
    fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    }).then(r => r.json()).then(res => {
      if (res.ok) console.log('Synced to server');
    }).catch(e => console.warn('Server sync failed (offline?):', e));
  }, 500);
}

async function loadFromServer() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    if (json.ok && json.data) {
      return applyState(json.data);
    }
    return false;
  } catch (e) {
    console.warn('Could not load from server:', e);
    return false;
  }
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return applyState(JSON.parse(raw));
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return false;
  }
}

function exportData() {
  const state = getSerializableState();
  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `plexus-budget-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const state = JSON.parse(ev.target.result);
        if (applyState(state)) {
          saveToLocalStorage();
          // Re-init UI with restored state
          initSlidersFromState();
          syncTotalBudgetUI();
          updatePlanner();
          showImportSuccess();
        } else {
          alert('Invalid budget data file.');
        }
      } catch (err) {
        alert('Could not read file: ' + err.message);
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

// ========== SPREADSHEET EXPORT ==========
function exportSpreadsheet() {
  const YEAR_LABELS = { '2026': 'FY 2025-26', '2024-45k': 'FY 2024-25', '2027': 'FY 2026-27' };
  const rows = [];

  // Header row
  const header = ['Year', 'Category', 'Item', 'Annual Budget', 'Annual Actual', 'Variance'];
  MONTHS.forEach(m => { header.push(m + ' Budget'); header.push(m + ' Actual'); });
  rows.push(header);

  // Data rows for each year
  Object.keys(datasets).forEach(yearKey => {
    const yearLabel = YEAR_LABELS[yearKey] || yearKey;
    const yearData = datasets[yearKey];

    CAT_KEYS.forEach(catKey => {
      const cat = yearData.categories[catKey];
      if (!cat) return;

      // Category subtotal row
      const catRow = [yearLabel, CAT_LABELS[catKey], '(Category Total)', cat.budget, cat.actual, cat.budget - cat.actual];
      for (let m = 0; m < 12; m++) {
        catRow.push(cat.monthlyBudget?.[m] || 0);
        catRow.push(cat.monthlyActual?.[m] || 0);
      }
      rows.push(catRow);

      // Individual items
      Object.entries(cat.items || {}).forEach(([name, item]) => {
        const itemRow = [yearLabel, CAT_LABELS[catKey], name, item.budget, item.actual, item.budget - item.actual];
        for (let m = 0; m < 12; m++) {
          itemRow.push(item.monthlyBudget?.[m] || 0);
          itemRow.push(item.monthlyActual?.[m] || 0);
        }
        rows.push(itemRow);
      });
    });
  });

  // Build CSV
  const csv = rows.map(row =>
    row.map(cell => {
      const str = String(cell);
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? '"' + str.replace(/"/g, '""') + '"' : str;
    }).join(',')
  ).join('\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `plexus-budget-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Init sliders from restored state (without resetting sliderValues)
function initSlidersFromState() {
  const baseline = getModelBaseline();
  const container = document.getElementById('slidersContainer');
  container.innerHTML = '';

  CAT_KEYS.forEach(key => {
    const cat = baseline.categories[key];
    if (!cat) return;
    // Use existing sliderValues if available
    if (!(key in sliderValues)) sliderValues[key] = cat.budget;
    const maxVal = Math.max((sliderValues[key] || cat.budget) * 3, totalBudget * 0.6);

    const div = document.createElement('div');
    div.className = 'card p-4';
    div.id = `card-${key}`;
    const isLocked = lockedCategories.has(key);
    div.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full flex-shrink-0" style="background:${COLORS[key]}"></span>
          <span class="text-sm font-semibold text-plx-text">${CAT_LABELS[key]}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[11px] text-plx-dim" title="FY 2025/26 budget">Last yr: ${fmt(cat.budget)}</span>
          <span class="text-[11px] text-plx-dim" title="FY 2025/26 actual spent">Actual: ${fmt(cat.actual)}</span>
          <span class="text-sm font-mono text-plx-text font-semibold" id="val-${key}">${fmt(sliderValues[key])}</span>
          <div class="flex items-center gap-0.5">
            <input type="number" id="num-${key}" value="${totalBudget > 0 ? Math.round(sliderValues[key] / totalBudget * 100) : 0}" min="0" max="100" step="1"
              class="w-16 text-right text-sm font-mono border border-plx-border rounded-lg px-2 py-1.5 text-plx-text outline-none focus:border-plx-blue ${isLocked ? 'opacity-50' : ''}" ${isLocked ? 'disabled' : ''} />
            <span class="text-xs text-plx-dim">%</span>
          </div>
          <button id="lock-${key}" class="lock-btn w-8 h-8 rounded-lg border border-plx-border flex items-center justify-center text-plx-dim hover:border-plx-blue ${isLocked ? 'locked' : ''}" title="${isLocked ? 'Unlock' : 'Lock (fixed cost)'}">
            ${isLocked ? lockIconLocked() : lockIconUnlocked()}
          </button>
        </div>
      </div>
      <input type="range" id="slider-${key}" min="0" max="${Math.round(maxVal)}" step="100" value="${Math.round(sliderValues[key])}"
        class="w-full slider-track ${isLocked ? 'locked' : ''}" style="background: linear-gradient(to right, ${COLORS[key]} ${(sliderValues[key]/maxVal*100)}%, ${C.border} ${(sliderValues[key]/maxVal*100)}%);" />
      <div class="flex justify-between mt-1">
        <span class="text-[10px] text-plx-dim">${fmt(0)}</span>
        <span class="text-[10px] text-plx-dim">${fmt(maxVal)}</span>
      </div>
    `;
    container.appendChild(div);

    const slider = div.querySelector(`#slider-${key}`);
    const numInput = div.querySelector(`#num-${key}`);
    const lockBtn = div.querySelector(`#lock-${key}`);

    slider.addEventListener('input', () => {
      if (lockedCategories.has(key)) return;
      const val = parseInt(slider.value);
      adjustOthers(key, val);
      updatePlanner();
      saveToLocalStorage();
    });

    numInput.addEventListener('input', () => {
      if (lockedCategories.has(key)) return;
      let pctVal = parseFloat(numInput.value) || 0;
      pctVal = Math.max(0, Math.min(pctVal, 100));
      const val = Math.round(totalBudget * pctVal / 100);
      adjustOthers(key, val);
      updatePlanner();
      saveToLocalStorage();
    });

    lockBtn.addEventListener('click', () => {
      if (lockedCategories.has(key)) {
        lockedCategories.delete(key);
        lockBtn.classList.remove('locked');
        lockBtn.innerHTML = lockIconUnlocked();
        lockBtn.title = 'Lock (fixed cost)';
        slider.classList.remove('locked');
        numInput.disabled = false;
        numInput.classList.remove('opacity-50');
      } else {
        lockedCategories.add(key);
        lockBtn.classList.add('locked');
        lockBtn.innerHTML = lockIconLocked();
        lockBtn.title = 'Unlock';
        slider.classList.add('locked');
        numInput.disabled = true;
        numInput.classList.add('opacity-50');
      }
      saveToLocalStorage();
    });
  });
}

function showSaveIndicator() {
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  el.textContent = 'Saved';
  el.classList.remove('opacity-0');
  el.classList.add('opacity-100');
  setTimeout(() => {
    el.classList.remove('opacity-100');
    el.classList.add('opacity-0');
  }, 1500);
}

function showImportSuccess() {
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  el.textContent = 'Imported!';
  el.classList.remove('opacity-0');
  el.classList.add('opacity-100');
  setTimeout(() => {
    el.classList.remove('opacity-100');
    el.classList.add('opacity-0');
  }, 2000);
}

// ========== APPLY AS FY 2026/27 BUDGET ==========
function applyAsBudget() {
  const baseline = getModelBaseline(); // FY 2025/26

  // Build a new dataset from the current slider values
  const newData = { totalBudget: totalBudget, categories: {} };

  CAT_KEYS.forEach(key => {
    const baseCat = baseline.categories[key];
    if (!baseCat) return;
    const newBudget = sliderValues[key] || 0;

    // Distribute monthly budget proportionally from baseline pattern
    const baseMonthlyTotal = baseCat.monthlyBudget.reduce((a,b) => a+b, 0);
    let monthlyBudget;
    if (baseMonthlyTotal > 0) {
      // Keep the same monthly shape, scaled to new budget
      monthlyBudget = baseCat.monthlyBudget.map(m => Math.round(m / baseMonthlyTotal * newBudget));
      // Fix rounding: adjust last month to make sum exact
      const sum = monthlyBudget.reduce((a,b) => a+b, 0);
      monthlyBudget[11] += newBudget - sum;
    } else {
      // No monthly pattern — spread evenly
      const perMonth = Math.round(newBudget / 12);
      monthlyBudget = new Array(12).fill(perMonth);
      monthlyBudget[11] = newBudget - perMonth * 11;
    }

    // Distribute item budgets proportionally
    const items = {};
    const baseItemTotal = Object.values(baseCat.items).reduce((s, it) => s + (it.budget || 0), 0);
    Object.entries(baseCat.items).forEach(([name, baseItem]) => {
      let itemBudget;
      if (baseItemTotal > 0) {
        itemBudget = Math.round((baseItem.budget / baseItemTotal) * newBudget);
      } else {
        itemBudget = Math.round(newBudget / Object.keys(baseCat.items).length);
      }
      // Generate item-level monthlyBudget scaled from category monthly pattern
      let itemMonthlyBudget;
      if (newBudget > 0 && itemBudget > 0) {
        itemMonthlyBudget = monthlyBudget.map(m => Math.round(m * (itemBudget / newBudget)));
        const mSum = itemMonthlyBudget.reduce((a,b) => a+b, 0);
        itemMonthlyBudget[11] += itemBudget - mSum;
      } else {
        const perMonth = Math.floor(itemBudget / 12);
        itemMonthlyBudget = new Array(12).fill(perMonth);
        itemMonthlyBudget[11] += itemBudget - (perMonth * 12);
      }
      items[name] = {
        budget: itemBudget,
        actual: 0,
        monthlyBudget: itemMonthlyBudget,
        monthlyActual: new Array(12).fill(0)
      };
    });

    // Fix item rounding
    const itemSum = Object.values(items).reduce((s, it) => s + it.budget, 0);
    const firstItem = Object.keys(items)[0];
    if (firstItem) items[firstItem].budget += newBudget - itemSum;

    newData.categories[key] = {
      budget: newBudget,
      actual: 0,
      monthlyBudget,
      monthlyActual: new Array(12).fill(0),
      items
    };
  });

  // Register the new dataset
  datasets['2027'] = newData;

  // Add to year selector if not already there
  const yearSelect = document.getElementById('yearSelect');
  if (!yearSelect.querySelector('option[value="2027"]')) {
    const opt = document.createElement('option');
    opt.value = '2027';
    opt.textContent = 'FY 2026/27 (Planned)';
    yearSelect.insertBefore(opt, yearSelect.firstChild);
  }

  // Switch to the new year and show tracking
  currentYear = '2027';
  yearSelect.value = '2027';

  saveToLocalStorage();

  // Show confirmation
  const el = document.getElementById('saveIndicator');
  if (el) {
    el.textContent = 'FY 26/27 Budget Applied!';
    el.classList.remove('opacity-0');
    el.classList.add('opacity-100');
    setTimeout(() => { el.classList.remove('opacity-100'); el.classList.add('opacity-0'); }, 2500);
  }

  // Switch to tracking tab to show the new budget
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const trackingBtn = document.querySelector('.tab-btn[data-tab="tracking"]');
  if (trackingBtn) trackingBtn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.getElementById('tab-tracking')?.classList.remove('hidden');
  renderTracking();
}

document.getElementById('btnApplyBudget')?.addEventListener('click', applyAsBudget);

// Wire up header buttons
document.getElementById('btnExport')?.addEventListener('click', exportData);
document.getElementById('btnImport')?.addEventListener('click', importData);
document.getElementById('btnSpreadsheet')?.addEventListener('click', exportSpreadsheet);

// ========== INIT ==========
Chart.defaults.font.family = 'system-ui, Avenir, Helvetica, Arial, sans-serif';

function initApp(hasState) {
  if (hasState) {
    initSlidersFromState();
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect && datasets[currentYear]) yearSelect.value = currentYear;
  } else {
    initSliders();
  }
  syncTotalBudgetUI();
  updatePlanner();
}

// Init with defaults immediately so page isn't blank
initApp(false);

// Then try loading config + saved data (server first, then localStorage)
(async () => {
  let loaded = false;
  try {
    const res = await fetch('/api/data');
    const json = await res.json();
    if (json.ok && json.data && json.data.version) {
      loaded = applyState(json.data);
      if (loaded) {
        console.log('Loaded data from server');
        initApp(true);
        return;
      }
    }
  } catch (e) {
    console.warn('Server load failed:', e);
  }

  // Fall back to localStorage
  const localLoaded = loadFromLocalStorage();
  if (localLoaded) {
    console.log('Loaded data from localStorage');
    initApp(true);
    // Push to server if server was empty
    saveToServer(getSerializableState());
  } else {
    console.log('No saved data found');
  }
})();
