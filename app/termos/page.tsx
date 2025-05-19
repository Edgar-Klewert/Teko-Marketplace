import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Termos de Uso</h1>

          <div className="prose prose-slate max-w-none">
            <p>
              Bem-vindo aos Termos de Uso do Teko Marketplace. Este documento é um contrato entre você e o Teko
              Marketplace ("nós", "nosso" ou "Teko") que governa o uso de nossos serviços. Ao acessar ou usar nosso
              site, aplicativo ou qualquer outro serviço oferecido pelo Teko, você concorda com estes termos.
            </p>

            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou usar o Teko Marketplace, você confirma que leu, entendeu e concorda com estes Termos de Uso.
              Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
            </p>

            <h2>2. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
              imediatamente após a publicação dos termos atualizados. Seu uso continuado do Teko após tais alterações
              constitui sua aceitação dos novos termos.
            </p>

            <h2>3. Elegibilidade</h2>
            <p>
              Para usar o Teko Marketplace, você deve ter pelo menos 18 anos de idade ou a maioridade legal em sua
              jurisdição, o que for maior. Ao usar nossos serviços, você declara e garante que atende a este requisito.
            </p>

            <h2>4. Contas de Usuário</h2>
            <p>
              Para acessar determinados recursos do Teko, você precisará criar uma conta. Você é responsável por manter
              a confidencialidade de suas credenciais de login e por todas as atividades que ocorrerem em sua conta.
              Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
            </p>

            <h2>5. Uso do Serviço</h2>
            <p>
              Você concorda em usar o Teko Marketplace apenas para fins legais e de acordo com estes Termos. Você não
              deve:
            </p>
            <ul>
              <li>Violar quaisquer leis aplicáveis ou regulamentos</li>
              <li>Infringir os direitos de terceiros</li>
              <li>Interferir ou interromper o serviço ou servidores</li>
              <li>Tentar acessar áreas restritas do serviço</li>
              <li>Criar contas múltiplas para fins fraudulentos</li>
              <li>Publicar conteúdo falso, enganoso ou ofensivo</li>
            </ul>

            <h2>6. Conteúdo do Usuário</h2>
            <p>
              Ao enviar qualquer conteúdo para o Teko Marketplace, você concede a nós uma licença mundial, não
              exclusiva, livre de royalties para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e
              exibir tal conteúdo em conexão com nossos serviços.
            </p>

            <h2>7. Produtos e Transações</h2>
            <p>
              O Teko Marketplace conecta compradores e vendedores de produtos artesanais. Não somos responsáveis pela
              qualidade, segurança, legalidade ou disponibilidade dos produtos listados. As transações são realizadas
              diretamente entre compradores e vendedores, e somos apenas facilitadores dessas transações.
            </p>

            <h2>8. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, recursos e funcionalidades disponíveis no Teko Marketplace, incluindo, mas não se
              limitando a, textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e
              compilações de dados, são propriedade do Teko, de seus licenciadores ou de outros provedores de conteúdo e
              são protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
            </p>

            <h2>9. Limitação de Responsabilidade</h2>
            <p>
              Em nenhuma circunstância o Teko Marketplace, seus diretores, funcionários, parceiros, agentes,
              fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais,
              consequenciais ou punitivos, incluindo, sem limitação, perda de lucros, dados, uso, boa vontade ou outras
              perdas intangíveis, resultantes de seu acesso ou uso ou incapacidade de acessar ou usar o serviço.
            </p>

            <h2>10. Lei Aplicável</h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus princípios
              de conflito de leis.
            </p>

            <h2>11. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco pelo e-mail: termos@teko.com.br
            </p>

            <p className="text-sm text-muted-foreground mt-8">Última atualização: 15 de março de 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
