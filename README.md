# MineLucas

A MineLucas é um projeto que decidi desenvolver durante as férias, com o objetivo de treinar a integração entre FrontEnd e BackEnd, utilizando React no Front e Django no Back.

Neste site, você pode criar seu próprio bioma, criatura, bloco, estrutura e até jogadores, sejam eles existentes no Minecraft, em mods ou criações totalmente suas. Além disso, é possível exportar tudo em um arquivo JSON, facilitando o uso futuro. O site também conta com um gerador de Seeds, permitindo que você explore mundos aleatórios no Minecraft. E se você quiser, pode conferir os mapas mais bugados e estranhos do jogo diretamente por aqui e jogá-los também :D.

## Como usar o site

1. Baixe o projeto clicando em Code e indo em Download ZIP;

2. Após baixar o arquivo ZIP, extraia a pasta do projeto na área de trabalho ou em documentos;

3. Abra o VSCode e faça o seguinte atalho: CTRL + K, CTRL O, e escolha a pasta do projeto;

4. Após abrir o projeto, abra o terminal e vá até a pasta BackEnd:

```bash
cd .\BackEnd
```

5. E depois crie o ambiente virtual do python:

```bash
python -m venv .venv
```

6. Após a instalação, ative a pasta .venv:

```bash
.\.venv\Scripts\activate
```

7. Agora, instale as bibliotecas com o requirements.txt:

```bash 
pip install -r .\requirements.txt
```

8. E depois, rode o servidor:

```bash
python .\manage.py runserver
```

9. Depois disso, crie outro terminal clicando em "+" e vá para a pasta FrontEnd:

```bash
cd .\FrontEnd
```

10. Agora, crie a pasta node_modules:

```bash
npm install
```

11: Depois de instalar a pasta, rode o servidor:

```bash
npm run dev
```

E pronto! Agora você pode usar o site MineLucas!!! Boa sorte :D

## Linguagens utilizadas

### FrontEnd

<div style="display: flex;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" title="React" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" title="HTML" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" title="CSS" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" title="Tailwind" width="70px" height="70px"/>
</div>

### BackEnd

<div style="display: flex;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" title="Python" width="70px" height="70px"/>
    <img src="https://icon.icepanel.io/Technology/png-shadow-512/Django.png" alt="Django" title="Django" width="70px" height="70px">
</div>

### Ferramentas/tecnologias

<div style="display: flex;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" alt="Canva" title="Canva" width="70px" height="70px"/>    
</div>