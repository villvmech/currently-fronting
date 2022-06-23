import { resizeMedia } from '../utils/discord-cdn-handling'

interface CardBannerProps {
  banner: string
  name: string
  children?: React.ReactNode
}

const CardBanner = (props: CardBannerProps) => {
  const { banner, children, name } = props
  const resizedBannerURL = resizeMedia(banner, [600, 240])

  return children ? (
    <div
      className='h-52 min-w-full mx-auto rounded p-2 bg-no-repeat bg-center bg-cover flex flex-row place-content-center'
      style={{ backgroundImage: `url(${resizedBannerURL})` }}>
      <div className='bg-slate-300/80 dark:bg-slate-600/80 m-auto max-w-fit max-h-fit p-2 rounded'>
        {children}
      </div>
    </div>
  ) : (
    <img
      className='h-48 min-w-full object-cover mx-auto rounded'
      src={resizedBannerURL}
      alt={`Banner for ${name}`}
      width={600}
      height={240}
    />
  )
}

export default CardBanner
