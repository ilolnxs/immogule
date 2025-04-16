document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('valueForm');
    const tableBody = document.querySelector('#valuesTable tbody');
    const detailModal = document.getElementById('detailModal');
    const closeModal = document.querySelector('.close');
    const objectDetails = document.getElementById('objectDetails');

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
                row.addEventListener('click', function() {
                    fetchDetailData(item.id);
                });
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function fetchDetailData(id) {
        fetch(`/api/values/${id}`)
        .then(response => response.json())
        .then(data => {
            objectDetails.innerHTML = `
                <p><strong>Object Name:</strong> ${data.objectName}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>Purchase Date:</strong> ${data.purchaseDate}</p>
                <p><strong>Purchase Price:</strong> ${data.purchasePrice}</p>
                <p><strong>Current Value:</strong> ${data.currentValue}</p>
                <p><strong>Income from Rents:</strong> ${data.incomeFromRents}</p>
            `;
            detailModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    closeModal.addEventListener('click', function() {
        detailModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == detailModal) {
            detailModal.style.display = 'none';
        }
    });

    fetchData();
});
