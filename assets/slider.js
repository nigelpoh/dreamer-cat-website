var allScrollables = document.querySelectorAll('[id^=ScrollableGallery]');

allScrollables.forEach(scrollable => {
    scrollable.addEventListener("scroll", (e) => {
        var current = e.currentTarget.scrollLeft / e.currentTarget.scrollWidth
        var total = (e.currentTarget.childElementCount - 1) / e.currentTarget.childElementCount
        var index = Math.round((e.currentTarget.childElementCount - 1) * current / total)
        var sectionSplit = scrollable.id.split("-")
        var sectionID = sectionSplit.slice(1, sectionSplit.length).join("-") + "-"
        if (index != 0) {
            var colour = document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).getAttribute('data-colour')
            document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).classList.add("w-4", "bg-neutral-400")
            document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).classList.remove("w-14", colour)
        }
        if (index != e.currentTarget.childElementCount - 1) {
            var colour = document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).getAttribute('data-colour')
            document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).classList.add("w-4", "bg-neutral-400")
            document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).classList.remove("w-14", colour)
        }
        var colour = document.querySelector('#SliderIndicator-' + sectionID + index.toString()).getAttribute('data-colour')
        document.querySelector('#SliderIndicator-' + sectionID + index.toString()).classList.remove("w-4", "bg-neutral-400")
        document.querySelector('#SliderIndicator-' + sectionID + index.toString()).classList.add("w-14", colour)
    }); 
});