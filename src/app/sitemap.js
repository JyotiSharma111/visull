export default function sitemap() {
  return [
    { url:'https://visull.com', lastModified:new Date(), changeFrequency:'weekly', priority:1 },
    { url:'https://visull.com/#tools', lastModified:new Date(), changeFrequency:'monthly', priority:0.8 },
    { url:'https://visull.com/#why', lastModified:new Date(), changeFrequency:'monthly', priority:0.6 },
    { url:'https://visull.com/#faq', lastModified:new Date(), changeFrequency:'monthly', priority:0.7 },
  ]
}
