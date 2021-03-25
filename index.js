let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

const sections = ['plot', 'characters', 'themes', 'quotes-music', 'quotes-ex', 'vocab', 'poem'];

let content = false;

let section = -1;
let page = 0;

document.addEventListener('DOMContentLoaded', () => {
    [$('.content-left-container'), $('.content-right-container')].forEach(e => e.addEventListener('transitionend', () => {
        if (!document.body.classList.contains('content')) {
            document.body.classList.remove('content-single');
            document.body.classList.remove('content-double');
        }
    }));

    $('.content-close').addEventListener('click', function () {
        content = false;
        document.body.classList.remove('content');
        page = 0;
    });

    $$('.content-links li').forEach(e => e.addEventListener('click', function () {
        content = true;
        document.body.classList.add('content');
        $('.content-title').innerText = this.innerText;
        section = [...this.parentNode.children].indexOf(this);

        loadPage(page, page, false);

        switch (this.dataset.type) {
            default:
            case 'single':
                document.body.classList.remove('content-double');
                document.body.classList.add('content-single');
                break;
            case 'double':
                document.body.classList.remove('content-single');
                document.body.classList.add('content-double');
                break;
        }

    }));

    $('.pageinate-input').addEventListener('focus', function () {
        this.value = '';
    });

    $('.pageinate-input').addEventListener('focusout', function () {
        this.value = `${page + 1}/${data.sections[section].pages.length}`;
    });

    $('.pageinate-input').addEventListener('change', function () {
        this.value = `${loadPage(page, this.value - 1, true) + 1}/${data.sections[section].pages.length}`;
        this.blur();
    });

    $('.pageinate-prev').addEventListener('click', () => {
        previousPage();
    });

    $('.pageinate-next').addEventListener('click', () => {
        nextPage();
    });
});

