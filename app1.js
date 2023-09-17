function solution(S) {
    const letters = ['B', 'A', 'N', 'A', 'N', 'A']
    let count = 0
    S = [...S]
    console.log(S)
    while (1) {
        let pattern = ''
        for (let i = 0; i < letters.length; i++) {
            let indexCharacter = S.indexOf(letters[i])
            if (indexCharacter !== -1) {
                pattern += S[indexCharacter]
                S.splice(indexCharacter, 1)
            }
        }
        if (pattern === 'BANANA') {
            count++
        } else {
            break
        }
    }
    return count
}

console.log(solution('QABAAAWOBL'))