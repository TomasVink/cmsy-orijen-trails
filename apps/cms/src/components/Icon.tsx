export default function Icon() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return (
    <img
      src="https://cmsy-assets.s3.eu-central-1.amazonaws.com/cmsy_logo.svg"
      alt="cmsy logo"
      style={{ height: '24px' }}
    />
  )
}
