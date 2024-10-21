const letters = 'abcdefghijklmnopqrstuvwxyz'

const lettersArray = letters.split('')
function criptoCifraDeCesar(modifier, text){
    let newText=''
    for (let i = 0; i < text.length; i++) {
        const element = text[i].toLowerCase();
        if(lettersArray.includes(element)){
            let letter = lettersArray[(lettersArray.indexOf(element)+modifier)%lettersArray.length]
            newText+=element!==text[i]?letter.toUpperCase():letter
            continue
        }
        newText+=element
    }
    return newText
}
function decriptoCifraDeCesar(text){
    for (let i = 0; i < lettersArray.length; i++) {
        console.log(criptoCifraDeCesar(i,text),'\n')
    }
}

console.log()
decriptoCifraDeCesar(criptoCifraDeCesar(8000,'Dai a Cesar o que eh de Cesar'))