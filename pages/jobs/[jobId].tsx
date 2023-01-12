import { useRouter } from 'next/router'

const Job = () => {
  const router = useRouter()
  const { jobId } = router.query

  return <p>Job: {jobId}</p>
}

export default Job