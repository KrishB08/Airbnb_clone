"""Reproducible evidence crops; no generated or downloaded property imagery.
Requires Pillow. Full-resolution video frames are decoded by ffmpeg beforehand.
Coordinates for recording crops use the 1470x956 inspection scale, multiplied by two.
"""
from pathlib import Path
from PIL import Image
import json
import argparse
import subprocess
import tempfile
from pypdf import PdfReader

parser=argparse.ArgumentParser(description="Regenerate evidence crops from the supplied assignment files; optional, not needed to run the app.")
parser.add_argument("--pdf",type=Path,required=True)
parser.add_argument("--video",type=Path,required=True)
parser.add_argument("--ffmpeg",default="ffmpeg")
args=parser.parse_args()
for source in [args.pdf,args.video]:
    if not source.is_file(): parser.error(f"Missing input: {source}")
workspace=tempfile.TemporaryDirectory(prefix="playpower-evidence-")
scratch=Path(workspace.name)
pdf=scratch/"pdf"
pdf.mkdir()
reader=PdfReader(args.pdf)
for i,name in [(1,"pdf-2-1-X17.png"),(2,"pdf-2-2-X18.png"),(3,"pdf-2-3-X19.png")]:
    (pdf/name).write_bytes(reader.pages[1].images[i].data)
def decode(extra,output):
    subprocess.run([args.ffmpeg,"-hide_banner","-loglevel","error",*extra,str(scratch/output)],check=True)
decode(["-i",str(args.video),"-t","50","-vf","fps=1/5"],"power-play-frame-%03d.png")
decode(["-ss","28","-i",str(args.video),"-t","9","-vf","fps=2"],"power-play-detail-%02d.png")
decode(["-ss","24","-i",str(args.video),"-frames:v","1"],"power-play-patio.png")
decode(["-ss","132.5","-i",str(args.video),"-frames:v","1"],"power-play-nearby.png")
ROOT=Path(__file__).resolve().parents[1]
manifest=[]
def crop(name,source,box,scale=1):
    im=Image.open(source); box=tuple(v*scale for v in box)
    im=im.crop(box).convert('RGB'); im.save(ROOT/'public/images'/f'{name}.webp','WEBP',quality=94)
    manifest.append({'file':f'{name}.webp','source':str(source).split('/')[-1],'crop':box,'size':im.size,'original':False})
(ROOT/'public/images').mkdir(parents=True,exist_ok=True)
crop('patio-front',pdf/'pdf-2-1-X17.png',(160,173,720,667))
crop('patio-seating-hero',pdf/'pdf-2-1-X17.png',(728,173,1000,416))
crop('jacuzzi',pdf/'pdf-2-1-X17.png',(1008,173,1280,416))
crop('bedroom-hero',pdf/'pdf-2-1-X17.png',(728,424,1000,667))
crop('living-tour',pdf/'pdf-2-2-X18.png',(750,436,1208,742))
crop('patio-seating',scratch/'power-play-patio.png',(765,288,1223,594),2)
crop('living-main',pdf/'pdf-2-3-X19.png',(264,88,1176,772))
def video(name,kind,num,box):
    src=scratch/(f'power-play-{kind}-{num:03d}.png' if kind=='frame' else f'power-play-{kind}-{num:02d}.png')
    crop(name,src,box,2)
video('living-tv','frame',5,(765,492,988,641))
video('living-wide','frame',5,(1000,492,1223,641))
video('patio-wide','frame',6,(765,209,1223,432))
video('kitchen-front','frame',6,(765,452,988,601))
video('kitchen-dining','frame',6,(1000,452,1223,601))
video('bedroom-main','frame',6,(765,621,1223,925))
video('bathroom','detail',5,(765,209,1223,492))
video('gym-main','detail',5,(765,511,1223,817))
video('gym-equipment','frame',7,(765,233,988,382))
video('gym-window','frame',7,(1000,233,1223,382))
video('exterior-main','frame',7,(765,403,1223,708))
video('exterior-area','frame',7,(765,720,988,869))
video('exterior-side','frame',7,(1000,720,1223,869))
video('exterior-front','detail',13,(765,325,1223,630))
video('pool-main','detail',16,(765,318,1223,623))
video('pool-deck','detail',16,(765,635,988,783))
video('pool-courtyard','detail',16,(1000,635,1223,783))
video('jacuzzi-diagonal','detail',18,(765,289,1223,594))
video('patio-overview','frame',8,(765,316,988,465))
video('patio-corner','frame',8,(1000,316,1223,465))
video('patio-utility','frame',8,(765,477,1223,782))
for i,x in enumerate([175,403,631,859,1087]):
    crop(f'nearby-{i+1}',scratch/'power-play-nearby.png',(x,626,x+208,834),2)
(ROOT/'docs/asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'Extracted {len(manifest)} evidence crops.')

workspace.cleanup()
