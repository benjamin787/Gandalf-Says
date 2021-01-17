//alarm turns on when active tab changes - need way to note inactivity to turn off
chrome.tabs.onActivated.addListener(() => {
    chrome.alarms.get('working', alarm => {
        if (!alarm) {
            chrome.alarms.create('working', {delayInMinutes: 30, periodInMinutes: 30})
        }
    })
})

// chrome.alarms.clear('waiting', () => {

// })



//notification stuff goes in here
chrome.alarms.onAlarm.addListener(alarm => {
    console.log('alarm!', alarm)
})

//add browser action to generate quote (notification? or popup in this case?) on click