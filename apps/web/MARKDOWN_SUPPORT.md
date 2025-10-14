# Markdown Support in Totunik Website

This document explains how to use markdown formatting in various content fields
throughout the website.

## Supported Fields

The following fields now support rich text markdown formatting:

### Homepage

- **Contact CTA Section**: `subheadline` field
- **About Section**: `description` field

### Business Partner Pages

- **Introduction Section**: `content` field
- **Philosophy Section**: `content` field

## Supported Markdown Features

### Text Formatting

- **Bold text**: `**bold text**` or `__bold text__`
- _Italic text_: `*italic text*` or `_italic text_`
- ~~Strikethrough~~: `~~strikethrough text~~`

### Headings

```markdown
# Heading 1

## Heading 2

### Heading 3
```

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com 'Link Title')
```

### Lists

```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered item
```

### Blockquotes

```markdown
> This is a blockquote It can span multiple lines
```

### Code

```markdown
Inline `code` formatting
```

## Styling Variants

The `MarkdownContent` component supports different styling variants:

### Default Variant

- Standard gray text on white background
- Used for general content

### White Variant

- White text with semi-transparent styling
- Used on colored backgrounds (like the orange CTA section)

### Large Variant

- Larger text size for emphasis
- Used in hero sections and important content areas

### Small Variant

- Smaller text size for secondary content
- Used for captions and fine print

## Usage Examples

### In Strapi CMS

When editing content in Strapi, you can use markdown syntax directly in the text
fields:

```markdown
Welcome to **Totunik** - your trusted partner for _turnkey projects_.

We specialize in:

- Interior design
- Retail shop construction
- Bank office renovations

[Contact us today](mailto:contact@totunik.ro) to get started!
```

### Component Usage

```tsx
import MarkdownContent from './MarkdownContent';

// Basic usage
<MarkdownContent content={markdownString} />

// With variant
<MarkdownContent
  content={markdownString}
  variant="white"
  className="text-center"
/>
```

## Technical Implementation

### Components Updated

1. **ContactCTASection**: Now renders `subheadline` as markdown
2. **AboutSection**: Now renders `description` as markdown
3. **BusinessPartnerIntroduction**: Now renders `content` as markdown
4. **PartnershipPhilosophy**: Now renders `content` as markdown

### Dependencies Added

- `react-markdown`: For parsing and rendering markdown
- `@tailwindcss/typography`: For beautiful typography styles

### Custom Styling

The `MarkdownContent` component provides custom styling for all markdown
elements to ensure consistency with the website's design system, including:

- Proper color schemes for different backgrounds
- Responsive text sizing
- Consistent spacing and typography
- Brand-appropriate link styling

## Best Practices

1. **Keep it Simple**: Use markdown for basic formatting, avoid complex HTML
2. **Test Rendering**: Always preview content to ensure proper rendering
3. **Accessibility**: Use proper heading hierarchy (h1 → h2 → h3)
4. **Links**: Always use descriptive link text
5. **Lists**: Use lists for better content organization

## Migration Notes

Existing content will continue to work as before. To take advantage of markdown
formatting:

1. Update content in Strapi to use markdown syntax
2. The components will automatically render the markdown properly
3. No code changes are required for basic markdown usage
