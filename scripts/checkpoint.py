"""Build a deterministic, allowlisted source archive. Never include dependencies or secrets."""
from pathlib import Path
import zipfile
ROOT=Path(__file__).resolve().parents[1]
OUTPUT=ROOT/'deliverables/playpower-airbnb-source.zip'
FOLDERS=['app','pages','components','server','public','scripts','docs','tests']
FILES=['package.json','package-lock.json','next.config.mjs','.gitignore','.vercelignore','README.md','NEEDS_VERIFICATION.md','ui-fidelity.md','accessibility.md','architecture.md','prompt-history.md','FILE_TREE.txt']
paths=[ROOT/f for f in FILES if (ROOT/f).is_file()]
for folder in FOLDERS:
 paths += [p for p in (ROOT/folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.suffix not in ['.pyc','.log'] and not p.name.startswith('.env')]
paths=sorted(set(paths))
(ROOT/'FILE_TREE.txt').write_text('power_play/\n'+'\n'.join('  '+str(p.relative_to(ROOT)) for p in paths if p.name!='FILE_TREE.txt')+'\n  FILE_TREE.txt\n')
if ROOT/'FILE_TREE.txt' not in paths: paths.append(ROOT/'FILE_TREE.txt')
OUTPUT.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(OUTPUT,'w',zipfile.ZIP_DEFLATED) as z:
 for p in paths: z.write(p,'power_play/'+str(p.relative_to(ROOT)))
print(f'{OUTPUT}\n{len(paths)} files; {OUTPUT.stat().st_size:,} bytes')
