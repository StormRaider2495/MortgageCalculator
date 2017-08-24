export default class Mortgage {

    constructor(principal, years, rate) {
        this.principal = principal;
        this.years = years;
        this.rate = rate;
    }

    get monthlyPayment() {
        let monthlyRate;
        monthlyRate = this.rate / 100 / 12;
        return this.principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), this.years * 12)));
    };

    get amortization() {
        let monthlyPayment = this.monthlyPayment,
            monthlyRate = this.rate / 100 / 12,
            balance = this.principal,
            amortization = [];
        for (let y = 0; y < this.years; y++) {
            let interestY = 0,  //Interest payment for year y
                principalY = 0; //Principal payment for year y
            for (let m = 0; m < 12; m++) {
                let interestM = balance * monthlyRate,        //Interest payment for month m
                    principalM = monthlyPayment - interestM; //Principal payment for month m
                interestY = interestY + interestM;
                principalY = principalY + principalM;
                balance = balance - principalM;
            }
            amortization.push({ principalY, interestY, balance });
        }       
        return amortization;
    };

}

// export let calculateMonthlyPayment = (principal, years, rate) => {
//     let monthlyRate, monthlyPayment;
//     if (rate) {
//         monthlyRate = rate / 100 / 12;
//     }
//     monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
//     return { principal, years, rate, monthlyRate, monthlyPayment };
// };

// export let calculateAmortization = (principal, years, rate) => {
//     let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
//     let balance = principal;
//     let amortization = [];
//     for (let y = 0; y < years; y++) {
//         let interestY = 0;  //Interest payment for year y
//         let principalY = 0; //Principal payment for year y
//         for (let m = 0; m < 12; m++) {
//             let interestM = balance * monthlyRate;       //Interest payment for month m
//             let principalM = monthlyPayment - interestM; //Principal payment for month m
//             interestY = interestY + interestM;
//             principalY = principalY + principalM;
//             balance = balance - principalM;
//         }
//         amortization.push({ principalY, interestY, balance });
//     }
//     return { monthlyPayment, monthlyRate, amortization };
// };