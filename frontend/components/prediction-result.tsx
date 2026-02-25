"use client"

import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  HelpCircle,
  Activity,
} from "lucide-react"

interface PredictionResponse {
  condition: string
  confidence: number
  dos?: string[]
  dont?: string[]
  urgent?: boolean
  message?: string
  disclaimer: string
}

function ConfidenceMeter({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100)
  let color = "bg-success"
  if (pct < 40) color = "bg-warning"
  if (pct < 25) color = "bg-destructive"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-muted-foreground">Confidence</span>
        <span className="font-bold text-foreground">{pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

const conditionInfo: Record<
  string,
  { color: string; bgColor: string; borderColor: string; icon: typeof Activity; description: string }
> = {
  Eczema: {
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    icon: Activity,
    description:
      "A common inflammatory skin condition that causes dry, itchy, and inflamed patches.",
  },
  Melanocytic_Nevi: {
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    icon: Activity,
    description:
      "Commonly known as moles. Usually benign growths that should be monitored for changes.",
  },
  Melanoma: {
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    icon: ShieldAlert,
    description:
      "A serious form of skin cancer. Immediate consultation with a dermatologist is strongly recommended.",
  },
  Uncertain: {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
    icon: HelpCircle,
    description: "",
  },
}

export function PredictionResult({ result }: { result: PredictionResponse }) {
  const info = conditionInfo[result.condition] || conditionInfo.Uncertain

  // Uncertain / Low confidence
  if (result.condition === "Uncertain") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Uncertain Result
            </h3>
            <p className="text-sm text-muted-foreground">
              Confidence: {Math.round(result.confidence * 100)}%
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {result.message ||
            "The model could not confidently identify this condition. Please consult a dermatologist for an accurate diagnosis."}
        </p>
      </div>
    )
  }

  const Icon = info.icon

  return (
    <div className="space-y-6">
      {/* Urgent banner */}
      {result.urgent && (
        <div className="animate-pulse-ring flex items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
          <ShieldAlert className="h-6 w-6 shrink-0 text-destructive" />
          <div>
            <p className="text-sm font-bold text-destructive">
              Urgent: Potential Melanoma Detected
            </p>
            <p className="text-xs text-destructive/80">
              Please consult a dermatologist immediately. Do not delay.
            </p>
          </div>
        </div>
      )}

      {/* Main result card */}
      <div
        className={`overflow-hidden rounded-2xl border ${info.borderColor} bg-card shadow-md`}
      >
        <div className={`${info.bgColor} p-6`}>
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${info.bgColor} ${info.color}`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Detected Condition
              </p>
              <h3 className={`text-2xl font-bold ${info.color}`}>
                {result.condition.replace(/_/g, " ")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {info.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <ConfidenceMeter confidence={result.confidence} />
        </div>
      </div>

      {/* Do's and Don'ts */}
      {result.dos && result.dos.length > 0 && result.dont && result.dont.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Do's */}
          <div className="rounded-2xl border border-success/30 bg-success/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <h4 className="text-base font-bold text-success">{"Do's"}</h4>
            </div>
            <ul className="space-y-3">
              {result.dos.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success/70" />
                  <span className="text-sm leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div className="mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              <h4 className="text-base font-bold text-destructive">{"Don'ts"}</h4>
            </div>
            <ul className="space-y-3">
              {result.dont.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                  <span className="text-sm leading-relaxed text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
