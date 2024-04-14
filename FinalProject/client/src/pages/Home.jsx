import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import './Home.css'

export function Home() {
  const [searchParams] = useSearchParams()



  useEffect(() => {

  }, [searchParams.get("page")])

  return (
    <div>
      <div>
      </div>
    </div>
  )
}