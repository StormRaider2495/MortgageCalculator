import Mortgage from './mortgage';

document.getElementById('calcBtn').addEventListener('click', () => {
    let html = "",
        principal = document.getElementById("principal").value,
        years = document.getElementById("years").value,
        rate = document.getElementById("rate").value,
        mortgage = new Mortgage(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (rate / 12).toFixed(2);
    mortgage.amortization.forEach((year, index) => html += `
    <tr>
            <td>${index + 1}</td>
            <td class="currency">${Math.round(year.principalY)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                    </div>
                    <div class="bar interest"
                         style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                    </div>
                </div>
            </td>
            <td class="currency left">${Math.round(year.interestY)}</td>
            <td class="currency">${Math.round(year.balance)}</td>
        </tr>
    `);
    document.getElementById("amortizationTable").innerHTML = html;
    document.querySelectorAll("[hidden]").forEach((element, index) =>
        element.removeAttribute("hidden")
    );
});
