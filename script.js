var table = document.getElementById('inputTable')
var students = [
    student = {
        name: 'คุณลุง',
        email: 'a@B.com',
        gender: 'ชาย'
    },
    {
        name: 'คุณลุง',
        email: 'a@B.com',
        gender: 'ชาย'
    },
    {
        name: 'คุณลุง',
        email: 'a@B.com',
        gender: 'ชาย'
    }
]

function addRow(container, key, value) {
    let row = document.createElement('div')
    row.classList.add('row')
    let columName = document.createElement('div')
    columName.classList.add('col-1')
    columName.classList.add('offset-1')
    columName.innerText = key
    let columValue = document.createElement('div')
    columValue.classList.add('col')
    columValue.innerHTML = value;
    row.appendChild(columName)
    row.appendChild(columValue)
    container.appendChild(row)

}
function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
    profileElem.setAttribute('width', '80em')

}
var count = 1;
function addTable(index, student) {
    const tableBody = document.getElementById('inputTable')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)

    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)

    cell = document.createElement('td')
    cellbeforeImg = document.createElement('div')
    cellbeforeImg.classList.add('img-fluid')
    let img = document.createElement('img')
    img.setAttribute('src', student.image)
    img.setAttribute('width', '60em')
    img.classList.add('img-thumbnail')
    cellbeforeImg.appendChild(img)
    cell.appendChild(cellbeforeImg)
    row.appendChild(cell)

    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'delete'
    button.addEventListener('click', function () {
        let confirmButton = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if (confirmButton) {
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.addEventListener('click', function () {
        showStudentBlocks(student)
    })
    row.appendChild(cell)

    tableBody.appendChild(row)
}

function addStudentList(studentList) {
    let counter = 1
    const tableBody = document.getElementById('inputTable')
    tableBody.innerHTML = ''
    for (student of studentList) {
        addTable(counter++, student);
    }
}


document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then(response => {
            return response.json()
        }).then(student => {
            showStudentBlocks(student)
        })
})

function OnLoad() {
    showAllStudentBlock()
}

function addStudentToDB(student) {
    fetch(`https://dv-student-backend-2019.appspot.com/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
        showAllStudent()
    })
}

function deleteStudent(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudent()
    }).catch(error => {
        alert('your input student id is not in the database')
    })
}

function onAddStudentClick() {
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}

function showAllStudent() {
    fetch(`https://dv-student-backend-2019.appspot.com/students`)
        .then(response => {
            return response.json()
        }).then(data => {
            addStudentList(data)
        })
}

var singleStudentResult = document.getElementById('sinigle_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetails = document.getElementById('formAddStudent')

function hideAll() {
    singleStudentResult.style.display = 'none'
    listStudentResult.style.display = 'none'
    addUserDetails.style.display = 'none'
}

document.getElementById('allStudentMenu').addEventListener('click', (event) => {
    showAllStudentBlock()

})

document.getElementById('addStudentMenu').addEventListener('click', (event) => {
    hideAll()
    addUserDetails.style.display = 'block'
})

function showStudentBlocks(student) {
    hideAll()
    singleStudentResult.style.display = 'block'
    addStudentData(student)
}

function showAllStudentBlock() {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudent()
}
