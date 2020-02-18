
// Fonte -> https://medium.com/machina-sapiens/como-criar-uma-rede-neural-em-javascript-com-apenas-30-linhas-de-c%C3%B3digo-63273d83dc04

const { Layer, Network } = window.synaptic

// Quantidade de neuronios por camada
var camadaEntrada = new Layer(2)
var camadaOculta = new Layer(3)
var camadaSaida = new Layer(1)

// conecta as camadas formando a rede
camadaEntrada.project(camadaOculta)
camadaOculta.project(camadaSaida)

var rede = new Network({
  input: camadaEntrada,
  hidden: [camadaOculta],
  output: camadaSaida
})

// constante para ajustes de pesos
var taxaAprendizagem = .3

/*  propagação:

Fonte-> http://deeplearningbook.com.br/algoritmo-backpropagation-parte-2-treinamento-de-redes-neurais/

1. O passo para frente (forward pass), onde nossas entradas são passadas através da rede
   e as previsões de saída obtidas (essa etapa também é conhecida como fase de propagação).

2. O passo para trás (backward pass), onde calculamos o gradiente da função de perda na camada final
   (ou seja, camada de previsão) da rede e usamos esse gradiente
   para aplicar recursivamente a regra da cadeia (chain rule) para atualizar
   os pesos em nossa rede (etapa também conhecida como fase de atualização de pesos ou retro-propagação).
*/

for (var i = 0; i < 20000; i++) {

  rede.activate([0,0]) // 0,0 => 0
  rede.propagate(taxaAprendizagem, [0])
  rede.activate([0,1]) // 0,1 => 1
  rede.propagate(taxaAprendizagem, [1])
  rede.activate([1,0]) // 1,0 => 1
  rede.propagate(taxaAprendizagem, [1])
  rede.activate([1,1]) // 1,1 => 0
  rede.propagate(taxaAprendizagem, [0])
}

var saidas = document.getElementById('saidas')

saidas.textContent = 
  Math.round(rede.activate([0,0])) + '  ' +
  Math.round(rede.activate([0,1])) + '  ' +
  Math.round(rede.activate([1,0])) + '  ' +
  Math.round(rede.activate([1,1]))