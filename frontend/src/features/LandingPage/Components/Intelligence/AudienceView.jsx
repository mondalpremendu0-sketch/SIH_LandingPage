export function AudienceView({ active }) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={`intelligence-visual intelligence-visual-audience ${active ? "is-active" : ""}`}
      aria-label="Audience distribution illustration"
      role="img"
    >
      <g className="audience-graph">
        <text x="24" y="44">
          AGE
        </text>
        <rect x="110" y="44" width="280" height="12" rx="6" />
        <rect x="110" y="72" width="300" height="12" rx="6" />
        <rect x="110" y="100" width="218" height="12" rx="6" />
        <rect x="110" y="128" width="94" height="12" rx="6" />
        <text x="412" y="54">
          32%
        </text>
        <text x="412" y="82">
          41%
        </text>
        <text x="412" y="110">
          19%
        </text>
        <text x="412" y="138">
          8%
        </text>

        <text x="24" y="196">
          LANGUAGE
        </text>
        <text x="110" y="196">
          ENGLISH
        </text>
        <text x="360" y="196">
          64%
        </text>
        <text x="110" y="220">
          HINDI
        </text>
        <text x="360" y="220">
          21%
        </text>
        <text x="110" y="244">
          BENGALI
        </text>
        <text x="360" y="244">
          8%
        </text>
        <text x="110" y="268">
          OTHER
        </text>
        <text x="360" y="268">
          7%
        </text>
      </g>
      <g className="audience-region">
        <text x="24" y="318">
          REGION
        </text>
        <text x="120" y="318">
          NORTH
        </text>
        <text x="220" y="318">
          EAST
        </text>
        <text x="315" y="318">
          WEST
        </text>
        <text x="400" y="318">
          SOUTH
        </text>
      </g>
      <g className="audience-meta">
        <text x="420" y="336">
          AGGREGATED SIGNALS
        </text>
      </g>
    </svg>
  );
}
