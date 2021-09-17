import { useRouter } from 'next/router'

export default function ExampleChar() {
    const router = useRouter()
    const { exid } = router.query

    return <h1>Hello {exid} </h1>
}

