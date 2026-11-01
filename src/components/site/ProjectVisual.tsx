import type { DiagramLabels, ProjectVisual as VisualKind } from "@/content/content";
import { cn } from "@/lib/utils";

/**
 * Anonymized schematics drawn from the project descriptions only (no real
 * screenshots, hosts or names). All colors come from design tokens.
 */

type Tone = "default" | "accent" | "dashed" | "soft";

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  sub?: string;
  tone?: Tone;
  size?: number;
}

function Node({ x, y, w, h, label, sub, tone = "default", size = 16 }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={5}
        className={cn(
          "fill-diagram-fill",
          tone === "accent" && "stroke-primary",
          tone === "soft" && "stroke-border-strong",
          (tone === "default" || tone === "dashed") && "stroke-diagram-line",
        )}
        strokeWidth={tone === "accent" ? 2 : 1.5}
        strokeDasharray={tone === "dashed" ? "6 5" : undefined}
      />
      {label ? (
        <text
          x={x + w / 2}
          y={sub ? y + h / 2 - 9 : y + h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size}
          className="fill-foreground font-mono"
        >
          {label}
        </text>
      ) : null}
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size - 3}
          className="fill-muted-foreground font-mono"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Wire({ d, accent, dashed }: { d: string; accent?: boolean; dashed?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      strokeWidth={accent ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "5 5" : undefined}
      className={accent ? "stroke-primary" : "stroke-diagram-line"}
    />
  );
}

type Dir = "right" | "left" | "down" | "up";

/** Arrowhead whose tip sits at (x, y). */
function Head({ x, y, dir, accent }: { x: number; y: number; dir: Dir; accent?: boolean }) {
  const s = 7;
  const points: Record<Dir, string> = {
    right: `${x},${y} ${x - s * 1.4},${y - s} ${x - s * 1.4},${y + s}`,
    left: `${x},${y} ${x + s * 1.4},${y - s} ${x + s * 1.4},${y + s}`,
    down: `${x},${y} ${x - s},${y - s * 1.4} ${x + s},${y - s * 1.4}`,
    up: `${x},${y} ${x - s},${y + s * 1.4} ${x + s},${y + s * 1.4}`,
  };
  return (
    <polygon points={points[dir]} className={accent ? "fill-primary" : "fill-diagram-line"} />
  );
}

function Caption({
  x,
  y,
  children,
  anchor = "start",
  size = 14,
  accent,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  accent?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={size}
      className={cn("font-mono", accent ? "fill-primary" : "fill-muted-foreground")}
    >
      {children}
    </text>
  );
}

function EphemeralDiagram({ l }: { l: DiagramLabels["ephemeral"] }) {
  const pipelines = [
    { n: "01", label: l.create, y: 72 },
    { n: "02", label: l.extend, y: 134 },
    { n: "03", label: l.cleanup, y: 196 },
  ];
  return (
    <>
      <Caption x={40} y={52}>
        {l.pipelines}
      </Caption>
      {pipelines.map((p, i) => (
        <g key={p.n}>
          <rect
            x={40}
            y={p.y}
            width={190}
            height={50}
            rx={5}
            strokeWidth={i === 0 ? 2 : 1.5}
            className={cn("fill-diagram-fill", i === 0 ? "stroke-primary" : "stroke-diagram-line")}
          />
          <Caption x={58} y={p.y + 25} size={13}>
            {p.n}
          </Caption>
          <text
            x={90}
            y={p.y + 25}
            dominantBaseline="central"
            fontSize={16}
            className="fill-foreground font-mono"
          >
            {p.label}
          </text>
        </g>
      ))}
      <Wire d="M230 97 H262 M230 159 H262 M230 221 H262 M262 97 V221" />
      <Wire d="M262 159 H292" accent />
      <Head x={300} y={159} dir="right" accent />

      <Wire d="M135 246 V282" dashed />
      <Node x={40} y={282} w={190} h={62} label={l.agent} sub={`Docker · ${l.vault}`} size={15} tone="dashed" />

      <rect
        x={300}
        y={40}
        width={310}
        height={320}
        rx={8}
        strokeWidth={1.5}
        strokeDasharray="7 6"
        className="fill-none stroke-diagram-line"
      />
      <Caption x={322} y={66} size={14}>
        {l.namespace}
      </Caption>
      <Node x={322} y={88} w={266} h={50} label={l.templates} size={15} />
      <Wire d="M455 138 V160" />
      <Head x={455} y={168} dir="down" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x={338 + i * 50}
            y={174}
            width={34}
            height={34}
            rx={4}
            strokeWidth={1.5}
            className={cn(i === 0 ? "fill-primary stroke-primary" : "fill-diagram-fill stroke-diagram-line")}
          />
          <rect
            x={348 + i * 50}
            y={184}
            width={14}
            height={14}
            rx={2}
            className={i === 0 ? "fill-diagram-fill" : "fill-border-strong"}
          />
        </g>
      ))}
      <Node x={322} y={232} w={100} h={48} label={l.dns} size={15} />
      <Node x={436} y={232} w={152} h={48} label={l.storage} size={15} />
      <Caption x={322} y={318} size={13}>
        TTL
      </Caption>
      <rect x={360} y={314} width={228} height={6} rx={3} className="fill-border" />
      <rect x={360} y={314} width={136} height={6} rx={3} className="fill-primary" />
      <circle cx={496} cy={317} r={6} strokeWidth={2} className="fill-diagram-fill stroke-primary" />
    </>
  );
}

