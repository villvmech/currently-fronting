const discordCDNAttachmentRegex =
  /^https:\/\/cdn\.discordapp\.com\/attachments\/(.+)$/i

const resizeMedia = (
  mediaURL: string,
  width: number,
  height: number,
  format: string,
) =>
  mediaURL.replace(
    discordCDNAttachmentRegex,
    `https://media.discordapp.net/attachments/$1?width=${width.toString()}&height=${height.toString()}&format=${format}`,
  )

export { resizeMedia }
