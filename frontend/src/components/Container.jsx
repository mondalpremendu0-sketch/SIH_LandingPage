export function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`container ${className}`} {...props}>
      {children}
    </Element>
  )
}
