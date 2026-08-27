export function GlassBadge({
  children,
  icon: Icon,
  variant = "neutral",
  dot = false,
  pulse = false,
  className = "",
  ...props
}) {
  return (
    <span
      className={`glass-badge glass-badge-${variant} ${className}`}
      {...props}
    >
      {dot && (
        <span className="glass-badge-dot-wrap">
          <span className={`glass-badge-dot ${pulse ? "is-pulsing" : ""}`} />
          {pulse && <span className="glass-badge-dot-ring" />}
        </span>
      )}
      {Icon && <Icon className="glass-badge-icon" size={13} />}
      <span className="glass-badge-text">{children}</span>
    </span>
  );
}
