<div align="center">

<img src="docs/assets/banner.png" alt="WoW 3.3.5 · Smart Fury Warrior macros — site banner">

# WoW 3.3.5 · Smart Fury Warrior Macros

**Five buttons instead of fifteen: each macro picks the right ability for the
situation, swaps stances by itself and never refreshes active buffs. Plus an
app-like site: an in-game-style talent viewer, addon-free hero import and a
combat & survival guide.**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-website-ffcd5c?style=flat-square&logo=github)](https://genocide12.github.io/wow-335-macros/)
[![WotLK](https://img.shields.io/badge/WotLK-3.3.5a-c93a46?style=flat-square)](https://lasthavens.com/)
[![Macros](https://img.shields.io/badge/macros-5_smart-3ac96e?style=flat-square)](macros/warrior-smart/en/)
[![License: MIT](https://img.shields.io/badge/license-MIT-4a86e8?style=flat-square)](LICENSE)

**[▶ OPEN THE SITE](https://genocide12.github.io/wow-335-macros/?lang=en)** ·
**[Macros](https://genocide12.github.io/wow-335-macros/macros.html?lang=en)** ·
**[Talents](https://genocide12.github.io/wow-335-macros/talents.html?lang=en)** ·
**[Hero](https://genocide12.github.io/wow-335-macros/hero.html?lang=en)** ·
**[Guide](https://genocide12.github.io/wow-335-macros/guide.html?lang=en)**

**По-русски? → [README.md](README.md)**

</div>

---

## What is this

A set of **5 smart macros** for a Fury warrior on WotLK 3.3.5a and the
browser realm [lasthavens.com](https://lasthavens.com/). Each macro decides which
ability to fire: rotation priorities are baked into the `/cast` order, stances
swap via conditions, Battle Shout is only refreshed when it has fallen off.

Battle-tested: **233 DPS** in Temple of Atal'Hakkar
(gear ilvl 51, gearscore 537).

```
Q → rotation (single target)   E → AoE (2+ mobs)   R → interrupt (mouseover)
F → charge / intercept         G → rage + burst
```

## The site — like an app

Five screens, each one fits **without scrolling** on desktop and mobile:

| Home | Macros |
|:---:|:---:|
| ![Home](docs/assets/shots/home.png) | ![Macros](docs/assets/shots/macros.png) |

| Talents (builds) | Hero (import) | Guide |
|:---:|:---:|:---:|
| ![Talents](docs/assets/shots/talents.png) | ![Hero](docs/assets/shots/hero.png) | ![Guide](docs/assets/shots/guide.png) |

* **Macros** — cards with real ability icons, one-click copy and each
  macro's features right on the card.
* **Talents** — all 85 warrior talents across three trees, just like in game:
  icons, ranks, dependency arrows, requirement checks. Click to add a point,
  Shift+click to remove. Leveling presets and my own level-54 build included.
* **Hero** — import your character **without an addon**: two short `/run`
  macros (lasthavens allows no custom addons) print a `WEXP|…` line into chat;
  paste it on the site to get a paperdoll with real item icons and tooltips
  fetched live from Wowhead.
* **Guide** — how to fight and survive: rotation, rage management,
  positioning, survival and what to learn where to squeeze the maximum
  out of your character.

## Install the macros (1 minute)

1. Download [`install/macros-cache-en.txt`](install/macros-cache-en.txt)
   (for the English client; for Russian — [`-ru.txt`](install/macros-cache-ru.txt)).
2. Close the game. Drop the file into `WTF/Account/<name>/macros-cache.txt`
   (back up your old file — it will be overwritten).
3. Log in, `/macro` → "General" tab — all 5 macros are ready. Bind them to
   Q, E, R, F, G.

Or just copy each macro's text with the ✓ button on the
[macros page](https://genocide12.github.io/wow-335-macros/macros.html?lang=en)
and paste into new macros in game.

> **Client language matters.** A 3.3.5 macro only understands ability names in
> your client's language. `en/` — English client, `ru/` — Russian.

## How the smart macros work

| Macro | What it does by itself |
|---|---|
| **Q · Rotation** | Bloodthirst → Whirlwind → Execute (<20% HP) → Victory Rush; Battle Shout refreshes only when fallen off; Shift — Heroic Strike (rage dump), Ctrl — Bloodrage |
| **E · AoE** | Whirlwind + Cleave on every swing; Shift — Demoralizing Shout |
| **R · Interrupt** | Pummel on the target **under your cursor** — no target switching; swaps to Berserker Stance itself |
| **F · Charge/Intercept** | Out of combat — Battle Stance + Charge; in combat — Berserker Stance + Intercept |
| **G · Rage** | Bloodrage + Berserker Rage (both off GCD); Shift — Recklessness + trinket |

3.3.5 mechanics: a single press fires the **first usable** spell in the list,
so line order = priority order. Spam Q and the rotation plays itself.

## Layout

```
docs/               the site (GitHub Pages)
  index.html        home
  macros.html       macros: icons, copy buttons, per-macro features
  talents.html      talent viewer (85 talents, 3 trees, presets)
  hero.html         in-game hero import (WEXP), paperdoll, Wowhead tooltips
  guide.html        guide: combat, survival, what & where to learn
  assets/js/macros-data.js  macro texts (embedded, no fetch)
  assets/           tree backgrounds, talent data, logo (icons — Wowhead CDN)
macros/warrior-smart/{ru,en}/   5 macros + 2 export ones, RU and EN clients
install/macros-cache-{ru,en}.txt  one-file install
```

Ability and item icons are hot-linked straight from the [Wowhead CDN (zamimg)](https://wow.zamimg.com) —
they are not stored in the repo. Live item tooltips stream from Wowhead on demand.

## License

[MIT](LICENSE). Icons and data — © Blizzard Entertainment, collected via the
open Wowhead/zamimg APIs.