function CityBusDiagram({ l }: { l: DiagramLabels["citybus"] }) {
  const services = [l.tracking, l.ticketing, l.schedules, l.subscriptions];
  const xs = [32, 180, 328, 476];
  return (
    <>
      <Node x={32} y={44} w={170} h={60} label={l.web} size={16} />
      <Node x={262} y={44} w={150} h={60} label={l.gateway} size={16} tone="accent" />
      <Node x={462} y={44} w={146} h={60} label={l.discovery} size={15} tone="dashed" />
      <Wire d="M204 64 H250" />
      <Head x={258} y={64} dir="right" />
      <Wire d="M258 86 H212" accent />
      <Head x={204} y={86} dir="left" accent />
      <Wire d="M412 74 H462" dashed />
      <Caption x={32} y={126} size={13}>
        REST · JWT
      </Caption>
      <Caption x={202} y={126} size={13} anchor="end" accent>
        {`WebSocket · ${l.realtime}`}
      </Caption>

      <Wire d="M337 104 V150 M98 150 H542" />
      {xs.map((x) => (
        <g key={x}>
          <Wire d={`M${x + 66} 150 V176`} />
          <Head x={x + 66} y={184} dir="down" />
        </g>
      ))}
      {services.map((label, i) => (
        <Node key={label} x={xs[i] ?? 0} y={184} w={132} h={58} label={label} size={15} />
      ))}
      {xs.map((x) => (
        <g key={`k${x}`}>
          <Wire d={`M${x + 66} 242 V296`} accent />
          <circle cx={x + 66} cy={296} r={4} className="fill-primary" />
        </g>
      ))}
      <rect
        x={32}
        y={296}
        width={576}
        height={50}
        rx={6}
        strokeWidth={2}
        className="fill-diagram-fill stroke-primary"
      />
      <text
        x={320}
        y={321}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
        className="fill-foreground font-mono"
      >
        {l.bus}
      </text>
      <Caption x={608} y={374} size={13} anchor="end">
        Terraform · GitHub Actions
      </Caption>
    </>
  );
}

function WaterWatchDiagram({ l }: { l: DiagramLabels["waterwatch"] }) {
  const models = ["NDWI", "Sen2Coral", "Cyanonet"];
  return (
    <>
      {/* Satellite */}
      <g>
        <rect x={40} y={98} width={42} height={18} rx={2} strokeWidth={1.5} className="fill-diagram-fill stroke-diagram-line" />
        <rect x={118} y={98} width={42} height={18} rx={2} strokeWidth={1.5} className="fill-diagram-fill stroke-diagram-line" />
        <Wire d="M54 98 V116 M68 98 V116 M132 98 V116 M146 98 V116 M82 107 H86 M114 107 H118" />
        <rect x={86} y={90} width={28} height={34} rx={3} strokeWidth={2} className="fill-diagram-fill stroke-primary" />
        <circle cx={100} cy={107} r={5} className="fill-primary" />
      </g>
      <Caption x={100} y={150} anchor="middle" size={15}>
        {l.satellite}
      </Caption>
      <Wire d="M100 170 V225 H190" dashed accent />
      <Head x={198} y={225} dir="right" accent />

      <Node x={200} y={196} w={176} h={58} label={l.api} sub="REST · JWT" size={16} />

      <Caption x={430} y={44} size={14}>
        {l.models}
      </Caption>
      {models.map((m, i) => (
        <Node key={m} x={430} y={64 + i * 54} w={178} h={42} label={m} size={15} />
      ))}
      <Wire d="M376 225 H404 M404 85 V225 M404 85 H422 M404 139 H422 M404 193 H422" />
      <Head x={430} y={85} dir="right" />
      <Head x={430} y={139} dir="right" />
      <Head x={430} y={193} dir="right" />

      <Wire d="M288 254 V276" />
      <Head x={288} y={284} dir="down" />
      <Wire d="M519 232 V276" />
      <Head x={519} y={284} dir="down" />

      {/* Dashboard */}
      <rect x={200} y={284} width={408} height={92} rx={5} strokeWidth={1.5} className="fill-diagram-fill stroke-diagram-line" />
      <text x={218} y={306} dominantBaseline="central" fontSize={14} className="fill-foreground font-mono">
        {l.dashboard}
      </text>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={444 + i * 54}
          y={298}
          width={46}
          height={16}
          rx={3}
          className={i === 0 ? "fill-primary" : "fill-border"}
        />
      ))}
      <Wire d="M200 324 H608" />
      <polyline
        points="220,362 262,350 304,356 346,338 388,344 430,332 472,340 514,342 556,336 590,340"
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
        className="stroke-primary"
      />
    </>
  );
}

