const toDoList = document.querySelector('#lista-tarefas');
const fontSizeButton = '50px';
const googleIcons = 'material-icons-outlined';

/* cria um evento de click pra deletar o item selecionado */
function deleteSelected() {
  const btnDelete = document.querySelector('#remover-selecionado');
  btnDelete.addEventListener('click', () => {
    document.querySelector('.selected').remove();
  });
}

/* adiciona style ao botão deletar */
function styleDeleteSelected() {
  const button = document.querySelector('#remover-selecionado');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'clear';
  newSpans.style.color = 'white';
  newSpans.style.marginRight = '10px';
  button.appendChild(newSpans);
}
/* Cria um botão com a função de deletar um item */
function deleteItem() {
  const selected = document.querySelector('.selected');
  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'styleBtn';
  buttonDelete.id = 'remover-selecionado';
  selected.appendChild(buttonDelete);
  styleDeleteSelected();
  deleteSelected();
}
/* verifica os itens da lista que não estão selecionado, remove a classe selected, remove o botão de deletar item  */
function resetColor() {
  const list = document.querySelectorAll('.list');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].className.includes('selected')) {
      list[index].style.backgroundColor = null;
      list[index].classList.remove('selected');
      document.querySelector('#remover-selecionado').remove();
    }
  }
}
/* cria um evento de click, verifica se o item clicado tem a cor de fundo rgb(128, 128, 128)
chama a função resetColor, adiciona a classe selected, cor de fundo rgb(128, 128, 128) e o botão de delete no intem clicado, */
function changeColor() {
  const list = document.querySelectorAll('.list');
  for (let index = 0; index < list.length; index += 1) {
    list[index].addEventListener('click', () => {
      if (list[index].style.backgroundColor !== 'rgb(128, 128, 128)') {
        resetColor();
        list[index].classList.add('selected');
        list[index].style.backgroundColor = 'rgb(128, 128, 128)';
        deleteItem();
      }
    });
  }
}
/* captura o value do iput e cria uma li com o value capturado, chama a função changeColor para o item ser reconhecido
depois de criada */
function newList() {
  const button = document.querySelector('#criar-tarefa');
  const text = document.querySelector('#texto-tarefa');
  button.addEventListener('click', () => {
    if (text.value.length > 0) {
      const creatLi = document.createElement('li');
      creatLi.className = 'list';
      creatLi.innerHTML = text.value;
      toDoList.appendChild(creatLi);
      text.value = null;
      changeColor();
    }
  });
}
newList();

function newListKeyup() {
  const text = document.querySelector('#texto-tarefa');
  text.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && text.value.length > 0) {
      const creatLi = document.createElement('li');
      creatLi.className = 'list';
      creatLi.innerHTML = text.value;
      toDoList.appendChild(creatLi);
      text.value = null;
      changeColor();
    }
  });
}
newListKeyup();
/* cria um evento de double click, adiciona ou remove a classe completed */
function scratchTask() {
  document.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('list')) {
      if (event.target.className.includes('completed')) {
        event.target.classList.remove('completed');
      } else {
        event.target.classList.add('completed');
      }
    }
  }, false);
}
scratchTask();
/* cria um evento de click para deletar a lista completa */
function deleteList() {
  const button = document.querySelector('#apaga-tudo');
  button.addEventListener('click', () => {
    toDoList.replaceChildren();
  });
}
deleteList();
/* cria um evento de click para deletar todas as tarefas finalizadas */
function removeFinished() {
  const button = document.querySelector('#remover-finalizados');
  button.addEventListener('click', () => {
    const list = document.querySelectorAll('.list');
    for (let index = 0; index < list.length; index += 1) {
      if (list[index].className.includes('completed')) {
        list[index].remove();
      }
    }
  });
}
removeFinished();
/* cira um evento de click para salvar a lista de tarefa no local store */
function saveTheList() {
  const button = document.querySelector('#salvar-tarefas');
  button.addEventListener('click', () => {
    const list = document.querySelectorAll('.list');
    localStorage.clear();
    for (let index = 0; index < list.length; index += 1) {
      localStorage.setItem(`list ${[index]}`, `${list[index].textContent.replace('clear', '')}`);
      localStorage.setItem(`class ${[index]}`, `${list[index].className.replace('selected', '')}`);
    }
  });
}
saveTheList();
/* retorna a lista salva quando o navegador e aberto */
function returnList() {
  const storage = localStorage.length / 2;
  for (let index = 0; index < storage; index += 1) {
    const list = document.createElement('li');
    list.innerHTML = localStorage.getItem(`list ${[index]}`);
    list.className = localStorage.getItem(`class ${[index]}`);
    toDoList.appendChild(list);
  }
  changeColor();
}
returnList();
/* movimenta o item selecionado pra cima */
function moveUp() {
  const selected = document.querySelector('.selected');
  const selectedText = selected.innerHTML;
  const nextSelectedText = selected.previousSibling.innerHTML;
  const selectedClass = selected.className;
  const nextSelectedClass = selected.previousSibling.className;
  const selectedColor = selected.style.backgroundColor;
  const nextSelectedColor = selected.previousSibling.style.backgroundColor;
  selected.innerHTML = nextSelectedText;
  selected.previousSibling.innerHTML = selectedText;
  selected.className = nextSelectedClass;
  selected.previousSibling.className = selectedClass;
  selected.style.backgroundColor = nextSelectedColor;
  selected.previousSibling.style.backgroundColor = selectedColor;
}

