import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Política de Privacidade</h1>

          <div className="prose prose-slate max-w-none">
            <p>
              A presente Política de Privacidade descreve como o Teko Marketplace ("nós", "nosso" ou "Teko") coleta,
              usa, compartilha e protege suas informações pessoais quando você utiliza nosso site, aplicativo ou
              qualquer outro serviço oferecido pelo Teko.
            </p>

            <h2>1. Informações que Coletamos</h2>
            <p>Podemos coletar os seguintes tipos de informações:</p>
            <ul>
              <li>
                <strong>Informações de Cadastro:</strong> Nome, endereço de e-mail, número de telefone, endereço postal,
                data de nascimento e outras informações necessárias para criar e manter sua conta.
              </li>
              <li>
                <strong>Informações de Transação:</strong> Detalhes sobre compras ou vendas realizadas através do Teko,
                incluindo informações de pagamento, produtos adquiridos e histórico de transações.
              </li>
              <li>
                <strong>Informações de Uso:</strong> Dados sobre como você interage com nosso site, como páginas
                visitadas, tempo gasto no site, cliques, e outras estatísticas de uso.
              </li>
              <li>
                <strong>Informações do Dispositivo:</strong> Dados sobre o dispositivo que você usa para acessar o Teko,
                incluindo modelo de hardware, sistema operacional, identificadores únicos de dispositivo e informações
                de rede móvel.
              </li>
              <li>
                <strong>Informações de Localização:</strong> Dados sobre sua localização geográfica, que podem ser
                precisos (como GPS) ou menos precisos (como cidade ou CEP).
              </li>
            </ul>

            <h2>2. Como Usamos Suas Informações</h2>
            <p>Utilizamos suas informações para os seguintes fins:</p>
            <ul>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Processar transações e enviar notificações relacionadas</li>
              <li>Personalizar sua experiência e fornecer conteúdo relevante</li>
              <li>Comunicar-se com você sobre atualizações, promoções e eventos</li>
              <li>Detectar, prevenir e resolver problemas técnicos e de segurança</li>
              <li>Cumprir obrigações legais e proteger nossos direitos</li>
            </ul>

            <h2>3. Compartilhamento de Informações</h2>
            <p>Podemos compartilhar suas informações nas seguintes circunstâncias:</p>
            <ul>
              <li>
                <strong>Com Outros Usuários:</strong> Quando você realiza uma transação, compartilhamos informações
                necessárias para facilitar a compra ou venda.
              </li>
              <li>
                <strong>Com Prestadores de Serviços:</strong> Compartilhamos informações com empresas que nos ajudam a
                operar, fornecer e melhorar nossos serviços (como processadores de pagamento, serviços de entrega,
                etc.).
              </li>
              <li>
                <strong>Para Conformidade Legal:</strong> Podemos divulgar informações quando acreditamos de boa-fé que
                isso é necessário para cumprir a lei, proteger nossos direitos ou a segurança de nossos usuários.
              </li>
              <li>
                <strong>Em Caso de Transferência de Negócios:</strong> Se o Teko estiver envolvido em uma fusão,
                aquisição ou venda de ativos, suas informações podem ser transferidas como parte dessa transação.
              </li>
            </ul>

            <h2>4. Segurança das Informações</h2>
            <p>
              Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações
              contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum método de transmissão pela
              Internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança
              absoluta.
            </p>

            <h2>5. Seus Direitos e Escolhas</h2>
            <p>Você tem certos direitos em relação às suas informações pessoais:</p>
            <ul>
              <li>Acessar, corrigir ou excluir suas informações pessoais</li>
              <li>Opor-se ao processamento de suas informações</li>
              <li>Solicitar a portabilidade de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
              <li>Optar por não receber comunicações de marketing</li>
            </ul>

            <h2>6. Cookies e Tecnologias Semelhantes</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para coletar informações sobre suas atividades em nosso site.
              Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
            </p>

            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos descritos nesta
              Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
            </p>

            <h2>8. Crianças</h2>
            <p>
              Nossos serviços não são direcionados a pessoas menores de 18 anos, e não coletamos intencionalmente
              informações pessoais de crianças. Se tomarmos conhecimento de que coletamos informações pessoais de uma
              criança, tomaremos medidas para excluir essas informações.
            </p>

            <h2>9. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre
              disponível em nosso site, e notificaremos você sobre quaisquer alterações significativas.
            </p>

            <h2>10. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou nossas práticas de
              privacidade, entre em contato conosco pelo e-mail: privacidade@teko.com.br
            </p>

            <p className="text-sm text-muted-foreground mt-8">Última atualização: 15 de março de 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
