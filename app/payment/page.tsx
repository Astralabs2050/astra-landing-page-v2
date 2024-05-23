import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Payment() {
  const router = useRouter()
  const { jobId, applicantId } = router.query

  // useEffect(() => {
  //   if (jobId && applicantId) {
  //     // Fetch payment details here
  //     async function fetchData() {
  //       try {
  //         // Replace with your actual API call
  //         const response = await fetch(
  //           `/api/payment-details?jobId=${jobId}&applicantId=${applicantId}`,
  //         )
  //         const result = await response.json()
  //         setData(result)
  //       } catch (err) {
  //         setError(err.message)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     fetchData()
  //   }
  // }, [jobId, applicantId])

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Job ID: {jobId}</p>
      <p>Applicant ID: {applicantId}</p>
      {/* Render payment details */}
    </div>
  )
}
