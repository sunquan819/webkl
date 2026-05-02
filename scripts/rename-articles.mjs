import fs from 'fs';
import path from 'path';

const blogDir = './src/content/blog';

const titleToSlug = {
  'AI Agent到底是什么？聊聊这个新概念': 'ai-agent-explained',
  'ChatGPT Claude到底怎么选？我日常使用的真实对比': 'chatgpt-vs-claude',
  'Claude写文章比我写得还好？聊聊AI写作这件事': 'claude-writing-experience',
  '不想花钱也能用AI？我的省钱经验分享': 'free-ai-usage',
  '大模型能学会专业技能吗？聊聊AI Skills': 'ai-skills-professional',
  '我用过的几个AI模型厂商，聊聊各自特点': 'ai-models-vendors-review',
  '聊聊AI大模型：新手入门那些事儿': 'ai-models-beginners',
  '美股期权基础入门：从零开始理解期权交易': 'options-trading-basics',
  '2026年最值得关注的10只美股ETF': 'best-us-etfs-2026',
  '普通人怎么定投ETF？一个简单到不需要脑子操作': 'simple-etf-investing',
  '美股ETF入门指南：新手投资的第一步': 'us-etf-beginners-guide',
  '美股ETF投资：我踩过的坑和学到的经验': 'etf-investment-mistakes',
  '期权交易实战：如何用Covered Call增加股票收益': 'covered-call-strategy',
  '新手理财入门指南：从零开始建立你的财富体系': 'beginner-finance-guide',
  '减肥不用饿肚子：我是这样三个月瘦了20斤的': 'weight-loss-3-months',
  '健康减肥指南：不节食也能瘦的科学方法': 'healthy-weight-loss-guide',
  '焦虑失眠怎么办？我试过的那些有用和没用的方法': 'anxiety-insomnia-solutions',
  '改善睡眠质量的7个科学方法：告别失眠': 'improve-sleep-quality',
  '月薪5000怎么攒钱？我试了三年的真实结果': 'saving-with-5000-salary',
  '省钱攻略：月薪5000如何攒下10万存款': 'saving-100k-with-5000',
  '副业赚钱：我从零开始月赚5000的真实路子': 'side-income-guide',
  '旅行省钱终极攻略：怎么用最少的钱玩最好的地方': 'travel-money-saving',
  '国内旅行省钱攻略：如何用最少的钱玩最多的景点': 'domestic-travel-saving',
  '远程工作效率翻倍：我在家工作三年的经验总结': 'remote-work-efficiency',
  '5道15分钟快手早餐：上班族的营养早晨': 'quick-breakfast-recipes',
  '冰箱收纳终极指南：食物保鲜时间与存放位置': 'fridge-organization',
  '每天喝水的最佳时间表：科学饮水指南': 'daily-water-guide',
  '10个让你家瞬间整洁的收纳妙招': 'home-organization-tips',
};

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} files`);

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const titleMatch = content.match(/^title:\s*"(.+)"\s*$/m);
  if (titleMatch) {
    const title = titleMatch[1];
    const slug = titleToSlug[title];
    
    if (slug) {
      const newPath = path.join(blogDir, `${slug}.md`);
      if (file !== `${slug}.md`) {
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${file} -> ${slug}.md`);
      }
    } else {
      console.log(`No mapping for: ${title}`);
    }
  }
}

console.log('Done!');