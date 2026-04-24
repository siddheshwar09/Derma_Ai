"use client"

import { MapPin, Stethoscope, Building2 } from "lucide-react"

interface Doctor {
  name: string
  speciality: string
  address: string
  is_derm: boolean
}

export function NearbyDoctors({ doctors }: { doctors: Doctor[] }) {
  if (!doctors || doctors.length === 0) return null

  return (
    <div className="space-y-3">
      <h4 className="text-base font-bold text-foreground">
        Nearby Dermatologists &amp; Clinics
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {doctors.map((doc, i) => (
          <div
            key={i}
            className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  doc.is_derm
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {doc.is_derm ? (
                  <Stethoscope className="h-5 w-5" />
                ) : (
                  <Building2 className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-card-foreground">
                  {doc.name}
                </p>
                {doc.speciality && (
                  <p className="text-xs text-primary">{doc.speciality}</p>
                )}
                {doc.address && (
                  <div className="mt-1.5 flex items-start gap-1">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {doc.address}
                    </p>
                  </div>
                )}
                {doc.is_derm && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Dermatology
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
