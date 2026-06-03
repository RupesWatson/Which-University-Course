import pathlib

FILE = pathlib.Path(__file__).parent / "src/data/finance/university-details.json"

# Work entirely with bytes to avoid any source-file encoding headaches.
# The file is valid UTF-8 but contains double-encoded (mojibake) sequences.
#
# How the corruption happened:
#   Original UTF-8 bytes were mis-read as Windows-1252 individual chars,
#   then those chars were re-encoded as UTF-8 -> each original byte became
#   its own multi-byte UTF-8 sequence.
#
# Replacement table: (mojibake_utf8_bytes, correct_utf8_bytes)
FIXES = [
    # Pound sign  £ (U+00A3 = UTF-8 c2 a3)
    # Mojibake: U+00C2 U+00A3 = UTF-8  c3 82  c2 a3
    (b"\xc3\x82\xc2\xa3",  b"\xc2\xa3"),

    # En-dash  -- (U+2013 = UTF-8 e2 80 93)
    # win1252: 0xe2->U+00E2 (a-circ, c3 a2), 0x80->U+20AC (euro, e2 82 ac),
    #          0x93->U+201C (l-dquote, e2 80 9c)
    (b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9c",  b"\xe2\x80\x93"),

    # Em-dash  -- (U+2014 = UTF-8 e2 80 94)
    # 0x94 in win1252 -> U+201D (r-dquote, e2 80 9d)
    (b"\xc3\xa2\xe2\x82\xac\xe2\x80\x9d",  b"\xe2\x80\x94"),

    # Right single quote / apostrophe  ' (U+2019 = UTF-8 e2 80 99)
    # 0x99 in win1252 -> U+2122 (trade mark, e2 84 a2)
    (b"\xc3\xa2\xe2\x82\xac\xe2\x84\xa2",  b"\xe2\x80\x99"),

    # Left single quote  ' (U+2018 = UTF-8 e2 80 98)
    # 0x98 in win1252 -> U+02DC (small tilde, cb 9c)
    (b"\xc3\xa2\xe2\x82\xac\xcb\x9c",      b"\xe2\x80\x98"),

    # Left double quote  " (U+201C = UTF-8 e2 80 9c)
    # 0x9c in win1252 -> U+0153 (o-e ligature, c5 93)
    (b"\xc3\xa2\xe2\x82\xac\xc5\x93",      b"\xe2\x80\x9c"),

    # Right double quote  " (U+201D = UTF-8 e2 80 9d)
    # 0x9d in win1252 -> U+009D (control, c2 9d)
    (b"\xc3\xa2\xe2\x82\xac\xc2\x9d",      b"\xe2\x80\x9d"),

    # Ellipsis  ... (U+2026 = UTF-8 e2 80 a6)
    # 0xa6 in win1252 -> U+00A6 (broken bar, c2 a6)
    (b"\xc3\xa2\xe2\x82\xac\xc2\xa6",      b"\xe2\x80\xa6"),

    # Bullet  * (U+2022 = UTF-8 e2 80 a2)
    # 0xa2 in win1252 -> U+00A2 (cent sign, c2 a2)
    (b"\xc3\xa2\xe2\x82\xac\xc2\xa2",      b"\xe2\x80\xa2"),

    # Non-breaking space  (U+00A0 = UTF-8 c2 a0) -- Â (c3 82) + NBSP (c2 a0)
    (b"\xc3\x82\xc2\xa0",                  b"\xc2\xa0"),
]

raw = FILE.read_bytes()
fixed = raw
total = 0

for bad, good in FIXES:
    count = fixed.count(bad)
    if count:
        fixed = fixed.replace(bad, good)
        total += count
        print("  %3d x  %-40s -> %s" % (count, repr(bad), repr(good)))

if total:
    FILE.write_bytes(fixed)
    print("\nDone -- %d substitutions written." % total)
    # Verify it still parses as valid JSON
    import json
    try:
        json.loads(fixed.decode("utf-8"))
        print("JSON parse: OK")
    except Exception as e:
        print("JSON parse FAILED:", e)
else:
    print("No changes needed.")
