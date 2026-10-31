/**
 * app.js — Vanilla ES6+ Portfolio Rendering & Interaction Engine
 * ----------------------------------------------------------------------------
 * Reads `window.PORTFOLIO_DATA` from `data.js` and renders the complete
 * Smoked Jade & Whisper Glass portfolio with segmented filtering, inline
 * accordions, live telemetry clock, and radial pointer spotlight.
 */

(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA || {};

  // ===========================================================================
  // 1. Bespoke 1.75px Stroke SVG Icon Dictionary (Zero AI-Slop / Zero Emojis)
  // ===========================================================================
  const ICONS = {
    // Social & Header Action Icons
    github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-6 0C5.8.1 4.7.5 4.7.5A5 5 0 0 0 4.6 4a5.4 5.4 0 0 0-1.4 3.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 18c-3 .9-3-1.3-4.2-1.7"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    "file-text": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h8l4 4V21H6a2 2 0 0 1-2-2V4.5a2 2 0 0 1 2-2Z"/><path d="M14 2.5V7h4M8 11h7M8 14h7M8 17h4"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
    chevron: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>`,

    // Experience Role Icons
    "monitor-check": `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4m-3-10 2 2 4-4"/></svg>`,
    "scatter-chart": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><circle cx="8" cy="15" r="1.4"/><circle cx="12" cy="11" r="1.4"/><circle cx="17" cy="7" r="1.4"/></svg>`,
    "network-nodes": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="7" r="2"/><circle cx="5" cy="17" r="2"/><circle cx="13" cy="12" r="2"/><circle cx="20" cy="7" r="2"/><circle cx="20" cy="17" r="2"/><path d="m7 8 4 3m-4 5 4-3m4-2 3-3m-3 5 3 3"/></svg>`,
    cpu: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4" rx=".5"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg>`,
    "pen-tool": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 19 7-7 3 3-7 7-3-3ZM18 13l-1.5-7.5L2 2l3.5 14.5L13 18M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,

    // Skill Domain Stroke Icons
    database: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
    motion: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 17 5-10h4l-2 4h5l4 6h-5l-2-3-1.5 3H4Z"/></svg>`,
    nodes: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="12" cy="18" r="2"/><path d="m7.5 10.5 3-3m3 0 3 3m0 3-3 3m-3 0-3-3"/></svg>`,
    barchart: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9m5 10V5m5 14v-7m5 7V8"/></svg>`,
    "sparkle-grid": `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v5M9.5 4.5h5M12 17v5M9.5 19.5h5M2 12h5M4.5 9.5v5M17 12h5M19.5 9.5v5M12 9v6M9 12h6"/></svg>`,
    "pen-nib": `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4-1 10-10-3-3L5 16l-1 4Z"/><path d="m13 8 3 3"/></svg>`,
    server: `<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01M15 7h3M15 17h3"/></svg>`,

    // Project Domain Icons
    candlestick: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V4m-2 7h4v5H3v-5Zm9 9V3m-2 4h4v6h-4V7Zm9 13V6m-2 8h4v4h-4v-4Z"/></svg>`,
    "scan-face": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4H4v3m13-3h3v3M4 17v3h3m13-3v3h-3"/><circle cx="12" cy="10" r="3"/><path d="M7.5 18c.8-2.5 2.4-3.5 4.5-3.5s3.7 1 4.5 3.5"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 2-6h6l2 6H3Zm8 0 2-6h6l2 6H11ZM7 11l2-5h6l2 5"/><path d="M4 20h16"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4C11 4 6 7 6 13a6 6 0 0 0 6 6c6 0 9-5 7-15Z"/><path d="M5 20c2-4 6-7 11-10m-1 5h4m-2-2v4"/></svg>`,
    "shopping-bag": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Zm4 1V6a3 3 0 0 1 6 0v3"/><path d="M9 15a3 3 0 0 1 5-1m1 2a3 3 0 0 1-5 2"/></svg>`,
    "eco-circle": `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M17 7c-5 0-8 2-8 5a3 3 0 0 0 3 3c3 0 5-3 5-8Zm-9 10 6-6"/></svg>`,

    // Credential Icons
    "graduation-cap": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v5c3 2 7 2 10 0v-5"/></svg>`,
    "shield-check": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Z"/><path d="m9.2 12 2 2 3.8-3.8"/></svg>`
  };

  // ===========================================================================
  // 2. Helper Utilities & Client-Side UI State
  // ===========================================================================
  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const getIcon = (key, fallback = "cpu") => ICONS[key] || ICONS[fallback] || "";

  // Initial active categories and expanded experience
  const defaultExpCategory =
    data.experienceCategories && data.experienceCategories.length > 0
      ? data.experienceCategories[0].id
      : "professional";

  const getInitialExpandedExp = () => {
    const items = (data.experience || []).filter(
      (item) => defaultExpCategory === "all" || item.category === defaultExpCategory
    );
    return items.length > 0 ? [items[0].id] : [];
  };

  const defaultCredCategory =
    data.credentialCategories && data.credentialCategories.length > 0
      ? data.credentialCategories[0].id
      : "education";

  const state = {
    activeExpCategory: defaultExpCategory,
    expandedExpIds: new Set(getInitialExpandedExp()),
    activeCredCategory: defaultCredCategory
  };

  // ===========================================================================
  // 3. Render Section 00: Telemetry Bar & Open Hero
  // ===========================================================================
  const renderHero = () => {
    const profile = data.profile || {};
    const telemetryMount = document.getElementById("telemetry-mount");
    const heroMount = document.getElementById("hero-mount");

    if (telemetryMount) {
      const statusHtml = profile.status?.available
        ? `<div class="telemetry-status" role="status">
             <span class="status-dot" aria-hidden="true"></span>
             <span>${escapeHtml(profile.status.label || "Available")}</span>
           </div>`
        : "";

      telemetryMount.innerHTML = `
        <div class="telemetry-left">
          <span class="telemetry-index">${escapeHtml(profile.indexLabel || "00 // PORTFOLIO")}</span>
          <span class="telemetry-sep" aria-hidden="true">·</span>
          <span class="telemetry-clock" id="live-clock">${escapeHtml(profile.city || "Indonesia")} · --:--</span>
        </div>
        ${statusHtml}
      `;
    }

    if (heroMount) {
      document.title = `${profile.name || "Portfolio"} · Portfolio`;

      const socialsHtml = (profile.socials || [])
        .map((social) => {
          const isExternal = social.url?.startsWith("http") || social.url?.endsWith(".pdf");
          const targetAttrs = isExternal ? `target="_blank" rel="noopener noreferrer"` : "";
          return `
            <a class="icon-link" href="${escapeHtml(social.url)}" ${targetAttrs} aria-label="${escapeHtml(social.label)}" title="${escapeHtml(social.label)}">
              ${getIcon(social.icon, "github")}
            </a>
          `;
        })
        .join("");

      const locationLink = `<a class="text-link" href="${escapeHtml(profile.locationUrl || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.city || "")}</a>`;

      const bioHtml = (profile.bio || [])
        .map((paragraph) => {
          const safeParagraph = escapeHtml(paragraph).replace("{location}", locationLink);
          return `<p class="intro">${safeParagraph}</p>`;
        })
        .join("");

      const primaryBtn = profile.actions?.primary;
      const secondaryBtn = profile.actions?.secondary;

      heroMount.innerHTML = `
        <div class="hero-topline">
          <div class="identity">
            <h1>${escapeHtml(profile.name || "Portfolio Owner")}</h1>
            <p class="role">${escapeHtml(profile.role || "")}</p>
          </div>
          <nav class="socials" aria-label="Social links">
            ${socialsHtml}
          </nav>
        </div>
        ${bioHtml}
        <div class="actions">
          ${primaryBtn
          ? `<a class="button primary" href="${escapeHtml(primaryBtn.url)}" target="_blank" rel="noopener noreferrer">
                   ${getIcon(primaryBtn.icon || "calendar")}
                   <span>${escapeHtml(primaryBtn.label)}</span>
                 </a>`
          : ""
        }
          ${secondaryBtn
          ? `<a class="button" href="${escapeHtml(secondaryBtn.url)}">
                   ${getIcon(secondaryBtn.icon || "mail")}
                   <span>${escapeHtml(secondaryBtn.label)}</span>
                 </a>`
          : ""
        }
        </div>
      `;
    }
  };

  // Live Local Clock Updater
  const startTelemetryClock = () => {
    const profile = data.profile || {};
    const clockEl = document.getElementById("live-clock");
    if (!clockEl) return;

    const cityPrefix = (profile.city || "Indonesia").split(",")[0].toUpperCase();
    const tz = profile.timezone || "Asia/Jakarta";
    const tzShort = profile.timezoneLabel || "WIB";

    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        }).format(now);
        clockEl.textContent = `${cityPrefix} · ${formatted} ${tzShort}`;
      } catch {
        clockEl.textContent = `${cityPrefix} · ${tzShort}`;
      }
    };

    updateClock();
    setInterval(updateClock, 30000);
  };

  // ===========================================================================
  // 4. Render Section 01: Experience (Segmented Filter + Inline Accordions)
  // ===========================================================================
  const getFilteredExperience = () => {
    const items = data.experience || [];
    if (state.activeExpCategory === "all") return items;
    return items.filter((item) => item.category === state.activeExpCategory);
  };

  const renderExperience = () => {
    const tabsMount = document.getElementById("experience-tabs");
    const listMount = document.getElementById("experience-list");
    if (!tabsMount || !listMount) return;

    const allItems = data.experience || [];
    const categories = data.experienceCategories || [
      { id: "professional", label: "Professional" },
      { id: "organization", label: "Organization" },
      { id: "freelance", label: "Freelance" }
    ];

    // Render Segmented Filter Tabs with Counts
    tabsMount.innerHTML = categories
      .map((cat) => {
        const count =
          cat.id === "all"
            ? allItems.length
            : allItems.filter((item) => item.category === cat.id).length;
        const isSelected = state.activeExpCategory === cat.id;
        return `
          <button
            type="button"
            class="filter-tab"
            role="tab"
            aria-selected="${isSelected}"
            data-exp-tab="${escapeHtml(cat.id)}"
          >
            <span>${escapeHtml(cat.label)}</span>
            <span class="tab-count">${count}</span>
          </button>
        `;
      })
      .join("");

    const filtered = getFilteredExperience();

    if (filtered.length === 0) {
      listMount.innerHTML = `<div class="empty-state">No experience entries in this category yet.</div>`;
      return;
    }

    listMount.innerHTML = filtered
      .map((item, idx) => {
        const isExpanded = state.expandedExpIds.has(item.id);
        const bulletsHtml = (item.bullets || [])
          .map((point) => `<li>${escapeHtml(point)}</li>`)
          .join("");

        return `
          <article
            class="exp-card animate-in"
            data-exp-id="${escapeHtml(item.id)}"
            data-expanded="${isExpanded}"
            style="animation-delay: ${idx * 25}ms"
          >
            <button
              type="button"
              class="exp-trigger"
              aria-expanded="${isExpanded}"
              aria-controls="drawer-${escapeHtml(item.id)}"
              data-exp-toggle="${escapeHtml(item.id)}"
            >
              <span class="exp-icon-well" aria-hidden="true">
                ${getIcon(item.icon, "cpu")}
              </span>
              <span class="exp-summary-main">
                <span class="exp-role">${escapeHtml(item.role)}</span>
                <span class="exp-company">${escapeHtml(item.company)}</span>
              </span>
              <span class="exp-summary-right">
                <span class="exp-period">${escapeHtml(item.period)}</span>
                <span class="exp-chevron" aria-hidden="true">${ICONS.chevron}</span>
              </span>
            </button>
            <div class="exp-drawer" id="drawer-${escapeHtml(item.id)}">
              <div class="exp-drawer-inner">
                <div class="exp-drawer-content">
                  ${item.location ? `<p class="exp-location">${escapeHtml(item.location)}</p>` : ""}
                  <ul class="exp-bullets">
                    ${bulletsHtml}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  };

  // ===========================================================================
  // 5. Render Section 02: Capabilities (Unboxed Skills Matrix)
  // ===========================================================================
  const renderSkills = () => {
    const skillsMount = document.getElementById("skills-list");
    if (!skillsMount) return;

    const groups = data.skills || [];
    skillsMount.innerHTML = groups
      .map((group) => {
        const itemsHtml = (group.items || [])
          .map((skill) => {
            let iconMarkup = "";
            if (skill.customIcon && ICONS[skill.customIcon]) {
              iconMarkup = ICONS[skill.customIcon];
            } else if (skill.iconSlug) {
              const iconUrl = `https://cdn.simpleicons.org/${encodeURIComponent(skill.iconSlug)}/98A8A2`;
              iconMarkup = `<img class="skill-icon" src="${iconUrl}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback="nodes">`;
            } else {
              iconMarkup = ICONS.nodes;
            }

            return `
              <span class="skill-item">
                ${iconMarkup}
                <span>${escapeHtml(skill.name)}</span>
              </span>
            `;
          })
          .join("");

        return `
          <div class="skill-row">
            <div class="skill-label">${escapeHtml(group.category)}</div>
            <div class="skill-list">${itemsHtml}</div>
          </div>
        `;
      })
      .join("");

    // Graceful icon fallback if offline or CDN blocked
    skillsMount.querySelectorAll("img.skill-icon").forEach((img) => {
      img.addEventListener(
        "error",
        () => {
          const fallbackSvg = document.createElement("span");
          fallbackSvg.innerHTML = ICONS.nodes;
          const svgNode = fallbackSvg.firstElementChild;
          if (svgNode) img.replaceWith(svgNode);
        },
        { once: true }
      );
    });
  };

  // ===========================================================================
  // 6. Render Section 03: Selected Projects (2-Column Bento Grid)
  // ===========================================================================
  const renderProjects = () => {
    const projectsMount = document.getElementById("projects-grid");
    const repoLinkMount = document.getElementById("projects-repo-link");
    if (!projectsMount) return;

    if (repoLinkMount && data.projectsHeaderLink) {
      repoLinkMount.href = data.projectsHeaderLink.url || "#";
      repoLinkMount.textContent = data.projectsHeaderLink.label || "All repositories ↗";
    }

    const projects = data.projects || [];
    projectsMount.innerHTML = projects
      .map((proj) => {
        const stackHtml = (proj.stack || [])
          .map((tech, index) => {
            const sep = index > 0 ? `<span class="stack-dot" aria-hidden="true">·</span>` : "";
            return `${sep}<span>${escapeHtml(tech)}</span>`;
          })
          .join("");

        return `
          <a
            class="project-card"
            href="${escapeHtml(proj.url || "#")}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <div class="project-card-top">
                <span class="project-icon-well" aria-hidden="true">
                  ${getIcon(proj.icon, "layers")}
                </span>
                <span class="project-tag-group">
                  <span>${escapeHtml(proj.tag || "")}</span>
                  <span class="project-arrow" aria-hidden="true">↗</span>
                </span>
              </div>
              <h3 class="project-name">${escapeHtml(proj.name)}</h3>
              <p class="project-desc">${escapeHtml(proj.description)}</p>
            </div>
            <div class="project-stack" aria-label="Technologies used">
              ${stackHtml}
            </div>
          </a>
        `;
      })
      .join("");
  };

  // ===========================================================================
  // 7. Render Section 04: Credentials (Education vs. Certifications)
  // ===========================================================================
  const renderCredentials = () => {
    const tabsMount = document.getElementById("credentials-tabs");
    const listMount = document.getElementById("credentials-list");
    if (!tabsMount || !listMount) return;

    const allCreds = data.credentials || [];
    const categories = data.credentialCategories || [
      { id: "education", label: "Education" },
      { id: "certification", label: "Certifications" }
    ];

    tabsMount.innerHTML = categories
      .map((cat) => {
        const count =
          cat.id === "all"
            ? allCreds.length
            : allCreds.filter((item) => item.type === cat.id).length;
        const isSelected = state.activeCredCategory === cat.id;

        return `
          <button
            type="button"
            class="filter-tab"
            role="tab"
            aria-selected="${isSelected}"
            data-cred-tab="${escapeHtml(cat.id)}"
          >
            <span>${escapeHtml(cat.label)}</span>
            <span class="tab-count">${count}</span>
          </button>
        `;
      })
      .join("");

    const filtered =
      state.activeCredCategory === "all"
        ? allCreds
        : allCreds.filter((item) => item.type === state.activeCredCategory);

    if (filtered.length === 0) {
      listMount.innerHTML = `<div class="empty-state">No credentials in this category yet.</div>`;
      return;
    }

    listMount.innerHTML = filtered
      .map((cred, idx) => {
        const hasUrl = Boolean(cred.url);
        const tag = hasUrl ? "a" : "div";
        const hrefAttrs = hasUrl
          ? `href="${escapeHtml(cred.url)}" target="_blank" rel="noopener noreferrer"`
          : "";
        const isCert = cred.type === "certification";

        return `
          <${tag}
            class="cred-row animate-in"
            data-type="${escapeHtml(cred.type)}"
            style="animation-delay: ${idx * 25}ms"
            ${hrefAttrs}
          >
            <span class="cred-icon-well" aria-hidden="true">
              ${getIcon(cred.icon || (isCert ? "shield-check" : "graduation-cap"))}
            </span>
            <div class="cred-main">
              <div class="cred-title-line">
                <h3 class="cred-title">${escapeHtml(cred.title)}</h3>
                
              </div>
              <div class="cred-sub-line">
                ${cred.highlight
            ? `<span class="cred-highlight-pill">${escapeHtml(cred.highlight)}</span>`
            : ""
          }
                <span>${escapeHtml(cred.subtitle)}</span>
              </div>
            </div>
            <div class="cred-meta">
              <span class="cred-period">${escapeHtml(cred.period)}</span>
              ${hasUrl
            ? `<span class="cred-verify">${escapeHtml(cred.meta || "Verify ↗")}</span>`
            : `<span class="cred-location">${escapeHtml(cred.meta || "")}</span>`
          }
            </div>
          </${tag}>
        `;
      })
      .join("");
  };

  // ===========================================================================
  // 8. Interactive Event Delegation & Motion Effects
  // ===========================================================================
  const bindInteractions = () => {
    // Experience Filter Tabs: clicking a tab selects category and opens topmost experience
    document.getElementById("experience-tabs")?.addEventListener("click", (event) => {
      const tabBtn = event.target.closest("[data-exp-tab]");
      if (!tabBtn) return;
      const nextCat = tabBtn.getAttribute("data-exp-tab");
      if (nextCat) {
        state.activeExpCategory = nextCat;
        const filtered = getFilteredExperience();
        state.expandedExpIds = new Set(filtered.length > 0 ? [filtered[0].id] : []);
        renderExperience();
      }
    });

    // Experience Individual Accordion Toggle (Exclusive accordion: max 1 item open at any time)
    document.getElementById("experience-list")?.addEventListener("click", (event) => {
      const toggleBtn = event.target.closest("[data-exp-toggle]");
      if (!toggleBtn) return;
      const expId = toggleBtn.getAttribute("data-exp-toggle");
      const card = toggleBtn.closest(".exp-card");
      if (!expId || !card) return;

      const willExpand = !state.expandedExpIds.has(expId);
      state.expandedExpIds.clear();
      if (willExpand) {
        state.expandedExpIds.add(expId);
      }

      // Smooth in-place DOM attribute update for all cards in the list
      const listMount = document.getElementById("experience-list");
      listMount?.querySelectorAll(".exp-card").forEach((c) => {
        const cId = c.getAttribute("data-exp-id");
        const isExpanded = state.expandedExpIds.has(cId);
        c.setAttribute("data-expanded", String(isExpanded));
        c.querySelector(".exp-trigger")?.setAttribute("aria-expanded", String(isExpanded));
      });
    });

    // Credentials Filter Tabs
    document.getElementById("credentials-tabs")?.addEventListener("click", (event) => {
      const tabBtn = event.target.closest("[data-cred-tab]");
      if (!tabBtn) return;
      const nextCat = tabBtn.getAttribute("data-cred-tab");
      if (nextCat && nextCat !== state.activeCredCategory) {
        state.activeCredCategory = nextCat;
        renderCredentials();
      }
    });

    // Top Scroll Progress Bar
    const progressEl = document.querySelector(".page-progress");
    let scrollTicking = false;
    const updateScrollProgress = () => {
      if (progressEl) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        progressEl.style.transform = `scaleX(${ratio})`;
      }
      scrollTicking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          requestAnimationFrame(updateScrollProgress);
          scrollTicking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Pointer Aura & Project Card Spotlight (Fine Pointer Only)
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const auraEl = document.querySelector(".cursor-aura");

    if (finePointer.matches && !reduceMotion.matches) {
      let auraFrame = 0;
      let pointerX = 0;
      let pointerY = 0;

      window.addEventListener(
        "pointermove",
        (event) => {
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (auraEl && !auraFrame) {
            auraFrame = requestAnimationFrame(() => {
              auraEl.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
              auraEl.style.opacity = "1";
              auraFrame = 0;
            });
          }

          const card = event.target.closest(".project-card");
          if (card) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
            card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
          }
        },
        { passive: true }
      );

      document.addEventListener("mouseleave", () => {
        if (auraEl) auraEl.style.opacity = "0";
      });
    }
  };

  // ===========================================================================
  // 9. Boot Portfolio Application
  // ===========================================================================
  const init = () => {
    renderHero();
    startTelemetryClock();
    renderExperience();
    renderSkills();
    renderProjects();
    renderCredentials();
    bindInteractions();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
