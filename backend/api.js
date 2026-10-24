const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// ==========================================
// BANCO DE DADOS EM MEMÓRIA
// ==========================================
let produtos = [
  {
    id: 1,
    id_produto: 1,
    nome: "Dom Casmurro",
    titulo: "Dom Casmurro",
    descricao: "Romance clássico de Machado de Assis.",
    autor: "Machado de Assis",
    preco: 29.90,
    precoEmCentavos: 2990,
    priceInCents: 2990,
    unidadesEmEstoque: 5,
    categoria: "Literatura Brasileira",
    conservacao: "Excelente",
    colecao: false,
    imagemPrincipalId: "https://loremflickr.com/600/400/book",
    dono: { id_usuario: 1, nome: "João Silva" }
  }
];

let usuarios = [
  { 
    id: 1,
    id_usuario: 1, 
    nome: "João Silva", 
    fullName: "João Silva",
    email: "joao@email.com", 
    senha: "123", 
    admin: false 
  },
  { 
    id: 2,
    id_usuario: 2, 
    nome: "Administrador", 
    fullName: "Administrador",
    email: "admin@email.com", 
    senha: "admin", 
    admin: true 
  }
];

const carts = {};

// Função utilitária para padronizar produtos na API (Padrão Professor)
function toApiProduct(p) {
  const precoEmCentavos = p.precoEmCentavos || Math.round((p.preco || 0) * 100);
  const precoReais = p.preco || (precoEmCentavos / 100);

  return {
    id: p.id || p.id_produto,
    id_produto: p.id_produto || p.id,
    name: p.nome || p.titulo,
    nome: p.nome || p.titulo,
    titulo: p.titulo || p.nome,
    autor: p.autor || "Autor desconhecido",
    description: p.descricao || "",
    descricao: p.descricao || "",
    priceInCents: precoEmCentavos,
    precoEmCentavos: precoEmCentavos,
    preco: precoReais,
    unitsInStock: p.unidadesEmEstoque || 1,
    unidadesEmEstoque: p.unidadesEmEstoque || 1,
    mainImageId: p.imagemPrincipalId || p.imagem || "",
    imagemPrincipalId: p.imagemPrincipalId || p.imagem || "",
    imagem: p.imagem || p.imagemPrincipalId || "",
    categoria: p.categoria || "Geral",
    conservacao: p.conservacao || "Bom",
    colecao: p.colecao || false,
    dono: p.dono || null,
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function buildCartResponse(userItems) {
  const itens = (userItems || []).map((item) => {
    const product = produtos.find((p) => (p.id || p.id_produto) === item.produtoId);
    const precoEmCentavos = product?.precoEmCentavos ?? (product?.preco ? Math.round(product.preco * 100) : 0);
    const unidadesEmEstoque = product?.unidadesEmEstoque ?? 1;
    const imagemPrincipalId = product?.imagemPrincipalId ?? product?.imagem ?? '';
    const nomeProduto = product?.nome || product?.titulo || `Produto ${item.produtoId}`;
    const subtotalEmCentavos = precoEmCentavos * item.quantidade;

    return {
      produtoId: item.produtoId,
      productId: item.produtoId,
      nomeProduto,
      name: nomeProduto,
      precoEmCentavos,
      priceInCents: precoEmCentavos,
      quantidade: item.quantidade,
      quantity: item.quantidade,
      unidadesEmEstoque,
      unitsInStock: unidadesEmEstoque,
      imagemPrincipalId,
      mainImageId: imagemPrincipalId,
      subtotalEmCentavos,
      subtotalInCents: subtotalEmCentavos,
    };
  });

  const valorTotalEmCentavos = itens.reduce((total, item) => total + item.subtotalEmCentavos, 0);

  return {
    itens,
    items: itens,
    valorTotalEmCentavos,
    totalInCents: valorTotalEmCentavos,
  };
}

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

// ==========================================
// AUTENTICAÇÃO (Suporta padrão Prof. e Legado App)
// ==========================================
app.post(['/api/auth/login', '/api/login'], (req, res) => {
  const { email, password, senha } = req.body;
  const pass = password || senha;
  
  const user = usuarios.find(u => u.email === email && u.senha === pass);

  if (user) {
    const { senha: _, ...dadosUsuario } = user;
    res.json({
      success: true,
      data: {
        user: dadosUsuario,
        token: `token_${Date.now()}`
      },
      ...dadosUsuario // Mantém compatibilidade direta se o app ler sem data
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: { message: "E-mail ou senha incorretos" },
      erro: "E-mail ou senha incorretos" 
    });
  }
});

app.post(['/api/auth/signup', '/api/cadastro'], (req, res) => {
  const { nome, fullName, email, senha, password } = req.body;
  const userName = fullName || nome;
  const userPass = password || senha;

  if (!email || !userPass || !userName) {
    return res.status(400).json({
      success: false,
      error: { message: 'Nome, email e senha são obrigatórios' },
      erro: 'Nome, email e senha são obrigatórios'
    });
  }

  const emailExiste = usuarios.find(u => u.email === email);
  if (emailExiste) {
    return res.status(400).json({ 
      success: false, 
      error: { message: "E-mail já está em uso." },
      erro: "E-mail já está em uso." 
    });
  }

  const novoUsuario = {
    id: Date.now(),
    id_usuario: Date.now(),
    nome: userName,
    fullName: userName,
    email,
    senha: userPass,
    admin: false 
  };
  
  usuarios.push(novoUsuario);
  const { senha: _, ...dadosUsuario } = novoUsuario;

  res.status(201).json({
    success: true,
    data: {
      user: dadosUsuario,
      token: `token_${Date.now()}`
    },
    ...dadosUsuario
  });
});

// ==========================================
// PRODUTOS (CRUD Padrão Professor + Compatibilidade)
// ==========================================
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const list = produtos.map(toApiProduct);

  res.json({
    success: true,
    data: {
      products: list.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        total: list.length,
        totalPages: Math.ceil(list.length / limit),
      },
    },
  });
});

