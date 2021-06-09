export const markdown = `
class: center, middle, inverse
# {{canvas.name}}

{{canvas.description}}

---
{{#each canvas.children}}

## {{title}}
{{description}}

{{#each children}}
- {{this}}
{{/each}}

---
{{/each}}
`;