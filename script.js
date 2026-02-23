let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const modeAll = document.getElementById("modeAll");
const modeInterview = document.getElementById("modeInterview");
const modeRejected = document.getElementById("modeRejected");

const allCardsSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");
function allCountAll(){
    const allCards = allCardsSection.querySelectorAll(".cards");
    let count = 0;
    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].classList.contains("hidden")) {
            count++;
        }
    }
    return count
}
function calculateCount() {
    const allCards = allCardsSection.querySelectorAll(".cards");
    let count = 0;
    for (let i = 0; i < allCards.length; i++) {
        if (!allCards[i].classList.contains("hidden")) {
            count++;
        }
    }

    const allTotalCountElements = document.querySelectorAll("#totalCount");

    for (let i = 0; i < allTotalCountElements.length; i++) {
        let currentElement = allTotalCountElements[i];
        currentElement.innerText = count;
    }

    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function toggleStyle(id) {
    modeAll.classList.add("btn-secondary");
    modeInterview.classList.add("btn-secondary");
    modeRejected.classList.add("btn-secondary");

    modeAll.classList.remove("btn-primary");
    modeInterview.classList.remove("btn-primary");
    modeRejected.classList.remove("btn-primary");

    const selected = document.getElementById(id);
    selected.classList.remove("btn-secondary");
    selected.classList.add("btn-primary");
    empty = document.querySelector("#empty")
    if (id == "modeInterview") {
        if (interviewList==''){
            empty.classList.remove("hidden")
            
        }else{
            empty.classList.add("hidden")
        }
        allCardsSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderInterview();
    } else if (id == "modeAll") {
        let allCount = allCountAll()
        console.log(allCount)
        if (allCount==0){
            empty.classList.remove("hidden")
            
        }else{
            empty.classList.add("hidden")
        }
        allCardsSection.classList.remove("hidden");
        filterSection.classList.add("hidden");
    } else if (id == "modeRejected") {
        if (rejectedList==''){
            empty.classList.remove("hidden")
            
        }else{
            empty.classList.add("hidden")
        }
        allCardsSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderRejected();
    }
}

mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("btnInterview")) {
        const parentNode = event.target.parentNode.parentNode;
        const company = parentNode.querySelector(".company").innerText;
        const position = parentNode.querySelector(".position").innerText;
        const jobDescription = parentNode.querySelector(".jobDescription").innerText;
        const aim = parentNode.querySelector(".aim").innerText;
        const statusBtn = parentNode.querySelector(".status");
        statusBtn.innerText = "Interview";
        const cardInfo = {
            company,
            position,
            jobDescription,
            status: "Interview",
            aim,
        };

        
        const jobExist = interviewList.find(item => item.company == cardInfo.company);

        if (jobExist) {
            interviewList = interviewList.filter(item => item.company != cardInfo.company);
        } else {
            interviewList.push(cardInfo);
        }

        // Removing from rejected list when added to interview
        rejectedList = rejectedList.filter(item => item.company != cardInfo.company);

        calculateCount();
        renderInterview();

    } else if (event.target.classList.contains("btnRejected")) {
        const parentNode = event.target.parentNode.parentNode;
        const company = parentNode.querySelector(".company").innerText;
        const position = parentNode.querySelector(".position").innerText;
        const jobDescription = parentNode.querySelector(".jobDescription").innerText;
        const aim = parentNode.querySelector(".aim").innerText;
        
        const statusBtn = parentNode.querySelector(".status");
        statusBtn.innerText = "Rejected";
        const cardInfo = {
            company,
            position,
            jobDescription,
            status: "Rejected",
            aim,
        };

        const jobExist = rejectedList.find(item => item.company == cardInfo.company);

        if (jobExist) {
            rejectedList = rejectedList.filter(item => item.company != cardInfo.company);
        } else {
            rejectedList.push(cardInfo);
        }

        // Remove from interview list when added to rejected
        interviewList = interviewList.filter(item => item.company != cardInfo.company);

        calculateCount();
        renderRejected();
    }
    else if (event.target.classList.contains("delete") || event.target.classList.contains("fa-trash-can")) {
        const parentNode = event.target.closest(".cards");
        parentNode.classList.add("hidden");
        calculateCount();
    }
});
function renderInterview() {
    filterSection.innerHTML = "";

    for (let interview of interviewList) {
        let div = document.createElement("div");
        div.className = "cards flex justify-between border bg-neutral";
        div.innerHTML = `
            <!-- cp 1 -->
            <div class="p-8 space-y-2">
                <h1 class="company text-2xl">${interview.company}</h1>
                <p class="position text-gray-400">${interview.position}</p>
                <p class="jobDescription text-gray-400">${interview.jobDescription}</p>
                <button class="status btn btn-ghost border border-white">${interview.status}</button>
                <p class="aim">${interview.aim}</p>
                <div class="">
                    <button class="btnInterview btn border-green-500 text-accent">Interview</button>
                    <button class="btnRejected btn border-red-500 text-red-600">Rejected</button>
                </div>
            </div>
            <!-- cp 2 -->
            <div>
                <button class="delete text-red-600 p-7"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;

        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = "";

    for (let rejected of rejectedList) {
        let div = document.createElement("div");
        div.className = "cards flex justify-between border bg-neutral";
        div.innerHTML = `
            <!-- cp 1 -->
            <div class="p-8 space-y-2">
                <h1 class="company text-2xl">${rejected.company}</h1>
                <p class="position text-gray-400">${rejected.position}</p>
                <p class="jobDescription text-gray-400">${rejected.jobDescription}</p>
                <button class="status btn btn-ghost border border-white">${rejected.status}</button>
                <p class="aim">${rejected.aim}</p>
                <div class="">
                    <button class="btnInterview btn border-green-500 text-accent">Interview</button>
                    <button class="btnRejected btn border-red-500 text-red-600">Rejected</button>
                </div>
            </div>
            <!-- cp 2 -->
            <div>
                <button class="delete text-red-600 p-7"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;

        filterSection.appendChild(div);
    }
}