import { Toolkit } from 'actions-toolkit'
import { ReadmeBox } from 'readme-box'
import Parser from 'rss-parser'
const parser = new Parser()

const MAX_ITEMS = 30

Toolkit.run(async tools => {
  // Fetch feed
  const feed = await parser.parseURL(process.env.FEED_URL)

  // Create our new list
  const newString = feed.items
    .slice(0, MAX_ITEMS)
    .map(item => `* [${item.title}](${item.link})`).join('\n')

  // Update the section of our README
  await ReadmeBox.updateSection(newString, {
    ...tools.context.repo,
    token: tools.token,
    section: 'feed'
  })
}, {
  secrets: ['GITHUB_TOKEN', 'FEED_URL']
})