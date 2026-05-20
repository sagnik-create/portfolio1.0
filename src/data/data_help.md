# Portfolio Data Guide

Use `portfolio.json` as the single source of content for the portfolio site. Keep it as valid JSON: do not add `//` or `/* */` comments inside the JSON file.

## Main Sections

### `short_title`

Controls the main portfolio title. It is used in the hero section, navbar title, and footer title.

```json
"short_title": {
  "content": "Building AI-driven applications"
}
```

### `very_short_bio`

Controls the short introduction shown below the hero headline.

```json
"very_short_bio": {
  "content": "AI Engineering intern building end-to-end intelligent systems."
}
```

### `contact`

Stores your public contact links. The hero currently shows the first two available contact links.

- `email`: Creates a `mailto:` link.
- `github`: Links to your GitHub profile.
- `linkedin`: Links to your LinkedIn profile.
- `portfolio`: Optional external portfolio URL. Leave it empty if this site is your main portfolio.

### `skills`

Stores grouped skill lists. Each key is a category and each value is an array of skills.

```json
"skills": {
  "languages": ["Python", "JavaScript"],
  "frameworks": ["React", "Node.js"]
}
```

### `experience`

Stores work, internship, or professional experience entries. Add one object per role.

- `role`: Position title.
- `company`: Organization name.
- `duration`: Time period, such as `Jan 2026 - Apr 2026`.
- `description`: Bullet points shown on the experience page.
- `blog`: Optional write-up connected to the experience.

An experience blog appears only when `title` is filled and either `content` or `external_url` is filled.

### `projects`

Stores project entries. Add one object per project.

- `project_name`: Project title.
- `slug`: Optional URL slug. If omitted, the app creates one from `project_name`.
- `tagline`: Short label shown above the project title.
- `description`: Short project summary.
- `tech_stack`: Technologies shown as chips.
- `features`: Key features shown on the project detail page.
- `github`: Optional repository URL.
- `live_demo`: Optional deployed demo URL.
- `featured`: Optional boolean. Featured projects are prioritized on the home page.
- `blog`: Optional write-up connected to the project.

### `blogs`

Stores standalone blog entries. The app also collects blogs attached to projects and experience entries.

- `title`: Required for the blog to appear.
- `slug`: Optional URL slug. If omitted, the app creates one from `title`.
- `content`: Markdown content for an internal blog page.
- `external_url`: External blog URL, such as a Medium link.
- `platform`: Source label, such as `medium` or `custom`.
- `tags`: Blog tags.
- `date`: Publish date. Use `YYYY-MM-DD` when possible.
- `reading_time`: Display text such as `5 min read`.
- `featured`: Optional boolean. Featured blogs are prioritized on the home page.
- `cover_image`: Optional image path or URL.
- `related_to`: Connects the blog to a project, experience, or general topic.

A blog appears only when it has a `title` and either `content` or `external_url`.

### `leadership`

Stores leadership or organization entries, such as club roles.

### `education`

Stores education details. The hero quick snapshot uses this section.

### `goals`

Stores short-term and long-term goals. The hero quick snapshot displays `short_term`.

### `_templates`

Contains copyable examples for adding projects, experience entries, and blogs. These templates are not rendered as portfolio content.

## How To Add A New Project

1. Copy `project_template` from `_templates`.
2. Paste it as a new object inside the `projects` array.
3. Replace placeholder values with real content.
4. Add commas carefully between project objects.
5. Leave optional fields as empty strings if you do not want to show them yet.

Example:

```json
{
  "project_name": "AI Resume Analyzer",
  "tagline": "LLM-powered resume review",
  "description": "A tool that reviews resumes and suggests improvements.",
  "tech_stack": ["Python", "FastAPI", "React", "LLMs"],
  "features": ["Resume parsing", "Skill gap detection", "Improvement suggestions"],
  "github": "https://github.com/username/ai-resume-analyzer",
  "live_demo": "",
  "featured": true,
  "blog": {
    "title": "",
    "slug": "",
    "content": "",
    "external_url": "",
    "platform": "medium",
    "tags": ["AI", "LLM"],
    "date": "",
    "reading_time": "",
    "featured": false,
    "cover_image": ""
  }
}
```

## How To Add A Blog

For an internal blog, fill `title`, `content`, and the metadata fields.

For an external blog, fill `title` and `external_url`. You can leave `content` empty.

```json
{
  "title": "How I Built My Medical AI Assistant",
  "slug": "medical-ai-assistant",
  "content": "",
  "external_url": "https://medium.com/example",
  "platform": "medium",
  "tags": ["AI", "Healthcare", "LLM"],
  "date": "2026-05-17",
  "reading_time": "6 min read",
  "featured": true,
  "cover_image": "",
  "related_to": {
    "type": "project",
    "name": "Agentic Medical AI Assistant"
  }
}
```

## Common Rules

- Keep strings inside double quotes.
- Keep arrays inside square brackets.
- Keep objects inside curly braces.
- Add commas between sibling fields and array items.
- Do not add a trailing comma after the final item in an object or array.
- Use empty strings for optional text fields you are not ready to fill.
- Use `true` or `false` without quotes for boolean fields.
