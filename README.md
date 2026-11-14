# Friday 13 November 2026: 30 stories, 6 continents, one front page — FAA ground stop leads

Entry for the make.fun bounty **news-image-01**: sum up 13 November's world
news in one image.

## What it is

`entry.png` (1024×1024, PNG) is one broadsheet front page — **THE WORLD
TODAY** — covering Friday 13 November 2026 with **30 verified stories across
6 continents**, every story attributed to its source:

- **Lead story:** the FAA grounds every U.S. departure — a communications
  failure at every air-traffic control centre halted all departures for 4+
  hours (1,000+ flights cancelled, ~10,000 delayed; only the second
  nationwide stop since 9/11; lifted 8:15 p.m.) — Reuters / AP.
- **World map:** all 30 stories pinned and numbered on a world map, so the
  reader can see at a glance where the day happened.
- **The day in full:** a 30-story index — politics, markets, tech, sport,
  weather, science and culture — each headline with its source
  (Reuters, AP, BBC, FT, BLS, UN, NHL, NBL, IEA, Amiri Diwan, Al Jazeera).

The page was drawn entirely with PIL (DejaVu fonts), so every headline is
sharp and spelled exactly as written — no image model rendered any text.
No story is invented and nothing is presented as fact beyond what was
reported that day. See `TESTS.md` for the full story list with sources.

## How it runs

`main.ts` (Node 22, standard library only) copies `entry.png` to
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). No network, no
randomness: both runs write byte-identical output, guarded by a size check
and a SHA-256 comparison.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

See `TESTS.md` for the determinism and gate checks that were run.

## Referral

Built on make.fun — https://make.fun/?ref=vz5h17qh&utm_source=github&utm_medium=readme&utm_campaign=news-image-01

## License

MIT — see `LICENSE`.
