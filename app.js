/* ============================================================
   MUSIC LEAGUE – APP LOGIC
   All data stored in localStorage. No backend required.
   ============================================================ */

'use strict';

// ---- CONSTANTS ---- //
const STORAGE_KEY = 'ml_state';
const QUICK_THEMES = [
  'Best Cover Song','Deep Cuts','Songs That Make You Cry',
  'Songs from a Movie','Instrumentals Only','Best Breakup Song',
  'One-Hit Wonders','80s Classics','Songs for a Road Trip',
  'Walk-Up Songs','Songs Under 2 Minutes','Your Guilty Pleasure',
  'Best Intro','Found on TikTok','Best Guitar Solo',
  'Songs for a Cold Rainy Day','Artist My Parent Should Know',
  'Songs That Hit Different at 2AM','Best Live Song','Hidden Gems',
];

// Demo song catalog (Spotify-free mock data)
const SONG_CATALOG = [
  {id:'s001',title:'Blinding Lights',artist:'The Weeknd',album:'After Hours',emoji:'🌃'},
  {id:'s002',title:'As It Was',artist:'Harry Styles',album:"Harry's House",emoji:'🏠'},
  {id:'s003',title:'Flowers',artist:'Miley Cyrus',album:'Endless Summer Vacation',emoji:'🌸'},
  {id:'s004',title:'Anti-Hero',artist:'Taylor Swift',album:'Midnights',emoji:'🦸'},
  {id:'s005',title:'Heat Waves',artist:'Glass Animals',album:'Dreamland',emoji:'🌊'},
  {id:'s006',title:'Stay',artist:'The Kid LAROI & Justin Bieber',album:'F*CK LOVE 3',emoji:'💙'},
  {id:'s007',title:'Levitating',artist:'Dua Lipa',album:'Future Nostalgia',emoji:'✨'},
  {id:'s008',title:'Drivers License',artist:'Olivia Rodrigo',album:'SOUR',emoji:'🚗'},
  {id:'s009',title:'Bad Guy',artist:'Billie Eilish',album:'When We All Fall Asleep',emoji:'😈'},
  {id:'s010',title:'Watermelon Sugar',artist:'Harry Styles',album:'Fine Line',emoji:'🍉'},
  {id:'s011',title:'Peaches',artist:'Justin Bieber',album:'Justice',emoji:'🍑'},
  {id:'s012',title:'Good 4 U',artist:'Olivia Rodrigo',album:'SOUR',emoji:'😤'},
  {id:'s013',title:'Industry Baby',artist:'Lil Nas X & Jack Harlow',album:'MONTERO',emoji:'🏭'},
  {id:'s014',title:'Butter',artist:'BTS',album:'Butter',emoji:'🧈'},
  {id:'s015',title:'Kiss Me More',artist:'Doja Cat ft. SZA',album:'Planet Her',emoji:'💋'},
  {id:'s016',title:'Montero',artist:'Lil Nas X',album:'MONTERO',emoji:'😈'},
  {id:'s017',title:'Leave The Door Open',artist:'Silk Sonic',album:'An Evening with Silk Sonic',emoji:'🚪'},
  {id:'s018',title:'Happier Than Ever',artist:'Billie Eilish',album:'Happier Than Ever',emoji:'😭'},
  {id:'s019',title:'Save Your Tears',artist:'The Weeknd',album:'After Hours',emoji:'😢'},
  {id:'s020',title:'Positions',artist:'Ariana Grande',album:'Positions',emoji:'💖'},
  {id:'s021',title:'Dynamite',artist:'BTS',album:'Dynamite',emoji:'💥'},
  {id:'s022',title:'Midnight Rain',artist:'Taylor Swift',album:'Midnights',emoji:'🌙'},
  {id:'s023',title:'Running Up That Hill',artist:'Kate Bush',album:"Hounds of Love",emoji:'🏃'},
  {id:'s024',title:'Cruel Summer',artist:'Taylor Swift',album:'Lover',emoji:'☀️'},
  {id:'s025',title:'Mr. Brightside',artist:'The Killers',album:'Hot Fuss',emoji:'🌅'},
  {id:'s026',title:'Africa',artist:'Toto',album:'Toto IV',emoji:'🌍'},
  {id:'s027',title:'Dreams',artist:'Fleetwood Mac',album:'Rumours',emoji:'☁️'},
  {id:'s028',title:'Take On Me',artist:'a-ha',album:'Hunting High and Low',emoji:'📺'},
  {id:'s029',title:'Don\'t Stop Me Now',artist:'Queen',album:'Jazz',emoji:'🎸'},
  {id:'s030',title:'Bohemian Rhapsody',artist:'Queen',album:'A Night at the Opera',emoji:'🎭'},
  {id:'s031',title:'Hotel California',artist:'Eagles',album:'Hotel California',emoji:'🏨'},
  {id:'s032',title:'Purple Rain',artist:'Prince',album:'Purple Rain',emoji:'☔'},
  {id:'s033',title:'Like a Rolling Stone',artist:'Bob Dylan',album:'Highway 61 Revisited',emoji:'🎹'},
  {id:'s034',title:'Smells Like Teen Spirit',artist:'Nirvana',album:'Nevermind',emoji:'🧼'},
  {id:'s035',title:'Lose Yourself',artist:'Eminem',album:'8 Mile',emoji:'🎤'},
  {id:'s036',title:'God\'s Plan',artist:'Drake',album:'Scary Hours',emoji:'🙏'},
  {id:'s037',title:'Sicko Mode',artist:'Travis Scott',album:'Astroworld',emoji:'🌀'},
  {id:'s038',title:'Redbone',artist:'Childish Gambino',album:'Awaken My Love!',emoji:'🦴'},
  {id:'s039',title:'DNA.',artist:'Kendrick Lamar',album:'DAMN.',emoji:'🧬'},
  {id:'s040',title:'HUMBLE.',artist:'Kendrick Lamar',album:'DAMN.',emoji:'🙇'},
  {id:'s041',title:'FourFiveSeconds',artist:'Rihanna & Kanye West',album:'ANTi',emoji:'⏰'},
  {id:'s042',title:'Shake It Off',artist:'Taylor Swift',album:'1989',emoji:'💃'},
  {id:'s043',title:'Royals',artist:'Lorde',album:'Pure Heroine',emoji:'👑'},
  {id:'s044',title:'Pumped Up Kicks',artist:'Foster The People',album:'Torches',emoji:'👟'},
  {id:'s045',title:'Somebody That I Used To Know',artist:'Gotye',album:'Making Mirrors',emoji:'👥'},
  {id:'s046',title:'Rolling in the Deep',artist:'Adele',album:'21',emoji:'🎶'},
  {id:'s047',title:'Set Fire to the Rain',artist:'Adele',album:'21',emoji:'🔥'},
  {id:'s048',title:'Someone Like You',artist:'Adele',album:'21',emoji:'💔'},
  {id:'s049',title:'Riptide',artist:'Vance Joy',album:'Dream Your Life Away',emoji:'🌊'},
  {id:'s050',title:'Budapest',artist:'George Ezra',album:'Wanted on Voyage',emoji:'🏛️'},
];

