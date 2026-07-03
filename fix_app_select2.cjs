const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const allIdsStr = "mockOrganization.flatMap(d => d.children.map(c => c.id))";

content = content.replace(
  "if (selectedMemberId === 'all') {",
  "if (selectedMemberIds.length === mockOrganization.flatMap(d => d.children.map(c => c.id)).length) {"
);

content = content.replace(
  "} else if (selectedMemberId === 'u1') {",
  "} else if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u1') {"
);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
