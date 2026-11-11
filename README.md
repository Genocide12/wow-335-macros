# WoW 3.3.5a — Warrior / Fury macros + character export

Battle-tested macros for a leveling Fury warrior on WotLK 3.3.5a (verified on a
level 54 human warrior, RU client), plus a tiny addon that dumps your character
to JSON for the companion site.

**Site (copy macros in one click, import your profile, stat-cap guide):**
<https://genocide12.github.io/wow-335-macros/>

> **Client language matters.** A 3.3.5 macro only understands ability names in
> your client's language. Pick the `en/` set for English clients, `ru/` for
> Russian ones — or use the site switch.

## What's inside

| File | Key | What it does |
|---|---|---|
| `macros/warrior-fury/en/01-rotation` | **Q** | The whole rotation: Bloodthirst (4s CD) → Whirlwind (10s) → Execute (<20% HP) → Victory Rush (45% AP after a kill). Auto-attack, next-target pickup, Berserker Stance included. Shift — Heroic Strike rage dump, Ctrl — Battle Shout, Alt — Bloodrage |
| `…/02-aoe` | **E** | Packs: Whirlwind + Cleave on every swing. Shift — Demoralizing Shout |
| `…/03-pummel` | **R** | Pummel **on mouseover** — interrupt without switching targets; auto-switches to Berserker Stance if needed |
| `…/04-intercept` | **F** | Intercept **on mouseover** — gap closer + stun, works in combat |
| `…/05-charge` | **T** | Battle Stance + Charge (out of combat opener) |
| `…/06-rage` | **G** | Bloodrage + Berserker Rage (rage + 10s fear immunity) |
| `…/07-cooldowns` | **X** | Death Wish + Recklessness + trinket slot 13 — press 2–3 times |
| `…/08-retaliation` | **C** | Stance dance: Battle Stance → Retaliation (12s counterattacks) |
| `…/09-defense` | **Z** | Defensive Stance + Demoralizing Shout + Thunder Clap — panic button |

Same nine files exist under `macros/warrior-fury/ru/` with Russian spell names.

Stance requirements are handled inside the macros: Pummel / Intercept /
Whirlwind / Recklessness need Berserker Stance, Charge / Retaliation need Battle
Stance — every macro that can be pressed from the "wrong" stance switches first.
The rotation keeps you in Berserker Stance.

## Install macros

**Fast way** — close the game, download `install/macros-cache-en.txt` (or
`-ru.txt`), save it as `WTF/Account/<AccountName>/macros-cache.txt` (back up
your old file — it will be overwritten). Launch, `/macro` → "General" tab: all
9 macros are ready, drag them to your bars.

**Manual way** — `/macro` → New → paste the file contents → drag to a bar.

## CharacterExport addon (`/cexp`)

Collects talents, glyphs, gear with item levels, and combat stats (AP, crit,
hit, expertise, haste, armor pen, armor) into a JSON blob.

1. Copy `addons/CharacterExport/` into `Interface/AddOns/`.
2. In game: `/cexp`, then `/reload`.
3. Open `WTF/Account/<AccountName>/SavedVariables/CharacterExport.lua` and copy
   the `["data"] = "..."` string.
4. Paste it on the site (profile card + cap checks), or convert locally:

   ```
   python tools/char_export.py WTF/Account/<acc>/SavedVariables/CharacterExport.lua -o out
   ```

   → writes `profile.json` + `profile.md`.

## Stat targets (level 80 raid boss)

- Yellow hit **8%** (5% from gear with Precision 3/3), white dual-wield cap ~27%
- Expertise **26** (214 rating)
- Priority: hit to caps → expertise 26 → Strength → Crit → ArP → Haste
- Major glyphs: Heroic Strike (+10 rage on crit), Whirlwind (−2s CD), Execution (+10 effective rage)

Full guide, rotation priorities, stance table and PvP combos live on the
[site](https://genocide12.github.io/wow-335-macros/).

## Structure

```
macros/warrior-fury/{en,ru}/   9 macros per client language
install/                       macros-cache.txt installers
addons/CharacterExport/        /cexp addon (Interface 30300)
tools/char_export.py           SavedVariables → profile.json/md converter
docs/                          GitHub Pages site
```

Contributions: one macro per `.txt`, spell names must match your client's
spellbook, keep bodies ≤ 255 characters.

## License

MIT — see [LICENSE](LICENSE).
