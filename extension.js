let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const leadsInStore = JSON.parse(localStorage.getItem("myLeads"))
const saveTab = document.getElementById("tab-btn")

saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push( tabs[0].url )
        inputEl.value = ''
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)  
    })
})

if (leadsInStore) {
    myLeads = leadsInStore
    render(myLeads)
}

delBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let list = ""
    for (let i = 0; i < leads.length; i++) {
    list += `<li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `
}
ulEl.innerHTML = list
}

