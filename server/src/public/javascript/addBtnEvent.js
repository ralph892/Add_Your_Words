const addBtn = document.querySelector('#add-btn');
const defContainer = document.querySelector('#def-container');

const handleAddBtnEvent = addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const labelDef = document.createElement('label');
    labelDef.innerText = 'Definitions';
    labelDef.classList.add('fw-bold');
    const def = document.createElement('input');
    def.type = 'text';
    def.name = "definitions";
    def.required = 'true';
    const labelVn = document.createElement('label');
    labelVn.innerText = 'Vietnamese';
    labelVn.classList.add('fw-bold');
    const vn = document.createElement('input');
    vn.type = 'text';
    vn.name = "vietnamese";
    vn.required = 'true';
    defContainer.appendChild(labelDef);
    defContainer.appendChild(def);
    defContainer.appendChild(labelVn);
    defContainer.appendChild(vn);
});