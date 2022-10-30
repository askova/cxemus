function customLogic() {
    let nameTimer = null;
    console.log('.custom logic:');
    // console.log('\t\t Custom logic at init...');

    nameTimer = "\t\t.arrow-shafts styling"
    console.time(nameTimer);
    let pattern = '^(WB|P/P|SOCKETS)'
    arrowshaftsStyling(pattern);
    console.timeEnd(nameTimer);
}

function arrowshaftsStyling(pattern) {
    // sum dash array
    let defs = document.querySelector('defs');
    let element = document.createElementNS(xmlns, 'g');  // "xmlns" from basic.js
        element.classList.add('arrow_split')
    defs.appendChild(element);
    let dasharray = getComputedStyle(element).strokeDasharray 
    // "100% 4px, 10px, 4px, 10px, 4px, 10px, 4px, 10px, 4px, 10px, 4px, 10px, 4px, 10px, 4px"
    let s = dasharray.slice(6).replaceAll('px', '').replaceAll(' ', '');
    // "4,10,4,10,4,10,4,10,4,10,4,10,4,10,4"
    let separator = ','
    let points = s.split(separator)
    let sum = points.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    let dotted_line_size = sum;

    // let dotted_line_size = 102;
    let regex = new RegExp(pattern, 'g');
    let devices = document.querySelectorAll('.device');
    let line_size = null, dashoffset = 0;
	for (const device of devices) {
        regex.lastIndex = 0
        if (regex.test(id_decoder(device.id))) {
            for (const line of device.querySelectorAll('.arrow-shaft')) {
                line.classList.add('arrow_split');
                line_size = Math.abs(line.getAttribute('x1')) + Math.abs(line.getAttribute('x2'));
                dashoffset = (line_size + dotted_line_size) / 2;
                line.setAttribute('style', `stroke-dashoffset: -${dashoffset};`);
            }
        }
    }
}
