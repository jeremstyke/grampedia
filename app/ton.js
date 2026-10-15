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
  // 15 oct 2026: like Daily Score, a sheet instead of a separate page, with the same live total balance in every app (Meme Coin Tycoon,
  // GramPedia, Daily Score) and its detail per program. The wallet and the payouts are in Earn by Jeremstyke.
  const TOND = {
    fr: { tot: 'Mon solde total', mct: '🪙 Meme Coin Tycoon', gp: '📚 GramPedia', ds: '⚽ Daily Score', earn: '💰 Bonus Earn', tap: '💎 Diamant', other: '🏆 Concours et bonus', here: 'ici', paid: 'Déjà reçu', wait: 'En cours de paiement', pay: (m) => 'Payé chaque lundi dès ' + m + ' sur ton portefeuille TON', nowal: '👛 Ajoute ton portefeuille dans Earn pour être payé', wal: '✅ Portefeuille ajouté', addw: '👛 Ajouter mon portefeuille', c: '🏆 Tes amis comptent aussi pour le concours de la semaine sur Earn by Jeremstyke : 1 $, 0,50 $ et 0,25 $ en TON pour le top 3 chaque lundi, en plus de tes gains.', n: 'Ton portefeuille et tes paiements sont dans Earn by Jeremstyke.', my: '💰 Mes gains TON', close: 'Plus tard', lk: '🔗 Ton lien à partager', cp: 'Copier', cpd: 'Lien copié ✅' },
    en: { tot: 'My total balance', mct: '🪙 Meme Coin Tycoon', gp: '📚 GramPedia', ds: '⚽ Daily Score', earn: '💰 Earn bonus', tap: '💎 Diamond', other: '🏆 Contest and bonuses', here: 'here', paid: 'Already received', wait: 'Being paid', pay: (m) => 'Paid every Monday from ' + m + ' to your TON wallet', nowal: '👛 Add your wallet in Earn to get paid', wal: '✅ Wallet added', addw: '👛 Add my wallet', c: '🏆 Your friends also count in the weekly contest on Earn by Jeremstyke: $1, $0.50 and $0.25 in TON for the top 3 every Monday, on top of your earnings.', n: 'Your wallet and your payouts are in Earn by Jeremstyke.', my: '💰 My TON earnings', close: 'Later', lk: '🔗 Your link to share', cp: 'Copy', cpd: 'Link copied ✅' }
  };
  // 15 oct 2026: "Add my wallet" opens Earn by Jeremstyke right on the wallet field
  window.gpGoWal = () => { haptic(); openLink('https://t.me/earnbyjeremstykebot?startapp=wallet_gp'); };
  function det(a, D) {
    if (!a) return '';
    const dd = a.detail || {}, keys = ['mct', 'gp', 'ds', 'earn', 'tap'].concat(['other'].filter((k) => Number(dd[k]) > 0)).sort((x, y) => Number(dd[y] || 0) - Number(dd[x] || 0)); // 15 oct 2026: biggest first
    const row = (k) => `<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-top:1px solid rgba(255,255,255,.08);font-size:14px${k === 'gp' ? ';font-weight:700' : ''}"><span>${D[k]}${k === 'gp' ? ' <small style="opacity:.6">(' + D.here + ')</small>' : ''}</span><b>${k === 'tap' && Number(dd[k]) > 0 && Number(dd[k]) < 0.01 ? (fr() ? Number(dd[k]).toFixed(4).replace('.', ',') + ' $' : '$' + Number(dd[k]).toFixed(4)) : m$(dd[k] || 0)}</b></div>`;
    return `<small style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.06em;opacity:.7">${D.tot}</small><div style="font-size:34px;font-weight:900;line-height:1.15;margin:2px 0 8px">${m$(a.total)}</div>`
      + keys.map(row).join('')
      + (Number(a.paid) || Number(a.waiting) ? `<small style="display:block;margin-top:8px;opacity:.75">${Number(a.paid) ? '💸 ' + D.paid + ' ' + m$(a.paid) : ''}${Number(a.paid) && Number(a.waiting) ? ' · ' : ''}${Number(a.waiting) ? '⏳ ' + D.wait + ' ' + m$(a.waiting) : ''}</small>` : '')
      + `<small style="display:block;margin-top:8px;opacity:.75">${D.pay(m$(a.min))}</small>${a.wallet ? '<small style="display:block;margin-top:4px;font-weight:600">' + D.wal + '</small>' : '<button class="btn main full" onclick="gpGoWal()" style="margin-top:10px">' + D.addw + '</button>'}`;
  }
  const tiles = (s, T) => {
    const tile = (b, l) => `<div style="flex:1;min-width:0;padding:8px 4px;border-radius:12px;background:rgba(255,255,255,.07);text-align:center"><b style="display:block;font-size:17px">${b}</b><small style="display:block;font-size:11px;opacity:.7">${l}</small></div>`;
    return tile('✅ ' + Number(s.valid || 0), T.v) + tile('⏳ ' + Number(s.pending || 0), T.p);
  };
  let LIVE = null;
  async function page() {
    if (!INIT || !ME) return;
    const T = L(), D = TOND[fr() ? 'fr' : 'en'];
    let s; try { s = await call({}); } catch (e) { return; }
    if (!s || !s.ok) return;
    const old = document.getElementById('gtsheet'); if (old) old.remove();
    const d = document.createElement('div'); d.id = 'gtsheet';
    d.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center';
    const link = (ME && ME.refLink) || BOTU();
    d.innerHTML = `<div style="width:100%;max-width:520px;max-height:88vh;overflow:auto;background:#151a23;color:#fff;border-radius:20px 20px 0 0;padding:18px 16px 24px;box-sizing:border-box"><b style="display:block;font-size:18px;margin-bottom:4px">${T.h}</b><p style="margin:0 0 12px;font-size:15px;font-weight:700">${T.s(f2(s.usd))}</p>`
      + `<div id="gtdet" style="margin:0 0 12px;padding:14px;border-radius:16px;border:1px solid rgba(46,230,255,.45);background:rgba(46,230,255,.08)">${det(s.all, D)}</div>`
      + `<div id="gttl" style="display:flex;gap:6px;margin:0 0 14px">${tiles(s, T)}</div>`
      + T.st(f2(s.usd), f2(s.min), s.delay).map((x, i) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:0 0 8px"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2ee6ff;color:#062a33;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:13px">${i + 1}</span><span style="font-size:14px">${x}</span></div>`).join('')
      + (Number(s.budget_left) < Number(s.usd) ? `<p style="font-size:13px;opacity:.75">${T.off}</p>` : '')
      + `<div style="margin:6px 0 6px;font-size:13px;color:#ffd43b">${D.c}</div><div style="margin:0 0 12px;font-size:13px;opacity:.75">${D.n}</div>`
      + `<button class="btn main full" id="gti">${T.inv}</button>`
      + `<div style="display:flex;gap:8px;align-items:center;margin:10px 0 0;padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.07)"><span style="flex:1;min-width:0;font-size:12px;word-break:break-all">${esc(link)}</span><button class="btn small" id="gtcp">${D.cp}</button></div>`
      + `<button class="btn full" id="gtearn" style="margin-top:10px">${D.my}</button><div id="gtsc" style="cursor:pointer;text-decoration:underline;text-align:center;margin-top:12px;opacity:.75">${D.close}</div></div>`;
    document.body.appendChild(d);
    const close = () => { d.remove(); clearInterval(LIVE); };
    d.onclick = (e) => { if (e.target === d || e.target.id === 'gtsc') close(); };
    d.querySelector('#gti').onclick = () => { close(); invite(); };
    d.querySelector('#gtearn').onclick = () => { haptic(); openLink('https://t.me/earnbyjeremstykebot?startapp=gp'); };
    d.querySelector('#gtcp').onclick = async () => {
      haptic(); let ok = false;
      try { await navigator.clipboard.writeText(link); ok = true; } catch (e) {}
      if (!ok) { try { const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select(); ok = document.execCommand('copy'); t.remove(); } catch (e) {} }
      toast(ok ? D.cpd : link);
    };
    // live: the balance is refreshed every 20 s while the sheet is open
    clearInterval(LIVE);
    LIVE = setInterval(async () => {
      if (!document.getElementById('gtsheet')) { clearInterval(LIVE); return; }
      let x; try { x = await call({}); } catch (e) { return; }
      if (!x || !x.ok) return;
      const a = document.getElementById('gtdet'), t = document.getElementById('gttl');
      if (a) a.innerHTML = det(x.all, D); if (t) t.innerHTML = tiles(x, T);
    }, 20000);
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