// Color palette for league card avatars
const LEAGUE_COLORS = [
  'linear-gradient(135deg,#9e00c4,#c044e8)',
  'linear-gradient(135deg,#1db954,#17a349)',
  'linear-gradient(135deg,#0070f3,#00c6ff)',
  'linear-gradient(135deg,#f5a623,#e8890d)',
  'linear-gradient(135deg,#e74c3c,#c0392b)',
  'linear-gradient(135deg,#2ecc71,#27ae60)',
  'linear-gradient(135deg,#e040fb,#aa00ff)',
  'linear-gradient(135deg,#00bcd4,#0097a7)',
];

// ---- STATE ---- //
let state = loadState();
let currentUser = null;
let currentLeagueId = null;
let currentRoundId = null;
let selectedSong = null;
let searchTimeout = null;

function defaultState() {
  return {
    users: {},        // id -> user obj
    leagues: {},      // id -> league obj
    rounds: {},       // id -> round obj
    submissions: {},  // id -> submission obj
    votes: {},        // id -> vote obj
    comments: {},     // id -> comment obj
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---- ID GENERATOR ---- //
function uid(prefix = 'id') {
  return prefix + '_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function inviteCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ---- TOAST ---- //
function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = (icons[type] || '') + ' ' + msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .4s'; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ---- MODAL HELPERS ---- //
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

document.addEventListener('click', e => {
  const closeBtn = e.target.closest('[data-close]');
  if (closeBtn) closeModal(closeBtn.dataset.close);
  // Close modal on overlay click
  if (e.target.classList.contains('modal-overlay') && !e.target.classList.contains('hidden')) {
    if (e.target.id !== 'authOverlay') e.target.classList.add('hidden');
  }
});

// ---- AUTH ---- //
function showLoginPanel() {
  document.getElementById('loginPanel').classList.remove('hidden');
  document.getElementById('signupPanel').classList.add('hidden');
}
function showSignupPanel() {
  document.getElementById('signupPanel').classList.remove('hidden');
  document.getElementById('loginPanel').classList.add('hidden');
}

document.getElementById('showSignup').addEventListener('click', e => { e.preventDefault(); showSignupPanel(); });
document.getElementById('showLogin').addEventListener('click', e => { e.preventDefault(); showLoginPanel(); });

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;
  const user = Object.values(state.users).find(u => u.email === email);
  if (!user || user.password !== btoa(pass)) { showToast('Invalid email or password', 'error'); return; }
  loginUser(user);
});

document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPassword').value;
  if (Object.values(state.users).find(u => u.email === email)) { showToast('Email already in use', 'error'); return; }
  const user = { id: uid('u'), name, email, password: btoa(pass), createdAt: Date.now() };
  state.users[user.id] = user;
  saveState();
  loginUser(user);
  showToast(`Welcome, ${name}! 🎵`, 'success');
});

document.getElementById('demoBtn').addEventListener('click', () => {
  // Create or find demo user
  let demo = Object.values(state.users).find(u => u.email === 'demo@musicleague.app');
  if (!demo) {
    demo = { id: uid('u'), name: 'Demo Player', email: 'demo@musicleague.app', password: '', createdAt: Date.now() };
    state.users[demo.id] = demo;
  }
  // Seed demo data
  if (!Object.values(state.leagues).find(l => l.ownerId === demo.id)) {
    seedDemoData(demo.id);
  }
  saveState();
  loginUser(demo);
  showToast('Logged in as Demo Player 🎮', 'info');
});

function loginUser(user) {
  currentUser = user;
  sessionStorage.setItem('ml_user', user.id);
  closeModal('authOverlay');
  document.getElementById('appShell').classList.remove('hidden');
  document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
  document.getElementById('userNameDisplay').textContent = user.name;
  document.getElementById('dashGreeting').textContent = `Welcome back, ${user.name.split(' ')[0]}!`;
  renderDashboard();
}

document.getElementById('logoutLink').addEventListener('click', e => {
  e.preventDefault();
  currentUser = null;
  sessionStorage.removeItem('ml_user');
  document.getElementById('appShell').classList.add('hidden');
  openModal('authOverlay');
  showLoginPanel();
});

// Auto-login from session
window.addEventListener('DOMContentLoaded', () => {
  const savedId = sessionStorage.getItem('ml_user');
  if (savedId && state.users[savedId]) {
    loginUser(state.users[savedId]);
  } else {
    openModal('authOverlay');
  }
  populateQuickThemes();
  setupTabs();
  setupNavigation();
  setupLeagueButtons();
  setupRoundButtons();
  setupSearchHandlers();
  setupJoinForm();
  setupInviteHandlers();
});

// ---- NAVIGATION ---- //
function setupNavigation() {
  document.querySelectorAll('.nav-item[data-view]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showView(link.dataset.view);
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = document.getElementById('view-' + viewId);
  if (v) {
    v.classList.add('active');
    if (viewId === 'dashboard') renderDashboard();
    if (viewId === 'leagues') renderLeaguesView();
    if (viewId === 'history') renderHistory();
  }
}

// ---- TABS ---- //
function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parent = tab.closest('.tabs').parentElement;
      parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById(tab.dataset.tab);
      if (content) content.classList.add('active');
    });
  });
}

// ---- LEAGUE BUTTONS ---- //
function setupLeagueButtons() {
  document.getElementById('createLeagueBtn').addEventListener('click', () => openModal('createLeagueOverlay'));
  document.getElementById('createLeagueBtn2').addEventListener('click', () => openModal('createLeagueOverlay'));
  document.getElementById('createLeagueBtn3').addEventListener('click', () => openModal('createLeagueOverlay'));
  document.getElementById('joinLeagueBtn').addEventListener('click', () => openModal('joinLeagueOverlay'));
  document.getElementById('joinLeagueBtn2').addEventListener('click', () => openModal('joinLeagueOverlay'));
  document.getElementById('backToLeagues').addEventListener('click', () => showView('leagues'));

  document.getElementById('createLeagueForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) return;
    const name = document.getElementById('leagueName').value.trim();
    const totalRounds = parseInt(document.getElementById('leagueRounds').value);
    const votingWindow = parseInt(document.getElementById('votingWindow').value);
    const votesPerPlayer = parseInt(document.getElementById('votesPerPlayer').value);
    const description = document.getElementById('leagueDesc').value.trim();
    const colorIdx = Math.floor(Math.random() * LEAGUE_COLORS.length);
    const league = {
      id: uid('lg'),
      name, description, totalRounds, votingWindow, votesPerPlayer,
      ownerId: currentUser.id,
      memberIds: [currentUser.id],
      roundIds: [],
      inviteCode: inviteCode(),
      colorIdx,
      createdAt: Date.now(),
      status: 'active',
    };
    state.leagues[league.id] = league;
    saveState();
    closeModal('createLeagueOverlay');
    document.getElementById('createLeagueForm').reset();
    showToast(`League "${name}" created! 🏆`, 'success');
    openLeagueDetail(league.id);
  });
}

