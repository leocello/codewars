function getFromPair(n1, n2) {
    return n1 == n2 ? n1 : 'RGB'.replace(n1, '').replace(n2, '');
}

function triangle(row) {
    if (row.length === 1) {
        return row;
    }

    let reduced = '';
    let exp = 0;

    while (3 ** exp < row.length) {
        exp++;
    }
    exp--;

    let powered = 3 ** exp;
    let diff = row.length - ((3 ** exp) + 1);

    for (let i = 0; i <= diff; i++) {
        reduced += getFromPair(row[i], row[i+powered]);
    }

    return triangle(reduced);
}