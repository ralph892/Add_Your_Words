const tooltip = document.querySelector("#tooltip");
const searchBar = document.querySelector("#search_bar")

searchBar.addEventListener('change', () => {
    tooltip.action = `/handleGetWord/${searchBar.value}`;
    tooltip.submit();
});