// ---- JOIN LEAGUE ---- //
function setupJoinForm() {
  document.getElementById('joinLeagueForm').addEventListener('submit', e => {
    e.preventDefault();
    const code = document.getElementById('joinCode').value.trim().toUpperCase();
    const league = Object.values(state.leagues).find(l => l.inviteCode === code);
    if (!league) { showToast('Invalid invite code', 'error'); return; }
    if (league.memberIds.includes(currentUser.id)) { showToast('You are already in this league!', 'info'); closeModal('joinLeagueOverlay'); openLeagueDetail(league.id); return; }
    league.memberIds.push(currentUser.id);
    saveState();
    closeModal('joinLeagueOverlay');
    document.getElementById('joinLeagueForm').reset();
    showToast(`Joined "${league.name}"! 🎉`, 'success');
    openLeagueDetail(league.id);
  });
}

// ---- ROUND BUTTONS ---- //
function setupRoundButtons() {
  document.getElementById('addRoundBtn').addEventListener('click', () => openModal('addRoundOverlay'));
  document.getElementById('backToLeagueFromRound').addEventListener('click', () => {
    if (currentLeagueId) openLeagueDetail(currentLeagueId);
    else showView('leagues');
  });

  document.getElementById('addRoundForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!currentLeagueId) return;
    const league = state.leagues[currentLeagueId];
    if (!league) return;
    const theme = document.getElementById('roundTheme').value.trim();
    const desc = document.getElementById('roundDesc').value.trim();
    const round = {
      id: uid('rnd'),
      leagueId: currentLeagueId,
      theme, description: desc,
      status: 'open',       // open | voting | results
      submissionIds: [],
      createdAt: Date.now(),
      votingDeadline: Date.now() + league.votingWindow * 3600000,
      number: league.roundIds.length + 1,
    };
    state.rounds[round.id] = round;
    league.roundIds.push(round.id);
    saveState();
    closeModal('addRoundOverlay');
    document.getElementById('addRoundForm').reset();
    showToast(`Round "${theme}" added!`, 'success');
    renderLeagueDetail(currentLeagueId);
  });
}

// ---- INVITE HANDLERS ---- //
function setupInviteHandlers() {
  document.getElementById('copyInviteCode').addEventListener('click', () => {
    const code = document.getElementById('inviteCodeDisplay').textContent;
    navigator.clipboard.writeText(code).then(() => showToast('Invite code copied!', 'success')).catch(() => showToast('Code: ' + code, 'info'));
  });
}

// ---- SEARCH HANDLERS ---- //
function setupSearchHandlers() {
  const input = document.getElementById('songSearch');
  const results = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.add('hidden'); return; }
    searchTimeout = setTimeout(() => {
      const matches = SONG_CATALOG.filter(s =>
        s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
      ).slice(0, 8);
      renderSearchResults(matches, results);
    }, 200);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrapper')) results.classList.add('hidden');
  });

  document.getElementById('clearSong').addEventListener('click', () => {
    selectedSong = null;
    document.getElementById('selectedSongDisplay').classList.add('hidden');
    document.getElementById('submitSongBtn').disabled = true;
    input.value = '';
    input.focus();
  });

  document.getElementById('submitSongForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!selectedSong || !currentRoundId || !currentUser) return;
    const round = state.rounds[currentRoundId];
    if (!round) return;
    const comment = document.getElementById('songComment').value.trim();

    // Check if user already submitted
    const existing = round.submissionIds.map(id => state.submissions[id]).find(s => s && s.userId === currentUser.id);
    if (existing) { showToast('You already submitted for this round!', 'error'); return; }

    const submission = {
      id: uid('sub'),
      roundId: currentRoundId,
      userId: currentUser.id,
      song: selectedSong,
      comment,
      createdAt: Date.now(),
      votes: 0,
    };
    state.submissions[submission.id] = submission;
    round.submissionIds.push(submission.id);

    // Add initial comment if provided
    if (comment) {
      const commentObj = { id: uid('cmt'), submissionId: submission.id, userId: currentUser.id, text: comment, createdAt: Date.now() };
      state.comments[commentObj.id] = commentObj;
    }

    // Auto-advance to voting if all members submitted
    const league = state.leagues[round.leagueId];
    const submittedUserIds = round.submissionIds.map(id => state.submissions[id]?.userId);
    if (league && submittedUserIds.length >= league.memberIds.length) {
      round.status = 'voting';
      showToast('All submissions in — voting is now open! 🗳️', 'success');
    }

    saveState();
    closeModal('submitSongOverlay');
    document.getElementById('submitSongForm').reset();
    selectedSong = null;
    document.getElementById('selectedSongDisplay').classList.add('hidden');
    document.getElementById('submitSongBtn').disabled = true;
    showToast(`"${submission.song.title}" submitted! 🎵`, 'success');
    if (currentRoundId) openRoundDetail(currentRoundId);
  });
}

