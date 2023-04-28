# Desafio Inlog - Vaga Frontend Developer 🚀

## Introdução 📜
O objetivo deste desafio é criar um projeto React que contenha duas páginas: uma para listar veículos e outra para cadastrar novos veículos. 

Na página de listagem de veículos, será necessário utilizar a biblioteca do mapa, como o Leaflet ou Google Maps API, para exibir um mapa com a localização de cada veículo da lista.

Além disso, a lista de veículos deve estar ordenada pelo mais próximo da localização do usuário. Na página de cadastro de veículos, será necessário criar um formulário para inserir as informações básicas e a localização do veículo. 

O design do projeto fica à escolha do desenvolvedor do teste. Use sua criatividade e mostre suas habilidades em React, API e testes automatizados neste desafio!

## Instruções 📝
1. Crie um projeto React usando o create-react-app ou uma ferramenta semelhante. 🌟

2. Crie 2 páginas em React: Uma para listagem de veículos e outra página de cadastro de veículos. 🚗📝

3. Na página de listagem de veículos, utilize a biblioteca do mapa, como o Leaflet ou Google Maps API para exibir um mapa e colocar um pin em cada localização de veículos na lista. 🗺️
    - A tela de listagem deve conter uma lista de veículos ordenada pelo mais próximo da localização do usuário (web).
    - Além da listagem, deve conter um mapa com as informações solicitadas.

4. Na página de cadastro de veículos, crie um formulário que permita ao usuário inserir as informações básicas e a localização do veículo.
- Exemplo:
```json
{
    identifier: 'Vehicle 1',
    license_plate: 'AAA-9A99',
    tracker_serial_number: 'A0000000',
    coordinates: {
        latitude: -25.43247,
        longitude: -49.27845
    } 
}
```
- Obs: 


5. Crie teste usando o Jest, React Testing Library ou Cypress para garantir que:
- A listagem de veículos seja renderizada corretamente com o mapa. 🧭
- O formulário de cadastro de veículos esteja funcionando perfeitamente. ✅
- A Fake API esteja respondendo corretamente. 📡

#### Observações:
- Você pode utilizar bibliotecas externas para ajudar no desenvolvimento do projeto, tais como:
    - Validadores: react-hook-form, yup, formik entre outros.
    - Componentes: Material-UI, Chakra-ui entre outros.
    - Rotas: React-router-dom.

- Caso deseje adicionar mais campos para o veículo como uma imagem entre outros, fique à vontade. Isso será visto como bônus. 🏎️💻



## Como entregar 📨

Crie um fork deste repositório e desenvolva nele. Quando finalizar, envie um pull request com a sua solução.

## Dicas 💡

- Use componentes funcionais com hooks do React.
- Utilize TypeScript ou PropTypes para tipagem.
- Utilize Redux ou outro gerenciador de estado para armazenar as informações dos veículos.
- Utilize o Axios para fazer requisições à API.
- Utilize a biblioteca React Leaflet ou Google Maps API para exibir o mapa.
- Teste todos os componentes criados.
- Se quiser adicionar algum bônus, como uma busca de veículos ou um filtro de veículos, fique à vontade.


#### Nos envie um link para download do seu código pelo email: beinlog@inlog.com.br

## Boa sorte!