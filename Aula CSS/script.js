function updatePadding() {
    const val = document.getElementById('padding').value;
    document.getElementById('paddingValue').textContent = val;
    document.getElementById('myDiv').style.padding = val + 'px';
}

function updateBorder() {
    const val = document.getElementById('border').value;
    document.getElementById('borderValue').textContent = val;
    document.getElementById('myDiv').style.border = val + 'px solid black';
}

function updateMargin() {
    const val = document.getElementById('margin').value;
    document.getElementById('marginValue').textContent = val;
    document.getElementById('myDiv').style.margin = val + 'px';
}