// Compatibilidade com app mobile legado (`/api/produtos`)
app.get('/api/produtos', (req, res) => {
  res.json(produtos.map(toApiProduct));
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = produtos.find((item) => (item.id || item.id_produto) === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: { message: 'Produto não encontrado' },
    });
  }

  res.json({
    success: true,
    data: toApiProduct(product),
  });
});

app.post(['/api/products', '/api/produtos'], (req, res) => {
  const id = Date.now();
  const body = req.body;
  
  const precoCalculado = body.preco || (body.precoEmCentavos ? body.precoEmCentavos / 100 : 0);
  const centavosCalculados = body.precoEmCentavos || Math.round(precoCalculado * 100);

  const novoProduto = {
    id,
    id_produto: id,
    nome: body.nome || body.titulo || "Produto sem título",
    titulo: body.titulo || body.nome || "Produto sem título",
    descricao: body.descricao || body.description || "",
    autor: body.autor || "Não informado",
    preco: precoCalculado,
    precoEmCentavos: centavosCalculados,
    priceInCents: centavosCalculados,
    unidadesEmEstoque: body.unidadesEmEstoque || 1,
    categoria: body.categoria || "Geral",
    conservacao: body.conservacao || "Bom",
    colecao: body.colecao || false,
    imagemPrincipalId: body.imagemPrincipalId || body.imagem || "",
    imagem: body.imagem || body.imagemPrincipalId || "",
    dono: body.dono || null,
    createdAt: new Date().toISOString()
  };

  produtos.push(novoProduto);
  
  res.status(201).json({
    success: true,
    data: toApiProduct(novoProduto),
    ...novoProduto
  });
});

app.put(['/api/products/:id', '/api/produtos/:id'], (req, res) => {
  const id = req.params.id;
  const index = produtos.findIndex(p => (p.id == id || p.id_produto == id));
  
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...req.body };
    const prodFormatado = toApiProduct(produtos[index]);
    res.json({
      success: true,
      data: prodFormatado,
      ...prodFormatado
    });
  } else {
    res.status(404).json({ success: false, erro: "Produto não encontrado" });
  }
});

app.delete(['/api/products/:id', '/api/produtos/:id'], (req, res) => {
  const id = req.params.id;
  produtos = produtos.filter(p => (p.id != id && p.id_produto != id));
  res.status(204).send();
});

// ==========================================
// CARRINHO DE COMPRAS (Padrão Professor)
// ==========================================
app.get('/api/cart', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  res.json({
    success: true,
    data: buildCartResponse(carts[userId] || []),
  });
});

app.post('/api/cart/items', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const produtoId = Number(req.body.produtoId ?? req.body.productId);
  const quantidade = Number(req.body.quantidade ?? req.body.quantity ?? 1);

  if (!produtoId || quantidade <= 0) {
    return res.status(400).json({
      success: false,
      error: { message: 'produtoId e quantidade são obrigatórios' },
    });
  }

  if (!carts[userId]) carts[userId] = [];

  const existingItem = carts[userId].find(item => item.produtoId === produtoId);
  if (existingItem) {
    existingItem.quantidade += quantidade;
  } else {
    carts[userId].push({ produtoId, quantidade });
  }

  res.json({
    success: true,
    data: buildCartResponse(carts[userId]),
  });
});

