var content = document.querySelector('.content');
if (content.firstElementChild.className === 'about') {
    content.removeChild(content.lastElementChild)
}