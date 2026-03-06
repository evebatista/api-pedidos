const express = require("express");

const app = express();

app.use(express.json());

let orders = [];

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("API funcionando");
});


// CRIAR PEDIDO
app.post("/order", (req, res) => {

  const body = req.body;

  const order = {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: body.dataCriacao,
    items: body.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };

  orders.push(order);

  res.status(201).json({
    message: "Pedido criado com sucesso",
    order
  });

});


// LISTAR PEDIDOS
app.get("/order/list", (req, res) => {
  res.json(orders);
});


// BUSCAR PEDIDO POR ID
app.get("/order/:id", (req, res) => {

  const id = req.params.id;

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  res.json(order);

});


// ATUALIZAR PEDIDO
app.put("/order/:id", (req, res) => {

  const id = req.params.id;

  const index = orders.findIndex(o => o.orderId === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  const body = req.body;

  const updatedOrder = {
    orderId: id,
    value: body.valorTotal,
    creationDate: body.dataCriacao,
    items: body.items.map(item => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };

  orders[index] = updatedOrder;

  res.json({
    message: "Pedido atualizado com sucesso",
    order: updatedOrder
  });

});


// DELETAR PEDIDO
app.delete("/order/:id", (req, res) => {

  const id = req.params.id;

  const index = orders.findIndex(o => o.orderId === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Pedido não encontrado"
    });
  }

  orders.splice(index, 1);

  res.json({
    message: "Pedido deletado com sucesso"
  });

});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});