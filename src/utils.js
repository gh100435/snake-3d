export const randNum = (n) => {
    return Math.floor(Math.random() * n);
}

export const Maximum = (...numbers) => {
    let max = numbers[0];
    let i;
    for(i = 0; i < numbers.length; i++) {
        if(numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}