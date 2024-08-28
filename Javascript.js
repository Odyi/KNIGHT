/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};


showMenu("nav-toggle", "nav-menu");

/*===== REMOVE MENU =====*/
const navLink = document.querySelectorAll(".nav__link"),
  navMenu = document.getElementById("nav-menu");

function linkAction() {
  navMenu.classList.remove("show");
}

navLink.forEach(n => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

/*===== CHANGE COLOR HEADER =====*/
window.onscroll = () => {
  const nav = document.getElementById("header");
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
};

function discount() {
  // hente HTML-elementene med prisene
  // bytte innholdet i elementene
  document.querySelector("#menshoe1").innerHTML = "2160kr"
  document.querySelector("#menshoe2").innerHTML = "2880kr"
  document.querySelector("#menshoe3").innerHTML = "1710kr"
  document.querySelector("#womenshoe1").innerHTML = "1169kr"
  document.querySelector("#womenshoe2").innerHTML = "990kr"
  document.querySelector("#womenshoe3").innerHTML = "1800kr"
  document.querySelector("#womenshoe4").innerHTML = "1260kr"

}

//* hentet fra https://codepen.io/kyhio/pen/YzqWZPR
const CONFETTI_COLORS = ["#808080", "#F5f5dc", "#ffffff" , "#808080", "#F5f5dc" ];

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

const newPiece = () => {
  const n = document.createElement("div");
  n.style.width = `${5}px`;
  n.style.height = `${7}px`;
  n.style.position = "absolute";
  n.style.left = 0;
  n.style.right = 0;  
  n.style.margin = "0 auto";
  n.style.opacity = 0;
  n.style.pointerEvents = "none";
  n.style.backgroundColor = CONFETTI_COLORS[randomInt(0, 4)];

  return n;
};

class Confetti {
  constructor(el, amt, size) {
    this.element = el;
    this.elementTop = el.offsetHeight;
    this.amount = amt || 25;
    this.size = size || 1;
    this.active = false;

    return this;
  }

  render() {
    const el = this.element;
    const s = this.size;
    const c = newPiece();

    let degs = 0;
    let x = 0;
    let y = 0;
    let opacity = 0;
    let count = 0;

    let xfactor;
    const yfactor = randomInt(10, 40) * (1 + s / 10);

    if (randomInt(0, 1) === 1) {
      xfactor = randomInt(5, 40) * (1 + s / 10);
      c.style.left = "-30px";
    } else {
      xfactor = randomInt(-5, -40) * (1 + s / 10);
      c.style.left = "30px";
    }

    let start = null;
    el.appendChild(c);

    const animate = (timestamp) => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      if (progress < 2000) {
        requestAnimationFrame(animate);
      } else {
        el.removeChild(c);
      }
      const transform = `
        translate3d(${Math.cos((Math.PI / 36) * x) * xfactor}px,
        ${-this.elementTop + Math.cos((Math.PI / 18) * y) * yfactor}px, 0)
        rotateZ(${degs}deg) rotateY(${degs}deg)
      `;
      c.style.opacity = opacity;
      c.style.webkitTransform = transform;
      degs += 15;
      x += 0.5;
      y += 0.5;
      if (count > 25) {
        opacity -= 0.1;
      } else {
        opacity += 0.1;
      }
      count++;
    };

    requestAnimationFrame(animate);
  }

  fire() {
    let count = 0;
    const launch = setInterval(() => {
      if (count < this.amount) {
        this.render();
        count++;
      } else {
        this.active = false;
        clearTimeout(launch);
      }
    }, 32);
    this.active = true;
  }
}

// Usage
const button = document.querySelector("button");
const confettiButton = new Confetti(button);

button.addEventListener("click", () => {
  confettiButton.fire();
});

// tarald hjalp 
function fillInProductData() {

  let price = "986 NOK";

  let productDiv = document.getElementById("productInfo");
  productDiv.innerHTML = `
      <h1>ARMOUR-1</h1>
      <h3>${price}</h3>
      <div class="color-pick">
          <button class="yellow"></button>
          <button class="red"></button>
          <button class="pink"></button>
          <button class="blue"></button>
      </div>
      <h4>Materials</h4>
      <p>Body: 100% Vinyl, Lining: 100% Polyethylene.</p>
      <button class="basket">Add to Basket</button>
      `;
}