app.put('/api/cart/items/:productId', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const productId = parseInt(req.params.productId);
  const quantity = Number(req.body.quantidade ?? req.body.quantity);

  if (!carts[userId]) carts[userId] = [];

  const item = carts[userId].find(i => i.produtoId === productId);
  if (item) item.quantidade = quantity;

  res.json({
    success: true,
    data: buildCartResponse(carts[userId]),
  });
});

app.delete('/api/cart/items/:productId', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const { productId } = req.params;

  if (carts[userId]) {
    carts[userId] = carts[userId].filter(item => item.produtoId !== parseInt(productId));
  }

  res.json({
    success: true,
    data: buildCartResponse(carts[userId] || []),
  });
});

app.delete('/api/cart', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  carts[userId] = [];
  res.json({
    success: true,
    data: buildCartResponse([]),
  });
});

// ==========================================
// CHECKOUT & MERCADO PAGO (Padrão Professor)
// ==========================================
app.post('/api/payments/mercadopago', async (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const cart = buildCartResponse(carts[userId] || []);

  if (!cart.itens.length) {
    return res.status(400).json({
      success: false,
      error: { message: 'Carrinho vazio. Adicione itens antes de pagar.' },
    });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

  if (accessToken) {
    try {
      const mercadoPagoClient = new MercadoPagoConfig({ accessToken });
      const preferenceClient = new Preference(mercadoPagoClient);

      const preferenceBody = {
        items: cart.itens.map((item) => ({
          id: String(item.produtoId),
          title: item.nomeProduto,
          quantity: item.quantidade,
          currency_id: 'BRL',
          unit_price: Number((item.precoEmCentavos / 100).toFixed(2)),
        })),
        external_reference: `order_${userId}_${Date.now()}`,
        metadata: {
          userId: String(userId),
          totalInCents: cart.valorTotalEmCentavos,
          itemsCount: cart.itens.length,
        },
      };

      const preferenceResponse = await preferenceClient.create({ body: preferenceBody });
      const initPoint = preferenceResponse?.init_point || preferenceResponse?.sandbox_init_point;

      if (!initPoint) {
        return res.status(502).json({
          success: false,
          error: { message: 'Mercado Pago não retornou URL de pagamento.' },
        });
      }

      return res.json({
        success: true,
        init_point: initPoint,
        url: initPoint,
        data: {
          provider: 'mercadopago',
          mode: 'live',
          preferenceId: preferenceResponse?.id,
          totalInCents: cart.valorTotalEmCentavos,
          itemsCount: cart.itens.length,
        },
      });
    } catch (error) {
      return res.status(502).json({
        success: false,
        error: { message: error?.message || 'Falha ao criar preferência no Mercado Pago.' },
      });
    }
  }

  const mockPaymentUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=demo_${Date.now()}_${userId}`;
  return res.json({
    success: true,
    init_point: mockPaymentUrl,
    url: mockPaymentUrl,
    data: {
      provider: 'mercadopago',
      mode: 'mock',
      totalInCents: cart.valorTotalEmCentavos,
      itemsCount: cart.itens.length,
    },
  });
});

app.post('/api/cart/checkout', (req, res) => {
  res.json({
    success: true,
    data: {
      orderId: Math.floor(Math.random() * 100000),
      status: 'pending',
      total: 0,
    },
  });
});

// ==========================================
// ROTA DO ITEM 2.2 - EXPORTAR JSON (DASHBOARD)
// ==========================================
app.get('/api/exportar-dados', (req, res) => {
  const dadosDashboard = {
    total_produtos: produtos.length,
    total_usuarios: usuarios.length,
    valor_total_acervo: produtos.reduce((acc, p) => acc + (Number(p.preco) || 0), 0),
    produtos_por_categoria: produtos.reduce((acc, p) => {
      acc[p.categoria || 'Geral'] = (acc[p.categoria || 'Geral'] || 0) + 1;
      return acc;
    }, {}),
    produtos_por_conservacao: produtos.reduce((acc, p) => {
      if (p.conservacao) {
        acc[p.conservacao] = (acc[p.conservacao] || 0) + 1;
      }
      return acc;
    }, {}),
    lista_produtos: produtos.map(p => ({
      id: p.id || p.id_produto,
      titulo: p.titulo || p.nome,
      preco: p.preco,
      categoria: p.categoria,
      conservacao: p.conservacao,
      ano: p.anoPublicacao
    }))
  };

  res.json({
    success: true,
    data: dadosDashboard,
    ...dadosDashboard // Mantém a raiz direta para o botão do aplicativo
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor do Sebo Digital rodando na porta ${PORT}!`);
});

module.exports = app;