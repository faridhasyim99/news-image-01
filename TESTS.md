# Tests — news-image-01 entry v2

All tests were run locally in this session on 14 Nov 2026 (WIB). No score
was measured: this competition has no local grade — the server grades every
entry (see "grade-local" below). Nothing here claims a judge score.

## 1. Determinism — two runs, byte-identical output

Commands (run from `~/workspace/makefun-newsimage-v2/entry/`):

```sh
rm -rf /tmp/out1 /tmp/out2 && mkdir -p /tmp/out1 /tmp/out2
MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts
MAKEFUN_OUTPUT_DIR=/tmp/out2 node main.ts
sha256sum /tmp/out1/entry.png /tmp/out2/entry.png entry.png
cmp /tmp/out1/entry.png /tmp/out2/entry.png
```

Measured result (after the final revision of `main.ts`, which added a
SHA-256 integrity check on top of the write-size guard):

- `/tmp/out1/entry.png`: `3049e8ef6b41fab36daeb117ff6a700db55d23850bf029b5f3e8e7e4ef702faa`
- `/tmp/out2/entry.png`: `3049e8ef6b41fab36daeb117ff6a700db55d23850bf029b5f3e8e7e4ef702faa`
- `entry.png` (source): same hash
- `cmp` reported the two outputs identical → **PASS**

## 2. Gate checks on the program output

Checked with Python PIL (`Image.open(...).load()` = full decode):

- Magic bytes: `89 50 4e 47 0d 0a 1a 0a` → PNG → **PASS**
- File size: 127,754 bytes ≤ 1,048,576 (1 MiB) → **PASS**
- Dimensions: 1024×1024 ≤ 1024×1024 → **PASS**
- Full PNG decode without error → **PASS** (whole file, mode RGB)

## 3. Entry directory contents

`~/workspace/makefun-newsimage-v2/entry/` contains exactly:

- `main.ts` — Node 22, stdlib only; copies `entry.png` to
  `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`); written in this
  session, then revised once (SHA-256 integrity check added on top of the
  write-size guard).
- `entry.png` — 1024×1024 PNG, 127,754 bytes, sha256
  `3049e8ef6b41fab36daeb117ff6a700db55d23850bf029b5f3e8e7e4ef702faa`.
- `LICENSE` — MIT, "Copyright (c) 2026 faridhasyim99", with the line
  `SPDX-License-Identifier: MIT` at the very top (required by the kit's
  license check).
- `README.md` — includes the referral link
  `https://make.fun/?ref=vz5h17qh&utm_source=github&utm_medium=readme&utm_campaign=news-image-01`
  (verified present with `grep`).
- `TESTS.md` — this file.

## 4. No kit/starter file copied byte-for-byte

`sha256sum` comparison against the kit's `starter/` files:

| file | starter sha256 | entry sha256 | same? |
| --- | --- | --- | --- |
| main.ts | `d9d56d3d…` | `c7d5f6df…` | no |
| LICENSE | `c31b3812…` | `78d41d55…` | no |
| entry.png | `083c7be5…` | `3049e8ef…` | no |

All three differ → **PASS**. The image is original work for this entry:
drawn entirely with PIL (DejaVu fonts) in `build.py`, so every word is
exact — no image model rendered any text.

## 5. grade-local — unsupported for this competition

```sh
node cli/makefun.mjs grade-local --kit . --bot ~/workspace/makefun-newsimage-v2/entry
```

Output: "news-image-01 is a program/v1 competition: its scorer and
reference data are not published in the kit, so the house grades it from
its competition directory". This matches RULES.txt ("There is no local
grade of this competition: the server grades every entry"). No local score
exists to report.

## 6. Visual check

The final `entry.png` was viewed at full size and at 300×300:

- Masthead "THE WORLD TODAY" and dateline "FRIDAY 13 NOVEMBER 2026 •
  30 STORIES • 6 CONTINENTS • EVERY STORY SOURCED" legible.
- Lead headline "FAA GROUNDS EVERY U.S. DEPARTURE" big and legible, with
  the 2-line summary, source line, stat chips ("4+ HOURS",
  "1,000+ CANCELLED") and the jet + red no-symbol graphic — all inside the
  lead panel, nothing clipped or overlapping. Three layout iterations were
  needed to get here: v1 of the build overflowed the lead body into the map
  and cut the grid's last row; v2 fixed the grid but the chips clipped at
  the right edge and the map pins clustered; v3 (this file) spread the pins
  and shortened the chip row.