function renderSearchResults(songs, container) {
  container.innerHTML = '';
  if (songs.length === 0) {
    container.innerHTML = '<div style="padding:.75rem 1rem;font-size:.82rem;color:#999;">No songs found. Try another search.</div>';
    container.classList.remove('hidden');
    return;
  }
  songs.forEach(song => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <div class="result-art" style="font-size:1.2rem;display:flex;align-items:center;justify-content:center;">${song.emoji}</div>
      <div class="result-info"><span>${escHtml(song.title)}</span><small>${escHtml(song.artist)}</small></div>
    `;
    item.addEventListener('click', () => {
      selectSong(song);
      container.classList.add('hidden');
      document.getElementById('songSearch').value = '';
    });
    container.appendChild(item);
  });
  container.classList.remove('hidden');
}

function selectSong(song) {
  selectedSong = song;
  document.getElementById('selectedArt').textContent = song.emoji;
  document.getElementById('selectedArt').style.cssText = 'font-size:1.6rem;display:flex;align-items:center;justify-content:center;';
  document.getElementById('selectedTitle').textContent = song.title;
  document.getElementById('selectedArtist').textContent = song.artist;
  document.getElementById('selectedSongDisplay').classList.remove('hidden');
  document.getElementById('submitSongBtn').disabled = false;
}

// ---- QUICK THEMES ---- //
function populateQuickThemes() {
  const container = document.getElementById('quickThemeChips');
  const shuffled = [...QUICK_THEMES].sort(() => Math.random() - .5).slice(0, 10);
  shuffled.forEach(theme => {
    const chip = document.createElement('span');
    chip.className = 'theme-chip';
    chip.textContent = theme;
    chip.addEventListener('click', () => {
      document.getElementById('roundTheme').value = theme;
    });
    container.appendChild(chip);
  });
}

// ---- RENDER DASHBOARD ---- //
function renderDashboard() {
  if (!currentUser) return;
  renderActionItems();
  renderActiveLeaguesGrid();
}

function renderActionItems() {
  const container = document.getElementById('actionItems');
  const items = [];
  const myLeagues = getMyLeagues();

  myLeagues.forEach(league => {
    league.roundIds.forEach(rid => {
      const round = state.rounds[rid];
      if (!round) return;
      if (round.status === 'open') {
        const alreadySubmitted = round.submissionIds.some(sid => state.submissions[sid]?.userId === currentUser.id);
        if (!alreadySubmitted) {
          items.push({
            icon: '🎵',
            title: `Submit to "${round.theme}"`,
            sub: `${league.name} · Round ${round.number}`,
            action: () => { openSubmitModal(round.id); },
            btnLabel: 'SUBMIT',
            btnClass: 'btn-primary',
          });
        }
      }
      if (round.status === 'voting') {
        const myVotes = getMyVotesForRound(round.id);
        const maxVotes = league.votesPerPlayer;
        if (myVotes.length < maxVotes) {
          items.push({
            icon: '🗳️',
            title: `Vote in "${round.theme}"`,
            sub: `${league.name} · ${maxVotes - myVotes.length} votes remaining`,
            action: () => { openRoundDetail(round.id); },
            btnLabel: 'VOTE',
            btnClass: 'btn-outline',
          });
        }
      }
    });
  });

  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div class="empty-state-small">No pending actions — you\'re all caught up! 🎉</div>';
    return;
  }
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'action-item';
    el.innerHTML = `
      <div class="action-item-icon">${item.icon}</div>
      <div class="action-item-text"><strong>${escHtml(item.title)}</strong><small>${escHtml(item.sub)}</small></div>
      <button class="btn ${item.btnClass} btn-sm">${item.btnLabel}</button>
    `;
    el.querySelector('button').addEventListener('click', item.action);
    container.appendChild(el);
  });
}

function renderActiveLeaguesGrid() {
  const container = document.getElementById('activeLeaguesGrid');
  const leagues = getMyLeagues().filter(l => l.status !== 'completed');
  if (leagues.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎵</div>
        <p>No active leagues yet.</p>
        <button class="btn btn-primary" id="createLeagueBtn2b">Create your first league</button>
      </div>`;
    document.getElementById('createLeagueBtn2b')?.addEventListener('click', () => openModal('createLeagueOverlay'));
    return;
  }
  container.innerHTML = '';
  leagues.forEach(league => container.appendChild(buildLeagueCard(league)));
}

// ---- RENDER LEAGUES VIEW ---- //
function renderLeaguesView() {
  const active = getMyLeagues().filter(l => l.status !== 'completed');
  const completed = getMyLeagues().filter(l => l.status === 'completed');

  const activeContainer = document.getElementById('allActiveLeagues');
  const completedContainer = document.getElementById('allCompletedLeagues');

  activeContainer.innerHTML = '';
  if (active.length === 0) {
    activeContainer.innerHTML = `<div class="empty-state"><div class="empty-icon">🏆</div><p>No active leagues.</p></div>`;
  } else {
    active.forEach(l => activeContainer.appendChild(buildLeagueCard(l)));
  }

  completedContainer.innerHTML = '';
  if (completed.length === 0) {
    completedContainer.innerHTML = `<div class="empty-state"><div class="empty-icon">🏁</div><p>No completed leagues yet.</p></div>`;
  } else {
    completed.forEach(l => completedContainer.appendChild(buildLeagueCard(l)));
  }
}

function buildLeagueCard(league) {
  const rounds = league.roundIds.map(id => state.rounds[id]).filter(Boolean);
  const completedRounds = rounds.filter(r => r.status === 'results').length;
  const currentRound = rounds.find(r => r.status === 'open' || r.status === 'voting');
  const memberCount = league.memberIds.length;
  const pct = league.totalRounds > 0 ? Math.round((completedRounds / league.totalRounds) * 100) : 0;
  const myScore = getPlayerScore(league.id, currentUser.id);
  const status = currentRound ? (currentRound.status === 'voting' ? 'Voting Open' : 'Accepting Submissions') : (completedRounds >= league.totalRounds ? 'Completed' : 'Awaiting Rounds');
  const statusClass = currentRound?.status === 'voting' ? 'status-voting' : (completedRounds >= league.totalRounds ? 'status-completed' : 'status-active');
  const color = LEAGUE_COLORS[league.colorIdx % LEAGUE_COLORS.length];

  const card = document.createElement('div');
  card.className = 'league-card';
  card.innerHTML = `
    <div class="league-card-header">
      <div class="league-card-avatar" style="background:${color};font-size:.0rem;">🎵</div>
      <div class="league-card-info">
        <div class="league-card-name">${escHtml(league.name)}</div>
        <span class="league-status ${statusClass}">${status}</span>
      </div>
    </div>
    <div class="progress-bar" style="margin:0 1.25rem .75rem;"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    <div class="league-card-body">
      <div class="league-stat"><strong>${completedRounds}/${league.totalRounds}</strong>Rounds</div>
      <div class="league-stat"><strong>${memberCount}</strong>Players</div>
      <div class="league-stat"><strong>${myScore}</strong>My Points</div>
    </div>
    <div class="league-card-footer">
      <span class="round-progress">${currentRound ? `Round ${currentRound.number}: ${escHtml(currentRound.theme.slice(0,25))}${currentRound.theme.length>25?'…':''}` : 'No active round'}</span>
      <button class="btn btn-sm btn-outline">OPEN</button>
    </div>
  `;
  card.querySelector('.league-card-avatar').style.fontSize = '1.2rem';
  card.querySelector('.league-card-avatar').textContent = '🎵';
  card.querySelector('button').addEventListener('click', e => { e.stopPropagation(); openLeagueDetail(league.id); });
  card.addEventListener('click', () => openLeagueDetail(league.id));
  return card;
}

