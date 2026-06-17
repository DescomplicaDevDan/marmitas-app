export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna 1: Identidade */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#7cb151]">NUTRICOMP</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Praticidade que cabe na sua rotina. Sabor que te motiva!
            </p>
          </div>

          {/* Coluna 2: Dados Corporativos */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              Informações Legais
            </h3>
            <div className="text-sm text-gray-500 space-y-1">
              <p>CNPJ: 24.548.092/0001-07</p>
              <p>© 2026 Nutricomp Companhia de Nutrição</p>
            </div>
          </div>

          {/* Coluna 3: Contato e Localização */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              Fale Conosco
            </h3>
            <p className="text-sm text-gray-500">(11) 93394-4302</p>
            <p className="text-sm text-gray-400">
              R. Comendador José Xavier Gouvêia, 26 - Bela Vista, São Paulo - SP, 01319-060, Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
