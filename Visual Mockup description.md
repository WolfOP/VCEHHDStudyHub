# VCE HHD Study Website - Visual Mockup Descriptions

These descriptions outline the visual design for key page templates, aiming for a modern, dark, and minimalist aesthetic.

---

## 1. Homepage (`/#home`) - Visual Mockup Description

### Overall Vibe
- Clean, spacious, and professional with a strong emphasis on readability and a modern tech-inspired feel.
- Dark theme creates a focused environment, with vibrant accents guiding the user's attention.

### Color Palette
- **Primary Background (Body):** Very deep, near-black charcoal (Tailwind `bg-slate-900`).
- **Header & Footer Background:** Slightly lighter, but still very dark, charcoal/slate (Tailwind `bg-slate-800`).
- **Text (Primary):** Soft, light grey or off-white (Tailwind `text-slate-200` or `text-slate-300`).
- **Text (Headings):** Slightly brighter light grey (Tailwind `text-slate-100`) or the primary accent color.
- **Accent Color:** Vibrant purple (Tailwind `purple-500` or `purple-600`). Used for:
    - Call-to-action buttons
    - Site logo ("HHD Hub")
    - Active navigation link indicators
    - Icons or subtle highlights
- **Secondary Accent (Optional):** Muted, complementary color (e.g., desaturated teal or blue) for minor highlights if needed.

### Typography (using 'Inter' font)
- **Site Logo ("HHD Hub"):** `text-2xl` or `text-3xl`, `font-bold`, in the accent color (purple).
- **Navigation Links:** `text-sm` or `text-base`, `font-medium`. Regular links in light grey (`slate-300`), hover/active state in accent color (`purple-400`) with a bottom border or subtle background.
- **Hero Heading:** Large and impactful, `text-4xl` or `text-5xl`, `font-bold`. Accent color or bright light grey (`slate-100`).
- **Hero Sub-text/Intro:** `text-lg` or `text-xl`, `font-normal` or `font-light`, in readable light grey (`slate-300`).
- **Body Text:** `text-base`, `font-normal`, in `slate-300`.
- **Section Headings:** `text-2xl` or `text-3xl`, `font-semibold`, in `slate-100` or `slate-200`.

### Layout & Spacing (Based on Wireframe)
- **Header:** Clean, ample padding. Logo left, nav links right, vertically centered. `position: sticky` for easy access.
- **Hero Section:** Centered text. Generous vertical spacing above/below hero image/graphic. Image is sleek, abstract, fitting the dark theme (e.g., glowing purple/blue lines or nodes).
- **CTA Button(s):** Clearly visible below intro text.
- **"Glossy Bubble" for Main Content:**
    - First instance in "Key Features" section.
    - Significant padding, separated from hero and footer, feels like a distinct card floating on the `slate-900` background.
- **Key Features Section (in bubble):**
    - Icon blocks in 2 or 3-column grid on wide screens, stacked on mobile.
    - Each block: icon, short heading, brief description, good spacing.
- **Footer:** Simple, centered text, clear separation from content above.
- **Overall:** Abundant negative space (dark background) to prevent clutter and make content blocks stand out. Consistent margins and padding.

### "Glossy Bubble" Styling for Main Content Sections
- **Background:** Distinct dark grey, lighter than body (Tailwind `bg-slate-800`).
- **Border:** Very subtle, slightly lighter border (Tailwind `border-slate-700` or `border-slate-600`).
- **Rounded Corners:** Smooth, moderately rounded (Tailwind `rounded-xl` or `rounded-2xl`).
- **Shadow:** Soft, diffused (Tailwind `shadow-2xl` or custom subtle version), very dark with transparency for gentle "lifted" appearance.
- **"Gloss" Aspect:** Achieved through smooth design, quality typography, subtle depth from shadow, and clean separation from background (not literal shine/gradient).

### Specific Element Styling
- **Buttons (CTA):**
    - Background: Solid accent color (purple)
    - Text: White or very light grey, `font-semibold`
    - Padding: Generous (e.g., `py-3 px-6`)
    - Rounded Corners: Match bubble's roundness (e.g., `rounded-lg`)
    - Hover: Slightly darker accent, subtle lift or scale effect
- **Icons (Key Features):**
    - Clean, minimalist line icons
    - Accent color (purple) or light grey (`slate-400`)
    - Sized to not overpower text
