#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""char_export.py — offline converter for the CharacterExport addon.

Reads WTF/Account/<account>/SavedVariables/CharacterExport.lua (the file the
client writes after /cexp + /reload) and turns the embedded JSON into
profile.json (machine) + profile.md (human-readable summary).

Usage:
    python char_export.py <path-to-CharacterExport.lua> [-o output-dir]

If no path is given, the script tries to auto-find the file in the current
directory tree (searches for SavedVariables/CharacterExport.lua).
"""
import json
import os
import re
import sys

DATA_RE = re.compile(r'\["data"\]\s*=\s*"((?:[^"\\]|\\.)*)"')


def unescape_lua(s):
    """Undo the escapes the WoW client writes inside Lua string literals."""
    out = []
    i = 0
    while i < len(s):
        c = s[i]
        if c == "\\" and i + 1 < len(s):
            nxt = s[i + 1]
            if nxt == "n":
                out.append("\n")
            elif nxt == "t":
                out.append("\t")
            elif nxt == "\\":
                out.append("\\")
            elif nxt == '"':
                out.append('"')
            else:
                out.append(nxt)
            i += 2
        else:
            out.append(c)
            i += 1
    return "".join(out)


def parse_savedvariables(text):
    """Return (profile_dict, timestamp) parsed from CharacterExport.lua text."""
    m = DATA_RE.search(text)
    if not m:
        raise ValueError('no ["data"] entry found — run /cexp and /reload first')
    raw = unescape_lua(m.group(1))
    profile = json.loads(raw)
    tm = re.search(r'\["time"\]\s*=\s*"([^"]*)"', text)
    return profile, (tm.group(1) if tm else "")


SLOTS_RU = {1: "Голова", 2: "Шея", 3: "Плечи", 4: "Рубаха", 5: "Грудь", 6: "Пояс",
            7: "Ноги", 8: "Ступни", 9: "Запястья", 10: "Кисти рук", 11: "Кольцо 1",
            12: "Кольцо 2", 13: "Тринкет 1", 14: "Тринкет 2", 15: "Плащ",
            16: "Правая рука", 17: "Левая рука", 18: "Дальний бой", 19: "Гербовая накидка"}
SLOTS_EN = {1: "Head", 2: "Neck", 3: "Shoulder", 4: "Shirt", 5: "Chest", 6: "Belt",
            7: "Legs", 8: "Feet", 9: "Wrist", 10: "Hands", 11: "Ring 1",
            12: "Ring 2", 13: "Trinket 1", 14: "Trinket 2", 15: "Back",
            16: "Main Hand", 17: "Off Hand", 18: "Ranged", 19: "Tabard"}
QCOLOR = {0: "gray", 1: "white", 2: "green", 3: "blue", 4: "purple", 5: "orange"}


def to_markdown(p, timestamp=""):
    lang = "ru"
    slots = SLOTS_RU if lang == "ru" else SLOTS_EN
    lines = ["# %s <%s> — %d ур. (%s)" % (p.get("name"), p.get("realm"),
                                          p.get("level"), p.get("race"))]
    if timestamp:
        lines.append("_Снимок: %s_" % timestamp)
    trees = " / ".join("%s %d" % (t["name"], t["spent"]) for t in p.get("trees", []))
    lines += ["", "## Таланты (%s): %s" % ("спек %s" % p.get("spec"), trees)]
    for t in p.get("talents", []):
        lines.append("- " + t)
    if p.get("glyphs"):
        lines.append("")
        lines.append("## Глифы")
        for g in p.get("glyphs", []):
            kind = "большой" if g["socket"] <= 3 else "малый"
            lines.append("- %s (%s)" % (g["name"], kind))
    lines += ["", "## Экипировка"]
    for g in p.get("gear", []):
        ench = " [+чары]" if g.get("ench") else ""
        lines.append("- [%s] %s (%d, %s)%s" % (
            slots.get(g["slot"], str(g["slot"])), g["name"], g["ilvl"],
            QCOLOR.get(g["q"], "?"), ench))
    s = p.get("stats", p)
    lines += ["", "## Статы",
              "- HP: %s" % s.get("hp"),
              "- Сила атаки: %s" % s.get("ap"),
              "- Скорость оружия: %.2f / %.2f сек" % (s.get("mhSpeed", 0), s.get("ohSpeed", 0)),
              "- Меткость: %s%% (рейтинг %s)" % (s.get("hitPct"), s.get("hitRating")),
              "- Крит: %s%%" % s.get("critPct"),
              "- Экспертиза: %s (рейтинг %s)" % (s.get("expertise"), s.get("expertiseRating")),
              "- Скорость: %s%%" % s.get("hastePct"),
              "- Пробитие брони: %s%% (рейтинг %s)" % (s.get("arpPct"), s.get("arpRating")),
              "- Броня: %s" % s.get("armor")]
    return "\n".join(lines) + "\n"


def main():
    args = sys.argv[1:]
    outdir = "."
    path = None
    i = 0
    while i < len(args):
        if args[i] == "-o":
            outdir = args[i + 1]
            i += 2
        else:
            path = args[i]
            i += 1
    if not path:
        hits = []
        for root, dirs, files in os.walk("."):
            if "CharacterExport.lua" in files:
                hits.append(os.path.join(root, "CharacterExport.lua"))
        if not hits:
            sys.exit("CharacterExport.lua not found. Pass the path explicitly:\n"
                     "  python char_export.py WTF/Account/<acc>/SavedVariables/CharacterExport.lua")
        path = hits[0]
        print("found:", path)

    with open(path, encoding="utf-8-sig") as f:
        profile, timestamp = parse_savedvariables(f.read())

    os.makedirs(outdir, exist_ok=True)
    jp = os.path.join(outdir, "profile.json")
    mp = os.path.join(outdir, "profile.md")
    with open(jp, "w", encoding="utf-8") as f:
        json.dump(profile, f, ensure_ascii=False, indent=2)
    with open(mp, "w", encoding="utf-8") as f:
        f.write(to_markdown(profile, timestamp))
    print("wrote", jp, "and", mp)
    print(json.dumps({k: profile[k] for k in ("name", "level", "ap", "critPct",
                                              "hitPct", "expertise") if k in profile},
                     ensure_ascii=False))


if __name__ == "__main__":
    main()
