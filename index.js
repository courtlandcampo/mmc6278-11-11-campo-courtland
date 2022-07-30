const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = ([{title, author, lines}]) => {
  let titleTag = makeTag("h2")(title) //makes title tag + makeTag

  let authorNameTag = pipe(makeTag("em"), makeTag("h3"))(`by ${author}`) //make author tag + pipe usage
  
  let linesTag = makeTag("p")(lines)

  let poemArr = [] //will be comprised of multiple stanzas
  let stanzaArr = [] // will be comprised of lines

  lines.forEach((line,index) => {
    if(!line){
      poemArr.push(stanzaArr)
      stanzaArr = []
    } else if (index === lines.length - 1) {
      stanzaArr.push(line)
      poemArr.push(stanzaArr)
    } else {
      stanzaArr.push(line)
    }
  })

 
  return `${titleTag}${authorNameTag}${poemString}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
