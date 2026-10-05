/**
 * FANDOMVERSE ADVANCED APPLICATION CONTROLLER
 * Full SPA functionality, canvas hyperspace starfield, sound synthesis,
 * interactive sorting quiz, trivia engine, cart, bookmarks, event pass,
 * command palette (Ctrl+K), and Fandom AI 2.0.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // APPLICATION STATE & STORAGE
  // =========================================================================

  const State = {
    cart: JSON.parse(localStorage.getItem("fandomverse_cart") || "[]"),
    bookmarks: JSON.parse(localStorage.getItem("fandomverse_bookmarks") || "[]"),
    likes: JSON.parse(localStorage.getItem("fandomverse_likes") || "{}"),
    activePromo: localStorage.getItem("fandomverse_promo") || null,
    theme: localStorage.getItem("fandomverse_theme") || "dark",
    soundEnabled: localStorage.getItem("fandomverse_sound") === "true",
    ttsEnabled: localStorage.getItem("fandomverse_tts") === "true",
    aiPersona: "oracle",
    quizStep: 0,
    quizScores: {},
    triviaIndex: 0,
    triviaStreak: parseInt(localStorage.getItem("fandomverse_trivia_streak") || "0", 10),
    communityPosts: JSON.parse(localStorage.getItem("fandomverse_community") || JSON.stringify(FANDOM_DATA.communityPosts))
  };

  // Sync state helpers
  const saveCart = () => {
    localStorage.setItem("fandomverse_cart", JSON.stringify(State.cart));
    updateCartBadges();
  };

  const saveBookmarks = () => {
    localStorage.setItem("fandomverse_bookmarks", JSON.stringify(State.bookmarks));
    updateBookmarkBadges();
  };

  const saveLikes = () => {
    localStorage.setItem("fandomverse_likes", JSON.stringify(State.likes));
  };

  const saveCommunity = () => {
    localStorage.setItem("fandomverse_community", JSON.stringify(State.communityPosts));
  };

  // Toast Notification helper
  window.toast = function(message, icon = "✦") {
    const toastEl = document.getElementById("toastContainer");
    if (!toastEl) return;
    toastEl.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastEl.classList.add("show");
    sound.playHover();

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2800);
  };

  // =========================================================================
  // THEME & SOUND CONTROLS
  // =========================================================================

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  function applyTheme(theme) {
    State.theme = theme;
    localStorage.setItem("fandomverse_theme", theme);
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (themeIcon) themeIcon.textContent = "☼";
    } else {
      document.body.classList.remove("light-theme");
      if (themeIcon) themeIcon.textContent = "☾";
    }
  }

  applyTheme(State.theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = State.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      sound.playClick();
      toast(`Switched to ${nextTheme.toUpperCase()} mode`, nextTheme === "light" ? "☼" : "☾");
    });
  }

  // Audio SFX Toggle
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const soundIcon = document.getElementById("soundIcon");

  function updateSoundUI() {
    if (soundIcon) {
      soundIcon.textContent = sound.enabled ? "🔊" : "🔇";
    }
  }
  updateSoundUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      const enabled = sound.toggle();
      updateSoundUI();
      toast(enabled ? "Sound FX Enabled" : "Sound FX Muted", enabled ? "🔊" : "🔇");
    });
  }

  // =========================================================================
  // 3D INTERACTIVE STARFIELD & WARP SPEED CANVAS
  // =========================================================================

  const canvas = document.getElementById("starfieldCanvas");
  let ctx = canvas ? canvas.getContext("2d") : null;
  let stars = [];
  const STAR_COUNT = 450;
  let warpSpeed = 1;
  let targetWarpSpeed = 1;
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    if (!canvas) return;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
        pz: 0,
        color: Math.random() > 0.8 ? "#22d3ee" : (Math.random() > 0.6 ? "#a855f7" : "#ffffff")
      });
      stars[i].pz = stars[i].z;
    }
  }

  function renderStars() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    warpSpeed += (targetWarpSpeed - warpSpeed) * 0.08;

    const cx = canvas.width / 2 + (mouseX - canvas.width / 2) * 0.06;
    const cy = canvas.height / 2 + (mouseY - canvas.height / 2) * 0.06;

    for (let star of stars) {
      star.pz = star.z;
      star.z -= 1.8 * warpSpeed;

      if (star.z <= 0) {
        star.z = canvas.width;
        star.pz = star.z;
        star.x = (Math.random() - 0.5) * canvas.width * 2;
        star.y = (Math.random() - 0.5) * canvas.height * 2;
      }

      const k = 220 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;

      const pk = 220 / star.pz;
      const oldPx = star.x * pk + cx;
      const oldPy = star.y * pk + cy;

      const size = Math.max(0.6, (1 - star.z / canvas.width) * (warpSpeed > 3 ? 3.5 : 2.2));
      const alpha = Math.min(1, (1 - star.z / canvas.width) * 1.2);

      ctx.beginPath();
      if (warpSpeed > 2.5) {
        ctx.strokeStyle = star.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = alpha;
        ctx.moveTo(oldPx, oldPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      } else {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.arc(px, py, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(renderStars);
  }

  if (canvas) {
    resizeCanvas();
    initStars();
    renderStars();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initStars();
    });
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  }

  // Warp Speed Trigger Button
  const warpSpeedBtn = document.getElementById("warpSpeedBtn");
  const portalCore = document.getElementById("portalCore");

  function triggerHyperspaceWarp() {
    sound.playWarp();
    targetWarpSpeed = 16;
    toast("Hyperspace Jump Engaged ⚡", "🚀");

    if (portalCore) {
      portalCore.style.transform = "scale(1.25) rotate(180deg)";
    }

    setTimeout(() => {
      targetWarpSpeed = 1;
      if (portalCore) portalCore.style.transform = "";
      toast("Cruising Multiverse Grid", "✦");
    }, 2400);
  }

  if (warpSpeedBtn) warpSpeedBtn.addEventListener("click", triggerHyperspaceWarp);
  if (portalCore) portalCore.addEventListener("click", triggerHyperspaceWarp);

  // =========================================================================
  // CORE UNIVERSES RENDERING & DEEP-DIVE MODAL
  // =========================================================================

  const universesGrid = document.getElementById("universesGrid");
  const universeModal = document.getElementById("universeModal");
  const universeModalContent = document.getElementById("universeModalContent");
  const closeUniverseModalBtn = document.getElementById("closeUniverseModalBtn");

  function renderUniverses() {
    if (!universesGrid) return;
    universesGrid.innerHTML = FANDOM_DATA.categories.map(cat => `
      <article class="universe-card reveal-on-scroll" data-id="${cat.id}">
        <div class="universe-card-banner">
          <img src="${cat.banner}" alt="${cat.name} universe" loading="lazy" class="universe-banner-img">
          <div class="universe-banner-overlay"></div>
          <div class="universe-card-top">
            <span class="universe-emoji">${cat.icon}</span>
            <span class="universe-badge" style="border-color: ${cat.color}; color: #ffffff; background: rgba(7, 7, 13, 0.85);">${cat.badge}</span>
          </div>
        </div>
        <div class="universe-card-body">
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
        </div>
        <div class="universe-card-footer">
          <span>${cat.stats.fans} Fandom Members</span>
          <div class="explore-arrow">Explore ↗</div>
        </div>
      </article>
    `).join("");

    // Attach click listeners to cards
    document.querySelectorAll(".universe-card").forEach(card => {
      card.addEventListener("click", () => {
        sound.playOpen();
        openUniverseHub(card.dataset.id);
      });
    });

    // Float cards in Hero with circular orbit hover pause
    const orbitSlots = document.querySelectorAll(".orbit-slot");
    document.querySelectorAll(".float-card").forEach(fc => {
      fc.addEventListener("click", () => {
        sound.playOpen();
        openUniverseHub(fc.dataset.universe);
      });
      fc.addEventListener("mouseenter", () => {
        orbitSlots.forEach(slot => slot.style.animationPlayState = "paused");
      });
      fc.addEventListener("mouseleave", () => {
        orbitSlots.forEach(slot => slot.style.animationPlayState = "running");
      });
    });
  }

  function openUniverseHub(catId) {
    const cat = FANDOM_DATA.categories.find(c => c.id === catId);
    if (!cat || !universeModalContent) return;

    universeModalContent.innerHTML = `
      <div class="reader-hero-media" style="height: 240px; position: relative;">
        <img src="${cat.banner}" alt="${cat.name}">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 20%, var(--surface));"></div>
        <div style="position: absolute; bottom: 20px; left: 28px; display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 3rem;">${cat.icon}</span>
          <div>
            <span class="universe-badge">${cat.tag}</span>
            <h2 style="font-family: var(--font-display); font-size: 2rem; margin-top: 4px;">${cat.name} Multiverse</h2>
          </div>
        </div>
      </div>

      <div style="padding: 28px 34px;">
        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
          ${cat.description}
        </p>

        <div style="display: flex; gap: 28px; background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 30px;">
          <div><strong style="font-size: 1.2rem; color: var(--accent-cyan);">${cat.stats.fans}</strong><br><small style="color: var(--text-dim);">Global Followers</small></div>
          <div><strong style="font-size: 1.2rem; color: var(--accent-purple);">${cat.stats.series}</strong><br><small style="color: var(--text-dim);">Series & Franchises</small></div>
          <div><strong style="font-size: 1.2rem; color: var(--accent-pink);">${cat.stats.reviews}</strong><br><small style="color: var(--text-dim);">Community Rating</small></div>
        </div>

        <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 16px; color: var(--text-main);">
          Featured Fandom Icons
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 30px;">
          ${cat.featuredCharacters.map(char => `
            <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; padding: 14px;">
              <img src="${char.image}" alt="${char.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 10px;">
              <span style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 700;">${char.franchise}</span>
              <h4 style="font-size: 0.98rem; margin: 2px 0 4px;">${char.name}</h4>
              <p style="font-size: 0.78rem; color: var(--accent-purple); margin-bottom: 8px;"><b>Power:</b> ${char.power}</p>
              <p style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">"${char.quote}"</p>
            </div>
          `).join("")}
        </div>

        <h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 14px;">
          Deep Lore Archive Topics
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px;">
          ${cat.loreTopics.map(topic => `
            <li style="display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--text-muted); background: var(--surface-alt); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
              <span style="color: var(--accent-cyan);">✦</span> ${topic}
            </li>
          `).join("")}
        </ul>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-secondary" onclick="closeAllModals()">Close</button>
          <button class="btn btn-primary" onclick="filterArticlesByUniverse('${cat.id}')">Explore ${cat.name} Spotlight Articles ↗</button>
        </div>
      </div>
    `;

    universeModal.classList.add("active");
  }

  window.filterArticlesByUniverse = function(catId) {
    closeAllModals();
    const targetSection = document.getElementById("spotlight");
    if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });

    const filterBtn = document.querySelector(`#articleFilterBar [data-filter="${catId}"]`);
    if (filterBtn) filterBtn.click();
  };

  // =========================================================================
  // SPOTLIGHT & TRENDING ARTICLES & READER MODAL
  // =========================================================================

  const articlesGrid = document.getElementById("articlesGrid");
  const articleFilterBar = document.getElementById("articleFilterBar");
  const readerModal = document.getElementById("readerModal");
  const readerModalContent = document.getElementById("readerModalContent");

  function renderArticles(filter = "all") {
    if (!articlesGrid) return;
    const filtered = filter === "all" 
      ? FANDOM_DATA.content 
      : FANDOM_DATA.content.filter(a => a.category === filter);

    if (filtered.length === 0) {
      articlesGrid.innerHTML = `
        <div class="empty-filter-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🌌</span>
          <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px;">No Lore Transmissions Yet</h3>
          <p>No articles available in this sector yet. Check back soon for new multiverse lore!</p>
        </div>
      `;
      return;
    }

    articlesGrid.innerHTML = filtered.map(art => {
      const isLiked = State.likes[art.id] || false;
      const likeCount = (art.likes || 0) + (isLiked ? 1 : 0);
      const isBookmarked = State.bookmarks.some(b => b.id === art.id);

      return `
        <article class="article-card reveal-on-scroll visible" data-id="${art.id}">
          <div class="article-media">
            <img src="${art.image}" alt="${art.title}" loading="lazy">
            <span class="article-category-tag">${art.categoryName}</span>
            <span class="article-read-time">⏱ ${art.readTime}</span>
          </div>
          <div class="article-body">
            <div class="article-meta">
              <span>By ${art.author}</span>
              <span>${art.date}</span>
            </div>
            <h3>${art.title}</h3>
            <p>${art.excerpt}</p>
            <div class="article-footer">
              <button class="btn btn-secondary btn-sm read-article-btn" data-id="${art.id}">
                Read Lore & Trailer ↗
              </button>
              <div class="article-actions">
                <button class="interactive-icon-btn like-btn ${isLiked ? 'liked' : ''}" data-id="${art.id}">
                  <span>${isLiked ? '♥' : '♡'}</span>
                  <span class="like-count">${likeCount}</span>
                </button>
                <button class="interactive-icon-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-id="${art.id}">
                  <span>${isBookmarked ? '★' : '☆'}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    attachArticleListeners();
    observeReveals();
  }

  function attachArticleListeners() {
    document.querySelectorAll(".read-article-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openArticleReader(btn.dataset.id);
      });
    });

    document.querySelectorAll(".like-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleArticleLike(btn.dataset.id);
      });
    });

    document.querySelectorAll(".bookmark-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleArticleBookmark(btn.dataset.id);
      });
    });
  }

  if (articleFilterBar) {
    articleFilterBar.querySelectorAll(".filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        articleFilterBar.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        sound.playClick();
        renderArticles(pill.dataset.filter);
      });
    });
  }

  function toggleArticleLike(artId) {
    State.likes[artId] = !State.likes[artId];
    saveLikes();
    sound.playSuccess();
    renderArticles(document.querySelector("#articleFilterBar .active")?.dataset.filter || "all");
    toast(State.likes[artId] ? "Lore transmission liked!" : "Like removed", "♥");
  }

  function toggleArticleBookmark(artId) {
    const art = FANDOM_DATA.content.find(a => a.id === artId);
    if (!art) return;

    const existingIndex = State.bookmarks.findIndex(b => b.id === artId);
    if (existingIndex > -1) {
      State.bookmarks.splice(existingIndex, 1);
      toast(`Removed from Bookmarks: ${art.title.substring(0, 26)}...`, "☆");
    } else {
      State.bookmarks.push({
        id: art.id,
        title: art.title,
        type: "Lore Article",
        category: art.categoryName,
        image: art.image,
        note: "",
        date: new Date().toLocaleDateString()
      });
      sound.playSuccess();
      toast(`Bookmarked: ${art.title.substring(0, 26)}...`, "★");
    }

    saveBookmarks();
    renderArticles(document.querySelector("#articleFilterBar .active")?.dataset.filter || "all");
  }

  function openArticleReader(artId) {
    const art = FANDOM_DATA.content.find(a => a.id === artId);
    if (!art || !readerModalContent) return;
    sound.playOpen();

    const formattedContent = art.content.split("\n\n").map(paragraph => {
      if (paragraph.startsWith("### ")) {
        return `<h3 style="font-family: var(--font-display); font-size: 1.3rem; margin: 24px 0 12px; color: var(--text-main);">${paragraph.replace("### ", "")}</h3>`;
      }
      return `<p style="margin-bottom: 16px;">${paragraph}</p>`;
    }).join("");

    readerModalContent.innerHTML = `
      <div class="reader-hero-media">
        <img src="${art.image}" alt="${art.title}">
      </div>
      <div class="reader-body-content">
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
          ${art.tags.map(t => `<span class="universe-badge">#${t}</span>`).join("")}
        </div>
        <h2>${art.title}</h2>
        <div class="article-meta" style="margin-bottom: 24px;">
          <span>Written by <b>${art.author}</b> (${art.authorRole})</span>
          <span>Published: ${art.date} • ${art.readTime}</span>
        </div>

        ${art.trailerId ? `
          <div class="video-transmission-panel" id="videoTransmissionPanel">
            <div class="video-panel-header">
              <div class="video-panel-title">
                <span class="status-pulse-dot"></span>
                <h4>CINEMATIC TRANSMISSION // 1080P FEED</h4>
              </div>
              <div class="video-panel-badges">
                <span class="video-tag">OFFICIAL TRAILER</span>
                <button type="button" class="video-cinema-mode-btn" id="videoCinemaModeBtn" title="Toggle Cinema Theater Mode">
                  <span class="cinema-icon">💡</span> Cinema Mode
                </button>
              </div>
            </div>

            <div class="reader-video-wrapper" id="readerVideoWrapper">
              <iframe 
                id="trailerIframe" 
                src="https://www.youtube-nocookie.com/embed/${art.trailerId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1" 
                title="${art.title} Official Trailer" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
              </iframe>
            </div>

            <div class="video-controller-deck">
              <div class="deck-btn-group">
                <button type="button" class="deck-ctrl-btn" id="ctrlPlayBtn" title="Play Video">
                  <span>▶</span> Play
                </button>
                <button type="button" class="deck-ctrl-btn" id="ctrlPauseBtn" title="Pause Video">
                  <span>⏸</span> Pause
                </button>
                <button type="button" class="deck-ctrl-btn" id="ctrlRestartBtn" title="Restart Trailer">
                  <span>↺</span> Replay
                </button>
              </div>

              <div class="deck-btn-group">
                <button type="button" class="deck-ctrl-btn" id="ctrlMuteBtn" title="Toggle Sound">
                  <span id="muteIcon">🔊</span> <span id="muteLabel">Mute</span>
                </button>
                <button type="button" class="deck-ctrl-btn" id="ctrlFullscreenBtn" title="Fullscreen Trailer">
                  <span>⛶</span> Fullscreen
                </button>
                <a href="https://www.youtube.com/watch?v=${art.trailerId}" target="_blank" rel="noopener noreferrer" class="deck-ctrl-btn external-yt-btn" title="Open directly in YouTube">
                  <span>↗</span> YouTube
                </a>
              </div>
            </div>

            <div class="video-panel-footer">
              <span>⚡ Transmission secured via studio feed</span>
              <span>HD 60FPS Stereo</span>
            </div>
          </div>
        ` : ''}

        <div class="reader-text-block">
          ${formattedContent}
        </div>

        <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 22px; margin-top: 34px;">
          <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 16px;">
            Discussion & Fan Transmissions (${art.comments.length})
          </h4>
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
            ${art.comments.map(c => `
              <div style="border-bottom: 1px solid var(--border); padding-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--accent-cyan); margin-bottom: 4px;">
                  <b>@${c.user}</b>
                  <span style="color: var(--text-dim);">${c.time}</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted);">${c.text}</p>
              </div>
            `).join("")}
          </div>

          <form id="readerCommentForm" style="display: flex; gap: 10px;">
            <input type="text" id="readerCommentInput" class="form-input" placeholder="Join the discussion as @Fan..." required>
            <button type="submit" class="btn btn-primary btn-sm">Post</button>
          </form>
        </div>
      </div>
    `;

    readerModal.classList.add("active");

    // Video Controller Deck Handlers
    const iframe = document.getElementById("trailerIframe");
    const playBtn = document.getElementById("ctrlPlayBtn");
    const pauseBtn = document.getElementById("ctrlPauseBtn");
    const restartBtn = document.getElementById("ctrlRestartBtn");
    const muteBtn = document.getElementById("ctrlMuteBtn");
    const muteIcon = document.getElementById("muteIcon");
    const muteLabel = document.getElementById("muteLabel");
    const fullscreenBtn = document.getElementById("ctrlFullscreenBtn");
    const videoWrapper = document.getElementById("readerVideoWrapper");
    const cinemaModeBtn = document.getElementById("videoCinemaModeBtn");
    const modalWindow = readerModal.querySelector(".modal-window");

    let isMuted = false;

    const sendYTCommand = (func, args = "") => {
      if (!iframe || !iframe.contentWindow) return;
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: "command",
          func: func,
          args: args
        }), "*");
      } catch (e) {
        console.error("YT Command Error:", e);
      }
    };

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        sendYTCommand("playVideo");
        sound.playClick();
        toast("Trailer Playback Active", "▶");
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => {
        sendYTCommand("pauseVideo");
        sound.playClick();
        toast("Trailer Paused", "⏸");
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        sendYTCommand("seekTo", [0, true]);
        sendYTCommand("playVideo");
        sound.playClick();
        toast("Trailer Restarted from 0:00", "↺");
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        isMuted = !isMuted;
        sendYTCommand(isMuted ? "mute" : "unMute");
        sound.playClick();
        if (muteIcon) muteIcon.textContent = isMuted ? "🔇" : "🔊";
        if (muteLabel) muteLabel.textContent = isMuted ? "Unmute" : "Mute";
        muteBtn.classList.toggle("active", isMuted);
        toast(isMuted ? "Audio Muted" : "Audio Restored", isMuted ? "🔇" : "🔊");
      });
    }

    if (fullscreenBtn && videoWrapper) {
      fullscreenBtn.addEventListener("click", () => {
        sound.playClick();
        if (!document.fullscreenElement) {
          if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
          } else if (videoWrapper.webkitRequestFullscreen) {
            videoWrapper.webkitRequestFullscreen();
          } else if (videoWrapper.msRequestFullscreen) {
            videoWrapper.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) document.exitFullscreen();
        }
      });
    }

    if (cinemaModeBtn && modalWindow) {
      cinemaModeBtn.addEventListener("click", () => {
        sound.playClick();
        modalWindow.classList.toggle("cinema-lights-dimmed");
        const isDimmed = modalWindow.classList.contains("cinema-lights-dimmed");
        cinemaModeBtn.classList.toggle("active", isDimmed);
        toast(isDimmed ? "Cinema Mode Enabled" : "Cinema Mode Disabled", "💡");
      });
    }

    const commentForm = document.getElementById("readerCommentForm");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("readerCommentInput");
        if (input && input.value.trim()) {
          art.comments.unshift({
            user: "You (VerseTraveler)",
            time: "Just now",
            text: input.value.trim()
          });
          sound.playSuccess();
          toast("Transmission published!", "💬");
          openArticleReader(artId);
        }
      });
    }
  }

  // =========================================================================
  // INTERACTIVE FAN ARENA: SORTING QUIZ & DAILY TRIVIA
  // =========================================================================

  const quizContainer = document.getElementById("quizContainer");
  const triviaContainer = document.getElementById("triviaContainer");

  // A. Universe Sorting Hat Quiz
  function renderQuiz() {
    if (!quizContainer) return;
    const questions = FANDOM_DATA.quizQuestions;

    if (State.quizStep >= questions.length) {
      // Calculate winner
      let highestCat = "anime";
      let highestVal = 0;
      for (const [cat, val] of Object.entries(State.quizScores)) {
        if (val > highestVal) {
          highestVal = val;
          highestCat = cat;
        }
      }

      const result = FANDOM_DATA.quizResults[highestCat] || FANDOM_DATA.quizResults.anime;

      quizContainer.innerHTML = `
        <div style="text-align: center; padding: 18px 0; animation: fadeIn 0.4s ease;">
          <div style="font-size: 3.5rem; margin-bottom: 10px;">${result.icon}</div>
          <span class="arena-badge" style="color: ${result.color}; border-color: ${result.color};">${result.badge}</span>
          <h4 style="font-family: var(--font-display); font-size: 1.5rem; margin: 10px 0 8px;">${result.title}</h4>
          <p style="font-style: italic; color: var(--accent-cyan); font-size: 0.88rem; margin-bottom: 16px;">"${result.quote}"</p>
          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">${result.description}</p>

          <div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
            ${result.recommendedFandoms.map(rec => `<span class="universe-badge">${rec}</span>`).join("")}
          </div>

          <div style="display: flex; justify-content: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" id="retakeQuizBtn">Retake Sorting Quiz</button>
            <button class="btn btn-primary btn-sm" id="shareQuizBtn">Share Archetype ✦</button>
          </div>
        </div>
      `;

      sound.playSuccess();

      document.getElementById("retakeQuizBtn")?.addEventListener("click", () => {
        State.quizStep = 0;
        State.quizScores = {};
        renderQuiz();
      });

      document.getElementById("shareQuizBtn")?.addEventListener("click", () => {
        navigator.clipboard?.writeText(`I was sorted into ${result.title} on FandomVerse! ✦ https://fandomverse.io`);
        sound.playSuccess();
        toast("Archetype copied to clipboard!", "📋");
      });
      return;
    }

    const currentQ = questions[State.quizStep];
    const progressPct = ((State.quizStep + 1) / questions.length) * 100;

    quizContainer.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPct}%;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: var(--text-dim); margin-bottom: 8px;">
        <span>Question ${State.quizStep + 1} of ${questions.length}</span>
        <span>${Math.round(progressPct)}% Calibrated</span>
      </div>
      <div class="quiz-question-box">
        ${currentQ.question}
      </div>
      <div class="quiz-options-group">
        ${currentQ.options.map((opt, i) => `
          <button class="quiz-option-btn" data-cat="${opt.category}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt.text}</span>
          </button>
        `).join("")}
      </div>
    `;

    quizContainer.querySelectorAll(".quiz-option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        State.quizScores[cat] = (State.quizScores[cat] || 0) + 1;
        State.quizStep++;
        sound.playClick();
        renderQuiz();
      });
    });
  }

  // B. Daily Fandom Lore Trivia Arena
  function renderTrivia() {
    if (!triviaContainer) return;
    const questions = FANDOM_DATA.trivia;
    const q = questions[State.triviaIndex % questions.length];

    triviaContainer.innerHTML = `
      <div class="trivia-streak-counter">
        <span>🔥 Current Win Streak: <b>${State.triviaStreak}</b></span>
        <span style="margin-left: auto; color: var(--text-dim); font-size: 0.74rem;">Sector: ${q.category}</span>
      </div>
      <div class="quiz-question-box">
        ${q.question}
      </div>
      <div class="trivia-options-grid" id="triviaOptionsGrid">
        ${q.options.map((opt, i) => `
          <button class="trivia-option" data-index="${i}">
            ${opt}
          </button>
        `).join("")}
      </div>
      <div class="trivia-explanation" id="triviaExplanation">
        <b>Lore Clarification:</b> ${q.explanation}
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 18px;">
        <button class="btn btn-secondary btn-sm" id="nextTriviaBtn" style="display: none;">Next Transmission ↗</button>
      </div>
    `;

    const optionsGrid = document.getElementById("triviaOptionsGrid");
    const explanationEl = document.getElementById("triviaExplanation");
    const nextBtn = document.getElementById("nextTriviaBtn");

    optionsGrid?.querySelectorAll(".trivia-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedIdx = parseInt(btn.dataset.index, 10);
        optionsGrid.querySelectorAll(".trivia-option").forEach(b => b.classList.add("locked"));

        if (selectedIdx === q.correctIndex) {
          btn.classList.add("correct");
          State.triviaStreak++;
          localStorage.setItem("fandomverse_trivia_streak", State.triviaStreak);
          sound.playSuccess();
          toast("Correct Answer! Streak increased! 🔥", "⚡");
        } else {
          btn.classList.add("incorrect");
          optionsGrid.querySelector(`[data-index="${q.correctIndex}"]`)?.classList.add("correct");
          State.triviaStreak = 0;
          localStorage.setItem("fandomverse_trivia_streak", 0);
          sound.playError();
          toast("Incorrect hypothesis! Lore archived.", "✗");
        }

        explanationEl?.classList.add("show");
        if (nextBtn) nextBtn.style.display = "inline-flex";
      });
    });

    nextBtn?.addEventListener("click", () => {
      State.triviaIndex = (State.triviaIndex + 1) % questions.length;
      sound.playClick();
      renderTrivia();
    });
  }

  // =========================================================================
  // GLOBAL FAN EVENTS & DIGITAL EVENT PASS GENERATOR
  // =========================================================================

  const eventsGrid = document.getElementById("eventsGrid");
  const eventPassModal = document.getElementById("eventPassModal");
  const eventPassContent = document.getElementById("eventPassContent");

  function renderEvents() {
    if (!eventsGrid) return;
    eventsGrid.innerHTML = FANDOM_DATA.events.map(ev => `
      <article class="event-card reveal-on-scroll">
        <div class="event-image-box">
          <img src="${ev.image}" alt="${ev.title}" loading="lazy" class="event-img">
          <div class="event-image-overlay"></div>
          <span class="event-badge-pill">${ev.badge}</span>
        </div>
        <div class="event-card-body">
          <div class="event-card-header">
            <div class="event-date-block">
              <span class="month">${ev.dateMonth}</span>
              <span class="day">${ev.dateDay}</span>
            </div>
            <div class="event-details-top">
              <span class="event-type-badge">${ev.category} • ${ev.type}</span>
              <h3>${ev.title}</h3>
            </div>
          </div>

          <div class="event-meta-info">
            <span>📍 ${ev.location}</span>
            <span>⏰ ${ev.time}</span>
          </div>

          <p style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
            ${ev.description}
          </p>

          <div class="event-speakers-row">
            <span>🎙️ Speakers:</span>
            <span>${ev.speakers.slice(0, 2).join(", ")}</span>
          </div>

          <div class="event-footer-action">
            <div>
              <strong style="color: var(--accent-cyan); font-family: var(--font-display); font-size: 0.9rem;">${ev.price}</strong>
              <small style="display: block; color: var(--text-dim); font-size: 0.7rem;">${ev.passesAvailable} passes left</small>
            </div>
            <button class="btn btn-primary btn-sm rsvp-pass-btn" data-id="${ev.id}">
              Claim Pass ↗
            </button>
          </div>
        </div>
      </article>
    `).join("");

    document.querySelectorAll(".rsvp-pass-btn").forEach(btn => {
      btn.addEventListener("click", () => openEventPassModal(btn.dataset.id));
    });
  }

  function openEventPassModal(eventId) {
    const ev = FANDOM_DATA.events.find(e => e.id === eventId);
    if (!ev || !eventPassContent) return;
    sound.playOpen();

    const passNumber = "FV-" + Math.floor(100000 + Math.random() * 900000);

    eventPassContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 22px;">
        <span class="universe-badge">OFFICIAL TICKET DISPATCH</span>
        <h3 style="font-family: var(--font-display); font-size: 1.4rem; margin-top: 6px;">FandomPass Generator</h3>
        <p style="font-size: 0.84rem; color: var(--text-muted);">Enter your attendee details to mint your holographic access pass.</p>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 0.8rem; color: var(--text-dim); margin-bottom: 6px;">Attendee Handle / Name</label>
        <input type="text" id="passAttendeeName" class="form-input" style="width: 100%;" value="VerseTraveler" required>
      </div>

      <!-- Holographic Ticket Card -->
      <div class="cyber-pass-card" id="holographicPassCard">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 16px;">
          <span style="font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: var(--accent-purple);">✦ FANDOMVERSE ACCESS</span>
          <span style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">VIP HOLO PASS</span>
        </div>

        <h4 style="font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 6px; color: #fff;">${ev.title}</h4>
        <p style="font-size: 0.82rem; color: var(--accent-cyan); margin-bottom: 14px;">📅 ${ev.fullDate} | ${ev.time}</p>

        <div style="font-size: 0.8rem; color: var(--text-muted); display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px;">
          <div><b style="color: #fff;">Attendee:</b> <span id="passNamePreview">VerseTraveler</span></div>
          <div><b style="color: #fff;">Pass ID:</b> <code>${passNumber}</code></div>
          <div><b style="color: #fff;">Sector:</b> ${ev.category}</div>
          <div><b style="color: #fff;">Location:</b> ${ev.location}</div>
        </div>

        <!-- Simulated Barcode -->
        <div class="pass-barcode">
          ${Array.from({length: 42}).map(() => `
            <div class="barcode-line" style="width: ${Math.floor(Math.random() * 4 + 1)}px; opacity: ${Math.random() > 0.2 ? 1 : 0.4};"></div>
          `).join("")}
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button class="btn btn-secondary btn-full" id="exportCalendarBtn">📅 Add to Calendar (.ics)</button>
        <button class="btn btn-primary btn-full" id="printPassBtn">🖨️ Print / Save Pass</button>
      </div>
    `;

    eventPassModal.classList.add("active");

    const nameInput = document.getElementById("passAttendeeName");
    const namePreview = document.getElementById("passNamePreview");
    if (nameInput && namePreview) {
      nameInput.addEventListener("input", (e) => {
        namePreview.textContent = e.target.value || "VerseTraveler";
      });
    }

    document.getElementById("printPassBtn")?.addEventListener("click", () => {
      sound.playSuccess();
      window.print();
    });

    document.getElementById("exportCalendarBtn")?.addEventListener("click", () => {
      const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//FandomVerse//Multiverse Network//EN\nBEGIN:VEVENT\nSUMMARY:${ev.title}\nDESCRIPTION:${ev.description}\nLOCATION:${ev.location}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${ev.id}-fandomverse.ics`;
      a.click();
      URL.revokeObjectURL(url);
      sound.playSuccess();
      toast("Calendar invite generated!", "📅");
    });
  }

  // =========================================================================
  // COLLECTIBLE DROP SHOP & CART SYSTEM
  // =========================================================================

  const productsGrid = document.getElementById("productsGrid");
  const shopFilterBar = document.getElementById("shopFilterBar");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const drawerOverlay = document.getElementById("drawerOverlay");

  function renderProducts(category = "all") {
    if (!productsGrid) return;
    const filtered = category === "all"
      ? FANDOM_DATA.products
      : FANDOM_DATA.products.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-filter-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🛍️</span>
          <h3 style="font-family: var(--font-display); font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px;">No Gear In This Sector</h3>
          <p>Check other categories or explore all sectors.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(prod => `
      <article class="product-card reveal-on-scroll visible">
        <div class="product-image-box">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <span class="product-badge">${prod.badge}</span>
          <button class="product-quickview-btn" data-id="${prod.id}">Quick View ↗</button>
        </div>
        <div class="product-info-box">
          <div class="product-rating">
            ★ ${prod.rating} <span style="color: var(--text-dim);">(${prod.reviewsCount} reviews)</span>
          </div>
          <h3>${prod.name}</h3>
          <p>${prod.description}</p>
          <div class="product-price-row">
            <span class="current-price">Rs. ${prod.price.toLocaleString()}</span>
            <span class="original-price">Rs. ${prod.originalPrice.toLocaleString()}</span>
          </div>
          <button class="btn btn-primary btn-full add-to-cart-btn" data-id="${prod.id}">
            Add to Cart +
          </button>
        </div>
      </article>
    `).join("");

    attachProductListeners();
    observeReveals();
  }

  function attachProductListeners() {
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => addToCart(btn.dataset.id));
    });

    document.querySelectorAll(".product-quickview-btn").forEach(btn => {
      btn.addEventListener("click", () => openProductModal(btn.dataset.id));
    });
  }

  const productModal = document.getElementById("productModal");
  const productModalContent = document.getElementById("productModalContent");

  function openProductModal(productId) {
    const prod = FANDOM_DATA.products.find(p => p.id === productId);
    if (!prod || !productModalContent) return;
    sound.playOpen();

    productModalContent.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; padding: 30px;">
        <div style="border-radius: var(--radius-md); overflow: hidden; height: 320px; background: var(--surface-alt);">
          <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="product-badge" style="position: static; display: inline-block; margin-bottom: 10px;">${prod.badge}</span>
            <h3 style="font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 8px;">${prod.name}</h3>
            <div class="product-rating" style="margin-bottom: 14px;">
              ★ ${prod.rating} <span style="color: var(--text-dim);">(${prod.reviewsCount} verified reviews)</span>
            </div>
            <div class="product-price-row" style="margin-bottom: 14px;">
              <span class="current-price" style="font-size: 1.6rem;">Rs. ${prod.price.toLocaleString()}</span>
              <span class="original-price">Rs. ${prod.originalPrice.toLocaleString()}</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px;">
              ${prod.description}
            </p>
            <div style="margin-bottom: 18px;">
              <strong style="display: block; font-size: 0.82rem; margin-bottom: 6px; color: var(--accent-cyan);">Specifications & Details:</strong>
              <ul style="list-style: none; font-size: 0.8rem; color: var(--text-dim); display: flex; flex-direction: column; gap: 4px;">
                ${prod.details.map(d => `<li>✦ ${d}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary btn-full" onclick="addToCart('${prod.id}'); closeAllModals();">
              Add to Cart +
            </button>
          </div>
        </div>
      </div>
    `;

    productModal?.classList.add("active");
  }

  if (shopFilterBar) {
    shopFilterBar.querySelectorAll(".filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        shopFilterBar.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        sound.playClick();
        renderProducts(pill.dataset.category);
      });
    });
  }

  function addToCart(productId, qty = 1) {
    const product = FANDOM_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existing = State.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      State.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }

    saveCart();
    sound.playSuccess();
    toast(`${product.name} added to cart!`, "🛍️");

    if (cartToggleBtn) {
      cartToggleBtn.style.transform = "scale(1.2)";
      setTimeout(() => cartToggleBtn.style.transform = "", 250);
    }
  }

  function updateCartBadges() {
    const totalCount = State.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
      cartCountBadge.style.display = totalCount > 0 ? "flex" : "none";
    }
  }

  function renderCartDrawer() {
    if (!cartItemsContainer) return;

    if (State.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon">🛍️</div>
          <h4>Your Cart is Empty</h4>
          <p style="font-size: 0.85rem;">Discover official streetwear, floating lamps, and collectibles in the Drop Shop.</p>
        </div>
      `;
      updateCartTotals(0);
      return;
    }

    cartItemsContainer.innerHTML = State.cart.map((item, index) => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <div class="cart-item-price">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
          <div class="cart-item-qty-row">
            <button class="qty-btn" onclick="updateItemQuantity(${index}, -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 700;">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove item">×</button>
      </div>
    `).join("");

    const subtotal = State.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    updateCartTotals(subtotal);
  }

  window.updateItemQuantity = function(index, delta) {
    if (!State.cart[index]) return;
    State.cart[index].quantity += delta;
    if (State.cart[index].quantity <= 0) {
      State.cart.splice(index, 1);
    }
    sound.playClick();
    saveCart();
    renderCartDrawer();
  };

  window.removeCartItem = function(index) {
    if (!State.cart[index]) return;
    const name = State.cart[index].name;
    State.cart.splice(index, 1);
    sound.playClick();
    saveCart();
    renderCartDrawer();
    toast(`Removed ${name}`, "🗑️");
  };

  function updateCartTotals(subtotal) {
    const subtotalEl = document.getElementById("cartSubtotalText");
    const discountEl = document.getElementById("cartDiscountText");
    const shippingEl = document.getElementById("cartShippingText");
    const totalEl = document.getElementById("cartGrandTotalText");

    let discount = 0;
    let shipping = subtotal > 0 ? 250 : 0;

    if (State.activePromo === "VERSE20") {
      discount = Math.round(subtotal * 0.20);
    } else if (State.activePromo === "SUPERFAN") {
      discount = Math.round(subtotal * 0.30);
    } else if (State.activePromo === "FREESHIP") {
      shipping = 0;
    }

    const grandTotal = Math.max(0, subtotal - discount + shipping);

    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (discountEl) discountEl.textContent = `- Rs. ${discount.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? "FREE" : `Rs. ${shipping}`;
    if (totalEl) totalEl.textContent = `Rs. ${grandTotal.toLocaleString()}`;
  }

  // Promo Code Engine
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoCodeInput = document.getElementById("promoCodeInput");

  if (applyPromoBtn && promoCodeInput) {
    applyPromoBtn.addEventListener("click", () => {
      const code = promoCodeInput.value.trim().toUpperCase();
      if (code === "VERSE20") {
        State.activePromo = "VERSE20";
        localStorage.setItem("fandomverse_promo", "VERSE20");
        sound.playSuccess();
        toast("Promo code applied: 20% OFF!", "🎉");
      } else if (code === "SUPERFAN") {
        State.activePromo = "SUPERFAN";
        localStorage.setItem("fandomverse_promo", "SUPERFAN");
        sound.playSuccess();
        toast("VIP SuperFan code: 30% OFF!", "🌟");
      } else if (code === "FREESHIP") {
        State.activePromo = "FREESHIP";
        localStorage.setItem("fandomverse_promo", "FREESHIP");
        sound.playSuccess();
        toast("Free Shipping applied!", "🚚");
      } else {
        sound.playError();
        toast("Invalid promo code. Try VERSE20 or FREESHIP", "⚠️");
      }
      renderCartDrawer();
    });
  }

  // Drawer Toggles
  function openCartDrawer() {
    sound.playOpen();
    renderCartDrawer();
    cartDrawer?.classList.add("open");
    drawerOverlay?.classList.add("active");
  }

  function closeDrawers() {
    cartDrawer?.classList.remove("open");
    document.getElementById("bookmarksDrawer")?.classList.remove("open");
    drawerOverlay?.classList.remove("active");
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener("click", openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeDrawers);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawers);

  // Multi-Step Checkout Modal
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutModalContent = document.getElementById("checkoutModalContent");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (State.cart.length === 0) {
        toast("Your cart is empty!", "🛍️");
        return;
      }
      closeDrawers();
      openCheckoutModal();
    });
  }

  function openCheckoutModal() {
    if (!checkoutModalContent) return;
    sound.playOpen();

    const subtotal = State.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    checkoutModalContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="universe-badge">FANDOM SECURE CHECKOUT</span>
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-top: 6px;">Finalize Collector Order</h3>
      </div>

      <form id="checkoutForm">
        <h4 style="font-size: 0.95rem; margin-bottom: 12px; color: var(--accent-cyan);">1. Shipping Coordinates</h4>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <input type="text" class="form-input" placeholder="Full Name" required value="Maaz Javed">
          <input type="email" class="form-input" placeholder="Neural Email" required value="fan@fandomverse.io">
          <input type="text" class="form-input" placeholder="Delivery Address / Sector" required value="Sector 7G, Cyber City, Karachi">
          <input type="tel" class="form-input" placeholder="Comms Phone Number" required value="+92 300 1234567">
        </div>

        <h4 style="font-size: 0.95rem; margin-bottom: 12px; color: var(--accent-purple);">2. Payment Protocol</h4>
        <div class="checkout-payment-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 24px;">
          <label style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <input type="radio" name="payment" checked>
            <span>💳 Card / VersePay</span>
          </label>
          <label style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <input type="radio" name="payment">
            <span>📦 Cash on Delivery</span>
          </label>
        </div>

        <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 20px; font-size: 0.88rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Items Ordered:</span>
            <b>${State.cart.length} item(s)</b>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.05rem; font-weight: 800; color: var(--accent-cyan);">
            <span>Order Total:</span>
            <span>${document.getElementById("cartGrandTotalText")?.textContent || "Rs. 0"}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          Confirm Order Transmission ↗
        </button>
      </form>
    `;

    checkoutModal.classList.add("active");

    const form = document.getElementById("checkoutForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        State.cart = [];
        saveCart();
        sound.playSuccess();

        checkoutModalContent.innerHTML = `
          <div style="text-align: center; padding: 24px 0;">
            <div style="font-size: 3.5rem; margin-bottom: 10px;">🎉</div>
            <span class="universe-badge" style="color: var(--accent-emerald); border-color: var(--accent-emerald);">TRANSMISSION CONFIRMED</span>
            <h3 style="font-family: var(--font-display); font-size: 1.6rem; margin: 12px 0 8px;">Thank You, Traveler!</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">
              Your order <b>#${orderId}</b> has been received and queued at the Verse fulfillment terminal.
            </p>
            <div style="background: var(--surface-alt); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px; text-align: left; font-size: 0.85rem;">
              <p><b>Tracking Status:</b> Dispatched to Warp Courier</p>
              <p><b>Estimated Delivery:</b> 2-3 Business Days</p>
              <p><b>Collector Token:</b> Hologram NFT verification minted</p>
            </div>
            <button class="btn btn-primary" onclick="closeAllModals()">Return to Multiverse</button>
          </div>
        `;
      });
    }
  }

  // =========================================================================
  // BOOKMARKS & WATCHLIST DRAWER
  // =========================================================================

  const bookmarksToggleBtn = document.getElementById("bookmarksToggleBtn");
  const bookmarksDrawer = document.getElementById("bookmarksDrawer");
  const bookmarksContainer = document.getElementById("bookmarksContainer");
  const closeBookmarksBtn = document.getElementById("closeBookmarksBtn");
  const bookmarksCountBadge = document.getElementById("bookmarksCountBadge");
  const clearAllBookmarksBtn = document.getElementById("clearAllBookmarksBtn");

  function updateBookmarkBadges() {
    if (bookmarksCountBadge) {
      bookmarksCountBadge.textContent = State.bookmarks.length;
      bookmarksCountBadge.style.display = State.bookmarks.length > 0 ? "flex" : "none";
    }
  }

  function renderBookmarks() {
    if (!bookmarksContainer) return;
    if (State.bookmarks.length === 0) {
      bookmarksContainer.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon">♡</div>
          <h4>No Saved Bookmarks</h4>
          <p style="font-size: 0.85rem;">Click the heart icon on any lore article or product to bookmark it for later offline reading.</p>
        </div>
      `;
      return;
    }

    bookmarksContainer.innerHTML = State.bookmarks.map((bm, index) => `
      <div class="cart-item-card" style="align-items: flex-start;">
        <img src="${bm.image}" alt="${bm.title}" class="cart-item-thumb">
        <div class="cart-item-details">
          <span style="font-size: 0.7rem; color: var(--accent-cyan); font-weight: 700;">${bm.category} • ${bm.type}</span>
          <h4 style="font-size: 0.88rem; margin: 2px 0 6px;">${bm.title}</h4>
          <input type="text" class="promo-input" placeholder="Add personal note..." value="${bm.note || ''}" onchange="updateBookmarkNote('${bm.id}', this.value)" style="font-size: 0.78rem; padding: 4px 8px; margin-top: 4px;">
        </div>
        <button class="cart-item-remove" onclick="removeBookmarkItem(${index})" title="Remove bookmark">×</button>
      </div>
    `).join("");
  }

  window.updateBookmarkNote = function(id, note) {
    const item = State.bookmarks.find(b => b.id === id);
    if (item) {
      item.note = note;
      saveBookmarks();
      toast("Bookmark note saved", "📝");
    }
  };

  window.removeBookmarkItem = function(index) {
    State.bookmarks.splice(index, 1);
    saveBookmarks();
    renderBookmarks();
    toast("Bookmark removed", "☆");
  };

  if (clearAllBookmarksBtn) {
    clearAllBookmarksBtn.addEventListener("click", () => {
      State.bookmarks = [];
      saveBookmarks();
      renderBookmarks();
      toast("All bookmarks cleared", "🗑️");
    });
  }

  if (bookmarksToggleBtn) {
    bookmarksToggleBtn.addEventListener("click", () => {
      sound.playOpen();
      renderBookmarks();
      bookmarksDrawer?.classList.add("open");
      drawerOverlay?.classList.add("active");
    });
  }

  if (closeBookmarksBtn) closeBookmarksBtn.addEventListener("click", closeDrawers);

  // =========================================================================
  // LIVE FAN COMMUNITY FEED
  // =========================================================================

  const communityPostsContainer = document.getElementById("communityPostsContainer");
  const newPostForm = document.getElementById("newPostForm");

  function renderCommunityPosts() {
    if (!communityPostsContainer) return;
    communityPostsContainer.innerHTML = State.communityPosts.map(post => `
      <article class="community-post-card">
        <div class="post-header">
          <div class="post-author-info">
            <div class="post-avatar">${post.avatar || "👤"}</div>
            <div class="post-author-names">
              <b>${post.author}</b>
              <small>${post.handle} • ${post.time}</small>
            </div>
          </div>
          <span class="universe-badge">${post.tag}</span>
        </div>
        <div class="post-content">
          ${post.content}
        </div>
        ${post.image ? `
          <div class="community-post-image">
            <img src="${post.image}" alt="Community visual" loading="lazy">
          </div>
        ` : ''}
        <div class="post-actions">
          <button class="interactive-icon-btn ${post.liked ? 'liked' : ''}" onclick="togglePostLike('${post.id}')">
            <span>${post.liked ? '♥' : '♡'}</span>
            <span>${post.likes} Upvotes</span>
          </button>
          <span style="font-size: 0.8rem; color: var(--text-dim); cursor: pointer;" onclick="toast('Reply thread ready for expansion', '💬')">
            💬 ${post.replies} Replies
          </span>
        </div>
      </article>
    `).join("");
  }

  window.togglePostLike = function(postId) {
    const post = State.communityPosts.find(p => p.id === postId);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    saveCommunity();
    sound.playClick();
    renderCommunityPosts();
  };

  if (newPostForm) {
    newPostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const content = document.getElementById("postContentInput")?.value.trim();
      const tag = document.getElementById("postTagSelect")?.value;
      const author = document.getElementById("postAuthorInput")?.value.trim() || "@Traveler";

      if (!content) return;

      const newPost = {
        id: "post-" + Date.now(),
        author: author.replace("@", ""),
        handle: author.startsWith("@") ? author : "@" + author,
        avatar: "⚡",
        time: "Just now",
        tag: tag,
        content: content,
        likes: 1,
        liked: true,
        replies: 0
      };

      State.communityPosts.unshift(newPost);
      saveCommunity();
      sound.playSuccess();
      toast("Transmission broadcasted to Fandom Network!", "📡");

      newPostForm.reset();
      renderCommunityPosts();
    });
  }

  // =========================================================================
  // SPOTLIGHT SEARCH / COMMAND PALETTE (CTRL + K)
  // =========================================================================

  const commandPaletteModal = document.getElementById("commandPaletteModal");
  const commandPaletteInput = document.getElementById("commandPaletteInput");
  const commandResultsList = document.getElementById("commandResultsList");
  const searchTriggerBtn = document.getElementById("searchTriggerBtn");

  function openCommandPalette() {
    sound.playOpen();
    commandPaletteModal?.classList.add("active");
    if (commandPaletteInput) {
      commandPaletteInput.value = "";
      commandPaletteInput.focus();
      renderCommandResults("");
    }
  }

  if (searchTriggerBtn) searchTriggerBtn.addEventListener("click", openCommandPalette);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === "Escape") {
      closeAllModals();
      closeDrawers();
    }
  });

  function renderCommandResults(query) {
    if (!commandResultsList) return;
    const q = query.toLowerCase().trim();

    if (!q) {
      // Default quick actions
      commandResultsList.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase; padding: 8px 12px;">Quick Multiverse Shortcuts</div>
        <div class="command-result-item" onclick="triggerHyperspaceWarp(); closeAllModals();">
          <span>⚡ Hyperspace Starfield Warp</span>
          <kbd style="font-size: 0.7rem; color: var(--accent-cyan);">Warp</kbd>
        </div>
        <div class="command-result-item" onclick="document.getElementById('arena').scrollIntoView({behavior:'smooth'}); closeAllModals();">
          <span>✦ Take Archetype Sorting Quiz</span>
          <kbd style="font-size: 0.7rem;">Quiz</kbd>
        </div>
        <div class="command-result-item" onclick="openCartDrawer(); closeAllModals();">
          <span>🛍️ Open Shopping Cart</span>
          <kbd style="font-size: 0.7rem;">Cart</kbd>
        </div>
        <div class="command-result-item" onclick="document.getElementById('themeToggleBtn').click(); closeAllModals();">
          <span>🎨 Toggle Light / Dark Theme</span>
          <kbd style="font-size: 0.7rem;">Theme</kbd>
        </div>
      `;
      return;
    }

    const matchedArticles = FANDOM_DATA.content.filter(a =>
      a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedProducts = FANDOM_DATA.products.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    const matchedCategories = FANDOM_DATA.categories.filter(c =>
      c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    let html = "";
    if (matchedCategories.length > 0) {
      html += `<div style="font-size: 0.72rem; color: var(--text-dim); padding: 8px 12px;">Universes</div>`;
      html += matchedCategories.map(c => `
        <div class="command-result-item" onclick="openUniverseHub('${c.id}'); closeAllModals();">
          <span>${c.icon} ${c.name} Multiverse</span>
          <small style="color: var(--accent-cyan);">Explore Universe ↗</small>
        </div>
      `).join("");
    }

    if (matchedArticles.length > 0) {
      html += `<div style="font-size: 0.72rem; color: var(--text-dim); padding: 8px 12px;">Articles & Lore</div>`;
      html += matchedArticles.map(a => `
        <div class="command-result-item" onclick="openArticleReader('${a.id}'); closeAllModals();">
          <span>${a.title}</span>
          <small style="color: var(--accent-purple);">${a.categoryName}</small>
        </div>
      `).join("");
    }

    if (matchedProducts.length > 0) {
      html += `<div style="font-size: 0.72rem; color: var(--text-dim); padding: 8px 12px;">Merchandise Drops</div>`;
      html += matchedProducts.map(p => `
        <div class="command-result-item" onclick="addToCart('${p.id}'); closeAllModals();">
          <span>🛍️ ${p.name}</span>
          <small style="color: var(--accent-emerald);">Rs. ${p.price.toLocaleString()}</small>
        </div>
      `).join("");
    }

    if (!html) {
      html = `<div style="padding: 24px; text-align: center; color: var(--text-dim); font-size: 0.88rem;">No matching trans-dimensional records found for "${query}"</div>`;
    }

    commandResultsList.innerHTML = html;
  }

  if (commandPaletteInput) {
    commandPaletteInput.addEventListener("input", (e) => {
      renderCommandResults(e.target.value);
    });
  }

  // =========================================================================
  // FANDOM AI 2.0 CONVERSATIONAL AGENT
  // =========================================================================

  const chatLauncher = document.getElementById("chatLauncher");
  const chatWidget = document.getElementById("chatWidget");
  const closeChatBtn = document.getElementById("closeChatBtn");
  const chatInputForm = document.getElementById("chatInputForm");
  const chatInputField = document.getElementById("chatInputField");
  const chatMessagesArea = document.getElementById("chatMessagesArea");
  const chatPersonaSelect = document.getElementById("chatPersonaSelect");
  const ttsToggleBtn = document.getElementById("ttsToggleBtn");
  const ttsIcon = document.getElementById("ttsIcon");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const expandChatBtn = document.getElementById("expandChatBtn");
  const expandIcon = document.getElementById("expandIcon");
  const chatMicBtn = document.getElementById("chatMicBtn");
  const micIcon = document.getElementById("micIcon");
  const chatPersonaAvatar = document.getElementById("chatPersonaAvatar");
  const chatPersonaTitle = document.getElementById("chatPersonaTitle");
  const chatPersonaSubtitle = document.getElementById("chatPersonaSubtitle");

  const personaMeta = {
    oracle: {
      avatar: "🔮",
      title: "Verse Oracle",
      subtitle: "Multiverse Neural Guide",
      greeting: "Greetings, Traveler! 🌌 Neural Oracle synchronized with the complete 7-sector Multiverse archive. Ask me about any character, lore secret, game strat, or say <b>surprise me</b>."
    },
    gojo: {
      avatar: "⚡",
      title: "Satoru Gojo",
      subtitle: "The Honored One • Limitless",
      greeting: "Yo! Satoru Gojo here. Don't worry, I'm the strongest. ⚡ Ask me about Infinity, domain expansions, or Sukuna's tricks—I'll break it down for you!"
    },
    netrunner: {
      avatar: "🎮",
      title: "Netrunner V",
      subtitle: "Night City Legend • Relic",
      greeting: "Jacked into the data stream, choom! 🎮 Got full specs on Night City cyberware, Elden Ring demigods, and speedrun routes. What's the mission?"
    },
    cine: {
      avatar: "🎬",
      title: "Director Cine",
      subtitle: "Auteur Film Theorist",
      greeting: "Welcome to the cinema vault. 🎬 Let's dissect Villeneuve's brutalist framing, Nolan's 70mm IMAX acoustics, and the philosophy of villains."
    }
  };

  function toggleChat() {
    sound.playOpen();
    chatWidget?.classList.toggle("open");
    if (chatWidget?.classList.contains("open")) {
      chatInputField?.focus();
    }
  }

  if (chatLauncher) chatLauncher.addEventListener("click", toggleChat);
  if (closeChatBtn) closeChatBtn.addEventListener("click", () => chatWidget?.classList.remove("open"));

  // Expand / Minimize Chat Size
  if (expandChatBtn && chatWidget) {
    expandChatBtn.addEventListener("click", () => {
      sound.playClick();
      chatWidget.classList.toggle("expanded");
      const isExp = chatWidget.classList.contains("expanded");
      if (expandIcon) expandIcon.textContent = isExp ? "🗕" : "⛶";
      toast(isExp ? "Chat Expanded" : "Standard Size Restored", "⛶");
    });
  }

  // Clear Chat History
  if (clearChatBtn && chatMessagesArea) {
    clearChatBtn.addEventListener("click", () => {
      sound.playClick();
      chatMessagesArea.innerHTML = "";
      const p = personaMeta[State.aiPersona] || personaMeta.oracle;
      appendBotMessage(p.greeting);
      toast("Chat history cleared", "🗑️");
    });
  }

  // AI Persona Switcher
  if (chatPersonaSelect) {
    chatPersonaSelect.addEventListener("change", (e) => {
      State.aiPersona = e.target.value;
      const meta = personaMeta[State.aiPersona] || personaMeta.oracle;
      if (chatPersonaAvatar) chatPersonaAvatar.textContent = meta.avatar;
      if (chatPersonaTitle) chatPersonaTitle.textContent = meta.title;
      if (chatPersonaSubtitle) chatPersonaSubtitle.textContent = meta.subtitle;
      sound.playOpen();
      appendBotMessage(meta.greeting);
      toast(`AI Persona Switched to ${meta.title}`, meta.avatar);
    });
  }

  // Text-To-Speech Toggle
  if (ttsToggleBtn) {
    ttsToggleBtn.addEventListener("click", () => {
      State.ttsEnabled = !State.ttsEnabled;
      localStorage.setItem("fandomverse_tts", State.ttsEnabled);
      if (ttsIcon) ttsIcon.textContent = State.ttsEnabled ? "🔊" : "🔈";
      toast(State.ttsEnabled ? "AI Voice Synthesis Enabled" : "AI Voice Muted", "🎙️");
    });
  }

  // Voice Input (Speech-To-Text)
  if (chatMicBtn && chatInputField) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        chatMicBtn.classList.add("listening");
        if (micIcon) micIcon.textContent = "🔴";
        toast("Listening to your voice...", "🎙️");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          chatInputField.value = transcript;
          window.sendChatMessage(transcript);
          chatInputField.value = "";
        }
      };

      recognition.onerror = () => {
        chatMicBtn.classList.remove("listening");
        if (micIcon) micIcon.textContent = "🎤";
        toast("Voice recognition could not hear audio", "⚠️");
      };

      recognition.onend = () => {
        chatMicBtn.classList.remove("listening");
        if (micIcon) micIcon.textContent = "🎤";
      };

      chatMicBtn.addEventListener("click", () => {
        try {
          recognition.start();
        } catch (e) {
          recognition.stop();
        }
      });
    } else {
      chatMicBtn.addEventListener("click", () => {
        toast("Speech Recognition not supported in this browser. Type in chat!", "ℹ️");
      });
    }
  }

  // Quick Chips
  document.querySelectorAll(".chat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      window.sendChatMessage(chip.dataset.prompt);
    });
  });

  if (chatInputForm && chatInputField) {
    chatInputForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInputField.value.trim();
      if (!text) return;
      window.sendChatMessage(text);
      chatInputField.value = "";
    });
  }

  // Global sendChatMessage so action buttons can trigger it
  window.sendChatMessage = function(text) {
    if (!chatMessagesArea) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append User Message
    const userDiv = document.createElement("div");
    userDiv.className = "chat-bubble user";
    userDiv.innerHTML = `
      <div style="font-size: 0.68rem; color: rgba(255,255,255,0.7); text-align: right; margin-bottom: 4px;">${now}</div>
      ${text}
    `;
    chatMessagesArea.appendChild(userDiv);
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    sound.playClick();

    // Show Realistic Typing Indicator
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const response = generateAIResponse(text, State.aiPersona);
      appendBotMessage(response);
    }, 450);
  };

  function showTypingIndicator() {
    if (!chatMessagesArea || document.getElementById("chatTypingIndicator")) return;
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-bubble bot typing-indicator";
    typingDiv.id = "chatTypingIndicator";
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatMessagesArea.appendChild(typingDiv);
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("chatTypingIndicator");
    if (el) el.remove();
  }

  function appendBotMessage(text) {
    if (!chatMessagesArea) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const meta = personaMeta[State.aiPersona] || personaMeta.oracle;

    const botDiv = document.createElement("div");
    botDiv.className = "chat-bubble bot";
    botDiv.innerHTML = `
      <div class="chat-bubble-header">
        <span class="bot-badge">${meta.avatar} ${meta.title.toUpperCase()}</span>
        <span class="chat-timestamp">${now}</span>
      </div>
      <div>${text}</div>
    `;
    chatMessagesArea.appendChild(botDiv);
    chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    sound.playHover();

    if (State.ttsEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/<[^>]*>/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = State.aiPersona === "gojo" ? 1.15 : (State.aiPersona === "netrunner" ? 0.95 : 1.0);
      window.speechSynthesis.speak(utterance);
    }
  }

  function generateAIResponse(query, persona) {
    const q = query.toLowerCase().trim();

    // ==========================================
    // 1. PERSONA-SPECIFIC VOICE OVERRIDES
    // ==========================================
    if (persona === "gojo") {
      if (q.includes("domain") || q.includes("void") || q.includes("expansion")) {
        return `<b>Unlimited Void (Muryōkūsho)!</b> 🌌<br><br>
        Inside my domain, infinite raw information is forced straight into the opponent's nervous system. They see everything, process everything, and can do absolutely nothing.<br><br>
        <i>"Throughout heaven and earth, I alone am the honored one."</i>
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('anime-shinjuku-showdown')">📖 Read Shinjuku Showdown Lore</button>
          <button type="button" class="chat-action-btn" onclick="openUniverseHub('anime')">🌸 Open Anime Realm</button>
        </div>`;
      }
      if (q.includes("sukuna") || q.includes("strongest") || q.includes("fight")) {
        return `Sukuna thinks his Malevolent Shrine and Dismantle slashes can pierce Infinity, but don't sweat it—I shrunk my domain barrier down to a basketball just to shatter his rhythm! I am the strongest sorcerer in history, period. ⚡
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('anime-shinjuku-showdown')">📖 Shinjuku Showdown Breakdown</button>
        </div>`;
      }
      if (q.includes("hollow purple") || q.includes("red") || q.includes("blue") || q.includes("limitless")) {
        return `Limitless sorcery is pure physics:
        <br>• <b>Lapse: Blue</b> = Attractive magnetic force via negative space.
        <br>• <b>Reversal: Red</b> = Repulsive explosive energy via positive energy.
        <br>• <b>Hollow: Purple</b> = Colliding both singularities to erase mass from existence!`;
      }
    }

    if (persona === "netrunner") {
      if (q.includes("cyberpunk") || q.includes("night city") || q.includes("orion") || q.includes("silverhand")) {
        return `Night City's Golden Rule, choom: <b>Never trust Arasaka or Militech.</b> 🌆<br><br>
        If you're gearing up for Phantom Liberty in Dogtown, slap on a Tier 5 Militech Sandevistan, Biomonitor, and Gorilla Arms. You'll dance around MaxTac before their cyberware even pings.
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('gaming-cyberpunk-orion')">🎮 Project Orion & 2077 Sequel</button>
          <button type="button" class="chat-action-btn" onclick="openProductModal('prod-cyber-hoodie')">🛍️ Cyberpunk Hoodie Drop</button>
        </div>`;
      }
      if (q.includes("elden") || q.includes("miquella") || q.includes("malenia") || q.includes("shadow")) {
        return `The Land of Shadow is a brutal preem DLC, choom! Miquella literally ripped out his own flesh and capacity for love (St. Trina) just to enforce 'compassion' through cosmic brainwashing. And Malenia? Waterfowl Dance will flatline you in 0.3 seconds if you don't roll forward-left!
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('gaming-elden-ring-shadow')">🎮 Elden Ring Lore Transmission</button>
        </div>`;
      }
    }

    if (persona === "cine") {
      if (q.includes("dune") || q.includes("messiah") || q.includes("paul") || q.includes("villeneuve")) {
        return `Denis Villeneuve is executing cinema's most daring subversion in <i>Dune Messiah</i>. Frank Herbert wrote Messiah to warn us: <b>beware of charismatic messiahs</b>.<br><br>
        Paul Atreides is trapped in a chronological maze—his prescience shows sixty billion deaths across the stars, and every alternative timeline is even worse. Pure Greek tragedy wrapped in desert brutalism.
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-dune-part-three')">🎬 Dune Messiah Breakdown & Trailer</button>
          <button type="button" class="chat-action-btn" onclick="openUniverseHub('movies')">🍿 Cinema Vault</button>
        </div>`;
      }
      if (q.includes("nolan") || q.includes("oppenheimer") || q.includes("imax") || q.includes("time")) {
        return `Christopher Nolan doesn't use time as a clock; he uses time as <b>physical architectural space</b>. 🎬<br><br>
        From the dream tiers in <i>Inception</i> to the tidal waves in <i>Interstellar</i> and the physical quantum dread of <i>Oppenheimer</i>, 70mm IMAX celluloid turns the human face into a landscape of existential suspense.
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-nolan-temporal-mastery')">🎥 Read Nolan 70mm Article & Trailer</button>
        </div>`;
      }
    }

    // ==========================================
    // 2. ROMAN URDU & HINDI CONVERSATIONAL
    // ==========================================
    if (q.includes("kaise ho") || q.includes("kya haal") || q.includes("kese ho") || q.includes("sab theek") || q.includes("kya chal")) {
      return `Main bilkul zabardast hoon, Multiverse Traveler! 🌌 FandomVerse ke tamam sectors (Anime, Gaming, Movies, Comics, K-Pop) active hain. Aap batao, aaj kiska lore ya movie trailer explore karna hai?`;
    }

    if (q.includes("kon hai") || q.includes("kaun hai") || q.includes("kya hai") || q.includes("batao")) {
      if (q.includes("gojo")) {
        return `<b>Satoru Gojo</b> Jujutsu Kaisen ka Special Grade Sorcerer hai jise 'The Strongest' kaha jata hai. Uske paas <b>Six Eyes</b> aur <b>Limitless</b> ability hai, jisse koi bhi attack us tak pohanch hi nahi sakta (Infinity shield)!
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('anime-shinjuku-showdown')">📖 Gojo vs Sukuna Breakdown</button>
        </div>`;
      }
      if (q.includes("dune") || q.includes("paul")) {
        return `<b>Dune</b> Frank Herbert ki mashhoor sci-fi dastan hai jise Denis Villeneuve ne direct kiya hai. Iska hero <b>Paul Atreides</b> desert planet Arrakis par aakar Fremen ka leader banta hai aur Spice melange par control hasil karta hai.
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-dune-part-three')">🎬 Watch Dune Trailer</button>
        </div>`;
      }
      if (q.includes("luffy")) {
        return `<b>Monkey D. Luffy</b> Straw Hat Pirates ka captain hai jo Pirate King banna chahta hai! Usne haal hi mein <b>Gear 5 (Sun God Nika)</b> awaken kiya hai, jo uski imagination ko physical reality bana deta hai!`;
      }
      if (q.includes("elden") || q.includes("miquella")) {
        return `<b>Elden Ring: Shadow of the Erdtree</b> FromSoftware ka blockbuster game hai. Isme Miquella ne godhood hasil karne ke liye apna flesh aur apni mohabbat (St. Trina) ko qurban kardiya tha!
        <div class="chat-action-cards">
          <button type="button" class="chat-action-btn" onclick="openArticleReader('gaming-elden-ring-shadow')">🎮 Elden Ring Lore Dekhein</button>
        </div>`;
      }
    }

    if (q.includes("recommend") || q.includes("kya dekhun") || q.includes("kya khele") || q.includes("kuch acha")) {
      return `Yahan Multiverse ki top recommendations hain:
      <br><br>• <b>Anime:</b> <i>Jujutsu Kaisen Season 2</i> (action/strategy) ya <i>One Piece Wano/Egghead</i>.
      <br>• <b>Gaming:</b> <i>Elden Ring</i> (high fantasy challenge) ya <i>Cyberpunk 2077</i> (neon RPG).
      <br>• <b>Cinema:</b> <i>Dune Part Two</i> (sci-fi epic) ya <i>Oppenheimer</i> (IMAX drama).
      <br>• <b>TV Animation:</b> <i>Arcane Season 2</i> (emotional sisterhood & Hextech).
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('tv-arcane-season-two')">📺 Arcane Trailer</button>
        <button type="button" class="chat-action-btn" onclick="openArticleReader('anime-shinjuku-showdown')">🌸 JJK Trailer</button>
        <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-dune-part-three')">🎬 Dune Trailer</button>
      </div>`;
    }

    // ==========================================
    // 3. SECTORS, CHARACTERS & CONTENT
    // ==========================================

    // Jujutsu Kaisen / Gojo
    if (q.includes("gojo") || q.includes("jujutsu") || q.includes("sukuna") || q.includes("cursed energy")) {
      return `🌸 <b>Jujutsu Kaisen Sector Transmission:</b><br>
      The battle between <b>Satoru Gojo</b> and <b>Ryomen Sukuna</b> in Shinjuku redefined battle shonen. Gege Akutami engineered it with brutal thermodynamic binding vows, basketball-sized domain barriers, and inverted cursed techniques.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('anime-shinjuku-showdown')">📖 Read Shinjuku Showdown Lore</button>
        <button type="button" class="chat-action-btn" onclick="openUniverseHub('anime')">🌸 Explore Anime Realm</button>
      </div>`;
    }

    // One Piece / Luffy
    if (q.includes("luffy") || q.includes("one piece") || q.includes("gear 5") || q.includes("nika") || q.includes("straw hat")) {
      return `🍖 <b>One Piece Multiverse:</b><br>
      Monkey D. Luffy's <b>Gear 5 (Sun God Nika)</b> represents total liberation—giving him cartoon rubber physics that bend reality with infectious laughter!
      <br><br><i>"If you don't take risks, you can't create a future!"</i>
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openUniverseHub('anime')">🌸 Anime Icons & Lore</button>
      </div>`;
    }

    // Demon Slayer / Tanjiro
    if (q.includes("tanjiro") || q.includes("demon slayer") || q.includes("kimetsu") || q.includes("nezuko")) {
      return `⚔️ <b>Demon Slayer Corps:</b><br>
      Tanjiro Kamado wields the legendary <b>Sun Breathing (Hinokami Kagura)</b>, the progenitor style created by Yoriichi Tsugikuni. His sheer empathy and unbreakable resolve make him an immortal icon.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openUniverseHub('anime')">🌸 Explore Anime Icons</button>
      </div>`;
    }

    // Elden Ring & Soulsborne
    if (q.includes("elden ring") || q.includes("malenia") || q.includes("miquella") || q.includes("erdtree") || q.includes("fromsoft")) {
      return `🎮 <b>Lands Between & Realm of Shadow:</b><br>
      Miquella the Kind cast aside his flesh and his love (St. Trina) to ascend to godhood, whilst <b>Malenia, Blade of Miquella</b> held an undefeated record with her Scarlet Rot and Waterfowl Dance.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('gaming-elden-ring-shadow')">🎮 Elden Ring Lore & Trailer</button>
        <button type="button" class="chat-action-btn" onclick="openUniverseHub('gaming')">🎮 Gaming Arena</button>
      </div>`;
    }

    // Cyberpunk 2077
    if (q.includes("cyberpunk") || q.includes("night city") || q.includes("silverhand") || q.includes("phantom liberty") || q.includes("cdpr")) {
      return `🌆 <b>Night City Archives:</b><br>
      Johnny Silverhand and V took on Arasaka Tower and the Relic. CD Projekt RED is currently developing <b>Project Orion</b> on Unreal Engine 5 with deeper humanity-index cyberpsychosis mechanics!
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('gaming-cyberpunk-orion')">🎮 Read Cyberpunk Orion Trailer</button>
        <button type="button" class="chat-action-btn" onclick="openProductModal('prod-cyber-hoodie')">🛍️ View Cyber Hoodie</button>
      </div>`;
    }

    // Dune & Cinema
    if (q.includes("dune") || q.includes("paul atreides") || q.includes("messiah") || q.includes("arrakis") || q.includes("chalamet")) {
      return `🎬 <b>Cinema Vault Transmission:</b><br>
      Denis Villeneuve's <i>Dune</i> adaptation masterfully captures Paul Atreides' descent from a mythical Duke to an imperial prisoner of his own prescience in <i>Dune Messiah</i>.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-dune-part-three')">🎬 Watch Dune Trailer & Breakdown</button>
        <button type="button" class="chat-action-btn" onclick="openUniverseHub('movies')">🍿 Cinema Vault</button>
      </div>`;
    }

    // Nolan & Oppenheimer
    if (q.includes("nolan") || q.includes("oppenheimer") || q.includes("interstellar") || q.includes("inception") || q.includes("imax")) {
      return `🎥 <b>Auteur Cinema Deep-Dive:</b><br>
      Christopher Nolan revolutionized modern 70mm IMAX cinema in <i>Oppenheimer</i>, demonstrating that practical effects and acoustic design can generate more unbearable suspense than fictional CGI apocalypses.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-nolan-temporal-mastery')">🎥 Nolan 70mm Article & Trailer</button>
      </div>`;
    }

    // The Batman / Comics
    if (q.includes("batman") || q.includes("pattinson") || q.includes("matt reeves") || q.includes("gotham") || q.includes("dark knight")) {
      return `🦇 <b>Gotham Detective Files:</b><br>
      Matt Reeves crafted a rain-soaked 1970s neo-noir thriller in <i>The Batman</i>, showing Bruce Wayne transforming from an avatar of vengeance into a beacon of hope for Gotham City.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('movies-the-batman-epic-saga')">🦇 The Batman Article & Trailer</button>
      </div>`;
    }

    // Arcane & Jinx
    if (q.includes("arcane") || q.includes("jinx") || q.includes("vi") || q.includes("league of legends") || q.includes("hextech")) {
      return `⚡ <b>Arcane Season 2 Grand Finale:</b><br>
      Fortiche and Riot Games fused 2D hand-painted brushwork with 3D animation to tell the heart-wrenching tragedy between Jinx (Powder) and Vi across Piltover and Zaun.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('tv-arcane-season-two')">📺 Arcane Trailer & Analysis</button>
      </div>`;
    }

    // Spider-Man & Miles Morales
    if (q.includes("spider") || q.includes("miles morales") || q.includes("spider-verse") || q.includes("gwen")) {
      return `🕷️ <b>Multiverse Spider-Society:</b><br>
      Miles Morales redefined modern comic heroism with his signature line: <i>"Everyone keeps telling me how my story is supposed to go. Nah, I'ma do my own thing."</i>
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('comics-spider-man-multiverse')">💥 Read Miles Morales Lore</button>
      </div>`;
    }

    // Berserk & Guts
    if (q.includes("berserk") || q.includes("guts") || q.includes("griffith") || q.includes("miura") || q.includes("eclipse")) {
      return `🗡️ <b>Berserk Dark Fantasy Legacy:</b><br>
      Kentaro Miura's masterpiece isn't merely dark fantasy—it is a radiant testament to human perseverance. Wielding the massive Dragonslayer sword, Guts refuses to yield to cosmic destiny.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('manga-berserk-legacy')">📖 Read Berserk Legacy Article</button>
      </div>`;
    }

    // K-Pop & NewJeans
    if (q.includes("kpop") || q.includes("k-pop") || q.includes("newjeans") || q.includes("hype boy") || q.includes("music")) {
      return `🎤 <b>K-Pop Aesthetic Revolution:</b><br>
      NewJeans sparked a global minimalist counter-revolution by embracing breezy Y2K R&B grooves, effortless choreography, and bedroom pop nostalgia on the Billboard charts.
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="openArticleReader('kpop-hybe-newjeans-revolution')">🎤 NewJeans Article & Official MV</button>
      </div>`;
    }

    // Store / Shop / Merchandise
    if (q.includes("shop") || q.includes("buy") || q.includes("merch") || q.includes("hoodie") || q.includes("jacket") || q.includes("price") || q.includes("katana") || q.includes("kharid")) {
      return `🛍️ <b>Exclusive FandomVerse Drop Shop:</b><br>
      Here are trending collector drops available now:
      <br>• <b>Neo-Tokyo Hologram Hoodie:</b> Rs. 4,999 (Limited Edition)
      <br>• <b>Cyberpunk LED Audio Bomber:</b> Rs. 5,499
      <br>• <b>Nichirin Sun-Breathing Katana Keyring:</b> Rs. 2,199
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="document.getElementById('shop').scrollIntoView({behavior:'smooth'})">🛍️ View Full Drop Shop</button>
        <button type="button" class="chat-action-btn" onclick="openCartDrawer()">🛒 Open Cart (${State.cart.length} items)</button>
      </div>`;
    }

    // Events & Gatherings
    if (q.includes("event") || q.includes("convention") || q.includes("gather") || q.includes("expo") || q.includes("pass")) {
      return `🎫 <b>Global Multiverse Events 2026:</b><br>
      • <b>Tokyo Anime Multiverse Expo:</b> Oct 18 • Shibuya (Exclusive MAJIMA Screening)
      <br>• <b>Gamescom Cyberpunk Arena:</b> Nov 07 • Cologne (Hands-on demo & speedruns)
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="document.getElementById('events').scrollIntoView({behavior:'smooth'})">📅 View All Events & Claim Pass</button>
      </div>`;
    }

    // Quiz & Trivia
    if (q.includes("quiz") || q.includes("trivia") || q.includes("sort") || q.includes("test") || q.includes("archetype")) {
      return `🔮 <b>Multiverse Fan Arena:</b><br>
      Take the 5-question <b>Archetype Sorting Quiz</b> to find your true home realm, or test your daily knowledge in the <b>Trivia Challenge</b>!
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="document.getElementById('arena').scrollIntoView({behavior:'smooth'})">🎯 Take Sorting Quiz</button>
      </div>`;
    }

    // Greetings
    if (q === "hi" || q === "hello" || q === "hey" || q.includes("greetings") || q.includes("salam")) {
      return `Hello traveler! 🌌 I am connected to all 7 sectors of FandomVerse. Ask me about your favorite character, upcoming trailers, game speedruns, or say <b>surprise me</b>!
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="sendChatMessage('Who is Satoru Gojo?')">⚡ Gojo Satoru</button>
        <button type="button" class="chat-action-btn" onclick="sendChatMessage('Tell me about Elden Ring lore')">🎮 Elden Ring</button>
        <button type="button" class="chat-action-btn" onclick="sendChatMessage('Surprise me with a fandom fact')">✨ Surprise Me</button>
      </div>`;
    }

    // Surprise Me / Lore Facts
    if (q.includes("surprise") || q.includes("fact") || q.includes("secret")) {
      const facts = [
        "✨ <b>Berserk Fact:</b> Kentaro Miura spent up to 14 hours every single day drawing individual hand-hatched ink lines for Guts' Berserker Armor.",
        "✨ <b>Elden Ring Fact:</b> General Radahn mastered gravitational sorcery specifically so he would never crush his beloved scrawny steed, Leonard!",
        "✨ <b>Spider-Verse Fact:</b> In <i>Into the Spider-Verse</i>, Miles Morales was animated at 12 frames per second (on the twos) early on to convey his clumsy inexperience, then bumped to 24fps once he mastered his powers.",
        "✨ <b>Arcane Fact:</b> Studio Fortiche and Riot Games spent over six years meticulously hand-painting 2D brushstroke textures onto 3D character rigs for Season 1.",
        "✨ <b>Dune Fact:</b> Sound designer Mark Mangini recorded the sound of wind whipping through sand dunes using contact microphones buried two feet beneath Death Valley sand dunes."
      ];
      return facts[Math.floor(Math.random() * facts.length)] + `
      <div class="chat-action-cards">
        <button type="button" class="chat-action-btn" onclick="sendChatMessage('Surprise me with another fact')">✨ Another Fact</button>
      </div>`;
    }

    // Fallback default with suggestions
    return `The Multiverse Oracle has processed your query: "<i>${query}</i>".<br><br>
    I can answer in-depth lore questions about <b>Gojo, Luffy, Malenia, Paul Atreides, Jinx, Guts</b>, show trailer transmissions, or recommend exclusive merchandise. You can also chat with me in Roman Urdu!
    <div class="chat-action-cards">
      <button type="button" class="chat-action-btn" onclick="sendChatMessage('Who is the strongest character?')">⚡ Strongest Character</button>
      <button type="button" class="chat-action-btn" onclick="sendChatMessage('Recommend me an anime and game')">🎯 Recommendations</button>
      <button type="button" class="chat-action-btn" onclick="sendChatMessage('Show me collector merch deals')">🛍️ Merch Deals</button>
    </div>`;
  }

  // =========================================================================
  // GLOBAL MODAL HELPERS & SCROLL REVEALS
  // =========================================================================

  window.closeAllModals = function() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active"));
    document.querySelectorAll(".modal-window").forEach(w => w.classList.remove("cinema-lights-dimmed"));
    const iframes = document.querySelectorAll(".reader-video-wrapper iframe");
    iframes.forEach(iframe => {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: "" }), "*");
      } catch (e) {}
    });
  };

  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeAllModals();
    });
  });

  // Mobile Menu Toggle
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const navHeader = document.getElementById("navHeader");

  if (menuToggleBtn && navHeader) {
    menuToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navHeader.classList.toggle("mobile-expanded");
    });

    // Auto-close menu when tapping any navigation link
    document.querySelectorAll(".nav-menu .nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navHeader.classList.remove("mobile-expanded");
      });
    });

    // Auto-close menu when tapping outside header
    document.addEventListener("click", (e) => {
      if (navHeader.classList.contains("mobile-expanded") && !navHeader.contains(e.target)) {
        navHeader.classList.remove("mobile-expanded");
      }
    });
  }

  // Intersection Observer for Smooth Scroll Reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  function observeReveals() {
    document.querySelectorAll(".reveal-on-scroll").forEach(el => revealObserver.observe(el));
  }

  // =========================================================================
  // BOOTSTRAP INITIALIZATION
  // =========================================================================

  renderUniverses();
  renderArticles();
  renderQuiz();
  renderTrivia();
  renderEvents();
  renderProducts();
  renderCommunityPosts();
  updateCartBadges();
  updateBookmarkBadges();
  observeReveals();

  // Dismiss loader on window load
  setTimeout(() => {
    const loader = document.getElementById("pageLoader");
    if (loader) loader.classList.add("hidden");
  }, 600);
});
