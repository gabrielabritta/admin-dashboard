import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FuncionariosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Funcionários</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Funcionários</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Aqui será adicionada a tabela de funcionários */}
          <p>Conteúdo da página de funcionários será adicionado aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}
