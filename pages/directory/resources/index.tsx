import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Resource<NextPage>() {

    const router = useRouter()

    useEffect(() => {router.push("/directory/resources/plugin")}, [])

    return <div>Loading...</div>
}

