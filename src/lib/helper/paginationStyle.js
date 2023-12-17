/**
 *
 * @param {string} page string represtation of a page number
 */
export function paginationButtonStyle(page) {
    const buttons = document.querySelectorAll(".pagination-button");

    buttons.forEach((button) => {
        const num = parseInt(button.innerText);

        if (page === num) {
            button.style.backgroundColor = "skyBlue";
        } else {
            button.style.backgroundColor = "rgb(74, 222, 128)";
        }
    });
}