- **Links (in body text):**
    - Underlined, slightly brighter than body text (e.g., `indigo-400` or lighter purple)
    - Change to main accent color on hover

---

## 2. Unit Page (e.g., `/#unit3`) - Visual Mockup Description

### Overall Vibe
- Structured, informative, and highly readable, designed for focused study.
- Maintains the modern dark aesthetic, ensuring consistency with the homepage.
- Layout facilitates easy scanning and digestion of dense information.

### Color Palette
- **Consistent with Homepage:**
    - Primary Background (Body): Deep charcoal (`bg-slate-900`)
    - "Glossy Bubble" Background (Content Area): Distinct dark grey (`bg-slate-800`)
    - Text (Primary Body): Soft light grey (`text-slate-300`)
    - Text (Main Unit Title `<h1>`): Accent color (purple, `text-purple-400`) or bright light grey (`text-slate-100`)
    - Text (AOS Titles `<h2>`): Bright light grey (`text-slate-200`)
    - Text (Key Knowledge Point Titles `<h3>`): Accent color (purple, `text-purple-400` or `text-purple-300`)
    - Text (Sub-headings `<h4>`): Slightly less prominent light grey (`text-slate-200` or `text-slate-100`)
    - Accent Color (Purple): Used for `<h1>`, `<h3>`, links, icons, or call-outs

### Typography (using 'Inter' font)
- **Unit Title (`<h1>`):** Large, clear, prominent. `text-3xl` or `text-4xl`, `font-bold`.
- **Unit Overview Paragraph:** `text-base` or `text-lg`, `font-normal`, `slate-300`.
- **Area of Study Titles (`<h2>`):** `text-2xl` or `text-3xl`, `font-semibold`.
- **AOS Introduction Paragraph:** `text-base`, `font-normal`, italic, `text-slate-400`.
- **Key Knowledge Point Titles (`<h3>`):** `text-xl` or `text-2xl`, `font-semibold`.
- **Sub-headings within KK points (`<h4>`):** `text-lg` or `text-xl`, `font-semibold`.
- **Body Text:** `text-base`, `font-normal`, `leading-relaxed` for readability.
- **Lists:** Standard `text-base`, `font-normal`, clear bullets/numbers.

### Layout & Spacing (Based on Wireframe)
- **Header & Footer:** Consistent with Homepage.
- **Main Content Area ("Glossy Bubble"):**
    - Entire Unit's content within one primary "glossy bubble" for focus.
    - Unit Title (`<h1>`): Top of bubble, with a clear visual separator (e.g., bottom border in `slate-600` or `slate-700`).
    - Area of Study Sections (`<h2>`): Each AOS starts with its title and intro, visually distinct with more top margin.
    - Key Knowledge Point Sub-sections (`<h3>`): Clearly defined blocks, ample top margin for each new topic.
    - Content (paragraphs, lists, `<h4>` sub-headings) flows naturally below.
    - Visual Separators (`<hr>`): A thin, subtle horizontal rule (e.g., `border-slate-700`) will be used to visually separate each Key Knowledge point, aiding scannability on a long page.
    - Placeholders for Visuals: If a diagram or table is to be inserted, there would be clear spacing around it. The placeholder itself might be a simple bordered box with text like "[Diagram: Dimensions of Health]" or styled to fit the dark theme (e.g., a dark grey box with light text).
    - Long-Scroll Management: The clear typographic hierarchy, consistent spacing, and visual separators are crucial for making a long page of text manageable and not overwhelming.
- **"Glossy Bubble" Styling:**
    - Consistent: `bg-slate-800`, `border-slate-700`, `rounded-xl`, `shadow-2xl`.

### Specific Element Styling
- **Headings:** Styled as per Typography for clear hierarchy.
- **Body Text:** Optimized for readability with appropriate line height and color contrast.
- **Lists:**
    - `ul`: Standard disc bullets, clearly visible
    - `ol`: Standard numbers, consistent indentation
- **Links:** Underlined, `text-indigo-400` or lighter purple, changing to accent color on hover.
- **Horizontal Rules (`<hr>`):** Thin (1px), `slate-700` or `slate-600`, full width in bubble.
- **Blockquotes:** Left border in accent color, slightly indented text, slightly different background (`bg-slate-700`).

---

## 3. Assessment Prep Page (`/#assessment-prep`) - Visual Mockup Description