function CloudInfraGenDiagram({ l }: { l: DiagramLabels["cloudinfragen"] }) {
  const leftBars = [170, 148, 176, 112, 160];
  return (
    <>
      <rect x={28} y={36} width={584} height={328} rx={8} strokeWidth={1.5} className="fill-diagram-fill stroke-diagram-line" />
      <Wire d="M28 72 H612" />
      {[50, 68, 86].map((cx) => (
        <circle key={cx} cx={cx} cy={54} r={5} className="fill-border-strong" />
      ))}
      <Caption x={110} y={54} size={14}>
        {l.editor}
      </Caption>

      {/* Natural language pane */}
      <rect x={52} y={96} width={212} height={244} rx={4} strokeWidth={1.5} className="fill-none stroke-border-strong" />
      <Caption x={68} y={120} size={13}>
        {l.prompt}
      </Caption>
      {leftBars.map((w, i) => (
        <rect key={i} x={68} y={146 + i * 22} width={w} height={8} rx={4} className="fill-border-strong" />
      ))}

      <Wire d="M264 218 H282" />
      <Head x={290} y={218} dir="right" />
      <Node x={292} y={192} w={56} h={52} label={l.model} size={15} tone="accent" />
      <Wire d="M348 218 H366" accent />
      <Head x={374} y={218} dir="right" accent />

      {/* Terraform pane */}
      <rect x={376} y={96} width={212} height={244} rx={4} strokeWidth={1.5} className="fill-none stroke-border-strong" />
      <text x={392} y={120} dominantBaseline="central" fontSize={13} className="fill-foreground font-mono">
        {l.output}
      </text>
      <rect x={392} y={132} width={52} height={2} className="fill-primary" />
      {[
        { y: 158, kw: true },
        { y: 182, indent: true, w: 110 },
        { y: 204, indent: true, w: 136 },
        { y: 226, close: true },
        { y: 256, kw: true },
        { y: 280, indent: true, w: 96 },
        { y: 302, close: true },
      ].map((line) => (
        <g key={line.y}>
          {line.kw ? (
            <>
              <text x={392} y={line.y} dominantBaseline="central" fontSize={13} className="fill-primary font-mono">
                resource
              </text>
              <rect x={462} y={line.y - 4} width={84} height={8} rx={4} className="fill-border-strong" />
              <text x={556} y={line.y} dominantBaseline="central" fontSize={13} className="fill-foreground font-mono">
                {"{"}
              </text>
            </>
          ) : null}
          {line.indent ? (
            <rect x={412} y={line.y - 4} width={line.w} height={8} rx={4} className="fill-border-strong" />
          ) : null}
          {line.close ? (
            <text x={392} y={line.y} dominantBaseline="central" fontSize={13} className="fill-foreground font-mono">
              {"}"}
            </text>
          ) : null}
        </g>
      ))}
    </>
  );
}

interface ProjectVisualProps {
  visual: VisualKind;
  labels: DiagramLabels;
  alt: string;
  className?: string;
}

export function ProjectVisual({ visual, labels, alt, className }: ProjectVisualProps) {
  return (
    <div className={cn("diagram-surface overflow-hidden", className)}>
      <svg
        viewBox="0 0 640 400"
        role="img"
        aria-label={alt}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
      >
        {visual === "ephemeral" ? <EphemeralDiagram l={labels.ephemeral} /> : null}
        {visual === "citybus" ? <CityBusDiagram l={labels.citybus} /> : null}
        {visual === "waterwatch" ? <WaterWatchDiagram l={labels.waterwatch} /> : null}
        {visual === "cloudinfragen" ? <CloudInfraGenDiagram l={labels.cloudinfragen} /> : null}
      </svg>
    </div>
  );
}
