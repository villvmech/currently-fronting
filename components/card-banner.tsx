interface CardBannerProps {
  banner: string
  children?: React.ReactNode
}

const CardBanner = (props: CardBannerProps) => {
  const { banner, children } = props

  return children ? (
    <div
      className='h-52 min-w-full mx-auto rounded p-2 bg-no-repeat bg-center bg-cover flex flex-row place-content-center'
      style={{ backgroundImage: `url(${banner})` }}>
      <div className='bg-slate-300/80 dark:bg-slate-600/80 m-auto max-w-fit max-h-fit p-2 rounded'>
        {children}
      </div>
    </div>
  ) : (
    <img
      className='max-h-48 object-cover mx-auto rounded'
      src={banner}
      alt={`Banner for ${name}`}
      width={600}
      height={240}
    />
  )
}

export default CardBanner
