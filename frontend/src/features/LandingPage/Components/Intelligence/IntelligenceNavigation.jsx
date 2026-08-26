export function IntelligenceNavigation({ activeId, onChange, items }) {
  return (
    <nav
      className="intelligence-navigation"
      aria-label="Intelligence capabilities"
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`intelligence-tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`intelligence-panel-${item.id}`}
            className={`intelligence-nav-item ${isActive ? "is-active" : ""}`}
            onClick={() => onChange(item.id)}
          >
            <span className="intelligence-number">{item.number}</span>
            <span className="intelligence-name">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
