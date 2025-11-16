//all of this was created in part 6.....


export function enableNavigation() {
    const menuBtn = document.getElementById("global-nav-toggle");
    const globalNav = document.getElementById("global-nav");

    if (!menuBtn || !globalNav) return; //if eaither is missing
// Start with the nav closed
    globalNav.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");

// Main menu (hamburger) toggle
    menuBtn.addEventListener("click", (event) => {
        const isOpen = globalNav.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

 // Submenu toggles (small arrow buttons next to each top-level link)
 
    const submenuButtons = globalNav.querySelectorAll(".global-nav_split-button-toggle");

    submenuButtons.forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");

        const parentItem = btn.closest("li"); 
        const submenu = parentItem
            ? parentItem.querySelector(".global-nav_submenu")
            : null;

        btn.addEventListener("click", () => {
            if (!submenu || !parentItem) return;

            const isOpen = parentItem.classList.toggle("submenu_open");
            btn.setAttribute("aria-expanded", String(isOpen));
            // CSS will use .submenu_open to show/hide the submenu
        });
    });
}