// Validacao nome completo
const form = document.getElementById('form-cadastro')
const nomeDoContato = document.getElementById('nome-contato')
const telefoneContato = document.getElementById('telefone-contato')
const imgMensagemSucesso = '<img src="./media/Success.png" alt="Balão de texto escrito, Parabéns, contato adicionado" />'
const nome = []
const telefone = []

let linhas = ''

function validaNome(nomeCompleto) {
    const nomeComoArray = nomeCompleto.split(' ')
    return nomeComoArray.length >= 2
}


form.addEventListener('submit', function(e){
    let formEValido = false
    e.preventDefault()

    adicionaLinha()
    atualizaTabela()
    
    formEValido = validaNome(nomeDoContato.value)
    if (formEValido) {
        const containerMensagemSucesso =  document.querySelector('.success-message')
        containerMensagemSucesso.innerHTML = imgMensagemSucesso
        containerMensagemSucesso.style.display = 'block'
        document.querySelector('.error-message').style.display = 'none'

        nomeDoContato.value = ''
        telefoneContato.value = ''
    } else {
        nomeDoContato.style.border = '1px solid red'
        document.querySelector('.error-message').style.display = 'block'
        document.querySelector('.success-message').style.display = 'none'
    }
})

nomeDoContato.addEventListener('keyup', function(e){
    formEValido = validaNome(e.target.value)

    if (!formEValido) {
        nomeDoContato.classList.add('error')
        document.querySelector('.error-message').style.display = 'block'
        document.querySelector('.success-message').style.display = 'none' 
    } else {
        nomeDoContato.classList.remove('error')
        document.querySelector('.error-message').style.display = 'none'
        document.querySelector('.success-message').style.display = 'none'
    }
})

//Mascara de telefone
telefoneContato.addEventListener('keypress', (e) => mascaraTelefone(e.target.value))
telefoneContato.addEventListener('change', (e) => mascaraTelefone(e.target.value))

const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    telefoneContato.value = valor
}

//Funcao adicionaLinha
function adicionaLinha() {
    if (nome.includes(nomeDoContato.value)) {
        alert(`Esse nome ${nomeDoContato.value} ja existe na agenda`)
    } else {
        nome.push(nomeDoContato.value)
        telefone.toString(telefoneContato.value)
        console.log(telefoneContato.value)

        let linha = '<tr>'
        linha += `<td>${nomeDoContato.value}</td>`
        linha += `<td>${telefoneContato.value}</td>`
        linha += '</tr>'

        linhas += linha
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}