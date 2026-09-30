import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Resume summary replacement
old_resume = r'Software Developer and AI Engineer specializing in full-stack web applications, autonomous agent systems, and automated data workflows using Python, Django, Next.js, and modern LLM APIs. Creator of NovaBrief Tech, an automated student intelligence and opportunity platform, and the Araknet Business Discovery Agent. Experienced in database architecture, scheduled background workers, and RESTful API engineering. BSAI undergraduate at SZABIST University, Islamabad, committed to building clean, reliable, and high-impact digital solutions.'
new_resume = 'I am a software developer and BSAI student at SZABIST University. I build full-stack web apps and data workflows using Python, Next.js, Flask, Supabase, and APIs from Groq and Anthropic. I created NovaBrief Tech to track student opportunities and built a lead-scoring tool for B2B businesses. I have experience setting up databases, writing API endpoints, and running scheduled background tasks. I am looking for developer roles and freelance work.'

content = content.replace(old_resume, new_resume)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated resume in index.html')

with open('script.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace pitches in JS
pitch_nb_old = r"pitch: 'An automated platform that hunts elite student programs (Google Student Facilitator, Google Arcade, Microsoft Fabric, NASA Open Science, fellowships) and generates instant 60-second AI summaries of global breakthroughs.',"
pitch_nb_new = "pitch: 'A platform that tracks student opportunities and fellowships. It scrapes the web and uses language models to generate short daily summaries. This helps students find programs without manually reading through hundreds of links.',"
js_content = js_content.replace(pitch_nb_old, pitch_nb_new)

pitch_araknet_old = r"pitch: 'An autonomous AI scout that scans local and international businesses across any city, audits their websites and mobile presence, and scores high-value client opportunities.',"
pitch_araknet_new = "pitch: 'A Python tool that finds businesses in specific cities. It scans their websites and mobile presence. Then it scores each business to identify good client opportunities for agencies.',"
js_content = js_content.replace(pitch_araknet_old, pitch_araknet_new)

pitch_khidmat_old = r"pitch: 'A bilingual civic assistance application that helps citizens effortlessly understand government procedures, draft public service requests, and resolve utility disputes in everyday language.',"
pitch_khidmat_new = "pitch: 'A bilingual web app for civic assistance. It explains government procedures in plain language. Users can draft public service requests and figure out how to resolve utility disputes.',"
js_content = js_content.replace(pitch_khidmat_old, pitch_khidmat_new)

# Update cache buster in script.js to be safe (if needed, but usually index.html links to it)
# We already updated index.html ?v=2.3. No need to touch script.js filename

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Updated pitches in script.js')
