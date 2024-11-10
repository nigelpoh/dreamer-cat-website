function generateUUIDv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function generateRandomVisitorID() {
    const characters = 'abcdef0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 46; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function sendAReview(event, shop_id, shop_domain, product_id, product_title, product_handle) {

  var formData = new FormData(event.target)
  if (formData.get("title").trim() == "" || formData.get("review").trim() == "" || formData.get("name").trim() == "" || formData.get("star-rating") == "0" || formData.get("email").trim() == "" || validateEmail(formData.get("email")) == false) {
    document.querySelector(".error-msg").classList.remove("h-0")
    setTimeout(() => {
        document.querySelector(".error-msg").classList.remove("hidden")
    }, 300)
    return
  }

  var visitorID = getCookie("tyMet_visitor")
  if (visitorID == undefined || visitorID == null) {
    visitorID = getCookie("tyMet_visit")
    if (visitorID == undefined || visitorID == null) {
      visitorID = generateRandomVisitorID()
    }
  }
  
  document.querySelector('#submit-review > .submit-span').classList.add('hidden');
  document.querySelector('#submit-review').setAttribute('aria-disabled', 'true'); 
  document.querySelector('#submit-review').style.opacity = 0.5;
  document.querySelector('#submit-review > .loading-span').classList.remove('hidden');
  fetch(window.Shopify.routes.root + 'apps/ba-rev/rev/ratings/reviews?shop='+shop_domain, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      'shop_id': shop_id,
      'shop': shop_domain,
      'title': formData.get("title"),
      'body': formData.get("review"),
      'first_name': formData.get("name"),
      'stars': formData.get("star-rating"),
      'email': formData.get("email"),
      'product_id': product_id,
      'product_title': product_title,
      'product_handle': product_handle, 
      'visitor_token': visitorID,
      'draft_key': generateUUIDv4()
    })
    }).then(response => response.json()
    ).then(data => {
      if(data.success == true) {
        const reqRev = document.querySelector("#request-review")
        reqRev.classList.add("opacity-0")
        document.querySelector("#thank-you").classList.remove("opacity-0")
        setTimeout(() => {
            reqRev.classList.add("hidden")
            document.querySelector("#thank-you").classList.remove("hidden")
        }, 300)
      } else {
        document.querySelector(".error-msg").innerHTML = "Your email might have been used before, or there is another error. Please try again later."
        document.querySelector(".error-msg").classList.remove("h-0")
        setTimeout(() => {
            document.querySelector(".error-msg").classList.remove("hidden")
        }, 300)
      }
      document.querySelector('#submit-review > .submit-span').classList.remove('hidden');
      document.querySelector('#submit-review').setAttribute('aria-disabled', 'false'); 
      document.querySelector('#submit-review').style.opacity = 1;
      document.querySelector('#submit-review .loading-span').classList.add('hidden');
    }).catch((error) => {
      console.error('Error:', error);
      document.querySelector(".error-msg").innerHTML = "There is an error. Please try again later."
      document.querySelector(".error-msg").classList.remove("h-0")
      setTimeout(() => {
          document.querySelector(".error-msg").classList.remove("hidden")
      }, 300)
      document.querySelector('#submit-review > .submit-span').classList.remove('hidden');
      document.querySelector('#submit-review').setAttribute('aria-disabled', 'false'); 
      document.querySelector('#submit-review').style.opacity = 1;
      document.querySelector('#submit-review .loading-span').classList.add('hidden');
    });
}

function page_toggle_handler(event, mode, no_of_reviews_per_page, max_reviews) {
  const currentFocus = parseInt(document.getElementById('review-page').value)
  var currentClicked = parseInt(event.target.innerText)
  if (mode == "1" && event.target.getAttribute('data-act') == "<") {
    currentClicked = currentFocus - 1
  } else if (mode == "1") {
    currentClicked = currentFocus + 1
  }
  const endPage = parseInt(document.getElementById('review-page-end').value)
  if (currentFocus != currentClicked) {
    if(currentFocus == 1) {
      document.getElementById("start-page-toggle").classList.remove("page-hidden");
      document.getElementById("page-back").classList.remove("page-hidden");
    } else if (currentFocus == endPage) {
      document.getElementById("end-page-toggle").classList.remove("page-hidden");
      document.getElementById("page-forward").classList.remove("page-hidden");
    } 
    if (currentClicked == 1) {
      document.getElementById("start-page-toggle").classList.add("page-hidden");
      document.getElementById("page-back").classList.add("page-hidden");
    } else if (currentClicked == endPage) {
      document.getElementById("end-page-toggle").classList.add("page-hidden");
      document.getElementById("page-forward").classList.add("page-hidden");
    }
    document.getElementById("start-page-toggle").innerText = (currentClicked - 1).toString();
    document.getElementById("middle-page-toggle").innerText = currentClicked.toString();
    document.getElementById("end-page-toggle").innerText = (currentClicked + 1).toString();
    document.getElementById('review-page').value = currentClicked
    
    const reviewStartFocus = no_of_reviews_per_page * (currentFocus - 1) + 1
    const reviewEndFocus = reviewStartFocus + no_of_reviews_per_page - 1
    const reviewStartClicked = no_of_reviews_per_page * (currentClicked - 1) + 1
    const reviewEndClicked = reviewStartClicked + no_of_reviews_per_page - 1

    for (let i = Math.max(1,reviewStartFocus); i <= Math.min(reviewEndFocus,max_reviews) ; i++) {
      document.getElementById("review-" + i.toString()).classList.add("review-hidden")
    }
    for (let i = Math.max(1,reviewStartClicked); i <= Math.min(reviewEndClicked,max_reviews); i++) {
      document.getElementById("review-" + i.toString()).classList.remove("review-hidden")
    }
  } 
}

function star_rating_handler(event) {
  const star_rating = parseInt(event.target.id.split("-")[1])
  for (let i = 1; i <= star_rating; i++) {
    document.querySelector("#star-" + i.toString()).classList.remove("stroke-hl-yellow", "stroke-[40px]", "fill-none")
    document.querySelector("#star-" + i.toString()).classList.add("fill-hl-yellow")
  }
  if (star_rating != 5) {
    for (let i = star_rating + 1; i <= 5; i++) {
      document.querySelector("#star-" + i.toString()).classList.remove("fill-hl-yellow")
      document.querySelector("#star-" + i.toString()).classList.add("stroke-hl-yellow", "stroke-[40px]", "fill-none")
    }
  }
  document.getElementById("star-rating-record").value = star_rating.toString();
}

function reviewAppear(event) {
    event.target.classList.add("opacity-0")
    setTimeout(() => {
        event.target.classList.add("hidden")
    }, 300)
    const reqRev = document.querySelector("#request-review")
    reqRev.classList.remove("opacity-0")
    setTimeout(() => {
        reqRev.classList.remove("hidden")
    }, 300)
}

function reviewDisappear() {
    const reqRev = document.querySelector("#request-review")
    reqRev.classList.add("opacity-0")
    setTimeout(() => {
        reqRev.classList.add("hidden")
    }, 300)
    document.querySelector("#initiate-review-btn").classList.remove("opacity-0")
    setTimeout(() => {
        document.querySelector("#initiate-review-btn").classList.remove("hidden")
    }, 300)
}