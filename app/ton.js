// 14 oct 2026: GramPedia, real TON for referrals: a banner on Explore and a dedicated page (balance, progress, TON wallet,
// how it works). Its own budget and balance (separate from Meme Coin Tycoon), served by the Supabase function mct-ton (app 'gp').
(() => {
  const F = 'https://txvrlvcxfnylnrpdrxtt.supabase.co/functions/v1/mct-ton';
  const TX = {
    en: { h: '💎 Earn real TON', s: (u) => '$' + u + ' in TON per listing added and approved: invite your friends to add their channel, group or bot to GramPedia', v: 'Approved listings', p: 'Pending', r: 'Received', b: 'Balance', mn: (m) => 'paid from $' + m, togo: (x) => '$' + x + ' to go before your payment', ready: 'Ready: paid within 7 days 🎉', wait: 'being paid', w: 'Your TON wallet', ph: 'Paste your TON address (UQ... or EQ...)', save: 'Save', ok: 'Wallet saved ✅', bad: 'Invalid TON address', chg: 'Change', nowal: 'Add your wallet to get paid 👇', inv: '👥 Invite my friends', how: 'How it works', st: (u, m, d) => ['👥 Invite your friends with your link', '📚 They add their channel, group, bot or mini app to GramPedia, and it gets approved', '💎 You earn $' + u + ' in real TON per friend', '👛 Paid to your TON wallet from $' + m + ', within ' + d + ' days'], rule: 'Fake accounts and listings that are not theirs are never paid.', off: 'Budget of the month reached: TON rewards are back next month.', back: '← Back', bh: '💎 Earn real TON with your friends', bs: '$0.05 in TON per listing added and approved · tap here', share: '📚 GramPedia: the directory of Telegram channels, groups, bots and mini apps. Add yours for free!' },
    fr: { h: '💎 Gagne de vrais TON', s: (u) => u + ' $ en TON par fiche ajoutée et validée : invite tes amis à ajouter leur chaîne, leur groupe ou leur bot sur GramPedia', v: 'Fiches validées', p: 'En attente', r: 'Reçu', b: 'Solde', mn: (m) => 'paiement dès ' + m + ' $', togo: (x) => 'Encore ' + x + ' $ avant ton paiement', ready: 'Prêt : paiement sous 7 jours 🎉', wait: 'en cours de paiement', w: 'Ton portefeuille TON', ph: 'Colle ton adresse TON (UQ... ou EQ...)', save: 'OK', ok: 'Portefeuille enregistré ✅', bad: 'Adresse TON invalide', chg: 'Changer', nowal: 'Ajoute ton portefeuille pour être payé 👇', inv: '👥 Inviter mes amis', how: 'Comment ça marche', st: (u, m, d) => ['👥 Invite tes amis avec ton lien', '📚 Ils ajoutent leur chaîne, groupe, bot ou mini app sur GramPedia, et elle est approuvée', '💎 Tu gagnes ' + u + ' $ en vrais TON par ami', '👛 Paiement sur ton portefeuille TON dès ' + m + ' $, sous ' + d + ' jours'], rule: 'Les faux comptes et les fiches qui ne sont pas les leurs ne sont jamais payés.', off: 'Budget du mois atteint : les gains en TON reprennent le mois prochain.', back: '← Retour', bh: '💎 Gagne de vrais TON avec tes amis', bs: '0,05 $ en TON par fiche ajoutée et validée · appuie ici', share: '📚 GramPedia : l\'annuaire des chaînes, groupes, bots et mini apps Telegram. Ajoute le tien gratuitement !' },
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
  let LAST = null; // 15 oct 2026: the last status, for the amounts shown on the Explore banner
  const on = () => { if (!ON) ON = call({}).then((s) => { LAST = s; return !!(s && s.ok && s.on); }).catch(() => { ON = null; return false; }); return ON; };
  const mini = (s) => '✅ ' + m$(s.balance) + (fr() ? ' validé' : ' validated') + ' · ⏳ ' + m$(Number(s.pending || 0) * Number(s.usd || 0)) + (fr() ? ' en attente' : ' pending') + ' · 💸 ' + m$(Number(s.paid || 0) + Number(s.waiting || 0)) + (fr() ? ' payé' : ' paid');
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
      + `<small style="display:block;margin-top:8px;opacity:.75">${D.pay(m$(a.min))}</small>${a.wallet ? '<small style="display:block;margin-top:4px;font-weight:600">' + D.wal + ' <a href="#" onclick="gpGoWal();return false" style="font-weight:400;opacity:.7;text-decoration:underline;color:inherit;margin-left:6px">' + (fr() ? 'Changer' : 'Change') + '</a></small>' : '<button class="btn main full" onclick="gpGoWal()" style="margin-top:10px">' + D.addw + '</button>'}`;
  }
// 15 oct 2026: the money waiting: friends who still have to play, with their progress (Meme Coin Tycoon: days /3 and trades /5,
// Daily Score: predictions /4, GramPedia: listing)
function tonPendHtml(p, pend, need, M) {
  if (!p || !p.n) return '';
  const prog = (f) => f.app === 'mct' ? '📅 ' + Math.min(f.dy, 3) + '/3 · 🔁 ' + Math.min(f.tr, 5) + '/5' : f.app === 'ds' ? '⚽ ' + Math.min(f.tr, 4) + '/4' : '📚 ' + (f.tr > 0 ? '⏳' : '0/1');
  const ic = { mct: '🪙', ds: '⚽', gp: '📚' };
  // 15 oct 2026: shown big, right under the total balance, to motivate (the list of friends opens below)
  return `<div style="margin:10px 0 8px;padding:10px 12px;border-radius:12px;background:rgba(255,212,59,.12);border:1px solid rgba(255,212,59,.5)"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><span style="font-size:14px;font-weight:700">⏳ ${pend}</span><b style="font-size:24px;color:#ffd43b;white-space:nowrap">+ ${M(p.usd)}</b></div><small style="display:block;opacity:.8;margin-top:2px">${need(p.n)}</small>`
    + `<details style="margin-top:6px"><summary style="cursor:pointer;font-size:13px;opacity:.85">👥 ${p.n} ▾</summary>`
    + (p.friends || []).map((f) => `<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;font-size:13px;border-top:1px solid rgba(255,255,255,.06)"><span>${ic[f.app] || ''} ${esc(f.name)}</span><span style="opacity:.8;white-space:nowrap">${prog(f)}</span></div>`).join('')
    + (p.n > (p.friends || []).length ? `<small style="opacity:.6">+ ${p.n - p.friends.length}</small>` : '') + `</details></div>`;
}
// puts the waiting block right after the total (the first closing div of the balance card)
function tonPendIn(h, x) { const i = h.indexOf('</div>') + 6; return i > 5 ? h.slice(0, i) + x + h.slice(i) : h + x; }
  const det0 = det;
  det = (a, D) => tonPendIn(det0(a, D), a ? tonPendHtml(a.pending, fr() ? 'En attente' : 'Pending', (n) => fr() ? n + (n > 1 ? ' amis doivent' : ' ami doit') + ' encore jouer' : n + (n > 1 ? ' friends' : ' friend') + ' still to play', m$) : '');
  const tiles = (s, T) => {
    const tile = (b, l) => `<div><b>${b}</b><small>${l}</small></div>`;
    return tile('✅ ' + Number(s.valid || 0), T.v) + tile('⏳ ' + Number(s.pending || 0), T.p);
  };
// 15 oct 2026: share outside Telegram (WhatsApp, Messenger, SMS...): the friend still opens the game in Telegram
function outCopy(v, ok) {
  let done = false;
  try { navigator.clipboard.writeText(v); done = true; } catch (x) {}
  if (!done) { try { const t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); } catch (x) {} }
  try { toast(ok); } catch (x) {}
}
function outWa(msg) { const u = 'https://wa.me/?text=' + encodeURIComponent(msg); try { (window.Telegram && Telegram.WebApp && Telegram.WebApp.initData ? Telegram.WebApp.openLink(u) : window.open(u, '_blank')); } catch (x) { window.open(u, '_blank'); } }
  // 15 oct 2026 (v2): GramPedia shows only its own program: its earnings, its friends waiting, and the TON wallet, added right here
  // (one wallet per person, shared by all the apps). The other referral programs are in Earn by Jeremstyke.
  function gameDet(s, D) {
    const a = s.all || {}, P = a.pending || {}, fl = (P.friends || []).filter((f) => f.app === 'gp'), pn = Number(s.pending || 0), M = m$;
    const t = fr() ? { mine: 'Mes gains GramPedia', pend: 'En attente', need: (n) => n + (n > 1 ? ' amis doivent' : ' ami doit') + ' encore ajouter leur projet', paid: 'Déjà reçu', wait: 'En cours de paiement', pay: (m) => 'Payé chaque lundi sur ton portefeuille TON, dès ' + m + ' (avec tes autres gains TON)', ok: '✅ Portefeuille ajouté', chg: 'Changer', add: '👛 Ajouter mon portefeuille', ph: 'Colle ton adresse TON (UQ... ou EQ...)', h1: 'Pas d\'adresse TON ? C\'est gratuit et ça prend 1 minute :', h2: 'Ouvre <b>@wallet</b> dans Telegram', h3: 'Touche <b>Recevoir</b>, puis <b>TON</b>', h4: 'Copie l\'adresse et colle-la ici', ow: 'Ouvrir @wallet', sync: 'Un seul portefeuille pour toutes les apps (Meme Coin Tycoon, Daily Score, Earn…).' }
      : { mine: 'My GramPedia earnings', pend: 'Pending', need: (n) => n + (n > 1 ? ' friends' : ' friend') + ' still to add their project', paid: 'Already received', wait: 'Being paid', pay: (m) => 'Paid every Monday to your TON wallet, from ' + m + ' (with your other TON earnings)', ok: '✅ Wallet added', chg: 'Change', add: '👛 Add my wallet', ph: 'Paste your TON address (UQ... or EQ...)', h1: 'No TON address? It\'s free and takes 1 minute:', h2: 'Open <b>@wallet</b> in Telegram', h3: 'Tap <b>Receive</b>, then <b>TON</b>', h4: 'Copy the address and paste it here', ow: 'Open @wallet', sync: 'One wallet for all the apps (Meme Coin Tycoon, Daily Score, Earn…).' };
    // 15 oct 2026: validated, pending and paid shown at once, without a tap
  const box = (l, v, c) => `<div style="flex:1;min-width:0;padding:10px 4px;border-radius:14px;background:rgba(0,0,0,.2);text-align:center"><small style="display:block;font-size:11px;opacity:.8">${l}</small><b style="display:block;font-size:18px;font-weight:900;color:${c};white-space:nowrap">${v}</b></div>`;
  const prog = (f) => f.app === 'mct' ? '📅 ' + Math.min(f.dy, 3) + '/3 · 🔁 ' + Math.min(f.tr, 5) + '/5' : f.app === 'ds' ? '⚽ ' + Math.min(f.tr, 4) + '/4' : '📚 ' + (f.tr > 0 ? '⏳' : '0/1');
  let h = `<small style="display:block;font-size:12px;text-transform:uppercase;letter-spacing:.06em;opacity:.7">${t.mine}</small>`
    + `<div style="display:flex;gap:6px;margin:8px 0 4px">${box('✅ ' + (fr() ? 'Validé' : 'Validated'), M(s.balance), '#4ff0b7')}${box('⏳ ' + t.pend, M(pn * Number(s.usd || 0)), '#ffd43b')}${box('💸 ' + (fr() ? 'Payé' : 'Paid'), M(Number(s.paid || 0) + Number(s.waiting || 0)), '#9fe9ff')}</div>`;
  if (pn) h += `<details style="margin-top:6px"><summary style="cursor:pointer;font-size:13px;opacity:.85">👥 ${t.need(pn)} ▾</summary>` + fl.map((f) => `<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;font-size:13px;border-top:1px solid rgba(255,255,255,.06)"><span>${esc(f.name)}</span><span style="opacity:.8;white-space:nowrap">${prog(f)}</span></div>`).join('') + `</details>`;
  h += `<small style="display:block;margin-top:8px;opacity:.75">${t.pay(M(a.min || s.min))}</small>`;
    h += a.wallet ? `<div style="margin-top:8px;font-size:14px;font-weight:700">${t.ok} <a href="#" onclick="gpWalShow();return false" style="font-weight:400;opacity:.7;text-decoration:underline;color:inherit;margin-left:6px">${t.chg}</a></div>`
      : `<button class="btn main full" onclick="gpWalShow()" style="margin-top:10px">${t.add}</button>`;
    h += `<div id="gamewf" style="display:none;margin-top:10px"><div style="display:flex;gap:8px"><input id="gamewa" placeholder="${t.ph}" autocomplete="off" spellcheck="false" style="flex:1;min-width:0;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06);color:inherit;font-size:14px"><button class="btn main" onclick="gpWalSave()" style="margin:0;padding:12px 16px">OK</button></div>`
      + `<div style="margin-top:8px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.06);font-size:13px;line-height:1.5"><b>${t.h1}</b><br>1. ${t.h2}<br>2. ${t.h3}<br>3. ${t.h4}<button class="btn full" onclick="gpOpenW()" style="margin-top:8px">👛 ${t.ow}</button></div><small style="display:block;margin-top:6px;opacity:.7">${t.sync}</small></div>`;
    return h;
  }
  const gameWalOpen = () => { const f = document.getElementById('gamewf'); return !!(f && f.style.display !== 'none'); };
  window.gpWalShow = () => { const f = document.getElementById('gamewf'); if (!f) return; f.style.display = ''; const i = document.getElementById('gamewa'); if (i) { i.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => { try { i.focus(); } catch (e) {} }, 400); } };
  window.gpOpenW = () => { haptic(); openLink('https://t.me/wallet'); };
  window.gpWalSave = async () => {
    const i = document.getElementById('gamewa'), v = ((i && i.value) || '').trim(); if (!v) return;
    haptic(); let r; try { r = await call({ action: 'wallet', addr: v }); } catch (e) { r = null; }
    if (!r || !r.ok) { toast(fr() ? 'Adresse TON invalide' : 'Invalid TON address'); return; }
    toast(fr() ? 'Portefeuille enregistré ✅' : 'Wallet saved ✅'); page();
  };
  let LIVE = null;
  // 15 oct 2026: the look of the TON sheet (same as Meme Coin Tycoon)
  const tsx = document.createElement('style');
  tsx.textContent = '.tsx{width:100%;max-width:520px;max-height:90vh;overflow:auto;background:linear-gradient(180deg,#1d2142 0%,#121522 40%);color:#fff;border-radius:24px 24px 0 0;padding:10px 16px 26px;box-sizing:border-box;box-shadow:0 -10px 40px rgba(0,0,0,.5);animation:tsxUp .25s ease-out;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
    + '@keyframes tsxUp{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}'
    + '.tsx .grab{width:42px;height:5px;border-radius:9px;background:rgba(255,255,255,.25);margin:0 auto 14px}'
    + '.tsx .hero{display:flex;gap:12px;align-items:center;margin:0 0 10px}'
    + '.tsx .hero .ic{flex:none;width:54px;height:54px;border-radius:18px;display:grid;place-items:center;font-size:30px;background:radial-gradient(circle at 30% 25%,#bff6ff,#2ee6ff 55%,#0b6c80);box-shadow:0 6px 22px rgba(46,230,255,.4)}'
    + '.tsx .hero b{display:block;font-size:21px;font-weight:900;letter-spacing:-.01em}'
    + '.tsx .hero span{display:inline-block;margin-top:4px;font-size:12px;font-weight:800;color:#062a33;background:linear-gradient(90deg,#2ee6ff,#4ff0b7);padding:3px 10px;border-radius:999px}'
    + '.tsx .sub{font-size:13px;opacity:.75;margin:0 0 14px;line-height:1.45}'
    + '.tsx .earn{margin:0 0 14px;padding:16px;border-radius:20px;background:linear-gradient(145deg,rgba(46,230,255,.16),rgba(124,92,255,.14));border:1px solid rgba(46,230,255,.35);box-shadow:0 10px 30px rgba(46,230,255,.12)}'
    + '.tsx .cta{display:block;width:100%;border:0;border-radius:16px;padding:15px;font-weight:900;font-size:16px;color:#062a33;background:linear-gradient(90deg,#2ee6ff,#4ff0b7);box-shadow:0 6px 0 #0b8f86;cursor:pointer}'
    + '.tsx .cta:active{transform:translateY(3px);box-shadow:0 3px 0 #0b8f86}'
    + '.tsx .row{display:flex;gap:8px;margin:12px 0 16px}'
    + '.tsx .sec{flex:1;border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:11px 6px;font-weight:700;font-size:14px;color:#fff;background:rgba(255,255,255,.06);cursor:pointer}'
    + '.tsx .tiles{display:flex;gap:8px;margin:0 0 14px}'
    + '.tsx .tiles>div{flex:1;padding:12px 6px;border-radius:16px;background:rgba(255,255,255,.06);text-align:center}'
    + '.tsx .tiles b{display:block;font-size:22px;font-weight:900}.tsx .tiles small{font-size:11px;opacity:.7}'
    + '.tsx details.how{margin:0 0 10px;padding:12px 14px;border-radius:16px;background:rgba(255,255,255,.04)}'
    + '.tsx details.how summary{cursor:pointer;font-weight:800;font-size:14px;list-style:none}.tsx details.how summary::-webkit-details-marker{display:none}'
    + '.tsx .more{display:block;width:100%;border:0;background:none;color:#9fe9ff;font-weight:700;font-size:14px;padding:12px;cursor:pointer}'
    + '.tsx .close{text-align:center;opacity:.6;font-size:13px;cursor:pointer;padding:4px}';
  document.head.appendChild(tsx);
  async function page() {
    if (!INIT || !ME) return;
    const T = L(), D = TOND[fr() ? 'fr' : 'en'];
    let s; try { s = await call({}); } catch (e) { return; }
    if (!s || !s.ok) return;
    const old = document.getElementById('gtsheet'); if (old) old.remove();
    const d = document.createElement('div'); d.id = 'gtsheet';
    d.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center';
    const link = (ME && ME.refLink) || BOTU();
    d.innerHTML = `<div class="tsx"><div class="grab"></div>`
      + `<div class="hero"><div class="ic">📚</div><div><b>${T.h.replace(/^💎 /, '')}</b><span>${fr() ? f2(s.usd) + ' $ / fiche validée' : '$' + f2(s.usd) + ' / approved listing'}</span></div></div>`
      + `<p class="sub">${T.s(f2(s.usd))}</p>`
      + `<div class="earn" id="gtdet">${gameDet(s, D)}</div>`
      + `<button class="cta" id="gti">${T.inv}</button><div class="row"><button class="sec" id="gtwa">📲 WhatsApp</button><button class="sec" id="gtcp">📋 ${fr() ? 'Copier mon lien' : 'Copy my link'}</button></div>`
      + `<div class="tiles" id="gttl">${tiles(s, T)}</div>`
      + (Number(s.budget_left) < Number(s.usd) ? `<p style="font-size:13px;opacity:.75">${T.off}</p>` : '')
      + `<details class="how"><summary>📖 ${T.how} ▾</summary><div style="margin-top:10px">` + T.st(f2(s.usd), f2(s.min), s.delay).map((x, i) => `<div style="display:flex;gap:10px;align-items:flex-start;margin:0 0 8px"><span style="flex:none;width:24px;height:24px;border-radius:50%;background:#2ee6ff;color:#062a33;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:13px">${i + 1}</span><span style="font-size:14px">${x}</span></div>`).join('') + `</div></details>`
      + `<button class="more" id="gtearn">🔗 ${fr() ? 'Autres programmes de parrainage (Earn)' : 'More referral programs (Earn)'}</button><div class="close" id="gtsc">${D.close}</div></div>`;
    document.body.appendChild(d);
    const close = () => { d.remove(); clearInterval(LIVE); };
    d.onclick = (e) => { if (e.target === d || e.target.id === 'gtsc') close(); };
    d.querySelector('#gti').onclick = () => { close(); invite(); };
    d.querySelector('#gtwa').onclick = () => { haptic(); outWa(T.share + ' 👉 ' + link + (fr() ? '\n\n(Pas encore Telegram ? Installe-le, puis reclique sur ce lien.)' : '\n\n(No Telegram yet? Install it, then tap this link again.)')); };
    d.querySelector('#gtearn').onclick = () => { haptic(); openLink('https://t.me/earnbyjeremstykebot?startapp=progs_gp'); };
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
      if (gameWalOpen()) return; if (a) a.innerHTML = gameDet(x, D); if (t) t.innerHTML = tiles(x, T);
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
    b.innerHTML = `<span class="e">💎</span><span><b>${T.bh}</b><small>${LAST && LAST.ok ? mini(LAST) : T.bs}</small></span><span class="chip">TON</span>`;
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
