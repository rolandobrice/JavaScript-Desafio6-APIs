// Elemntos del DOM
const valor_input = document.getElementById("myinputValor")
const selec_coins = document.getElementById("SeleccionarMoneda")
const btn_Buscar = document.getElementById("botonBuscar")
const result = document.getElementById("resultado")
const chart_Coins = document.getElementById('myChartCoins');
let myChart

const cover_monedas = (moneda) => {
    const route = `https://mindicador.cl/api/${moneda}`

    fetch(route)
        .then(response => {
            return response.json()
    })
        .then(data => {
            return data.serie
    })
    .then(dataV => {
        calculatecoins(Number(dataV[0].valor))
            DisplayGraph(dataV)
    })
        .catch(error => {
            result.innerHTML = "Error:" + error
    })
}

const calculatecoins = (Vmoneda) => {
    let conversionresults

    if (Number(valor_input.value)) {
        conversionresults = Number(valor_input.value) / Vmoneda
        result.innerHTML = conversionresults.toFixed(2)
    } else {
        alert("No ingresó un valor")
    }
}

const DisplayGraph = (dataVconseguida) => {
    let arrayfecha = []
    let arraycoins = []
    let i = 0

    dataVconseguida.forEach(element => {
        if (i < 10) {
            let fecha = new Date(element.fecha)
            let fechalabel = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()
            arrayfecha.push(fechalabel)
            arraycoins.push(element.valor)
        }
        i++
    })

    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(chart_Coins, {
        type: 'line',
        data: {
            labels: arrayfecha,
            datasets: [{
            label: 'Últimos 10 días del valor de la moneda',
            data: arraycoins,
            borderColor: "rgb(164, 187, 10)",
            borderWidth: 3
        }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
        }
        }
    });
}

btn_Buscar.addEventListener("click", () => {cover_monedas(selec_coins.value)})