
const form = document.getElementById('initiativeForm');
const initiativesContainer = document.getElementById('initiativesContainer');
const initiativeNameInput = document.getElementById('initiativeName');
const initiativeLocationInput = document.getElementById('initiativeLocation');
const initiativeDateInput = document.getElementById('initiativeDate');

let initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];

function renderInitiatives() {
    initiativesContainer.innerHTML = '';

    if (initiatives.length === 0) {
        initiativesContainer.innerHTML = '<p style="color: #778899; grid-column: 1 / -1; text-align: center;">لا توجد مبادرات مسجلة حالياً. أضف مبادرة جديدة للبدء.</p>';
        return;
    }

    initiatives.forEach((initiative, index) => {
        const card = document.createElement('div');
        card.classList.add('initiative-card');

        card.innerHTML = `
            <h3>${initiative.name}</h3>
            <p><strong>المكان:</strong> ${initiative.location}</p>
            <p><strong>التاريخ:</strong> ${initiative.date}</p>
            <div class="card-actions">
                <span class="status-badge">قيد التنظيم</span>
                <button class="btn-delete" onclick="deleteInitiative(${index})">حذف</button>
            </div>
        `;

        initiativesContainer.appendChild(card);
    });
}
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const newInitiative = {
        name: initiativeNameInput.value,
        location: initiativeLocationInput.value,
        date: initiativeDateInput.value
    };

    initiatives.push(newInitiative);
    
   
    localStorage.setItem('initiatives', JSON.stringify(initiatives));

    
    form.reset();

   
    renderInitiatives();
});

function deleteInitiative(index) {
    initiatives.splice(index, 1);
    localStorage.setItem('initiatives', JSON.stringify(initiatives));
    renderInitiatives();
}

renderInitiatives();