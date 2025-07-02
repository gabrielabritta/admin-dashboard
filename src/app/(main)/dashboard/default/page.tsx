"use client";
import { useState } from "react";

import dynamic from "next/dynamic";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Map = dynamic(() => import("@/components/ui/leaflet-map"), { ssr: false });

// Gera dados simulados de torres
function generateTowers() {
  const towers = [];
  for (let i = 1; i <= 10; i++) {
    towers.push({
      id: `TWR-${1000 + i}`,
      status: i === 10 ? "Danificada" : "Íntegra",
    });
  }
  return towers;
}
const towers = generateTowers();
const towersIntegras = towers.filter((t) => t.status === "Íntegra");
const towersDanificadas = towers.filter((t) => t.status === "Danificada");

function StatusCard({
  title,
  value,
  color,
  onClick,
  className,
}: {
  title: string;
  value: React.ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Card
      className={`hover:border-primary flex min-w-[150px] cursor-pointer flex-col items-center justify-center gap-1 border-2 border-transparent px-4 py-2 transition-shadow hover:shadow-lg ${className ?? ""}`}
      onClick={onClick}
    >
      <span className="text-muted-foreground text-xs font-medium">{title}</span>
      <div className={`flex items-center gap-1 text-2xl font-bold ${color}`}>{value}</div>
    </Card>
  );
}

export default function Page() {
  const [open, setOpen] = useState<null | "all" | "integras" | "danificadas">(null);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatusCard
          title="Número de Torres Monitoradas"
          value={towers.length}
          color="text-gray-900"
          onClick={() => setOpen("all")}
        />
        <StatusCard
          title="Torres Íntegras"
          value={towersIntegras.length}
          color="text-green-600"
          onClick={() => setOpen("integras")}
        />
        <StatusCard
          title="Torres Danificadas"
          value={towersDanificadas.length}
          color="text-red-600"
          onClick={() => setOpen("danificadas")}
        />
        <StatusCard title="Alertas" value={1} color="text-red-600" />
      </div>
      <Card className="h-[60vh] w-full overflow-hidden p-0">
        <Map />
      </Card>

      {/* Modal para mostrar as listas de torres */}
      <Dialog open={open !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {open === "all" && "Todas as Torres Monitoradas"}
              {open === "integras" && "Torres Íntegras"}
              {open === "danificadas" && "Torres Danificadas"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <table className="w-full border-separate border-spacing-y-1 text-sm">
              <thead>
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {(open === "all" ? towers : open === "integras" ? towersIntegras : towersDanificadas).map((tower) => (
                  <tr key={tower.id} className="bg-muted rounded">
                    <td className="px-2 py-1 font-mono">{tower.id}</td>
                    <td className={tower.status === "Íntegra" ? "text-green-600" : "text-red-600"}>{tower.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
