import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Configurações</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Aqui serão adicionadas as opções de configuração */}
          <p>Conteúdo da página de configurações será adicionado aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
}
