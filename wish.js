const adjectives=[
    "самая обаятельная и привлекательная",
    "невероятная",
    "прекрасная",
    "чудесная"
]
const nouns=[
    "мечта!",
    "богиня!",
    "красавица!",
    "принцесса!"
]
const whens=[
    "Когда ты выходишь на улицу,",
    "Когда ты смотришь в окно,",
]
const actions=[
    "светит солнце!",
    "птички не улетают на юг!",
    "загораются звезды на небе!",
    "становится теплее!"
]
const holidays=[
    '8 марта 🌹',
    'международным женским днем 💐',
    'праздником 🌷'
]
const wishes=[
    'счастья в личной жизни!',
    'взаимопонимания с близкими!',
    'оставаться такой же как сейчас!',
    'достижения целей'
]
const templates=[
   [['ты -'], adjectives, nouns, whens, actions],
   [['поздравляю с'], holidays, ['Желаю'], wishes],
   [['ты -'], adjectives, nouns, ['Поздравляю тебя с'], holidays, ['Желаю тебе'], wishes]
]
const getRandomElement=(items)=>{
    const index=Math.floor(Math.random()*items.length)
    return items[index]
}
const getRandomWish=()=>{
    const text = []
    const phrases=getRandomElement(templates)
    for (let phrase of phrases){
        text.push(getRandomElement(phrase))
    }
    return text.join(' ')

}

module.exports={
    getRandomWish
}