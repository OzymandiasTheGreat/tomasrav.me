import { useEffect, useState } from "react"

const OWNER = "OzymandiasTheGreat"

export const useStars = (repository: string, owner: string = OWNER): number => {
  const [stars, setStars] = useState(0)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repository}`, {
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((response) => response.json())
      .then((repo) => setStars(repo.stargazers_count))
      .catch((err) => console.error(err))
  }, [])

  return stars
}
