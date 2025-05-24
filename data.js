// Seus 10 perfis do Instagram, segmentados em grupos estratégicos
const profiles = [
  // Grupo A: 8 perfis focados em pessoas físicas
  { id: 1, username: "2m.scouting", grupo: "A", tipo: "pessoa_fisica" },
  { id: 2, username: "scou.mmodels", grupo: "A", tipo: "pessoa_fisica" },
  { id: 3, username: "scouteronline21", grupo: "A", tipo: "pessoa_fisica" },
  { id: 4, username: "virtual.scoutt", grupo: "A", tipo: "pessoa_fisica" },
  { id: 5, username: "on.scouter", grupo: "A", tipo: "pessoa_fisica" },
  { id: 6, username: "profissional.scout", grupo: "A", tipo: "pessoa_fisica" },
  { id: 7, username: "mood.profissional", grupo: "A", tipo: "pessoa_fisica" },
  { id: 8, username: "profissional.dm", grupo: "A", tipo: "pessoa_fisica" },

  // Grupo B: 1 perfil só pra influenciadores
  { id: 9, username: "virtual_choices", grupo: "B", tipo: "influencer" },

  // Grupo C: 1 perfil pra outros tipos de cliente
  { id: 10, username: "digital_transition", grupo: "C", tipo: "outros_clientes" }
];

// Lista de contatos-alvo (Brasília)
const contacts = [
  // Pessoas Físicas
  { name: "ana_lopes", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "carlos_moraes", responded: true, lastMessage: "etapa1", tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "mariana_santos", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "jessica_df", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "lucas_castro", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "rafa_nobre", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "leticia_oliveira", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },
  { name: "davi_costa", responded: false, lastMessage: null, tipo: "pessoa_fisica", cidade: "Brasília" },

  // Influencers
  { name: "moda_estilo_df", responded: false, lastMessage: null, tipo: "influencer", cidade: "Brasília" },
  { name: "fotos_profissional", responded: false, lastMessage: null, tipo: "influencer", cidade: "Brasília" },
  { name: "beleza_carioca", responded: false, lastMessage: null, tipo: "influencer", cidade: "Brasília" },
  { name: "fitness_life_df", responded: false, lastMessage: null, tipo: "influencer", cidade: "Brasília" },

  // Lojas
  { name: "moda_local_df", responded: false, lastMessage: null, tipo: "loja", cidade: "Brasília" },
  { name: "acessorios_centro", responded: false, lastMessage: null, tipo: "loja", cidade: "Brasília" },
  { name: "moveis_modernos", responded: false, lastMessage: null, tipo: "loja", cidade: "Brasília" },

  // Ateliês
  { name: "studio_flor_do_cerrado", responded: false, lastMessage: null, tipo: "atelie", cidade: "Brasília" },
  { name: "costurando_estilo", responded: false, lastMessage: null, tipo: "atelie", cidade: "Brasília" },

  // Clínicas
  { name: "clinic_centro_df", responded: false, lastMessage: null, tipo: "clinica_medica", cidade: "Brasília" },
  { name: "rejuvenescer_clinica", responded: false, lastMessage: null, tipo: "clinica_medica", cidade: "Brasília" },

  // Salões de Beleza
  { name: "beleza_norte_shopping", responded: false, lastMessage: null, tipo: "salao_beauty", cidade: "Brasília" },
  { name: "cabelo_e_estilo", responded: false, lastMessage: null, tipo: "salao_beauty", cidade: "Brasília" },

  // Profissionais Liberais
  { name: "dr_carlos_medico", responded: false, lastMessage: null, tipo: "medico", cidade: "Brasília" },
  { name: "arq_juliana_estudio", responded: false, lastMessage: null, tipo: "arquiteto", cidade: "Brasília" },
  { name: "adv_tatiana_direito", responded: false, lastMessage: null, tipo: "advogado", cidade: "Brasília" },
  { name: "foto_andre_df", responded: false, lastMessage: null, tipo: "fotografo", cidade: "Brasília" }
];

// Mensagens personalizadas por tipo de contato
const messagesByType = {
  pessoa_fisica: {
    etapa1: "Ei! Tudo bem? Vi seu perfil e achei muito massa!",
    etapa2: "Legal conversar contigo! Como seu perfil tem chamado atenção, queremos te convidar pra avaliação presencial gratuita."
  },
  influencer: {
    etapa1: "Oi! Sua vibe chamou minha atenção aqui no Instagram…",
    etapa2: "Já pensou em fazer parte de uma campanha patrocinada com divulgação local?"
  },
  loja: {
    etapa1: "Olá! Adorei seu trabalho. Parabéns pelo seu negócio em Brasília!",
    etapa2: "Tem interesse em fazer parte de algo maior com parceria estratégica?"
  },
  atelie: {
    etapa1: "Seu ateliê tem um estilo único! Suas peças são incríveis.",
    etapa2: "Adoraríamos marcar uma visita pra entender como podemos colaborar com seu atelier em Brasília"
  },
  clinica_medica: {
    etapa1: "Dra! Sua clínica tem um visual profissional e acolhedor!",
    etapa2: "Gostaria de marcar uma conversa pra falar sobre campanha médica direcionada para Brasília"
  },
  salao_beauty: {
    etapa1: "Seu salão está com um visual incrível! Adorei o feed organizado.",
    etapa2: "Tem interesse em fazer parte de algo maior com exposição online em Brasília?"
  },
  medico: {
    etapa1: "Dr(a), tudo bem? Estou entrando em contato pra falar de uma oportunidade especial em Brasília.",
    etapa2: "Como sua área é tão importante, adoraríamos incluir seu trabalho em nossa nova campanha!"
  },
  arquiteto: {
    etapa1: "Parabéns pela carreira! Seus projetos chamaram minha atenção.",
    etapa2: "Estamos selecionando profissionais de Brasília pra uma parceria criativa!"
  },
  advogado: {
    etapa1: "Olá! Gostei muito do seu currículo jurídico. Temos uma proposta pra advogados de Brasília",
    etapa2: "Queremos marcar uma conversa pra entender melhor seus serviços"
  },
  fotografo: {
    etapa1: "Seus cliques são incríveis! Adorei seu estilo fotográfico em Brasília",
    etapa2: "Você faria parte de um projeto de fotos gratuitas pra divulgar artistas locais"
  }
];