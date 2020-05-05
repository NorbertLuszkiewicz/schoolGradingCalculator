import '../sass/style.scss';


const addAllSubjects = document.querySelector(".topbar__add-all-subjects");
const allAverageSubjects = document.querySelector(".topbar__average-subjects");
const container = document.querySelector(".subjects");
const AllSubjectScoreContainer = document.querySelector(".topbar__score");
const nameSubject = document.querySelector(".topbar__add-name");
const buttonAdderSubject = document.querySelector(".topbar__adder-subject");
const errorBoxSubject = document.querySelector(".error-box__subject");
const errorBoxName = document.querySelector(".error-box__name");


//Table containing grades and their values

const scaleGrade = ["1","+1","1+","-2","2-","2","+2","2+","-3","3-","3","+3","3+","-4","4-","4","+4","4+","-5","5-","5","+5","5+","-6","6-","6","+6","6+"]

const scaleGradeNumber = ["1","1.5","1.5","1.75","1.75","2","2.5","2.5","2.75","2.75","3","3.5","3.5","3.75","3.75","4","4.5","4.5","4.75","4.75","5","5.5","5.5","5.75","5.75","6","6.5","6.5"]


function subjectsCreator (name){

    if(name.length > 1){
    const containerSubject = document.createElement("div");
    const subjectName = document.createElement("div");

    containerSubject.classList.add("subjects__container");
    subjectName.classList.add("subjects__name");

    subjectName.innerText = name;

    const deliteSubjectButton = document.createElement("button");
    deliteSubjectButton.classList.add("subjects__delite-button");
    deliteSubjectButton.innerText = "X";
    
    const gradeAndStrengthBox = document.createElement("form");
    
    gradeAndStrengthBox.innerHTML = `<p class="subjects__box-text">Ocena: </p>
    <input type="string" class="subjects__value">
    <p class="subjects__box-text">Waga: </p>
    <input type="number" class="subjects__value subjects__strength">`
    gradeAndStrengthBox.classList.add("subjects__box");

    const createSubjectButton = document.createElement("button");
    createSubjectButton.classList.add("subjects__create-subject");
    createSubjectButton.innerText = "+";

    const subjectScore = document.createElement("div");
    subjectScore.classList.add("subjects__score")
    subjectScore.innerText = "0"


    container.appendChild(containerSubject);
    containerSubject.appendChild(subjectName);
    containerSubject.appendChild(deliteSubjectButton);
    containerSubject.appendChild(gradeAndStrengthBox);
    containerSubject.appendChild(createSubjectButton);
    containerSubject.appendChild(subjectScore);

    //delite Subject function

    containerSubject.addEventListener("click", (e) => {
        
        if (e.target.closest(".subjects__delite-button") !== null) {
            e.target.closest(".subjects__container").remove();
        }
    })

    let counter = 0
    let meter = 0

 
    createSubjectButton.addEventListener("click", (e) => {
        let numberValue = e.target.parentElement.children[2].children[1]
        let numberStrength = e.target.parentElement.children[2].children[3]
        let strengthValue = numberStrength.value
        let scaleSub = scaleGrade.indexOf(numberValue.value) 
        let valueScaleSub = scaleGradeNumber[scaleSub]

        if(scaleSub !== -1){
            if(numberStrength.value == "" || numberStrength.value < 1 ){
                strengthValue = 1
            }
            
             meter = parseFloat(meter) + parseInt(strengthValue);
  
             gradeCreator(numberValue.value, strengthValue,containerSubject, valueScaleSub);
            
            
        
             counter +=  parseFloat(valueScaleSub)* parseInt(strengthValue);
            const roundScore =  Number(Math.round(parseFloat(counter)  / meter + 'e+2') + 'e-2');
            
            subjectScore.innerText = roundScore;
            
    }
        else{
        const errorTextRate = "Wprowadzono błędną ocene"
            error(errorBoxSubject, errorTextRate)
    }
        
        numberStrength.value = "";
        numberValue.value = "";
    })
    

}else{
    const errorTextName = "Nazwa przedmiotu musi zawierać przynajmniej 2 litery";
    error(errorBoxSubject, errorTextName)
}


}

function gradeCreator (number, strength, area, value){
    const gradeWrapper = document.createElement("div");
    gradeWrapper.classList.add("subjects__grade-wraper");
    gradeWrapper.innerHTML = `<p class="subjects__grade-number">${number} </p>
    <p class="subjects__grade-strength">waga: ${Math.round(strength)}</p>`
    addColor(value, gradeWrapper);
    area.appendChild(gradeWrapper);
}


buttonAdderSubject.addEventListener("submit", function(e) {
    e.preventDefault();
    subjectsCreator(nameSubject.value);
    nameSubject.value = "";
})

function error(Area, text){
    if(Area.children.length < 1){
    const errorMess = document.createElement("div")
    errorMess.classList.add("subjects__error")
    errorMess.innerText = text;
    Area.appendChild(errorMess)
    window.setTimeout( ()=> {
        errorMess.remove()
    },10000)
}
}



function AddAllSubject(){
    if(container.children.length < 5){
        subjectsCreator('Biologia');
        subjectsCreator('Chemia');
        subjectsCreator('EDB');
        subjectsCreator('Fizyka');
        subjectsCreator('Geografia');
        subjectsCreator('Historia');
        subjectsCreator('Język angielski');
        subjectsCreator('Język niemiecki');
        subjectsCreator('Język polski');
        subjectsCreator('Matematyka');
        subjectsCreator('Muzyka');
        subjectsCreator('Plastyka');
        subjectsCreator('Religia');
        subjectsCreator('WDŻ');
        subjectsCreator('WOS');
        subjectsCreator('Wychowanie fizyczne');

    }else{
        const errorText = "Nie można dodać wszystkich przedmiotów szkolnych. Ta opcja jest dostępna tylko przy maksymalnie 4 dodanych przedmiotach szkolnych"

        error(errorBoxName, errorText)
    }
}

let additioner = 0;

function metricAverage() {
    let average = document.querySelectorAll(".subjects__score")
    let adderChanger = average.length

    average.forEach(element => {
        const ElValue = parseFloat(element.innerText)
        additioner = (ElValue + additioner)
        if(ElValue == 0){
          adderChanger =  parseFloat(adderChanger) - 1
        }
        return additioner;
    });

    let result = additioner/ adderChanger;
    
    if(result > 0 ){
        AllSubjectScoreContainer.innerText = Number(Math.round(result + 'e+2') + 'e-2');
    }else{
        AllSubjectScoreContainer.innerText = 0;
    }
    additioner = 0;
}




function addColor(digit, element){
    if(digit < 2){
        element.style.border = "4px solid red";
    }else if (digit >= 2 && digit < 3){
        element.style.border = "4px solid orange";
    }else if (digit >= 3 && digit < 4){
        element.style.border = "4px solid yellow";
    }else if (digit >= 4 && digit < 5){
        element.style.border = "4px solid lightgreen";
    }else if(digit >= 5 && digit < 6){
        element.style.border = "4px solid rgb(10, 172, 10)";
    }else{
        element.style.border = "4px solid green";
    }
}






allAverageSubjects.addEventListener("click", metricAverage)
addAllSubjects.addEventListener("click", AddAllSubject)





