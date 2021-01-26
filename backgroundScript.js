const sendNote = quote => {
    chrome.notifications.create({
        title: 'Gandalf Says',
        message: quote,
        iconUrl: '/gandalf.jpg',
        priority: 2,
        type: 'basic'
    }, notificationId => notificationId
    )
}

const formatNote = (data) => {
    let i = Math.floor(Math.random() * 1643)
    return `${data[i].text}\n   - ${data[i].author}`
}

const parseJSON = response => response.json()


const findQuote = () => {
    fetch('https://type.fit/api/quotes')
    .then(parseJSON)
    .then(formatNote)
    .then(sendNote)
}

const stopAlarm = newState => {
    if (newState !== 'active')
        chrome.alarms.clear('working', () => console.log('alarm cleared'))
}

const startAlarm = () => {
    chrome.alarms.create('working', {delayInMinutes: 30, periodInMinutes: 30})
    console.log('alarm created')
}

const checkAlarm = activeInfo => {
    chrome.alarms.get('working', alarm => {
        if (!alarm) startAlarm()
    })
}

chrome.tabs.onActivated.addListener(checkAlarm)

chrome.idle.setDetectionInterval(1500)

chrome.idle.onStateChanged.addListener(stopAlarm)

chrome.alarms.onAlarm.addListener(findQuote)