'use strict';

let json = {
    "settings": {
        "slideFlip": {
            "animationSpeed": 0,
            "gestures": [
                "doubleswipe"
            ]
        }
    },
    slides: [],
    branches: [],
    handlers: {}
};
let events = [];
let branchName = '';
let slideName = '';

function SliderCreator(name) {
    return {
        name: name.slice(0, -4),
        alias: name.slice(0, -4),
        source: `${name.slice(0, -4)}.html`,
        preview: `previews/${name}`,
        events: []
    }
}

function BranchCreator(alias) {
    return {
        name: alias,
        alias: alias,
        slides: [],
        attachmentTags: {
            "$all": "tag1"
        }
    };
}

function EventHeaderCreator(branch, slide, event, slideEvName) {
    let sl = slide.replace(/\s/g, '');
    let ev = event.replace(/\s/g, '');
    if (slideEvName === undefined) {
        events.push(`${sl}@${branch} nav-${ev}`);
    }
    else if (slideEvName !== undefined) {
        events.push(`${sl}@${branch} nav-${slideEvName}`);
    }

    let handler = new HandlerCreator(ev, branch, slideEvName);
}

function HandlerCreator(ev, branch, sl) {
    if (sl !== undefined) {
        json.handlers[events[events.length - 1]] = {
            action: "navigate",
            destination: `${sl}@${ev}`,
            appearFrom: "left"
        };
    }
    else {
        json.handlers[events[events.length - 1]] = {
            action: "navigate",
            destination: `@${ev}`,
            appearFrom: "left"
        };
    }
}

function handleFileSelect(evt) {
    var self = this;
    var files = evt.target.files; // FileList object
    let template = `
    <div class="file-upload">
        <label class="upload">
            <input type="file" name="files[]" multiple>
            <span></span>
        </label>
        <output class="list"></output>
    </div>`;
    let div = document.createElement('div');
    let filesRow = document.querySelector('.files');


    let textarea = document.querySelector('.textarea');
    let select = document.querySelector('.select');
    select.textContent = 'copy';
    let uplFiles = document.querySelectorAll('.upload');
    for (let i = 0; i < uplFiles.length; i++) {
        uplFiles[i].addEventListener('change', handleFileSelect, false);
    }


    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        let color = function (result, name) {
            let div = document.createElement('div');
            div.classList.add('preview-img');
            div.innerHTML = ['<img draggable="true" data-effect-allowed="copy" data-alias="', name, '"class="drag thumb" src="', result, '"/>'].join('');
            self.parentElement.parentElement.insertBefore(div, null);
            setUpEventListeners();

        };
        let reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                color.call(null, e.target.result, theFile.name);
                let slide = new SliderCreator(theFile.name);
                json.slides.push(slide);
            };
        })(f);

        select.addEventListener('click', () => {
            textarea.select();
            document.execCommand('copy');
            select.textContent = 'copied';
        });


        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function addBranch() {
    let value = recieveAlias();
    let name = recieveName();
    let slides = reciveSlides();
    let branchRow = document.querySelector('.branches');
    let div = document.createElement('div');
    div.classname = 'branch';
    let branchFlex = document.createElement('div');
    let deleteButton = document.createElement('div');
    let inputRadio = document.createElement('input');

    inputRadio.setAttribute('type', 'radio');
    inputRadio.setAttribute('name', 'event');
    inputRadio.setAttribute('id', `${value}`);
    inputRadio.className = 'js-radio';
    // inputRadio.setAttribute('disabled', 'disabled');
    let inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', `${value}`);
    inputLabel.textContent = value;
    inputLabel.appendChild(inputRadio);
    deleteButton.className = 'js-delete delete-branch';
    deleteButton.setAttribute('data-branch-alias', value);
    deleteButton.innerText = 'X';
    branchFlex.className = 'branch-row flex';
    branchFlex.innerHTML = `<div class="flex-left">
                     ${slides.innerHTML}
                    </div>`;
    branchFlex.appendChild(deleteButton);

    let branchTemplate = `<h6>${name}</h6>`;


    let branch = new BranchCreator(value);
    json.branches.push(branch);

    div.innerHTML = branchTemplate;
    div.appendChild(inputLabel);
    div.appendChild(branchFlex);

    branchRow.appendChild(div);

    setUpEventListeners();
    deleteButton.addEventListener('click', deleteBranch.bind(deleteButton, div));
    let event = document.querySelectorAll('.add-event');
    [...event].forEach(function (el) {
        el.addEventListener('click', somePreparing);
    });

}