### Overall Vibe
- Action-oriented and resourceful, providing clear pathways to assessment prep materials.
- Maintains the site's modern dark theme for consistency.

### Color Palette
- **Consistent with Homepage and Unit Page.**
- **Accent Color (purple):** Used for section headings (e.g., "SAC Preparation," "Exam Strategies") or call-to-action elements.

### Typography (using 'Inter' font)
- **Main Page Title (`<h1>`):** `text-3xl` or `text-4xl`, `font-bold`, in accent color or bright light grey.
- **Section Headings (`<h2>`):** `text-2xl` or `text-3xl`, `font-semibold`, in `slate-200`.
- **Sub-headings (`<h3>`):** `text-xl` or `text-2xl`, `font-semibold`, accent color for actionable sub-sections.
- **Body Text:** `text-base`, `font-normal`, `slate-300`, good line height.
- **Links/Buttons:** Styled as main CTA buttons (purple background, light text) or clear text links.

### Layout & Spacing (Based on Wireframe)
- **Header & Footer:** Consistent.
- **Main Content Area ("Glossy Bubble"):**
    - Page Title (`<h1>`): Top, followed by brief intro.
    - Content Sections (`<h2>`): Clear sections for SACs, Exam Prep, Study Strategies, etc.
    - Each section with its own heading, sub-headings for granular topics.
    - Content: Mix of paragraphs, bulleted lists, links to further details or practice materials.
    - Card-like Links (Optional): For specific resources, use card-style elements (`bg-slate-700`, rounded, padding, shadow, heading, description, button/link).
    - Ample spacing between sections/elements.
- **"Glossy Bubble" Styling:**
    - Consistent: `bg-slate-800`, `border-slate-700`, `rounded-xl`, `shadow-2xl`.

### Specific Element Styling
- **Buttons/Resource Links:** Consistent with main CTA buttons.
- **Lists:** Clear, easy-to-read bullet points.
- **Icons:** Minimalist icons next to section headings or resource links.

---

## 4. Glossary Page (`/#glossary`) - Visual Mockup Description

### Overall Vibe
- Clean, organized, and easily scannable, functioning as a quick reference tool.
- Design facilitates quick lookups of terms.

### Color Palette
- **Consistent with rest of site.**
- **Accent Color (purple):** Used for terms or section dividers (A-Z letters).

### Typography (using 'Inter' font)
- **Main Page Title (`<h1>`):** `text-3xl` or `text-4xl`, `font-bold`, in accent color or bright light grey.
- **Intro Paragraph:** `text-base`, `font-normal`, `slate-300`.
- **Alphabetical Section Headings (A, B, C...):** `text-2xl`, `font-semibold`, in accent color or `slate-200`.
- **Term (`<strong>` or `<h3>`):** `text-lg` or `text-xl`, `font-semibold`, in `slate-100` or accent color.
- **Definition:** `text-base`, `font-normal`, `slate-300`.

### Layout & Spacing (Based on Wireframe)
- **Header & Footer:** Consistent.
- **Main Content Area ("Glossy Bubble"):**
    - Page Title (`<h1>`): Top, followed by brief intro.
    - **Search/Filter (Optional):**
        - Search input field styled for dark theme (`bg-slate-700`, light text, purple focus ring).
        - A-Z letter links for quick filtering, styled as small buttons or clear text links.
    - **Term Display:**
        - Option 1 (List Style): Terms listed alphabetically, bold heading, definition, horizontal rules for sections.
        - Option 2 (Card/Grid Style): Terms in a responsive grid (2-3 columns desktop, 1 column mobile), each in a "mini-card" (`bg-slate-700`, rounded, padding, shadow, prominent heading).
    - Generous spacing between entries/cards.
- **"Glossy Bubble" Styling:**
    - Consistent: `bg-slate-800`, `border-slate-700`, `rounded-xl`, `shadow-2xl`.

### Specific Element Styling
- **Search Input:** Clean, integrated into dark theme.
- **A-Z Filter Links:** Subtle but clear, accent color on hover/active.
- **Term Cards (if grid):** Clearly defined, term stands out, hover effects (lift or border highlight in accent color).

---

The Glossary page should be highly functional, allowing students to quickly find and understand key terminology. The chosen layout (list vs. grid) should prioritize ease of scanning and reading.
