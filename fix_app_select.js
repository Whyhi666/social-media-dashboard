const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "import { mockTeamMembers,",
  "import { mockOrganization,"
);

content = content.replace(
  "import { TaskProgressTable } from './components/TaskProgressTable';",
  "import { TaskProgressTable } from './components/TaskProgressTable';\nimport { MemberSelect } from './components/MemberSelect';"
);

content = content.replace(
  "const [selectedMemberId, setSelectedMemberId] = useState<string>('all');",
  "const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(mockOrganization.flatMap(d => d.children.map(c => c.id)));"
);

content = content.replace(
  /onClick=\{\(\) => \{ setViewMode\('self'\); setSelectedMemberId\('all'\); \}\}/,
  "onClick={() => { setViewMode('self'); setSelectedMemberIds(mockOrganization.flatMap(d => d.children.map(c => c.id))); }}"
);

content = content.replace(
  /onClick=\{\(\) => \{ setViewMode\('team'\); setSelectedMemberId\('all'\); \}\}/,
  "onClick={() => { setViewMode('team'); setSelectedMemberIds(mockOrganization.flatMap(d => d.children.map(c => c.id))); }}"
);

content = content.replace(
  /<select[\s\S]*?setSelectedMemberId\(e.target.value\)[\s\S]*?<\/select>/,
  "<MemberSelect selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} />"
);

content = content.replace(
  /<TeamWorkloadChart role=\{role\} \/>/,
  "<TeamWorkloadChart role={role} selectedMemberIds={selectedMemberIds} />"
);

// We also need to fix stats logic:
content = content.replace(
  /if \(selectedMemberId === 'u2'\) \{[\s\S]*?\} else if \(selectedMemberId === 'u3'\) \{[\s\S]*?\}/,
  `if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u2') {
      influencerStats = mockInfluencerStatsU2;
      workflowStats = mockWorkflowStatsU2;
    } else if (selectedMemberIds.length === 1 && selectedMemberIds[0] === 'u3') {
      influencerStats = mockInfluencerStatsU3;
      workflowStats = mockWorkflowStatsU3;
    }`
);


fs.writeFileSync('src/App.tsx', content, 'utf-8');