function loadPage(prevPage, nextPage, transition = false) {
    if (nextPage >= 0 && data.sections[section].pages.length > nextPage && (transition === false || prevPage != nextPage)) {
        page = nextPage;
        if (!transition) $$('.content-border').forEach(e => e.innerHTML = '');
        $('.pageinate-input').value = page + 1;
        currentPage = data.sections[section].pages[page];
        let rightBox = document.createElement('div');
        let title = document.createElement('h2');
        let leftBox;
        switch (section) {
            case -1:
            default:
                break;
            case 0:
                // Plot
                title.innerHTML = currentPage.title;
                rightBox.appendChild(title);
                currentPage.paragraphs.forEach(para => {
                    let p = document.createElement('p');
                    p.innerHTML = para;
                    p.classList.add('indented');
                    rightBox.appendChild(p);
                });
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                } else {
                    let oldBox = $('.content-right-container .content-border div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        oldBox.classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        oldBox.classList.add('content-next');
                    }
                    oldBox.addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                }
                break;
            case 1:
                // Characters
                title.innerHTML = currentPage.character;
                rightBox.appendChild(title);
                let desc = document.createElement('p');
                desc.innerHTML = currentPage.description;
                desc.classList.add('indented');
                rightBox.appendChild(desc);
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                } else {
                    let oldBox = $('.content-right-container .content-border div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        oldBox.classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        oldBox.classList.add('content-next');
                    }
                    oldBox.addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                }
                break;
            case 2:
                // Themes
                leftBox = document.createElement('img');
                title.innerHTML = currentPage.title;
                rightBox.appendChild(title);
                currentPage.paragraphs.forEach(para => {
                    let p = document.createElement('p');
                    p.innerHTML = para;
                    p.classList.add('indented');
                    rightBox.appendChild(p);
                });
                leftBox.src = currentPage.image;
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                } else {
                    let oldBox = $('.content-border>div');
                    let oldImg = $('.content-border>img');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        leftBox.classList.add('content-next');
                        oldBox.classList.add('content-previous');
                        oldImg.classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        leftBox.classList.add('content-previous');
                        oldBox.classList.add('content-next');
                        oldImg.classList.add('content-next');
                    }
                    oldBox.addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                        leftBox.classList.remove(...leftBox.classList);
                    });
                    oldImg.addEventListener('transitionend', function () {
                        this.remove();
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                }
                break;
            case 3:
                // Quotes & Music
                leftBox = document.createElement('div');
                let songTitle = document.createElement('h2');
                songTitle.innerHTML = currentPage.song.credit;
                let song = document.createElement('p');
                song.innerHTML = currentPage.song.excerpt;
                leftBox.appendChild(songTitle);
                leftBox.appendChild(song);
                var quoteTitle = document.createElement('h2');
                quoteTitle.innerText = 'Quote';
                rightBox.appendChild(quoteTitle);
                var quote = document.createElement('p');
                quote.innerHTML = currentPage.quote;
                rightBox.appendChild(quote);
                leftBox.src = currentPage.image;
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                } else {
                    let oldBoxes = $$('.content-border>div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        leftBox.classList.add('content-next');
                        oldBoxes[0].classList.add('content-previous');
                        oldBoxes[1].classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        leftBox.classList.add('content-previous');
                        oldBoxes[0].classList.add('content-next');
                        oldBoxes[1].classList.add('content-next');
                    }
                    oldBoxes[0].addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                        leftBox.classList.remove(...leftBox.classList);
                    });
                    oldBoxes[1].addEventListener('transitionend', function () {
                        this.remove();
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                }
                break;

            case 4:
                // Quotes & Explanations
                leftBox = document.createElement('div');
                var exTitle = document.createElement('h2');
                exTitle.innerText = 'Explanation';
                var explanation = document.createElement('p');
                explanation.innerHTML = currentPage.explanation;
                leftBox.appendChild(exTitle);
                leftBox.appendChild(explanation);
                var quoteTitle = document.createElement('h2');
                quoteTitle.innerText = 'Quote';
                rightBox.appendChild(quoteTitle);
                var quote = document.createElement('p');
                quote.innerHTML = currentPage.quote;
                rightBox.appendChild(quote);
                leftBox.src = currentPage.image;
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                } else {
                    let oldBoxes = $$('.content-border>div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        leftBox.classList.add('content-next');
                        oldBoxes[0].classList.add('content-previous');
                        oldBoxes[1].classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        leftBox.classList.add('content-previous');
                        oldBoxes[0].classList.add('content-next');
                        oldBoxes[1].classList.add('content-next');
                    }
                    oldBoxes[0].addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                        leftBox.classList.remove(...leftBox.classList);
                    });
                    oldBoxes[1].addEventListener('transitionend', function () {
                        this.remove();
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                }
                break;
            case 5:
                // Vocab
                title.innerHTML = currentPage.word;
                rightBox.appendChild(title);
                let def = document.createElement('h3');
                def.innerHTML = currentPage.definition;
                def.classList.add('indented');
                rightBox.appendChild(def);
                let exc = document.createElement('p');
                exc.innerHTML = currentPage.excerpt;
                rightBox.appendChild(exc);
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                } else {
                    let oldBox = $('.content-right-container .content-border div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        oldBox.classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        oldBox.classList.add('content-next');
                    }
                    oldBox.addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                }
                break;
            case 6:
                // Poem
                leftBox = document.createElement('div');
                let poemTitle = document.createElement('h2');
                poemTitle.innerText = 'Poem';
                let poem = document.createElement('p');
                poem.innerHTML = currentPage.poem;
                leftBox.appendChild(poemTitle);
                leftBox.appendChild(poem);
                var exTitle = document.createElement('h2');
                exTitle.innerText = 'Explanation';
                rightBox.appendChild(exTitle);
                currentPage.explanation.paragraphs.forEach(para => {
                    let p = document.createElement('p');
                    p.innerHTML = para;
                    p.classList.add('indented');
                    rightBox.appendChild(p);
                });
                if (!transition) {
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                } else {
                    let oldBoxes = $$('.content-border>div');
                    if (prevPage < nextPage) {
                        rightBox.classList.add('content-next');
                        leftBox.classList.add('content-next');
                        oldBoxes[0].classList.add('content-previous');
                        oldBoxes[1].classList.add('content-previous');
                    } else {
                        rightBox.classList.add('content-previous');
                        leftBox.classList.add('content-previous');
                        oldBoxes[0].classList.add('content-next');
                        oldBoxes[1].classList.add('content-next');
                    }
                    oldBoxes[0].addEventListener('transitionend', function () {
                        this.remove();
                        rightBox.classList.remove(...rightBox.classList);
                        leftBox.classList.remove(...leftBox.classList);
                    });
                    oldBoxes[1].addEventListener('transitionend', function () {
                        this.remove();
                    });
                    $('.content-right-container .content-border').appendChild(rightBox);
                    $('.content-left-container .content-border').appendChild(leftBox);
                }
                break;

        }
        return nextPage;
    } else {
        return prevPage;
    }
}

function previousPage() {
    if (page > 0) {
        loadPage(page, page - 1, true);
    }
}

function nextPage() {
    if (page + 1 < data.sections[section].pages.length) {
        loadPage(page, page + 1, true);
    }
}
