import { useCallback, useEffect, useRef } from "react"

export default function useFallbackImageInSSR(fallbackSrc) {
    const ref = useRef(null)
  
    /**
     * Error happened / catched after hydration
     */
    const onError = useCallback(
      e => { e.target.src = fallbackSrc }, [fallbackSrc],
    )
  
    /**
     * Error happened before hydration, but catched after hydration
     */
    useEffect(() => {
      if (ref && ref.current) {
        const { complete, naturalHeight } = ref.current
        const errorLoadingImgBeforeHydration = complete && naturalHeight === 0
  
        if (errorLoadingImgBeforeHydration) {
          ref.current.src = fallbackSrc
        }
      }
    }, [fallbackSrc])
  
    return {
      ref,
      onError,
    }
  }