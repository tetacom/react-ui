import * as React from 'react'
import useResizeObserver from '@react-hook/resize-observer'

export const useSize = (target: React.RefObject<any>) => {
    const [size, setSize] = React.useState(new DOMRect())

    React.useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}