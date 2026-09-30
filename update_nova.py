import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="assets/images/novabrief-preview.svg"', 'src="assets/images/novabrief-preview.png?v=3"')
content = re.sub(r'\?v=2\.5', '?v=2.6', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated NovaBrief image path')