function somePreparing() {
    $('.js-choose').css('opacity', 1);
    createEvents(this);
}

function deleteBranch(div) {
    let branchEl = document.querySelector('.branches');
    let alias = this.getAttribute('data-branch-alias');
    for (let key in json.branches) {
        if (alias === json.branches[key].alias) {
            json.branches.splice(key, 1);
            branchEl.removeChild(div)
        }
    }
}

function recieveAlias() {
    let branchInput = document.querySelector('#branch');
    return branchInput.value;
}

function recieveName() {
    let branchInput = document.querySelector('#branch-name');
    return branchInput.value;
}

function reciveSlides() {
    let branchInput = document.querySelector('#branch-slides');
    let branchAlias = document.querySelector('#branch');
    let container = document.createElement('div');
    let dropZone = `
                        <div class="drop-zone cf">
                    <div class="drop-item">
                        <label class="js-name clear"><span>Slide name</span>
                        <input type="radio" name="event" class="js-radio-slide">
                        </label>
                        <div class="drop branch-drop-area" data-drop-effect="copy"></div>
                        <div><button class="add-event" data-branch-name=${branchAlias.value}>add event</button></div>
                    </div>
                </div>`;
    container.classList.add('container');
    for (let i = 0; i < branchInput.value; i++) {
        container.innerHTML += dropZone;
    }
    return container;
}

function createEvents(btn) {
    let input = document.querySelectorAll('.js-radio');
    let inputRadioSlide = document.querySelectorAll('.js-radio-slide');
    branchName = $(btn).attr('data-branch-name');
    slideName = $(btn).parent().parent().find('.clear span').text();
    let dropZone = $(btn).parent().parent().parent();
    let createdEvent;

    function addEvent() {
        $('.js-choose').css('opacity', 0);
        [...inputRadioSlide].forEach(function (el) {
            el.setAttribute('disabled', 'disabled');
        });
        [...input].forEach(function (el) {
            el.setAttribute('disabled', 'disabled');
        });
        let ev = $(this).parent().text();
        if ($(this).hasClass('js-radio-slide')) {
            let evInner = $(this).parent().parent().parent().parent().parent().parent().find('label').first().text();
            let slideEventName = $(this).parent().find('span').text();
            console.log(branchName, slideName, evInner, slideEventName);
            let event = new EventHeaderCreator(branchName, slideName, evInner, slideEventName);
        }
        if (!$(this).hasClass('js-radio-slide')) {
            let event = new EventHeaderCreator(branchName, slideName, ev);
        }

        createdEvent = `<div class="event-created">${slideName}@${branchName} nav-${ev}</div>`;
        addEventToSLide(slideName, ev);
        dropZone.append(createdEvent);
        $('.ok').css('opacity', 1);
    }

    [...input].forEach(function (el) {
        el.addEventListener('input', addEvent);
    });

    [...inputRadioSlide].forEach(function (el) {
        el.addEventListener('input', addEvent);
    });
    $('.ok').on('click', () => {
        $('.ok').css('opacity', 0);
        [...input].forEach(function (el) {
            el.removeEventListener('input', addEvent);
            el.removeAttribute('disabled');
            el.checked = false;

        });
        [...inputRadioSlide].forEach(function (el) {
            el.removeEventListener('input', addEvent);
            el.removeAttribute('disabled');
            el.checked = false;
        });
    })
}

function addEventToSLide(slide, ev) {
    let event = ev.replace(/\s/g, '');
    for (let key in json.slides) {
        if (slide === json.slides[key].alias) {
            json.slides[key].events.push({
                name: event,
                alias: `nav-${event}`
            })
        }
    }
}


