import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Meta and Title
content = re.sub(r'<title>.*?</title>', '<title>Syed Ali | Software Developer &amp; BSAI Student</title>', content)
content = re.sub(r'content=\"Syed Ali Hussain \| AI Developer & AI Systems Builder\"', 'content=\"Syed Ali | Software Developer & BSAI Student\"', content)
content = re.sub(r'content=\"Syed Ali Hussain \| AI Developer &amp; AI Systems Builder\"', 'content=\"Syed Ali | Software Developer & BSAI Student\"', content)

# Hero Tagline
content = re.sub(
    r'<p class=\"hero-subtitle editable-target\" data-edit-key=\"hero_subtitle\">.*?</p>',
    '<p class=\"hero-subtitle editable-target\" data-edit-key=\"hero_subtitle\">\n            I\'m a software developer and BSAI student. I build web apps, API integrations, and scripts that automate boring tasks. Creator of NovaBrief Tech.\n          </p>',
    content,
    flags=re.DOTALL
)

# About Heading Subtext
content = re.sub(
    r'<p class=\"section-subtitle editable-target\" data-edit-key=\"about_subtext\">.*?</p>',
    '<p class=\"section-subtitle editable-target\" data-edit-key=\"about_subtext\">Writing code to build web apps and tools.</p>',
    content,
    flags=re.DOTALL
)

# About Body
content = re.sub(
    r'<div class=\"about-text editable-target\" data-edit-key=\"about_text\">.*?</div>',
    '<div class=\"about-text editable-target\" data-edit-key=\"about_text\">\n              <p>I\'m a 20-year-old software developer based in Islamabad. I am currently studying Artificial Intelligence at SZABIST University. I learn best by actually building things. I created NovaBrief Tech to help students find fellowships without searching for hours. I also built a business discovery tool that scores leads, and a real estate advisor for DHA Multan. I spend my time working with Python, Next.js, Flask, Supabase, and models like Llama 3.3 and Claude. Right now, I am looking for developer roles and freelance projects.</p>\n            </div>',
    content,
    flags=re.DOTALL
)

# Skills Subtitle
content = re.sub(
    r'<p class=\"section-subtitle\">Programming languages, frameworks, AI tools, and databases I use to build real-world software.</p>',
    '<p class=\"section-subtitle\">The languages, frameworks, and APIs I use to build my projects.</p>',
    content,
    flags=re.DOTALL
)

# Skill Group 1
content = re.sub(
    r'<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat1_desc\">Building smart web apps.*?fast responses.</p>',
    '<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat1_desc\">Integrating language models like Llama 3.3 and Claude into web apps using API calls and custom prompts.</p>',
    content,
    flags=re.DOTALL
)

# Skill Group 2
content = re.sub(
    r'<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat2_desc\">Automating workflows.*?modern APIs.</p>',
    '<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat2_desc\">Writing Python scripts to scrape data, run scheduled background tasks, and connect different services.</p>',
    content,
    flags=re.DOTALL
)

# Skill Group 3
content = re.sub(
    r'<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat3_desc\">Building fast, responsive web applications with clean code, secure APIs, and databases.</p>',
    '<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat3_desc\">Setting up databases in Supabase and building user interfaces with Next.js and Flask.</p>',
    content,
    flags=re.DOTALL
)

# Skill Group 5
content = re.sub(
    r'<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat5_desc\">Designing software that is fast, reliable, easy to use, and solves real problems.</p>',
    '<p class=\"skill-cat-desc editable-target\" data-edit-key=\"skill_cat5_desc\">Structuring apps so they do exactly what the user expects without confusing menus or hidden steps.</p>',
    content,
    flags=re.DOTALL
)

# Projects Subtitle
content = re.sub(
    r'<p class=\"section-subtitle\">Real software solving practical problems.*?connected sites.</p>',
    '<p class=\"section-subtitle\">The apps and tools I\'ve built. Click any project to see the architecture, tech stack, and live site.</p>',
    content,
    flags=re.DOTALL
)

# Contact Headline & Subtext
content = re.sub(
    r'<h2 class=\"section-title\">Let\'s Build Something Great</h2>',
    '<h2 class=\"section-title\">Let\'s Work Together</h2>',
    content,
    flags=re.DOTALL
)
content = re.sub(
    r'<p class=\"section-subtitle\">Open to software developer roles, freelance projects, and tech collaborations.</p>',
    '<p class=\"section-subtitle\">I am currently looking for software developer roles and freelance projects. Send me a message if you want to collaborate.</p>',
    content,
    flags=re.DOTALL
)

# Footer Text
content = re.sub(
    r'<p class=\"footer-text editable-target\" data-edit-key=\"footer_copy\">\n.*?&copy; 2025 Syed Ali Hussain.*?<br>\n.*?Built with modern web standards, neural canvas, and AI.\n.*?</p>',
    '<p class=\"footer-text editable-target\" data-edit-key=\"footer_copy\">\n            &copy; 2025 Syed Ali Hussain.<br>\n            Designed and built by Syed Ali.\n          </p>',
    content,
    flags=re.DOTALL
)

# NovaBrief Project description inline in HTML
content = re.sub(
    r'<p class=\"project-description editable-target\" data-edit-key=\"proj_nb_desc\">.*?An automated daily intelligence.*?breakthroughs, and student programs.*?<\/p>',
    '<p class=\"project-description editable-target\" data-edit-key=\"proj_nb_desc\">\n              A platform that tracks student opportunities and fellowships. It scrapes the web and uses language models to generate short daily summaries. This helps students find programs without manually reading through hundreds of links.\n            </p>',
    content,
    flags=re.DOTALL
)

# Cache busting - replace ?v=2.2 with ?v=2.3
content = re.sub(r'\?v=2\.2', '?v=2.3', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated index.html')