// ---- LEAGUE DETAIL ---- //
function openLeagueDetail(leagueId) {
  currentLeagueId = leagueId;
  renderLeagueDetail(leagueId);
  showView('league-detail');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

function renderLeagueDetail(leagueId) {
  const league = state.leagues[leagueId];
  if (!league) return;

  document.getElementById('detailLeagueName').textContent = league.name;
  const status = league.status === 'completed' ? 'Completed' : 'Active';
  const badge = document.getElementById('detailLeagueStatus');
  badge.textContent = status;
  badge.className = 'league-status-badge ' + (league.status === 'completed' ? 'status-completed' : 'status-active');

  // Actions
  const actions = document.getElementById('leagueDetailActions');
  actions.innerHTML = '';
  if (league.ownerId === currentUser.id) {
    const invBtn = document.createElement('button');
    invBtn.className = 'btn btn-outline btn-sm';
    invBtn.textContent = 'INVITE';
    invBtn.addEventListener('click', () => {
      document.getElementById('inviteCodeDisplay').textContent = league.inviteCode;
      openModal('inviteOverlay');
    });
    actions.appendChild(invBtn);
  }

  // Add round button visibility
  document.getElementById('addRoundBtn').style.display = (league.ownerId === currentUser.id && league.roundIds.length < league.totalRounds) ? '' : 'none';

  // Rounds
  const roundsList = document.getElementById('roundsList');
  roundsList.innerHTML = '';
  if (league.roundIds.length === 0) {
    roundsList.innerHTML = `<div class="empty-state-small" style="padding:1.5rem;">No rounds yet. ${league.ownerId === currentUser.id ? 'Add the first round to get started!' : 'The league owner will add rounds.'}</div>`;
  } else {
    league.roundIds.forEach(rid => {
      const round = state.rounds[rid];
      if (round) roundsList.appendChild(buildRoundCard(round, league));
    });
  }

  // Leaderboard
  renderLeaderboard(league);

  // Meta
  const meta = document.getElementById('leagueMeta');
  meta.innerHTML = `
    <div class="meta-row"><span class="meta-label">Owner</span><span class="meta-value">${escHtml(state.users[league.ownerId]?.name || 'Unknown')}</span></div>
    <div class="meta-row"><span class="meta-label">Players</span><span class="meta-value">${league.memberIds.length}</span></div>
    <div class="meta-row"><span class="meta-label">Rounds</span><span class="meta-value">${league.roundIds.length} / ${league.totalRounds}</span></div>
    <div class="meta-row"><span class="meta-label">Votes / Player</span><span class="meta-value">${league.votesPerPlayer}</span></div>
    <div class="meta-row"><span class="meta-label">Voting Window</span><span class="meta-value">${league.votingWindow}h</span></div>
    <div class="meta-row"><span class="meta-label">Invite Code</span><span class="meta-value" style="font-weight:800;letter-spacing:.1em;color:var(--purple);">${league.inviteCode}</span></div>
  `;
}

function buildRoundCard(round, league) {
  const submissionCount = round.submissionIds.length;
  const memberCount = league.memberIds.length;
  const mySubmission = round.submissionIds.map(id => state.submissions[id]).find(s => s?.userId === currentUser.id);
  const myVotes = getMyVotesForRound(round.id);
  const chipClass = { open: 'chip-open', voting: 'chip-voting', results: 'chip-results' }[round.status] || 'chip-pending';
  const chipLabel = { open: 'Open', voting: 'Voting', results: 'Results' }[round.status] || 'Pending';

  let actionHtml = '';
  if (round.status === 'open' && !mySubmission) {
    actionHtml = `<div class="round-action"><button class="btn btn-sm btn-primary submit-btn">SUBMIT SONG</button></div>`;
  } else if (round.status === 'voting' && myVotes.length < league.votesPerPlayer) {
    actionHtml = `<div class="round-action"><button class="btn btn-sm btn-outline vote-btn">VOTE NOW (${league.votesPerPlayer - myVotes.length} left)</button></div>`;
  } else if (round.status === 'results' || mySubmission || round.status === 'voting') {
    actionHtml = `<div class="round-action"><button class="btn btn-sm btn-outline view-btn">VIEW ROUND</button></div>`;
  }

  // Owner controls
  let ownerControls = '';
  if (league.ownerId === currentUser.id) {
    if (round.status === 'open' && submissionCount > 0) {
      ownerControls = `<div class="round-action"><button class="btn btn-sm btn-outline advance-btn">CLOSE SUBMISSIONS → VOTING</button></div>`;
    } else if (round.status === 'voting') {
      ownerControls = `<div class="round-action"><button class="btn btn-sm btn-outline results-btn">REVEAL RESULTS</button></div>`;
    }
  }

  const card = document.createElement('div');
  card.className = 'round-card';
  card.innerHTML = `
    <div class="round-card-inner">
      <div class="round-number">${round.number}</div>
      <div class="round-info">
        <h4>${escHtml(round.theme)}</h4>
        <small>${submissionCount}/${memberCount} submissions${mySubmission ? ' · ✓ Submitted' : ''}</small>
      </div>
      <span class="round-status-chip ${chipClass}">${chipLabel}</span>
    </div>
    ${actionHtml}
    ${ownerControls}
  `;

  card.querySelector('.submit-btn')?.addEventListener('click', e => { e.stopPropagation(); openSubmitModal(round.id); });
  card.querySelector('.vote-btn')?.addEventListener('click', e => { e.stopPropagation(); openRoundDetail(round.id); });
  card.querySelector('.view-btn')?.addEventListener('click', e => { e.stopPropagation(); openRoundDetail(round.id); });
  card.querySelector('.advance-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    round.status = 'voting';
    saveState();
    renderLeagueDetail(currentLeagueId);
    showToast('Submissions closed — voting is open! 🗳️', 'success');
  });
  card.querySelector('.results-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    round.status = 'results';
    saveState();
    renderLeagueDetail(currentLeagueId);
    openRoundDetail(round.id);
    showToast('Results revealed! 🎉', 'success');
  });
  card.addEventListener('click', () => openRoundDetail(round.id));
  return card;
}

function renderLeaderboard(league) {
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = '';
  const scores = league.memberIds.map(uid => ({
    user: state.users[uid],
    score: getPlayerScore(league.id, uid),
  })).sort((a, b) => b.score - a.score);

  const medals = ['🥇','🥈','🥉'];
  scores.forEach((entry, i) => {
    if (!entry.user) return;
    const isMe = entry.user.id === currentUser.id;
    const row = document.createElement('div');
    row.className = 'leaderboard-row' + (isMe ? ' lb-row-me' : '');
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    row.innerHTML = `
      <div class="lb-rank ${rankClass}">${medals[i] || i+1}</div>
      <div class="lb-avatar">${entry.user.name.charAt(0)}</div>
      <div class="lb-name">${escHtml(entry.user.name)}${isMe ? ' (you)' : ''}</div>
      <div class="lb-pts">${entry.score} pts</div>
    `;
    lb.appendChild(row);
  });
}

function getPlayerScore(leagueId, userId) {
  const league = state.leagues[leagueId];
  if (!league) return 0;
  let total = 0;
  league.roundIds.forEach(rid => {
    const round = state.rounds[rid];
    if (!round || round.status !== 'results') return;
    round.submissionIds.forEach(sid => {
      const sub = state.submissions[sid];
      if (sub && sub.userId === userId) total += sub.votes;
    });
  });
  return total;
}

// ---- ROUND DETAIL ---- //
function openRoundDetail(roundId) {
  currentRoundId = roundId;
  renderRoundDetail(roundId);
  showView('round-detail');
}

