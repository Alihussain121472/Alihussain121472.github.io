import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix contact headline
old_contact = 'Let\'s Build <span class=\"gradient-text\">Something Great</span>'
new_contact = 'Let\'s <span class=\"gradient-text\">Work Together</span>'
content = content.replace(old_contact, new_contact)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed contact headline')
