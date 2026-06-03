#!/usr/bin/env python3
"""
Check all university-details.json files for encoding issues.
Writes results to encoding_report.txt to avoid Windows console issues.
"""

import re, json
from pathlib import Path

BASE   = Path(__file__).parent / "src/data"
OUT    = Path(__file__).parent / "encoding_report.txt"
STRANDS = ["biochemistry", "finance", "physics", "maths", "engineering"]

lines = []
total_bad = 0

for strand in STRANDS:
    fpath = BASE / strand / "university-details.json"
    raw = fpath.read_text(encoding="utf-8-sig", errors="replace")

    # 1. Any replacement characters (U+FFFD) — means the file had un-decodable bytes
    repl_hits = [(m.start(), raw[max(0,m.start()-60):m.start()+80].replace('\n',' '))
                 for m in re.finditer('�', raw)]

    # 2. Curly quotes crept in where straight quotes expected in JSON keys/string delims
    #    (safe to check: JSON must use " not " or ")
    curly_hits = [(m.start(), raw[max(0,m.start()-60):m.start()+80].replace('\n',' '))
                  for m in re.finditer('[“”‘’]', raw)]

    # 3. Stray control characters (not tab/newline/cr)
    ctrl_hits  = [(m.start(), raw[max(0,m.start()-60):m.start()+80].replace('\n',' '))
                  for m in re.finditer('[\x00-\x08\x0b\x0c\x0e-\x1f]', raw)]

    # 4. Check the JSON actually parses cleanly
    try:
        data = json.loads(raw)
        parse_ok = True
    except json.JSONDecodeError as e:
        parse_ok = False
        parse_err = str(e)

    issues = len(repl_hits) + len(curly_hits) + len(ctrl_hits)
    total_bad += issues

    lines.append(f"\n{'='*70}")
    lines.append(f"STRAND: {strand}/university-details.json")
    lines.append(f"JSON parse:           {'OK' if parse_ok else 'FAIL: ' + parse_err}")
    lines.append(f"Replacement chars:    {len(repl_hits)}")
    lines.append(f"Curly quotes:         {len(curly_hits)}")
    lines.append(f"Stray control chars:  {len(ctrl_hits)}")

    for label, hits in [("REPLACEMENT CHAR", repl_hits),
                         ("CURLY QUOTE", curly_hits),
                         ("CONTROL CHAR", ctrl_hits)]:
        for pos, ctx in hits[:10]:   # cap at 10 per type per file
            lines.append(f"\n  [{label}] pos {pos}:")
            lines.append(f"    {repr(ctx)}")

OUT.write_text('\n'.join(lines) + f'\n\nTOTAL ISSUES: {total_bad}\n', encoding='utf-8')
print(f"Report written to encoding_report.txt  (total issues: {total_bad})")
