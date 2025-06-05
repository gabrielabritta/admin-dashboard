import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AtividadesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Atividades</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Aqui será adicionada a lista de atividades */}
          <p>Conteúdo da página de atividades será adicionado aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}
