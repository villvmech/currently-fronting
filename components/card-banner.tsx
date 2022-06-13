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
      width={600}
      height={240}
    />
  )
}

export default CardBanner
