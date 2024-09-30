function adaptTable() {
    const table = document.getElementById('cust-table');
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerText);
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    if (document.getElementById('cardContainer')) return;

    const cardContainer = document.createElement('div');
    cardContainer.id = 'cardContainer';

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const card = document.createElement('div');
        card.className = 'card-table';

        cells.forEach((cell, index) => {
            const cardRow = document.createElement('div');
            const label = document.createElement('div');
            label.className = 'label';
            label.innerText = headers[index];
            const value = document.createElement('div');
            value.innerText = cell.innerText;

            cardRow.appendChild(label);
            cardRow.appendChild(value);
            card.appendChild(cardRow);
        });

        const lastCardRow = card.lastChild;
        const lastValue = lastCardRow.querySelector('div:last-child');

        lastValue.classList.add('status');
        if (lastValue.innerText.toLowerCase() === 'active') {
            lastValue.classList.add('act');
        } else if (lastValue.innerText.toLowerCase() === 'inactive') {
            lastValue.classList.add('inact');
        }

        cardContainer.appendChild(card);
    });

    // Додаємо картки на сторінку
    table.parentNode.insertBefore(cardContainer, table);
    table.style.display = 'none';
}

function restoreTable() {
    const table = document.getElementById('cust-table');
    table.style.display = '';
    const cardContainer = document.getElementById('cardContainer');
    if (cardContainer) {
        cardContainer.remove();
    }
}

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        adaptTable();
    } else {
        restoreTable();
    }
}

window.onload = checkScreenSize;
window.onresize = checkScreenSize;
