import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="assets/images/khidmat-ai-preview.svg"', 'src="assets/images/khidmat-ai-preview.jpg"')
content = content.replace('src="assets/images/seo-agent-preview.svg"', 'src="assets/images/seo-agent-preview.jpg"')

content = re.sub(r'\?v=2\.3', '?v=2.4', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated image paths')
