chrome.idle.setDetectionInterval(1500)

chrome.idle.onStateChanged.addListener(newState => {
    newState === 'active'
        ? (console.log('alarm on'),
        chrome.alarms.create('working', {delayInMinutes: 30, periodInMinutes: 30}))
        : chrome.alarms.clear('working', () => console.log('alarm cleared'))
})

//notification stuff goes in here
chrome.alarms.onAlarm.addListener(async alarm => {
    console.log('alarm!', alarm)
    try {
        let quote = await findQuote()
    } catch(error) {
        let quote = 'Fix me, Ben! Gosh.'
    }
    chrome.notifications.create({
        message: quote,
        priority: 2,
        title: 'Gandalf Says',
        type: 'basic'
    })
    //callback function may be required. unclear
})

//add browser action to generate quote (notification? or popup in this case?) on click

const findQuote = () => {
    fetch("https://type.fit/api/quotes")
    .then(parseJSON)
    .then(formatNote)
}

const parseJSON = response => response.json()

const dfhaformatNote = (text, author) => {
    return `${text}\n   - ${author}`
}
const formatNote = (data) => {
    return `${data.text}\n   - ${data.author}`
}