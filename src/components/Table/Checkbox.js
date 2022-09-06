//This Component is solely made bc it was required as per react-table docs. Refer to YT for further queries

import React from 'react'
export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
        <input type='checkbox' ref={resolvedRef} {...rest} />
    )
})