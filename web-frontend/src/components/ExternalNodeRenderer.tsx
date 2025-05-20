import React, { useEffect, useState } from 'react'
import { LiveProvider, LiveError, LivePreview } from 'react-live'

type Props = {
  filePath: string,
  scope: any
}

export default function ExternalNodeRenderer({ filePath, scope }: Props) {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!filePath) return

    setLoading(true)
    fetch(`http://192.168.0.28:3100/load-node?filePath=${filePath}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setCode(null)
        } else {
          setCode(data.code)
          setError(null)
        }
      })
      .catch((e) => {
        setError(e.message)
        setCode(null)
      })
      .finally(() => setLoading(false))
  }, [filePath])

  if (loading) return <div>Loading external node...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!code) return <div>No code to display</div>

  // react-live wymaga, żeby kod eksportował komponent funkcyjny JSX
  // przykładowy plik na dysku powinien wyglądać np tak:
  // () => <div style={{ padding: 10, border: '1px solid green' }}>Hello from external node!</div>

  return (
    <LiveProvider code={code} noInline={false} scope={{ React, ...scope }}>
      <LivePreview />
      <LiveError />
    </LiveProvider>
  )
}