// Điểm khởi động: dựng header, các phần trong config/sections.js, footer và khung chat.

import site from './config/site.js';
import sections from './config/sections.js';
import chat from './widgets/chat.js';
import { injectCss, fragment, esc } from './lib/dom.js';
import { pick } from './lib/i18n.js';
import { togglesHtml, bindToggles } from './lib/prefs.js';

function renderHeader() {
  const links = sections
    .filter((s) => s.nav)
    .map((s) => `<a href="#${esc(s.id)}"${s.navHighlight ? ' class="is-cta"' : ''}>${esc(pick(s.nav))}</a>`);
  if (site.chat && site.chat.enabled) {
    links.push(`<a href="#chat" data-open-chat>${esc(site.nav.chat)}</a>`);
  }
  document.getElementById('site-header').replaceWith(fragment(`
    <div class="wrap site-header">
      <header class="bar">
        <a class="logo" href="#top">
          <span class="logo-img"><img src="${esc(site.mascot)}" alt=""></span>
          <span class="display logo-name">${esc(site.name)}</span>
        </a>
        <div class="bar-right">
          <nav class="nav" aria-label="Menu">${links.join('')}</nav>
          ${togglesHtml()}
        </div>
      </header>
    </div>`));
  bindToggles();
}

function renderSections() {
  const app = document.getElementById('app');
  for (const section of sections) {
    injectCss(section.id, section.css);
    const node = fragment(section.render(site));
    const roots = [...node.children];
    app.appendChild(node);
    if (typeof section.mount === 'function') {
      roots.forEach((el) => section.mount(el, site));
    }
  }
}

function renderFooter() {
  document.getElementById('site-footer').replaceWith(fragment(`
    <footer class="site-footer">
      <div class="wrap">
        <span>${esc(site.footer.left)}</span>
        <span>${esc(site.footer.right)}</span>
      </div>
      <div class="wrap footer-legal">
        ${site.footer.project ? `<p class="footer-project">${esc(site.footer.project)}</p>` : ''}
        ${site.footer.disclaimer ? `<p>${esc(site.footer.disclaimer)}</p>` : ''}
      </div>
    </footer>`));
}

document.title = site.name;
renderHeader();
renderSections();
renderFooter();
if (site.chat && site.chat.enabled) chat.mount(site);
