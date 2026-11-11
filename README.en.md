<div align="center">

<img src="docs/assets/banner.png" alt="WoW 3.3.5 · Smart Fury Warrior macros — site banner">

# WoW 3.3.5 · Smart Fury Warrior Macros

**Three buttons instead of fifteen: each macro picks the right ability for the
situation, swaps stances by itself and never refreshes buffs that are already up.
Plus an app-like site: an in-game-style talent viewer, addon-free hero import
and a combat & survival guide.**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-website-ffcd5c?style=flat-square&logo=github)](https://genocide12.github.io/wow-335-macros/)
[![WotLK](https://img.shields.io/badge/WotLK-3.3.5a-c93a46?style=flat-square)](https://github.com/Genocide12/wow-335-macros/releases)
[![Macros](https://img.shields.io/badge/macros-3_smart-3ac96e?style=flat-square)](macros/warrior-smart/en/)
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

A set of **3 combat macros + a “Buff” button** for a Fury warrior on WotLK
3.3.5a. Each combat macro decides which ability to fire: rotation priorities
are baked into the `/cast` order, stances swap via conditions, and abilities
only fire where they are actually available (Victory Rush inside its 20-sec
window, Bloodrage off cooldown).

**Long buffs — only when checked.** The **F** button (“Buff”) checks **Battle
Shout** (buff on you) and **Demoralizing Shout** (debuff on the target) before
the pull and applies only what is missing — no GCD or rage wasted.

Why it works this way: in combat 3.3.5a **forbids** casting from Lua code
(`/run` + `CastSpellByName` — the game says “this action is only available to
the Blizzard UI”), and macros have no native `[buff:]` conditions. Out of
combat the check is legal — so the auto-check lives on F. In combat:
Battle Shout — **Alt+Q**, Demoralizing Shout — **Ctrl+F**. Every check the
game does allow is in the combat macros too: stances, combat state,
availability windows, cooldowns.

Every macro fits the game's **255-character limit** — the extra features live
on modifiers of the same buttons.

```
Q → rotation (single target) + Charge      E → AoE (2+ mobs) + Intercept
R → interrupt (mouseover)                  F → checked buffs (before the pull)
```

| Button / modifier | What it does |
|---|---|
| **F** | checks Battle Shout and Demoralizing Shout — applies only what is missing (out of combat) |
| **Ctrl+F** | Demoralizing Shout by hand (in combat) |
| **Shift+Q** | Heroic Strike — rage dump |
| **Alt+Q** | Battle Shout — refresh the buff |
| **Ctrl+Q** | Recklessness — burst: 3 guaranteed crits |
| **Ctrl+E** | Death Wish + trinket — burst (+20% damage) |
| **Alt+E** | Intimidating Shout — scatter the pack |
| **Alt+R** | Every Man for Himself → Defensive Stance → Disarm → Taunt (several presses) |
| **Ctrl+R** | Berserker Rage — break fear |

## How the smart macros work

| Macro | What it does on its own |
|---|---|
| **Q · Rotation** | out of combat — Battle Stance + Charge; in combat — Berserker Stance; Victory Rush first (20-sec window) → Bloodthirst → Whirlwind → Execute; Bloodrage by itself off cooldown; Shift — Heroic Strike, Alt — Battle Shout, Ctrl — Recklessness |
| **E · AoE** | auto target swap; Intercept in combat; Whirlwind + Cleave on every swing + Bloodthirst; Alt — Intimidating Shout; Ctrl — Death Wish + trinket |
| **R · Interrupt** | Pummel into the mob **under the cursor** — no target switch; swaps to Berserker Stance itself; Alt — panic cascade: Every Man for Himself → Defensive Stance → Disarm → Taunt; Ctrl — Berserker Rage |
| **F · Buff** | checks Battle Shout (on you) and Demoralizing Shout (on the target) and applies **only what is missing**; disables itself in combat (a game rule) |

3.3.5 mechanics: one press fires the **first available** ability of the list,
so the line order is the priority order. Spam Q and the rotation plays itself.

## Install (1 minute)

1. Download `macros-cache-en.txt` from the
   [latest release](https://github.com/Genocide12/wow-335-macros/releases)
   (Russian client: `macros-cache-ru.txt`).
2. Close the game. Put the file into `WTF/Account/<name>/macros-cache.txt`
   (back up the old file — it gets overwritten).
3. Log in, `/macro` → "General" tab — all macros are there.
   Bind them to Q, E, R.

Or simply copy each macro's text with the ✓ button on the
[macros page](https://genocide12.github.io/wow-335-macros/macros.html?lang=en)
and paste it into new in-game macros.

> **Client language matters.** A 3.3.5 macro only understands ability names in
> the client's language. `ru/` — Russian client, `en/` — English.

## The site — like an app

Five screens, each fits **without scrolling** on desktop and mobile:

| Home | Macros |
|:---:|:---:|
| ![Home](docs/assets/shots/home.png) | ![Macros](docs/assets/shots/macros.png) |

| Talents (builds) | Hero (import) | Guide |
|:---:|:---:|:---:|
| ![Talents](docs/assets/shots/talents.png) | ![Hero](docs/assets/shots/hero.png) | ![Guide](docs/assets/shots/guide.png) |

* **Macros** — cards with real ability icons, one-click copy and each macro's
  features right in the card.
* **Talents** — every warrior talent in three trees, like in game: icons, ranks,
  dependency arrows, requirement checks. Click — add a point, Shift+click — remove.
  Leveling presets and my level-54 build.
* **Hero** — **addon-free** character import: two short `/run` macros print a
  `WEXP|…` line into chat (paste the line into a macro and press the macro
  button — do not send it to chat); paste the lines on the site and you get a
  paperdoll with real item icons and live Wowhead tooltips.
* **Guide** — how to fight and survive: rotation, rage management, positioning,
  survival and what to learn where to squeeze the maximum out of your character.

## Releases

Every notable macro change is published as a
[release](https://github.com/Genocide12/wow-335-macros/releases) —
`macros-cache-ru.txt` and `macros-cache-en.txt` are attached to each release,
so you can download and drop them into the game without cloning the repo.

## Structure

```
docs/               site (GitHub Pages)
  index.html        home
  macros.html       macros: icons, copy, features, modifiers
  talents.html      talent viewer (3 trees, presets)
  hero.html         in-game hero import (WEXP), paperdoll, Wowhead tooltips
  guide.html        guide: combat, survival, what & where to learn
  assets/js/macros-data.js  macro texts (embedded, no fetch)
  assets/           tree backgrounds, talent data, logo (icons come from the Wowhead CDN)
macros/warrior-smart/{ru,en}/   3 combat + buff + 2 export, RU and EN clients
install/macros-cache-{ru,en}.txt  one-file install (attached to releases)
```

Ability and item icons are loaded straight from the Wowhead CDN (zamimg) —
nothing is stored in the repo. Live item tooltips are fetched from Wowhead
on the fly.

## License

[MIT](LICENSE). Icons and data — © Blizzard Entertainment, collected via the
open Wowhead/zamimg APIs.
