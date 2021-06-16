const printCard = card => `
- ${card}
`;

const printTiles = tile => `
## ${tile.title}
${tile.description}
${tile.children.map(card => printCard(card)).join('')}
`;

export const markdown = (canvas) => `class: center, middle, inverse
# ${canvas.name}
${canvas.description}
---
${canvas.children.map(tile => printTiles(tile)).join('---')}
`;