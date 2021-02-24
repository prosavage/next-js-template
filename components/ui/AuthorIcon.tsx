import { useRouter } from "next/router";
import styled from "styled-components"
import { User } from "../../types/User"
import { getAuthorIconURL, getResourceIconURL } from "../../util/cdn"
import useFallbackImageInSSR from "../../util/UseFallbackImageInSRR"

export default function AuthorIcon(props: { user: User, size: string }) {

  const router = useRouter();
  // https://marketplace-savagelabs.b-cdn.net/resources/5fe543e4617b45c9499e40d1/icon.png
  // const fallback = "https://marketplace-savagelabs.b-cdn.net/defaults/default-user.svg"
  const fallback = `/marketplace/static/defaults/default-user.svg`
  const fallbackImageProps = useFallbackImageInSSR(fallback)
  return <img style={{borderRadius: "50%"}} src={props.user?.hasIcon ? getAuthorIconURL(props.user._id) : fallback} alt="" width={props.size} height={props.size}
  {...fallbackImageProps}
  />
}