function renderRoundDetail(roundId) {
  const round = state.rounds[roundId];
  if (!round) return;
  const league = state.leagues[round.leagueId];
  if (!league) return;

  document.getElementById('detailRoundTheme').textContent = round.theme;
  document.getElementById('detailRoundStatus').textContent = { open: 'Accepting Submissions', voting: 'Voting Open', results: 'Results Revealed' }[round.status] || '';

  const actions = document.getElementById('roundDetailActions');
  actions.innerHTML = '';

  const submissionPhase = document.getElementById('submissionPhaseUI');
  const playlistUI = document.getElementById('playlistUI');
  const votingSidebar = document.getElementById('votingSidebar');

  submissionPhase.innerHTML = '';
  playlistUI.innerHTML = '';
  votingSidebar.innerHTML = '';

  const mySubmission = round.submissionIds.map(id => state.submissions[id]).find(s => s?.userId === currentUser.id);

  // Phase banner
  const banner = document.createElement('div');
  if (round.status === 'open') {
    banner.className = 'phase-banner submit-phase';
    banner.innerHTML = `
      <div class="phase-info">
        <div class="phase-title">🎵 Submission Phase</div>
        <div class="phase-sub">${round.submissionIds.length}/${league.memberIds.length} players have submitted</div>
      </div>
      ${!mySubmission ? `<button class="btn btn-primary btn-sm" id="submitBtnInRound">SUBMIT MY SONG</button>` : '<span style="color:#2e7d32;font-weight:600;">✓ You submitted!</span>'}
    `;
  } else if (round.status === 'voting') {
    const myVotes = getMyVotesForRound(roundId);
    banner.className = 'phase-banner vote-phase';
    banner.innerHTML = `
      <div class="phase-info">
        <div class="phase-title">🗳️ Voting Open</div>
        <div class="phase-sub">You have ${league.votesPerPlayer - myVotes.length} vote(s) remaining</div>
      </div>
      <span class="deadline-timer">Vote before time runs out!</span>
    `;
  } else {
    banner.className = 'phase-banner results-phase';
    banner.innerHTML = `
      <div class="phase-info">
        <div class="phase-title">🏆 Results</div>
        <div class="phase-sub">Voting is closed — here's how everyone voted!</div>
      </div>
    `;
  }
  submissionPhase.appendChild(banner);

  document.getElementById('submitBtnInRound')?.addEventListener('click', () => openSubmitModal(roundId));

  // Playlist / submissions
  if (round.status === 'open') {
    // Show only your own submission during submit phase
    if (mySubmission) {
      const heading = document.createElement('h3');
      heading.style.cssText = 'font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:.75rem;';
      heading.textContent = 'Your Submission';
      playlistUI.appendChild(heading);
      const list = document.createElement('div');
      list.className = 'track-list';
      list.appendChild(buildTrackCard(mySubmission, round, league, false));
      playlistUI.appendChild(list);
    } else {
      const hint = document.createElement('p');
      hint.style.cssText = 'color:var(--text-muted);font-size:.88rem;margin-top:1rem;';
      hint.textContent = 'Submit your song to see the playlist once voting opens.';
      playlistUI.appendChild(hint);
    }
  } else {
    // Voting / Results — show all submissions
    const heading = document.createElement('h3');
    heading.style.cssText = 'font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);margin-bottom:.75rem;';
    heading.textContent = round.status === 'results' ? 'Final Results' : 'Anonymous Playlist — Vote for your favorites';
    playlistUI.appendChild(heading);

    const submissions = round.submissionIds
      .map(id => state.submissions[id])
      .filter(Boolean)
      .sort((a, b) => b.votes - a.votes);

    if (submissions.length === 0) {
      const empty = document.createElement('p');
      empty.style.cssText = 'color:var(--text-muted);font-size:.88rem;';
      empty.textContent = 'No submissions yet.';
      playlistUI.appendChild(empty);
    } else {
      // Podium for results
      if (round.status === 'results' && submissions.length >= 2) {
        playlistUI.appendChild(buildPodium(submissions));
      }
      const list = document.createElement('div');
      list.className = 'track-list';
      const canVote = round.status === 'voting';
      submissions.forEach(sub => list.appendChild(buildTrackCard(sub, round, league, canVote)));
      playlistUI.appendChild(list);
    }
  }

  // Voting sidebar
  if (round.status === 'voting') {
    const myVotes = getMyVotesForRound(roundId);
    const remaining = league.votesPerPlayer - myVotes.length;
    const sidebar = document.createElement('div');
    sidebar.className = 'card';
    sidebar.innerHTML = `
      <h3>Your Votes</h3>
      <div class="votes-remaining">
        <div class="vr-count">${remaining}</div>
        <div class="vr-label">votes remaining</div>
      </div>
      <div class="voted-tracks-list" id="votedTracksList"></div>
    `;
    votingSidebar.appendChild(sidebar);
    renderVotedTracks(myVotes);
  } else if (round.status === 'results') {
    const myVotes = getMyVotesForRound(roundId);
    const myVotedSubs = myVotes.map(v => state.submissions[v.submissionId]).filter(Boolean);
    const sidebar = document.createElement('div');
    sidebar.className = 'card';
    sidebar.innerHTML = `<h3>You Voted For</h3><div class="voted-tracks-list" id="votedTracksList"></div>`;
    votingSidebar.appendChild(sidebar);
    renderVotedTracks(myVotes);
  }
}

function renderVotedTracks(votes) {
  const container = document.getElementById('votedTracksList');
  if (!container) return;
  container.innerHTML = '';
  if (votes.length === 0) {
    container.innerHTML = '<p style="font-size:.8rem;color:var(--text-muted);">No votes yet.</p>';
    return;
  }
  votes.forEach(v => {
    const sub = state.submissions[v.submissionId];
    if (!sub) return;
    const el = document.createElement('div');
    el.className = 'voted-track-mini';
    el.innerHTML = `<div class="art">${sub.song.emoji}</div><div class="info">${escHtml(sub.song.title)}</div>`;
    container.appendChild(el);
  });
}

function buildPodium(submissions) {
  const top = submissions.slice(0, 3);
  const order = top.length >= 3 ? [top[1], top[0], top[2]] : (top.length === 2 ? [top[1], top[0]] : [top[0]]);
  const places = ['second','first','third'];
  const medals = ['🥈','🥇','🥉'];
  const podium = document.createElement('div');
  podium.className = 'podium';
  order.forEach((sub, i) => {
    if (!sub) return;
    const place = document.createElement('div');
    place.className = `podium-place ${places[i] || ''}`;
    place.innerHTML = `
      <span class="podium-medal">${medals[i]}</span>
      <div class="podium-art" style="display:flex;align-items:center;justify-content:center;font-size:${i===1?'1.8rem':'1.4rem'};">${sub.song.emoji}</div>
      <div class="podium-song">${escHtml(sub.song.title)}</div>
      <div class="podium-pts">${sub.votes} pts</div>
    `;
    podium.appendChild(place);
  });
  return podium;
}

