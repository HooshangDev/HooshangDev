from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

out = Path('output/pdf')
out.mkdir(parents=True, exist_ok=True)
styles = {
 'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=HexColor('#18344B'), spaceAfter=5),
 'title': ParagraphStyle('title', fontName='Helvetica', fontSize=12, leading=16, spaceAfter=8),
 'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=9, leading=13, spaceAfter=2),
 'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#18344B'), spaceBefore=15, spaceAfter=6),
 'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=14, spaceAfter=5),
 'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=11, leading=15, spaceAfter=3),
 'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10, leading=14, leftIndent=11, firstLineIndent=-9, spaceAfter=4),
}
story=[]
plain=[]
def add(text, kind='body'):
 story.append(Paragraph(text,styles[kind]))
 plain.append(text)

add('MANOUCHEHR SOLTANI','name')
add('Game Developer | Unreal Engine &amp; Multiplayer Systems','title')
add('Mashhad, Iran | <link href="mailto:manouchehr.st@gmail.com">manouchehr.st@gmail.com</link>','contact')
add('Portfolio: <link href="https://hooshang-dev.vercel.app/" color="#185F8A">hooshang-dev.vercel.app</link>','contact')
add('LinkedIn: <link href="https://www.linkedin.com/in/manouchehr-soltani-the-creator" color="#185F8A">linkedin.com/in/manouchehr-soltani-the-creator</link>','contact')
add('PROFESSIONAL SUMMARY','section')
add('Unreal Engine developer with 4+ years of hands-on experience building online and offline games for PC and mobile. Specializes in C++, Blueprints, multiplayer networking, and engine source customization. Independently developed and published an Android multiplayer racing game, with experience spanning gameplay implementation, monetization integration, and live maintenance.')
add('TECHNICAL SKILLS','section')
add('<b>Engines &amp; programming:</b> Unreal Engine, C++, Blueprints; Unity fundamentals')
add('<b>Gameplay &amp; networking:</b> Multiplayer architecture, replication, custom matchmaking, network optimization, animation systems, AI, behavior trees')
add('<b>Effects &amp; interface:</b> Niagara VFX, MetaSounds, UMG, Figma design and handoff')
add('<b>Tools &amp; integrations:</b> Git, GitHub, engine source modification, advertising SDKs, Cafe Bazaar in-app purchases; Blender and Substance Painter/Designer (intermediate)')
add('PROJECT EXPERIENCE','section')
add('Ever Ride | Solo Developer','job')
add('Manataz Studio | 2023 | Android multiplayer racing','body')
add('- Independently developed the complete game in Unreal Engine, from gameplay implementation to publication.','bullet')
add('- Implemented the multiplayer racing system to support online play.','bullet')
add('- Modified Unreal Engine source code to integrate Cafe Bazaar in-app purchases and Adivery advertising.','bullet')
add('- Published the game on Cafe Bazaar and maintained the live release.','bullet')
add('<link href="https://cafebazaar.ir/app/com.Manataz.EverRide" color="#185F8A">View game on Cafe Bazaar</link>','contact')
story.append(Spacer(1,9))
add('Multiplayer FPS | Lead Developer','job')
add('Company project | 2022 | Unreleased; on hold','body')
add('- Designed and implemented core gameplay mechanics for a multiplayer first-person shooter.','bullet')
add('- Developed multiplayer architecture and replication systems.','bullet')
add('EDUCATION','section')
add('<b>Associate Degree in Software Engineering</b><br/>Islamic Azad University, Mashhad | 2020')
add('LANGUAGES','section')
add('Persian | English: fluent in speaking and writing')
add('CAREER INTEREST','section')
add('Seeking paid remote game development opportunities, including contract work, focused on Unreal Engine, gameplay, and multiplayer systems. Based in Iran.')
pdf=out/'Manouchehr_Soltani_Remote_Game_Developer.pdf'
SimpleDocTemplate(str(pdf), pagesize=A4, rightMargin=43, leftMargin=43, topMargin=36, bottomMargin=32, title='Manouchehr Soltani - Game Developer Resume',author='Manouchehr Soltani').build(story)
import re, html
(out/'Manouchehr_Soltani_Remote_Game_Developer.txt').write_text('\n\n'.join(html.unescape(re.sub('<[^>]+>', '', t.replace('<br/>','\n'))) for t in plain),encoding='utf-8')
r=PdfReader(str(pdf))
print('Pages:', len(r.pages))
print('Links:', [a.get_object().get('/A',{}).get('/URI') for p in r.pages for a in p.get('/Annots',[])])

