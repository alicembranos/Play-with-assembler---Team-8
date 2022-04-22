function hideVisibility(idElement){
    $(idElement).hide();
    console.log("hide");
}

function showVisibility(idElement, lastElement){
    $(idElement).show();
    document.getElementById("");
    hideVisibility(lastElement);
}

export {hideVisibility, showVisibility};