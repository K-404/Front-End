// gets all tables, checks if the tables have horizontal scroll and 
// if some of them have, adds an indicator on the right that the table is scrollable
// TODO (maybe): add resize event

function hasScroll(el, direction) {
    direction = (direction === 'vertical') ? 'scrollTop' : 'scrollLeft';
    var result = !!el[direction];

    if (!result) {
        el[direction] = 1;
        result = !!el[direction];
        el[direction] = 0;
    }
    return result;
}

//forEach that we use to loop over nodeList

var forEach = (array, callback, scope) => {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

//function that gets all tables and checks which of them has horizontal scroll
function getAllTables() {
    var tables = document.querySelectorAll("table");

    forEach(tables, (index, table) => {
        var bool = hasScroll(table, "horizontal");

        if (bool) {
            table.parentNode.classList.add("fortouchhand");
            table.insertAdjacentHTML('afterEnd', '<div class="touchhand">&nbsp</div>')

            table.onscroll = function(e) {
                if (e.target.scrollLeft > 0) {
                    this.parentNode.querySelector('.touchhand').classList.add('hidden');
                } else {
                    this.parentNode.querySelector('.touchhand').classList.remove('hidden');
                }
            };
        }
    });
}

getAllTables();
