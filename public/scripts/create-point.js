function populateUFs() {
    const ufSelect = document.querySelector("select[name='uf']")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => {
            return res.json();
        })
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
}

populateUFs();

function getCitys(event) {
    const citySelect = document.querySelector("select[name='city']");
    const stateInput = document.querySelector("input[name='state']");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML += `<option value=''>Selecione a cidade</option>`;
    citySelect.disabled = true;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then(citys => {

            for (const city of citys) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citySelect.disabled = false;
        })
}

document.querySelector("select[name='uf']").addEventListener("change", getCitys);


const itensToColeted = document.querySelectorAll(".itens-grid li");

for (const item of itensToColeted) {
    item.addEventListener("click", handleSelectedItens)
}

const colectedItens = document.querySelector("input[name='itens']");
let itensSelected = [];

function handleSelectedItens(event) {

    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itensId = itemLi.dataset.id;

    const alreadySelected = itensSelected.findIndex(item => {
        const itemFound = item == itensId
        return itemFound;
    })

    if(alreadySelected >= 0) {
        const filterAdd = itensSelected.filter(item => {
            const itemIsDiference = item != itensId
            return itemIsDiference;
        })

        itensSelected = filterAdd;
    } else {
        itensSelected.push(itensId);
    }
    colectedItens.value = itensSelected;
}

