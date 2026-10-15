// 14 oct 2026: GramPedia, real TON for referrals: a banner on Explore and a dedicated page (balance, progress, TON wallet,
// how it works). Its own budget and balance (separate from Meme Coin Tycoon), served by the Supabase function mct-ton (app 'gp').
(() => {
  const F = 'https://txvrlvcxfnylnrpdrxtt.supabase.co/functions/v1/mct-ton';
  const TX = {
    en: { h: '💎 Earn real TON', s: (u) => '$' + u + ' in TON for every friend who adds his channel, group or bot to GramPedia', v: 'Valid friends', p: 'Pending', r: 'Received', b: 'Balance', mn: (m) => 'paid from $' + m, togo: (x) => '$' + x + ' to go before your payment', ready: 'Ready: paid within 7 days 🎉', wait: 'being paid', w: 'Your TON wallet', ph: 'Paste your TON address (UQ... or EQ...)', save: 'Save', ok: 'Wallet saved ✅', bad: 'Invalid TON address', chg: 'Change', nowal: 'Add your wallet to get paid 👇', inv: '👥 Invite my friends', how: 'How it works', st: (u, m, d) => ['👥 Invite your friends with your link', '📚 They add their channel, group, bot or mini app to GramPedia, and it gets approved', '💎 You earn $' + u + ' in real TON per friend', '👛 Paid to your TON wallet from $' + m + ', within ' + d + ' days'], rule: 'Fake accounts and listings that are not theirs are never paid.', off: 'Budget of the month reached: TON rewards are back next month.', back: '← Back', bh: '💎 Earn real TON with your friends', bs: '$0.05 in TON per friend who lists his project · tap here', share: '📚 GramPedia: the directory of Telegram channels, groups, bots and mini apps. Add yours for free!' },
    fr: { h: '💎 Gagne de vrais TON', s: (u) => u + ' $ en TON par ami qui ajoute sa chaîne, son groupe ou son bot sur GramPedia', v: 'Amis validés', p: 'En attente', r: 'Reçu', b: 'Solde', mn: (m) => 'paiement dès ' + m + ' $', togo: (x) => 'Encore ' + x + ' $ avant ton paiement', ready: 'Prêt : paiement sous 7 jours 🎉', wait: 'en cours de paiement', w: 'Ton portefeuille TON', ph: 'Colle ton adresse TON (UQ... ou EQ...)', save: 'OK', ok: 'Portefeuille enregistré ✅', bad: 'Adresse TON invalide', chg: 'Changer', nowal: 'Ajoute ton portefeuille pour être payé 👇', inv: '👥 Inviter mes amis', how: 'Comment ça marche', st: (u, m, d) => ['👥 Invite tes amis avec ton lien', '📚 Ils ajoutent leur chaîne, groupe, bot ou mini app sur GramPedia, et elle est approuvée', '💎 Tu gagnes ' + u + ' $ en vrais TON par ami', '👛 Paiement sur ton portefeuille TON dès ' + m + ' $, sous ' + d + ' jours'], rule: 'Les faux comptes et les fiches qui ne sont pas les leurs ne sont jamais payés.', off: 'Budget du mois atteint : les gains en TON reprennent le mois prochain.', back: '← Retour', bh: '💎 Gagne de vrais TON avec tes amis', bs: '0,05 $ en TON par ami qui ajoute son projet · appuie ici', share: '📚 GramPedia : l\'annuaire des chaînes, groupes, bots et mini apps Telegram. Ajoute le tien gratuitement !' },
  };
  const css = document.createElement('style');
  css.textContent = '.gtonb{display:flex;gap:12px;align-items:center;width:100%;text-align:left;margin:4px 0 12px;padding:12px 14px;border:2px solid #2ec4e6;border-radius:16px;background:linear-gradient(135deg,#e9fbff,#f3f0ff);cursor:pointer;color:var(--ink)}'
    + '.gtonb .e{font-size:28px}.gtonb b{display:block;font-size:15px}.gtonb small{color:var(--muted);font-size:13px}.gtonb .chip{margin-left:auto;background:#2ec4e6;color:#fff;font-weight:800;font-size:12px;padding:3px 9px;border-radius:999px}'
    + '.gton{padding:4px 0 30px}.gton h1{font:700 26px Fraunces,Georgia,serif;margin:6px 0 4px}.gton .sub{color:var(--muted);margin:0 0 14px}'
    + '.gton .hero{background:linear-gradient(135deg,#0f6aa3,#2ec4e6);color:#fff;border-radius:18px;padding:18px 16px;text-align:center}.gton .hero small{opacity:.85;font-size:12px;text-transform:uppercase;letter-spacing:.06em}'
    + '.gton .big{font-size:38px;font-weight:900;margin:4px 0 10px}.gton .bar{height:10px;border-radius:10px;background:rgba(255,255,255,.25);overflow:hidden}.gton .bar i{display:block;height:100%;background:#fff}'
    + '.gton .hero .note{display:block;margin-top:8px;font-size:13px;opacity:.9;text-transform:none;letter-spacing:0}.gton .tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}'
    + '.gton .tile{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px}.gton .tile b{display:block;font-size:20px}.gton .tile small{color:var(--muted)}.gton .wide{grid-column:1/-1}'
    + '.gton .wal{display:flex;gap:8px;margin:6px 0 14px}.gton input{flex:1;min-width:0;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--card);font-size:14px;color:var(--ink)}'
    + '.gton .addr{display:flex;gap:10px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin:6px 0 14px}.gton .addr span{flex:1;word-break:break-all;font-size:13px}'
    + '.gton .step{display:flex;gap:10px;align-items:flex-start;margin:0 0 10px}.gton .step i{flex:none;width:26px;height:26px;border-radius:50%;background:#2ec4e6;color:#fff;font-style:normal;font-weight:800;display:flex;align-items:center;justify-content:center}'
    + '.gton .hint{color:var(--muted);font-size:12px;margin-top:10px}.gton .full{width:100%}';
  document.head.appendChild(css);
  const L = () => TX[(ME && ME.lang) === 'fr' ? 'fr' : 'en'];
  const fr = () => (ME && ME.lang) === 'fr';
  const f2 = (n) => { const x = Number(n || 0).toFixed(2); return fr() ? x.replace('.', ',') : x; };
  const m$ = (n) => fr() ? f2(n) + ' $' : '$' + f2(n);
  const call = (body) => fetch(F, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ app: 'gp', initData: INIT, ...body }) }).then((r) => r.json());
  let ON = null;
  const on = () => { if (!ON) ON = call({}).then((s) => !!(s && s.ok && s.on)).catch(() => { ON = null; return false; }); return ON; };
  function back() { try { tgw.BackButton.hide(); tgw.BackButton.offClick(back); } catch (e) {} if (TAB === 'ton') go('explore'); }
  function invite() { haptic(); openLink('https://t.me/share/url?url=' + encodeURIComponent((ME && ME.refLink) || BOTU()) + '&text=' + encodeURIComponent(L().share)); }
  async function page(edit) {
    if (!INIT || !ME) return;
    const T = L(), a = $('app');
    if (TAB !== 'ton') {
      TAB = 'ton'; try { bar(); } catch (e) {} window.scrollTo(0, 0);
      try { tgw.BackButton.show(); tgw.BackButton.onClick(back); } catch (e) {}
      a.innerHTML = '<div class="load"><i></i></div>';
    }
    let s; try { s = await call({}); } catch (e) { return; }
    if (!s || !s.ok || TAB !== 'ton') return;
    const w = s.wallet, ed = edit || !w, bal = Number(s.total != null ? s.total : s.balance), mn = Number(s.min), pct = Math.min(100, Math.round(bal / mn * 100));
    a.innerHTML = `<div class="gton"><button class="btn small" id="gtbk">${T.back}</button><h1>${T.h}</h1><p class="sub">${T.s(f2(s.usd))}</p>`
      + `<div class="hero"><small>${T.b}</small><div class="big">${m$(bal)}</div><div class="bar"><i style="width:${pct}%"></i></div>`
      + `<small class="note">${bal >= mn ? (w ? T.ready : T.nowal) : T.togo(f2(mn - bal)) + ' · ' + T.mn(f2(mn))}</small></div>`
      + `<div class="tiles"><div class="tile"><b>${s.valid}</b><small>✅ ${T.v}</small></div><div class="tile"><b>${s.pending}</b><small>⏳ ${T.p}</small></div>`
      + `<div class="tile wide"><b>${m$(s.paid)}</b><small>💸 ${T.r}${Number(s.waiting) ? ' · ' + T.wait + ' ' + m$(s.waiting) : ''}</small></div></div>`
      + `<button class="btn main full" id="gti">${T.inv}</button>`
      // 15 oct 2026: the player's own invite link, visible, with a copy button (to paste it anywhere, not only through the share sheet)
      + `<h2>🔗 ${fr() ? 'Ton lien à partager' : 'Your link to share'}</h2><div class="addr"><span id="gtlk">${esc((ME && ME.refLink) || BOTU())}</span><button class="btn small" id="gtcp">${fr() ? 'Copier' : 'Copy'}</button></div>`
      + `<h2>👛 ${T.w}</h2>`
      + (ed ? `<div class="wal"><input id="gta" placeholder="${T.ph}" value="${esc(w || '')}" autocomplete="off" spellcheck="false"><button class="btn dark" id="gts">${T.save}</button></div>`
        : `<div class="addr"><span>${esc(w)}</span><button class="btn small" id="gtc">${T.chg}</button></div>`)
      + (Number(s.budget_left) < Number(s.usd) ? `<p class="hint">${T.off}</p>` : '')
      + `<div style="margin:12px 0 4px;padding:12px;border-radius:14px;border:1px solid rgba(255,200,60,.5);background:rgba(255,200,60,.1)"><b style="display:block;font-size:15px;margin-bottom:4px">🏆 ${fr() ? 'Concours de la semaine' : 'Weekly contest'}</b><span style="font-size:13px;line-height:1.4">${fr() ? 'Tes amis invités ici comptent pour le concours d\'Earn by Jeremstyke, l\'app où se trouvent ton solde et tes paiements. Chaque lundi, le top 3 gagne 1 $, 0,50 $ et 0,25 $ en TON, en plus de tes gains.' : 'The friends you invite here count in the Earn by Jeremstyke contest, the app where your balance and payouts are. Every Monday the top 3 win $1, $0.50 and $0.25 in TON, on top of your earnings.'}</span><button class="btn full" id="gtearn" style="margin:10px 0 0">🏆 ${fr() ? 'Voir le concours et mes gains' : 'See the contest and my earnings'}</button></div>` // 15 oct 2026: contest box, link to Earn (source gp)
      + `<h2>${T.how}</h2>` + T.st(f2(s.usd), f2(s.min), s.delay).map((x, i) => `<div class="step"><i>${i + 1}</i><span>${x}</span></div>`).join('')
      + `<p class="hint">${T.rule}</p></div>`;
    $('gtbk').onclick = () => { haptic(); back(); };
    $('gti').onclick = invite;
    $('gtearn').onclick = () => { haptic(); openLink('https://t.me/earnbyjeremstykebot?startapp=contest_gp'); };
    $('gtcp').onclick = async () => {
      haptic(); const v = (ME && ME.refLink) || BOTU(); let ok = false;
      try { await navigator.clipboard.writeText(v); ok = true; } catch (e) {}
      if (!ok) { try { const t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); ok = document.execCommand('copy'); t.remove(); } catch (e) {} }
      toast(ok ? (fr() ? 'Lien copié ✅' : 'Link copied ✅') : v);
    };
    if ($('gtc')) $('gtc').onclick = () => { haptic(); page(true); };
    if ($('gts')) $('gts').onclick = async () => {
      const v = ($('gta').value || '').trim(); if (!v) return;
      haptic(); $('gts').disabled = true;
      let r; try { r = await call({ action: 'wallet', addr: v }); } catch (e) { r = null; }
      if (!r || !r.ok) { toast(T.bad); if ($('gts')) $('gts').disabled = false; return; }
      toast(T.ok); page(false);
    };
  }
  window.gpTonPage = page;
  // the banner at the top of Explore (the list is rebuilt often: put it back each time)
  async function place() {
    const a = $('app'); if (!a || TAB !== 'explore' || !ME || !INIT || document.getElementById('gtonb')) return;
    if (!(await on())) return;
    if (TAB !== 'explore' || document.getElementById('gtonb') || !a.firstElementChild || a.querySelector('.load')) return;
    const T = L(), b = document.createElement('button');
    b.id = 'gtonb'; b.className = 'gtonb';
    b.innerHTML = `<span class="e">💎</span><span><b>${T.bh}</b><small>${T.bs}</small></span><span class="chip">TON</span>`;
    b.onclick = () => { haptic(); page(); };
    a.insertBefore(b, a.firstElementChild);
  }
  new MutationObserver(() => { place(); }).observe(document.body, { childList: true, subtree: true });
  place();
  // a link that opens the app on the TON page (?startapp=ton)
  const sp = String((tgw && tgw.initDataUnsafe && tgw.initDataUnsafe.start_param) || '');
  // 14 oct 2026: ?startapp=add opens the "add my listing" tab (link from Earn by Jeremstyke)
  if (sp === 'add') { const w1 = setInterval(() => { if (ME && TAB === 'explore') { clearInterval(w1); go('add'); } }, 300); setTimeout(() => clearInterval(w1), 15000); }
  if (sp === 'ton') { const w0 = setInterval(() => { if (ME) { clearInterval(w0); page(); } }, 300); setTimeout(() => clearInterval(w0), 15000); }
})();
