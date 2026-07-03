const fs = require('fs');
let content = fs.readFileSync('src/components/TeamWorkloadChart.tsx', 'utf-8');
const namesToIds = {
  '张三': 'u1',
  '李四': 'u2',
  '王五': 'u3',
  '赵六': 'u4',
  '孙七': 'u5',
  '周八': 'u6',
  '吴九': 'u7',
  '郑十': 'u8',
  '钱一': 'u9',
  '陈二': 'u10',
};

content = content.replace(/\{\s*name: "(.*?)",/g, (match, name) => {
  return '{ id: "' + namesToIds[name] + '", name: "' + name + '",';
});

content = content.replace(/interface TeamWorkloadChartProps \{[\s\S]*?\}/, 'interface TeamWorkloadChartProps {\n  role?: "media" | "marketing";\n  selectedMemberIds?: string[];\n}');

content = content.replace(/const data = isMedia \? mediaData : marketData;/, 'const baseData = isMedia ? mediaData : marketData;\n  const data = selectedMemberIds && selectedMemberIds.length > 0 \n    ? baseData.filter(d => selectedMemberIds.includes(d.id))\n    : baseData;');

fs.writeFileSync('src/components/TeamWorkloadChart.tsx', content, 'utf-8');