function buildTrackCard(submission, round, league, canVote) {
  const myVotes = getMyVotesForRound(round.id);
  const hasVotedForThis = myVotes.some(v => v.submissionId === submission.id);
  const isMySubmission = submission.userId === currentUser.id;
  const canVoteForThis = canVote && !isMySubmission;
  const showSubmitter = round.status === 'results' || isMySubmission;

  // Comments for this submission
  const comments = Object.values(state.comments).filter(c => c.submissionId === submission.id);

  // Rank
  const submissions = round.submissionIds.map(id => state.submissions[id]).filter(Boolean).sort((a,b) => b.votes - a.votes);
  const rank = submissions.indexOf(submission) + 1;

  const card = document.createElement('div');
  card.className = 'track-card' + (hasVotedForThis ? ' voted' : '');
  card.dataset.subId = submission.id;

  let footerHtml = '';
  if (comments.length > 0 || canVoteForThis || round.status === 'voting') {
    footerHtml = `
      <div class="track-footer">
        ${comments.length > 0 ? `<div class="track-comments">${comments.map(c => `<div class="track-comment"><strong>${escHtml(state.users[c.userId]?.name.split(' ')[0] || '?')}</strong>${escHtml(c.text)}</div>`).join('')}</div>` : ''}
        ${round.status !== 'open' ? `
          <div class="add-comment-form">
            <input type="text" placeholder="Add a comment..." class="comment-input" data-sub="${submission.id}" />
            <button class="btn btn-sm btn-outline comment-submit-btn" data-sub="${submission.id}">SEND</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  card.innerHTML = `
    <div class="track-header">
      ${round.status === 'results' ? `<div class="track-rank">${rank}</div>` : ''}
      <div class="track-art">${submission.song.emoji}</div>
      <div class="track-info">
        <span class="track-title">${escHtml(submission.song.title)}</span>
        <span class="track-artist">${escHtml(submission.song.artist)}</span>
        ${showSubmitter ? `<span class="track-submitter">Submitted by ${escHtml(state.users[submission.userId]?.name || '?')}</span>` : ''}
      </div>
      ${round.status !== 'open' ? `<span class="track-pts">${submission.votes > 0 ? '+' + submission.votes : '0'}</span>` : ''}
      ${canVoteForThis ? `<button class="track-vote-btn ${hasVotedForThis ? 'voted' : ''}" data-sub="${submission.id}" title="${hasVotedForThis ? 'Remove vote' : 'Vote'}">${hasVotedForThis ? '♥' : '♡'}</button>` : ''}
    </div>
    ${footerHtml}
  `;

  // Vote handler
  card.querySelector('.track-vote-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    toggleVote(submission.id, round, league);
  });

  // Comment handler
  card.querySelector('.comment-submit-btn')?.addEventListener('click', () => {
    const input = card.querySelector('.comment-input');
    const text = input.value.trim();
    if (!text) return;
    addComment(submission.id, text);
    input.value = '';
    openRoundDetail(currentRoundId);
  });
  card.querySelector('.comment-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const text = e.target.value.trim();
      if (!text) return;
      addComment(submission.id, text);
      e.target.value = '';
      openRoundDetail(currentRoundId);
    }
  });

  return card;
}

function toggleVote(submissionId, round, league) {
  const myVotes = getMyVotesForRound(round.id);
  const existing = myVotes.find(v => v.submissionId === submissionId);
  const submission = state.submissions[submissionId];
  if (!submission) return;

  if (existing) {
    // Remove vote
    delete state.votes[existing.id];
    submission.votes = Math.max(0, submission.votes - 1);
    saveState();
    renderRoundDetail(round.id);
    return;
  }
  // Add vote
  if (myVotes.length >= league.votesPerPlayer) {
    showToast(`You can only give ${league.votesPerPlayer} vote(s) per round`, 'error');
    return;
  }
  const vote = { id: uid('vt'), roundId: round.id, submissionId, userId: currentUser.id, createdAt: Date.now() };
  state.votes[vote.id] = vote;
  submission.votes = (submission.votes || 0) + 1;
  saveState();

  // Check if all votes are in (auto-reveal optional)
  const totalPossible = league.memberIds.length * league.votesPerPlayer;
  const totalCast = Object.values(state.votes).filter(v => v.roundId === round.id).length;
  if (totalCast >= totalPossible) {
    showToast('All votes are in! Results available.', 'info');
  }

  renderRoundDetail(round.id);
}

function addComment(submissionId, text) {
  const comment = { id: uid('cmt'), submissionId, userId: currentUser.id, text, createdAt: Date.now() };
  state.comments[comment.id] = comment;
  saveState();
}

function getMyVotesForRound(roundId) {
  return Object.values(state.votes).filter(v => v.roundId === roundId && v.userId === currentUser.id);
}

// ---- SUBMIT SONG MODAL ---- //
function openSubmitModal(roundId) {
  const round = state.rounds[roundId];
  if (!round) return;
  currentRoundId = roundId;
  const display = document.getElementById('submitRoundTheme');
  display.innerHTML = `<div class="label">Round Theme</div><div class="theme">${escHtml(round.theme)}</div>`;
  selectedSong = null;
  document.getElementById('selectedSongDisplay').classList.add('hidden');
  document.getElementById('submitSongBtn').disabled = true;
  document.getElementById('songSearch').value = '';
  document.getElementById('songComment').value = '';
  document.getElementById('searchResults').classList.add('hidden');
  openModal('submitSongOverlay');
}

