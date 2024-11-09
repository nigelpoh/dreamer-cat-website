function tagSlidersWrapper(e) {
    tagSliders(e.currentTarget, this.id)
}

function tagSliders(ele, sec_id) {
    var current = ele.scrollLeft / (ele.scrollWidth - ele.clientWidth)
    var sectionSplit = sec_id.split("-")
    var sectionID = sectionSplit.slice(1, sectionSplit.length).join("-")
    var sliderButtons = document.querySelector("#SliderButtons-" + sectionID)
    if (sliderButtons != null) {
        var sliderBtnL = sliderButtons.getElementsByTagName('button')[0]
        var sliderBtnR = sliderButtons.getElementsByTagName('button')[1]
    }
    var total = parseInt(document.querySelector("#SliderController-" + sectionID).value) - 1 
    sectionID += "-"
    var index = Math.round(total * current)
    if (index == NaN) {
        return
    }
    var colourEle = document.querySelector('#SliderIndicator-' + sectionID + index.toString())
    if (colourEle != null) {
        var colour = colourEle.getAttribute('data-colour')
        sliderBtnL.className = sliderBtnL.className.replace(/\bbg-.*?\b/g, ''); 
        sliderBtnL.classList.add(colour + "/50")
        sliderBtnR.className = sliderBtnR.className.replace(/\bbg-.*?\b/g, ''); 
        sliderBtnR.classList.add(colour + "/50")
        if (index != 0) {
            var colour_b = document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).getAttribute('data-colour')
            document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).classList.add("w-4", "bg-neutral-400")
            document.querySelector('#SliderIndicator-' + sectionID + (index - 1).toString()).classList.remove("w-14", colour_b)
            if (sliderButtons != null) {
                sliderBtnL.className = sliderBtnR.className.replace(/\bbg-.*?\b/g, ''); 
                sliderBtnL.classList.add(colour)
            }
        }
        if (index != total) {
            var colour_f = document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).getAttribute('data-colour')
            document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).classList.add("w-4", "bg-neutral-400")
            document.querySelector('#SliderIndicator-' + sectionID + (index + 1).toString()).classList.remove("w-14", colour_f)
            if (sliderButtons != null) {
                sliderBtnR.className = sliderBtnL.className.replace(/\bbg-.*?\b/g, ''); 
                sliderBtnR.classList.add(colour)
            }
        }
        document.querySelector('#SliderIndicator-' + sectionID + index.toString()).classList.remove("w-4", "bg-neutral-400")
        document.querySelector('#SliderIndicator-' + sectionID + index.toString()).classList.add("w-14", colour)
    }
    }

class Scrollable extends HTMLElement {
    constructor() {
      super();
      this.onResize = this.onResize.bind(this);
    }

    connectedCallback() {
        this.renderContent();
        window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize() {
        this.renderContent();
    }
  
    renderContent() {
        var sectionSplitArr = this.id.split("-")
        var indicativeID = sectionSplitArr.slice(1, sectionSplitArr.length).join("-")
        var scrollable = document.querySelector('#Scrollable-' + indicativeID)
        var scrollableColours = ["hl-red","hl-green","hl-yellow","hl-blue"]
        if (scrollable.scrollWidth != 0 && scrollable.clientWidth != 0) {
            scrollable.removeEventListener("scroll", tagSlidersWrapper);
            var count = Math.round(scrollable.scrollWidth / scrollable.clientWidth)
            if (scrollable.scrollWidth > scrollable.clientWidth && count == 1) {
                count = 2
            }
            document.querySelector("#SliderController-" + indicativeID).value = count
            document.querySelector('#SliderIndicators-' + indicativeID).innerHTML = ""
            if(count > 1){
                for (let index = 0; index < count; index++) {
                    var colour_index = index % 4
                    var element = document.createElement("div")
                    element.id = "SliderIndicator-" + indicativeID + "-" + index.toString()
                    element.setAttribute("data-colour", "bg-" + scrollableColours[colour_index]) 
                    element.classList.add("transition-all", "ease-in-out", "duration-500", "h-4", "rounded-md")
                    if (index != 0) {
                        element.classList.add("bg-neutral-400", "w-4", "ml-3")
                    } else {
                        element.classList.add("bg-" + scrollableColours[colour_index], "w-14")
                    }
                    document.querySelector('#SliderIndicators-' + indicativeID).appendChild(element)
                }
                scrollable.addEventListener("scroll", tagSlidersWrapper); 
                tagSliders(scrollable, this.id)
                var sliderButtons = document.querySelector("#SliderButtons-" + indicativeID)
                if (sliderButtons != null) {
                    sliderButtons.classList.add("md:block")
                    var sliderBtnL = sliderButtons.getElementsByTagName('button')[0]
                    var sliderBtnR = sliderButtons.getElementsByTagName('button')[1]
                    sliderBtnL.addEventListener("click", () => {
                        var current = scrollable.scrollLeft / (scrollable.scrollWidth - scrollable.clientWidth)
                        var total = parseInt(document.querySelector("#SliderController-" + indicativeID).value) - 1 
                        var index = Math.round(total * current)
                        if (index != 0) {
                            scrollable.scrollLeft = (scrollable.scrollWidth - scrollable.clientWidth) / total * (index - 1)
                        }
                        tagSliders(scrollable, this.id)
                    })
                    sliderBtnR.addEventListener("click", () => {
                        var current = scrollable.scrollLeft / (scrollable.scrollWidth - scrollable.clientWidth)
                        var total = parseInt(document.querySelector("#SliderController-" + indicativeID).value) - 1 
                        var index = Math.round(total * current)
                        if (index != total) {
                            scrollable.scrollLeft = (scrollable.scrollWidth - scrollable.clientWidth) / total * (index + 1)
                        }
                        tagSliders(scrollable, this.id)
                    })
                }
                return
            }
        }
        var sliderButtons = document.querySelector("#SliderButtons-" + indicativeID)
        if (sliderButtons != null) {
            sliderButtons.classList.remove("md:block")
        }
    }
}
  
// Register the custom element
customElements.define('scrollable-row', Scrollable);