function eventMoveUp() {
  const button = document.querySelector('#mover-cima');
  button.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected !== null && selected.previousSibling !== null) {
      moveUp();
      deleteSelected();
    }
  });
}
eventMoveUp();
/* movimenta o item selecionado para baixo */
function moveDown() {
  const selected = document.querySelector('.selected');
  const selectedText = selected.innerHTML;
  const nextSelectedText = selected.nextSibling.innerHTML;
  const selectedClass = selected.className;
  const nextSelectedClass = selected.nextSibling.className;
  const selectedColor = selected.style.backgroundColor;
  const nextSelectedColor = selected.nextSibling.style.backgroundColor;
  selected.innerHTML = nextSelectedText;
  selected.nextSibling.innerHTML = selectedText;
  selected.className = nextSelectedClass;
  selected.nextSibling.className = selectedClass;
  selected.style.backgroundColor = nextSelectedColor;
  selected.nextSibling.style.backgroundColor = selectedColor;
}

function eventMoveDown() {
  const button = document.querySelector('#mover-baixo');
  button.addEventListener('click', () => {
    const selected = document.querySelector('.selected');
    if (selected !== null && selected.nextSibling !== null) {
      moveDown();
      deleteSelected();
    }
  });
}
eventMoveDown();
/* adiciona style aos botões */
function styleNewList() {
  const button = document.querySelector('#criar-tarefa');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'add';
  newSpans.style.fontSize = fontSizeButton;
  newSpans.style.marginRight = '5px';
  newSpans.style.paddingTop = '1px';

  button.appendChild(newSpans);
}
styleNewList();

function styleMoveUp() {
  const button = document.querySelector('#mover-cima');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'arrow_circle_up';
  newSpans.style.fontSize = fontSizeButton;
  button.appendChild(newSpans);
}
styleMoveUp();

function styleMoveDown() {
  const button = document.querySelector('#mover-baixo');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'arrow_circle_down';
  newSpans.style.fontSize = fontSizeButton;
  button.appendChild(newSpans);
}
styleMoveDown();

function styleSave() {
  const button = document.querySelector('#salvar-tarefas');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'save';
  newSpans.style.fontSize = fontSizeButton;
  newSpans.style.marginLeft = '3px';
  button.appendChild(newSpans);
}
styleSave();

function styleRemoveDone() {
  const button = document.querySelector('#remover-finalizados');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'remove_done';
  newSpans.style.fontSize = fontSizeButton;
  button.appendChild(newSpans);
}
styleRemoveDone();

function styleDeleteAll() {
  const button = document.querySelector('#apaga-tudo');
  const newSpans = document.createElement('span');
  newSpans.className = googleIcons;
  newSpans.innerHTML = 'delete';
  newSpans.style.fontSize = fontSizeButton;
  button.appendChild(newSpans);
}
styleDeleteAll();
