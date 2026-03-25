export default function Icon() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return <img src={`${base}/cmsy_logo.svg`} alt="cmsy logo" style={{ height: '24px' }} />
}
