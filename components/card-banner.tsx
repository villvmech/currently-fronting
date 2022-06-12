interface CardBannerProps {
  name: string
  banner: string
}

const CardBanner = (props: CardBannerProps) => {
  const { name, banner } = props

  return (
    <img
      className='max-h-48 object-cover mx-auto rounded'
      src={banner}
      alt={`Banner for ${name}`}
      width={1100}
      height={440}
    />
  )
}

export default CardBanner
