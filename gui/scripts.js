document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valueForm');
    const tableBody = document.querySelector('#valuesTable tbody');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            objectName: formData.get('objectName'),
            address: formData.get('address'),
            purchaseDate: formData.get('purchaseDate'),
            purchasePrice: formData.get('purchasePrice'),
            currentValue: formData.get('currentValue'),
            incomeFromRents: formData.get('incomeFromRents')
        };

        fetch('/api/values', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchData();
                form.reset();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function fetchData() {
        fetch('/api/values')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.objectName}</td>
                    <td>${item.address}</td>
                    <td>${item.purchaseDate}</td>
                    <td>${item.purchasePrice}</td>
                    <td>${item.currentValue}</td>
                    <td>${item.incomeFromRents}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    fetchData();
});