function renderName(block) {
    let name = $(block).find('img').attr('data-alias');
    let branch = $(block).parent().parent().parent().parent().parent().find('label').first();
    $(block).parent().find('.clear span').text(name.slice(0, -4));
    addSlideToBranch(name.slice(0, -4), branch);
}

function addSlideToBranch(slideName, branchName) {
    for (let key in json.branches) {
        if ($(branchName).text() === json.branches[key].alias) {
            json.branches[key].slides.push(slideName);
        }
    }
}

//sets up the drag and drop event listeners
function setUpEventListeners() {
    let drag_items = $('.drag');
    let drop_items = $('.drop');
    drag_items.each(function (i, el) {
        el.addEventListener('dragstart', dragStart);

    });

    drop_items.each(function (i, el) {
        el.addEventListener('dragenter', dragEnter);
        el.addEventListener('dragover', dragOver);
        el.addEventListener('drop', drop);

    });
}


let dragItem;

//called as soon as the draggable starts being dragged
//used to set up data and options
function dragStart(event) {

    let drag = event.target;
    dragItem = event.target;

    //set the effectAllowed for the drag item
    event.dataTransfer.effectAllowed = $(this).attr('data-effect-allowed');

    let imageSrc = $(dragItem).prop('src');
    let imageHTML = $(dragItem).prop('outerHTML');

    //check for IE (it supports only 'text' or 'URL')
    try {
        event.dataTransfer.setData('text/uri-list', imageSrc);
        event.dataTransfer.setData('text/html', imageHTML);
    } catch (e) {
        event.dataTransfer.setData('text', imageSrc);
    }

    $(drag).addClass('drag-active');

}

//called as the draggable enters a droppable
//needs to return false to make droppable area valid
function dragEnter(event) {
    event.preventDefault();
    let drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = $(drop).attr('data-drop-effect');
    $(drop).addClass('drop-active');


}

//called continually while the draggable is over a droppable
//needs to return false to make droppable area valid
function dragOver(event) {
    event.preventDefault();
    let drop = this;

    //set the drop effect for this zone
    event.dataTransfer.dropEffect = $(drop).attr('data-drop-effect');
    $(drop).addClass('drop-active');

}


//called when draggable is dropped on droppable
//final process, used to copy data or update UI on successful drop
function drop(event) {

    event.preventDefault();
    event.stopPropagation();

    drop = this;
    $(drop).removeClass('drop-active');
    $(drop).addClass('correct');

    event.dataTransfer.dropEffect = $(drop).attr('data-drop-effect');

    let dataList, dataHTML, dataText;

    //collect our data (based on what browser support we have)
    try {
        dataList = event.dataTransfer.getData('text/uri-list');
        dataHTML = event.dataTransfer.getData('text/html');
    } catch (e) {
        dataText = event.dataTransfer.getData('text');
    }

    //we have access to the HTML
    if (dataHTML) {
        $(drop).empty();
        $(drop).prepend(dataHTML);
    }
    //only have access to text (old browsers + IE)
    else {
        $(drop).empty();
        $(drop).prepend($(dragItem).clone());
    }
    renderName(this);

}

let userAgent = window.navigator.userAgent;
if (userAgent.indexOf('MSIE') != -1) {
    $('.ie-message').show();
}

let uplFiles = document.querySelectorAll('.upload');
for (let i = 0; i < uplFiles.length; i++) {
    uplFiles[i].addEventListener('change', handleFileSelect, false);
}
let add = document.querySelector('#add');
let branchInput = document.querySelector('#branch');
add.addEventListener('click', addBranch);
branchInput.addEventListener('input', recieveName);
$('.structure').on('click', () => {
    for (let key in json) {
        for (let i = 0; i < json[key].length; i++) {
            if (json[key][i].length === 0) {
                json[key].splice(i, 1);
            }
        }
    }
    console.log(json);
    $('.textarea').text(JSON.stringify(json));
})