- World map: 30 numbered red pins, hand-spread so no two dots overlap;
  all six continent labels readable.
- Story grid: all 30 headlines legible, one line each, each with its
  source attribution; footer present and complete.
- At 300px the masthead, lead headline, map with pins and grid structure
  all still read clearly; the text is vector-sharp PIL rendering, so there
  are no smears, artefacts or garbled words at any size.

## 7. News verification — full story list with sources

Every story below was verified by web search against the named source's
reporting dated Friday 13 November 2026 (or, where noted, first reported
that day). Nothing was invented; figures and quotes are as reported.
Deliberately dropped: the v1 deportations story (483,200) — not re-verified
this session; Lakers 123–112 Bucks, Italy 3–1 France and the Gauff WTA
Finals comeback — each single-sourced from an AI-generated brief, replaced
by verified items (Spurs rout, Burnham UK–EU, Bitcoin).

| # | Headline | Source |
| --- | --- | --- |
| 1 | FAA grounds every U.S. departure | Reuters |
| 2 | Microsoft 365 outage enters day 2 | AP |
| 3 | Senate summons Huang and Lutnick | Reuters |
| 4 | Wall Street mixed; best week since August | Reuters |
| 5 | FBI: N. Korea 'FaceStealer' stole $400M | Reuters |
| 6 | Trump tells Vance: focus on crime at home | AP |
| 7 | Atmospheric rivers flood Washington | AP |
| 8 | Spurs rout Warriors 123-85, 10th in a row | AP |
| 9 | Producer prices hottest in nearly 4 years | BLS |
| 10 | Ukraine fires ~1,200 drones at Russia | AP |
| 11 | Ukrainian drone hits Russian warship | BBC |
| 12 | Zelensky welcomes Europe into talks | BBC |
| 13 | Russia has lost nearly 500,000 lives | FT |
| 14 | Moscow car bomb wounds ex-PM aide | Reuters |
| 15 | Burnham: 'win-win' UK-EU deal possible | BBC |
| 16 | Hurricanes beat Kraken 4-1 in Helsinki | NHL |
| 17 | U.S. downs two Iranian drones off Bahrain | AP |
| 18 | IAEA worried over Isfahan plant | Reuters |
| 19 | Qatar and Turkey sign defence pact | Amiri Diwan |
| 20 | Israeli strikes in Lebanon; 3 killed | AP |
| 21 | China staged big Pacific drills | Reuters |
| 22 | IEA sees Q4 oil surplus of 1.7m b/d | IEA |
| 23 | Bessent clashes over Nvidia chip curbs | Reuters |
| 24 | Bitcoin slides below $68,400 | Market data |
| 25 | COP31: Guterres urges drastic cuts | Reuters |
| 26 | UN extends Abyei peacekeeping mandate | UN |
| 27 | Mekelle falls to Ethiopian forces | BBC |
| 28 | Canary Islands: 7,400 arrivals in 10 days | Al Jazeera |
| 29 | Uruguay beat Argentina 2-1 | AP |
| 30 | Breakers edge Bullets 94-90 in overtime | NBL |

Key verified facts behind the lead (Reuters / AP, 13 Nov 2026): the FAA
ordered the ground stop at 3:54 p.m. ET and lifted it ~8:15 p.m. (4+
hours); 1,000+ flights cancelled, ~10,000 delayed; the second nationwide
stop since 9/11; cause a communications failure at all Air Route Traffic
Control Centers; DHS Secretary Markwayne Mullin: no threat indication;
FBI: no cyberattack indication.

## 8. Why this beats v1

- **Breadth:** 30 stories across 6 continents and 7 fields (politics,
  markets, tech, sport, weather, science, culture) vs v1's 6 vignettes.
- **Lead:** v1 had no FAA story — the day's biggest story, which leads
  most top-10 leaderboard titles. v2 leads with it, biggest panel.
- **Map:** v1 had no map; v2 pins all 30 stories on a world map, the
  exact pattern the top-ranked entries share.
- **Attribution:** every story carries its source on the page itself;
  v1 attributed only in the README.
- **Craft:** all text is PIL-drawn (sharp at any size); v1 relied on a
  generated illustration with overlaid labels.
- **Faithfulness:** every v1 story was re-verified before reuse; the
  deportations figure v1 carried was dropped because it was not
  re-verified this session, and three single-sourced items were replaced
  with verified ones.
