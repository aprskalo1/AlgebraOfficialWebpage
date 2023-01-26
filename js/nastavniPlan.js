$(() => {
    let autoCompPolje = [];
    let kolegijPolje = {};

    let Kolegij = {
        nazivKolegija: "",
        brojEcts: "",
        kolicinaSati: "",
        kolicinaPredavanja: "",
        kolicinaVjezbi: "",
        tipKolegija: ""
    };

    function PopuniTablicu(arg) {
        const tbody = document.querySelector("table tbody");
        const lastRow = tbody.querySelector("tr:last-child");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${arg.nazivKolegija}</td>
          <td>${arg.brojEcts}</td>
          <td>${arg.kolicinaSati}</td>
          <td>${arg.kolicinaPredavanja}</td>
          <td>${arg.kolicinaVjezbi}</td>
          <td>${arg.tipKolegija}</td>
          <td><button id="deleteRow" class="btn btn-danger">Obriši</button></td>
        `;
        tbody.insertBefore(newRow, lastRow);

        document.querySelector("#sumECTS").textContent = Number(document.querySelector("#sumECTS").textContent) + arg.brojEcts;
        document.querySelector("#sumHours").textContent = Number(document.querySelector("#sumHours").textContent) + arg.kolicinaSati;
        document.querySelector("#sumClass").textContent = Number(document.querySelector("#sumClass").textContent) + arg.kolicinaPredavanja;
        document.querySelector("#sumPrac").textContent = Number(document.querySelector("#sumPrac").textContent) + arg.kolicinaVjezbi;
    }

    fetch('https://www.fulek.com/data/api/supit/curriculum-list/hr', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.data.length; i++) {
                autoCompPolje.push(data.data[i]['kolegij']);
                kolegijPolje[data.data[i]['kolegij']] = i + 1;
            }
        })
        .catch(error => console.error('Error:', error));

    $('#kolegij_naziv').autocomplete({
        maxShowItems: 5,
        source: autoCompPolje,
        select: function (e, ui) {
            fetch(`https://www.fulek.com/data/api/supit/get-curriculum/${kolegijPolje[ui.item.label]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => response.json())
                .then(data => {
                    Kolegij.nazivKolegija = data.data.kolegij;
                    Kolegij.brojEcts = data.data.ects;
                    Kolegij.kolicinaSati = data.data.sati;
                    Kolegij.kolicinaPredavanja = data.data.predavanja;
                    Kolegij.kolicinaVjezbi = data.data.vjezbe;
                    Kolegij.tipKolegija = data.data.tip;
                    PopuniTablicu(Kolegij);
                })
                .catch(error => console.error('Error:', error));
        }
    });

    var kolegijNaziv = document.getElementById('kolegij_naziv');
    kolegijNaziv.addEventListener('click', function () {
        this.value = "";
    });

    var table = document.querySelector('table');
    table.addEventListener('click', function (event) {
        if (event.target.id === 'deleteRow') {
            var currentRow = event.target.closest("tr");
            var sumECTS = document.getElementById('sumECTS');
            sumECTS.textContent = Number(sumECTS.textContent) - Number(currentRow.querySelectorAll("td")[1].textContent);
            var sumHours = document.getElementById('sumHours');
            sumHours.textContent = Number(sumHours.textContent) - Number(currentRow.querySelectorAll("td")[2].textContent);
            var sumClass = document.getElementById('sumClass');
            sumClass.textContent = Number(sumClass.textContent) - Number(currentRow.querySelectorAll("td")[3].textContent);
            var sumPrac = document.getElementById('sumPrac');
            sumPrac.textContent = Number(sumPrac.textContent) - Number(currentRow.querySelectorAll("td")[4].textContent);
            currentRow.remove();
        }
    });
});