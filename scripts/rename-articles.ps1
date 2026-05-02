# Rename Chinese articles to English filenames

$mapping = @{
    "AI Agent到底是什么.md" = "ai-agent-explained.md"
    "ChatGPT Claude日常使用对比.md" = "chatgpt-vs-claude.md"
    "Claude写作一年真实感受.md" = "claude-writing-experience.md"
    "不想花钱也能用AI省钱经验.md" = "free-ai-usage.md"
    "大模型能学会专业技能吗.md" = "ai-skills-professional.md"
    "我用过的几个AI模型厂商.md" = "ai-models-vendors-review.md"
    "聊聊AI大模型新手入门.md" = "ai-models-beginners.md"
    "美股期权基础入门.md" = "options-trading-basics.md"
    "2026最值得关注的美股ETF.md" = "best-us-etfs-2026.md"
    "普通人ETF定投简单方法.md" = "simple-etf-investing.md"
    "美股ETF入门指南.md" = "us-etf-beginners-guide.md"
    "美股ETF投资踩坑经验.md" = "etf-investment-mistakes.md"
    "期权交易实战Covered Call策略.md" = "covered-call-strategy.md"
    "新手理财入门指南.md" = "beginner-finance-guide.md"
    "减肥不用饿肚子真实经历.md" = "weight-loss-3-months.md"
    "健康减肥指南.md" = "healthy-weight-loss-guide.md"
    "焦虑失眠怎么办真实经历.md" = "anxiety-insomnia-solutions.md"
    "改善睡眠质量.md" = "improve-sleep-quality.md"
    "月薪5000攒钱三年实战.md" = "saving-with-5000-salary.md"
    "省钱攻略月薪5000攒10万.md" = "saving-100k-with-5000.md"
    "副业赚钱从零开始.md" = "side-income-guide.md"
    "旅行省钱终极攻略.md" = "travel-money-saving.md"
    "国内旅行省钱攻略.md" = "domestic-travel-saving.md"
    "远程工作效率翻倍经验.md" = "remote-work-efficiency.md"
    "快手早餐.md" = "quick-breakfast-recipes.md"
    "冰箱收纳指南.md" = "fridge-organization.md"
    "科学饮水指南.md" = "daily-water-guide.md"
    "10-收纳妙招.md" = "home-organization-tips.md"
}

$blogDir = "D:\code\webkl\src\content\blog"

foreach ($item in $mapping.GetEnumerator()) {
    $oldPath = Join-Path $blogDir $item.Key
    $newPath = Join-Path $blogDir $item.Value
    
    if (Test-Path $oldPath) {
        Move-Item -Path $oldPath -Destination $newPath -Force
        Write-Host "Renamed: $($item.Key) -> $($item.Value)"
    } else {
        Write-Host "Not found: $($item.Key)"
    }
}

Write-Host "Done!"