#!/usr/bin/env python3
"""
Rewrite aesi.or.id asset URLs in wp-content.json so the new site is fully
self-contained (no runtime dependency on the legacy aesi.or.id WordPress).

Targets:
  featured_image:
    https://aesi.or.id/wp-content/uploads/<year>/<month>/<file>  -> /uploads/content/<file>
    https://www.aesi.or.id/wp-content/uploads/...                 -> /uploads/content/<file>
  content (HTML):
    https://aesi.or.id/wp-content/uploads/<year>/<month>/<file>  -> /uploads/content/<file>
    /wp-content/uploads/<year>/<month>/<file>                    -> /uploads/content/<file>

External URLs (katadata, kompas, antara, etc.) and absolute /uploads/* paths
are left untouched.

The new path uses /uploads/content/ as the canonical static folder because
that's where all migrated media files live in public/uploads/content/.
"""
import json, re, sys, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # scripts/ lives at <repo>/scripts/
SRC = ROOT / 'src' / 'data' / 'wp-content.json'
BAK = ROOT / 'src' / 'data' / 'wp-content.json.bak'

def normalize(value):
    """Rewrite a single string field. Returns (new_value, changed_bool)."""
    if not isinstance(value, str):
        return value, False
    original = value
    # Pattern 1: full https://aesi.or.id/wp-content/uploads/<y>/<m>/<file>
    value = re.sub(
        r'https?://(?:www\.)?aesi\.or\.id/wp-content/uploads/[^"\'\s)<>]+',
        lambda m: '/uploads/content/' + m.group(0).rsplit('/', 1)[-1],
        value
    )
    # Pattern 2: full https://aesi.or.id/anything-else (catch-all)
    # We do this conservatively: only rewrite if the path after the host
    # starts with a slash, doesn't look like an external tracker, and isn't
    # the new-site URL (which we don't expect here anyway).
    value = re.sub(
        r'https?://(?:www\.)?aesi\.or\.id(/[^\s"\'<>)]*)',
        lambda m: m.group(1) if m.group(1).startswith('/uploads/') else m.group(1),
        value
    )
    # Pattern 3: relative /wp-content/uploads/<y>/<m>/<file>
    value = re.sub(
        r'/wp-content/uploads/[^"\'\s)<>]+',
        lambda m: '/uploads/content/' + m.group(0).rsplit('/', 1)[-1],
        value
    )
    return value, (value != original)


def normalize_field(obj, fields):
    changed = 0
    for f in fields:
        v = obj.get(f)
        if isinstance(v, str):
            new, c = normalize(v)
            if c:
                obj[f] = new
                changed += 1
    return changed


def main():
    if not SRC.exists():
        print(f'ERROR: {SRC} not found', file=sys.stderr); sys.exit(1)
    # backup first
    shutil.copyfile(SRC, BAK)
    data = json.loads(SRC.read_text(encoding='utf-8'))

    total_changes = 0

    # 1) artikel: rewrite featured_image (string) + content (HTML string)
    for a in data.get('artikel', []):
        total_changes += normalize_field(a, ['featured_image', 'content', 'excerpt'])

    # 2) regulasi: same treatment
    for r in data.get('regulasi', []):
        total_changes += normalize_field(r, ['content', 'excerpt'])

    # 3) key_pages: rewrite content (HTML)
    for p in data.get('key_pages', []):
        total_changes += normalize_field(p, ['content', 'excerpt'])

    # 4) header & footer (dict with 'content' string)
    for section in ['header', 'footer']:
        sec = data.get(section)
        if isinstance(sec, dict):
            total_changes += normalize_field(sec, ['content'])

    # write back with deterministic formatting
    SRC.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + '\n',
        encoding='utf-8'
    )

    # report
    print(f'OK: {total_changes} field(s) rewritten.')
    print(f'Backup: {BAK}')

    # quick verification: any aesi.or.id URLs left?
    text = SRC.read_text(encoding='utf-8')
    leftover = re.findall(r'https?://(?:www\.)?aesi\.or\.id/[^"\s<>]+', text)
    leftover_wp = re.findall(r'/wp-content/uploads/[^"\s<>]+', text)
    print(f'Remaining aesi.or.id refs in JSON: {len(leftover)}')
    for u in leftover[:10]: print(f'   - {u}')
    print(f'Remaining /wp-content/ refs in JSON: {len(leftover_wp)}')
    for u in leftover_wp[:10]: print(f'   - {u}')


if __name__ == '__main__':
    main()