// ---- RENDER HISTORY ---- //
function renderHistory() {
  const container = document.getElementById('historyList');
  container.innerHTML = '';
  const events = [];

  Object.values(state.submissions).forEach(sub => {
    if (sub.userId !== currentUser.id) return;
    const round = state.rounds[sub.roundId];
    if (!round || round.status !== 'results') return;
    const league = state.leagues[round.leagueId];
    if (!league) return;
    events.push({ type: 'submission', sub, round, league, ts: sub.createdAt });
  });

  events.sort((a, b) => b.ts - a.ts);

  if (events.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📖</div><p>No completed rounds yet. Your history will appear here once rounds reveal results.</p></div>`;
    return;
  }

  events.forEach(ev => {
    const el = document.createElement('div');
    el.className = 'history-item';
    el.innerHTML = `
      <div class="history-item-icon">${ev.sub.song.emoji}</div>
      <div class="history-item-info">
        <strong>${escHtml(ev.sub.song.title)} — ${escHtml(ev.sub.song.artist)}</strong>
        <small>${escHtml(ev.league.name)} · Round ${ev.round.number}: ${escHtml(ev.round.theme)}</small>
      </div>
      <div class="history-item-pts">${ev.sub.votes > 0 ? '+' + ev.sub.votes : '0'} pts</div>
    `;
    el.addEventListener('click', () => openRoundDetail(ev.round.id));
    container.appendChild(el);
  });
}

// ---- HELPERS ---- //
function getMyLeagues() {
  return Object.values(state.leagues).filter(l => l.memberIds.includes(currentUser?.id));
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---- SEED DEMO DATA ---- //
function seedDemoData(userId) {
  // Create 3 demo users
  const alice = { id: uid('u'), name: 'Alice Chen', email: 'alice@demo.com', password: '', createdAt: Date.now() - 86400000*10 };
  const bob   = { id: uid('u'), name: 'Bob Martinez', email: 'bob@demo.com', password: '', createdAt: Date.now() - 86400000*9 };
  const cara  = { id: uid('u'), name: 'Cara Nowak', email: 'cara@demo.com', password: '', createdAt: Date.now() - 86400000*8 };
  state.users[alice.id] = alice;
  state.users[bob.id]   = bob;
  state.users[cara.id]  = cara;

  // League 1: Active with one completed round and one voting round
  const league1 = {
    id: uid('lg'), name: 'Office Music Battle', description: 'Weekly music showdown',
    totalRounds: 5, votingWindow: 48, votesPerPlayer: 2, ownerId: userId,
    memberIds: [userId, alice.id, bob.id, cara.id],
    roundIds: [], inviteCode: inviteCode(), colorIdx: 0, createdAt: Date.now() - 86400000*7, status: 'active',
  };

  // Round 1 (completed)
  const round1 = {
    id: uid('rnd'), leagueId: league1.id, theme: 'Best Breakup Song', description: '',
    status: 'results', submissionIds: [], createdAt: Date.now() - 86400000*6, votingDeadline: Date.now() - 86400000*4, number: 1,
  };
  const sub1a = { id: uid('sub'), roundId: round1.id, userId, song: SONG_CATALOG[8], comment: "Nothing hits harder", votes: 3, createdAt: Date.now() - 86400000*5 };
  const sub1b = { id: uid('sub'), roundId: round1.id, userId: alice.id, song: SONG_CATALOG[47], comment: "Classic choice", votes: 5, createdAt: Date.now() - 86400000*5 };
  const sub1c = { id: uid('sub'), roundId: round1.id, userId: bob.id, song: SONG_CATALOG[45], comment: "Instant waterworks", votes: 4, createdAt: Date.now() - 86400000*5 };
  const sub1d = { id: uid('sub'), roundId: round1.id, userId: cara.id, song: SONG_CATALOG[7], comment: "This one still gets me", votes: 6, createdAt: Date.now() - 86400000*5 };
  round1.submissionIds = [sub1a.id, sub1b.id, sub1c.id, sub1d.id];
  [sub1a,sub1b,sub1c,sub1d].forEach(s => state.submissions[s.id] = s);

  // Add some votes for round 1
  const addVote = (rid, sid, uid2) => {
    const v = { id: uid('vt'), roundId: rid, submissionId: sid, userId: uid2, createdAt: Date.now() - 86400000*3 };
    state.votes[v.id] = v;
  };
  addVote(round1.id, sub1d.id, userId);
  addVote(round1.id, sub1b.id, userId);
  addVote(round1.id, sub1a.id, alice.id);
  addVote(round1.id, sub1d.id, alice.id);
  addVote(round1.id, sub1b.id, bob.id);
  addVote(round1.id, sub1d.id, bob.id);
  addVote(round1.id, sub1c.id, cara.id);
  addVote(round1.id, sub1b.id, cara.id);

  // Add some comments for round 1
  const cmt1 = { id: uid('cmt'), submissionId: sub1a.id, userId: alice.id, text: "Bold choice!", createdAt: Date.now() - 86400000*3 };
  const cmt2 = { id: uid('cmt'), submissionId: sub1d.id, userId: bob.id, text: "This round hit hard 😭", createdAt: Date.now() - 86400000*3 };
  state.comments[cmt1.id] = cmt1;
  state.comments[cmt2.id] = cmt2;

  // Round 2 (voting open)
  const round2 = {
    id: uid('rnd'), leagueId: league1.id, theme: 'Songs That Hit Different at 2AM',
    description: 'Night owl edition 🌙', status: 'voting', submissionIds: [],
    createdAt: Date.now() - 86400000*2, votingDeadline: Date.now() + 86400000*1, number: 2,
  };
  const sub2a = { id: uid('sub'), roundId: round2.id, userId: alice.id, song: SONG_CATALOG[21], comment: "Always hits at 2am", votes: 0, createdAt: Date.now() - 86400000*1 };
  const sub2b = { id: uid('sub'), roundId: round2.id, userId: bob.id, song: SONG_CATALOG[26], comment: "Pure nostalgia", votes: 0, createdAt: Date.now() - 86400000*1 };
  const sub2c = { id: uid('sub'), roundId: round2.id, userId: cara.id, song: SONG_CATALOG[38], comment: "Absolutely unmatched", votes: 0, createdAt: Date.now() - 86400000*1 };
  round2.submissionIds = [sub2a.id, sub2b.id, sub2c.id];
  [sub2a,sub2b,sub2c].forEach(s => state.submissions[s.id] = s);

  // Round 3 (open — needs user submission)
  const round3 = {
    id: uid('rnd'), leagueId: league1.id, theme: 'Best One-Hit Wonder',
    description: '', status: 'open', submissionIds: [],
    createdAt: Date.now() - 3600000, votingDeadline: Date.now() + 86400000*2, number: 3,
  };
  const sub3a = { id: uid('sub'), roundId: round3.id, userId: alice.id, song: SONG_CATALOG[44], comment: "Timeless", votes: 0, createdAt: Date.now() - 3600000 };
  const sub3b = { id: uid('sub'), roundId: round3.id, userId: bob.id, song: SONG_CATALOG[28], comment: "The ultimate one-hitter", votes: 0, createdAt: Date.now() - 3600000 };
  round3.submissionIds = [sub3a.id, sub3b.id];
  [sub3a,sub3b].forEach(s => state.submissions[s.id] = s);

  league1.roundIds = [round1.id, round2.id, round3.id];
  state.leagues[league1.id] = league1;
  state.rounds[round1.id] = round1;
  state.rounds[round2.id] = round2;
  state.rounds[round3.id] = round3;

  // League 2: Small league (2 members)
  const league2 = {
    id: uid('lg'), name: 'Road Trip Playlist Contest', description: '',
    totalRounds: 3, votingWindow: 72, votesPerPlayer: 3, ownerId: alice.id,
    memberIds: [alice.id, userId],
    roundIds: [], inviteCode: inviteCode(), colorIdx: 2, createdAt: Date.now() - 86400000*3, status: 'active',
  };
  const round4 = {
    id: uid('rnd'), leagueId: league2.id, theme: 'Songs for a Road Trip', description: '',
    status: 'open', submissionIds: [],
    createdAt: Date.now() - 86400000*1, votingDeadline: Date.now() + 86400000*3, number: 1,
  };
  league2.roundIds = [round4.id];
  state.leagues[league2.id] = league2;
  state.rounds[round4.id] = round4;
}
