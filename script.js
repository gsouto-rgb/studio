/* ================================================= */
/* CARREGA TODOS OS FORMATOS */
/* ================================================= */

const creatives =
document.querySelectorAll(".creative-container");

creatives.forEach((creative) => {

    const format =
    creative.dataset.format;

    const logo =
    creative.querySelector(".logo");

    const copy =
    creative.querySelector(".copy");

    const prod =
    creative.querySelector(".prod");

    const cta =
    creative.querySelector(".cta");

    logo.style.backgroundImage =
      `url('./assets/${format}logo.png')`;

    copy.style.backgroundImage =
      `url('./assets/${format}copy.png')`;

    prod.style.backgroundImage =
      `url('./assets/${format}img.png')`;

    cta.style.backgroundImage =
      `url('./assets/${format}cta.png')`;

});


/* ================================================= */
/* FUNDO ANIMADO */
/* ================================================= */

const canvas =
document.getElementById("network-bg");

/* se não existir canvas, para aqui */
if (canvas) {

    const ctx =
    canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    class Particle {

        constructor() {

            this.x =
            Math.random() * canvas.width;

            this.y =
            Math.random() * canvas.height;

            this.vx =
            (Math.random() - 0.5) * 0.3;

            this.vy =
            (Math.random() - 0.5) * 0.3;

            this.size =
            Math.random() * 2 + 1;
        }

        update() {

            this.x += this.vx;
            this.y += this.vy;

            if (
                this.x < 0 ||
                this.x > canvas.width
            ) {
                this.vx *= -1;
            }

            if (
                this.y < 0 ||
                this.y > canvas.height
            ) {
                this.vy *= -1;
            }
        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
            "rgba(255,255,255,0.35)";

            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) {

        particles.push(
            new Particle()
        );
    }

    function connectParticles() {

        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {

                const dx =
                particles[a].x -
                particles[b].x;

                const dy =
                particles[a].y -
                particles[b].y;

                const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

                if (distance < 150) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.strokeStyle =
                    `rgba(255,255,255,${
                        ((150 - distance) / 150) * 0.15
                    })`;

                    ctx.stroke();
                }
            }
        }
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((p) => {

            p.update();
            p.draw();

        });

        connectParticles();

        requestAnimationFrame(
            animate
        );
    }

    animate();
}

const replayBtn =
document.getElementById("replay-btn");

replayBtn.addEventListener(
  "click",
  () => {
    document
      .querySelectorAll(
        ".prod, .copy, .logo, .cta"
      )
      .forEach(el => {

        el.style.animation = "none";

        void el.offsetWidth;

        el.style.animation = "";
      });
  }
)

/* ================================================= */
/* VIEW SWITCHER */
/* ================================================= */

const viewButtons =
document.querySelectorAll(
    ".view-btn"
);

const allPreview =
document.getElementById(
    "all-preview"
);

const mobilePreview =
document.getElementById(
    "mobile-preview"
);

const desktopPreview =
document.getElementById(
    "desktop-preview"
);

/* estado inicial */

allPreview.style.display =
"block";

mobilePreview.style.display =
"none";

desktopPreview.style.display =
"none";

viewButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            viewButtons.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            button.classList.add(
                "active"
            );

            const view =
            button.dataset.view;

            allPreview.style.display =
            "none";

            mobilePreview.style.display =
            "none";

            desktopPreview.style.display =
            "none";

            if (view === "all") {

                allPreview.style.display =
                "block";

            }

            if (view === "mobile") {

                mobilePreview.style.display =
                "flex";

            }

            if (view === "desktop") {

                desktopPreview.style.display =
                "block";

            }

        }
    );

});

/* ======================================== */
/* DESKTOP PREVIEW */
/* ======================================== */

function setupDesktopPreview() {

    const topSlot =
    document.getElementById(
        "desktop-top-banner"
    );

    const sideSlot =
    document.getElementById(
        "desktop-side-banner"
    );

    const inlineSlot =
    document.getElementById(
        "desktop-inline-banner"
    );

    const banner728Slot =
    document.getElementById(
        "desktop-728-banner"
    );

    const inscreenSlot =
    document.getElementById(
        "desktop-inscreen-slot"
    );

    const leaderboard =
    document.querySelector(
        '.creative-container[data-format="970x250"]'
    );

    const sidebar =
    document.querySelector(
        '.creative-container[data-format="300x600"]'
    );

    const articleBanner =
    document.querySelector(
        '.creative-container[data-format="300x250"]'
    );

    const banner728 =
    document.querySelector(
        '.creative-container[data-format="728x90"]'
    );

    const inscreenBanner =
    document.querySelector(
        '.creative-container[data-format="980x90"]'
    );

    /* TOPO */

    if (
        leaderboard &&
        topSlot
    ) {

        topSlot.appendChild(
            leaderboard.cloneNode(true)
        );

    }

    /* SIDEBAR */

    if (
        sidebar &&
        sideSlot
    ) {

        sideSlot.appendChild(
            sidebar.cloneNode(true)
        );

    }

    /* 300x250 */

    if (
        articleBanner &&
        inlineSlot
    ) {

        inlineSlot.appendChild(
            articleBanner.cloneNode(true)
        );

    }

    /* 728x90 */

    if (
        banner728 &&
        banner728Slot
    ) {

        banner728Slot.appendChild(
            banner728.cloneNode(true)
        );

    }

    /* IN-SCREEN 980x90 */

    if (
        inscreenBanner &&
        inscreenSlot
    ) {

        inscreenSlot.appendChild(
            inscreenBanner.cloneNode(true)
        );

    }

    console.log(
        "Desktop Preview carregado"
    );

}

setupDesktopPreview();

/* ======================================== */
/* MOBILE PREVIEW */
/* ======================================== */

function setupMobilePreview() {

    const slot1 =
document.getElementById(
    "mobile-banner-slot"
);

const slot2 =
document.getElementById(
    "mobile-banner-slot-2"
);

const slot3 =
document.getElementById(
    "mobile-banner-slot-3"
);

const banner320 =
document.querySelector(
    '.creative-container[data-format="320x100"]'
);

const banner250 =
document.querySelector(
    '.creative-container[data-format="300x250"]'
);

const banner600 =
document.querySelector(
    '.creative-container[data-format="300x600"]'
);

if (banner320 && slot1) {

    slot1.appendChild(
        banner320.cloneNode(true)
    );

}

if (banner250 && slot2) {

    slot2.appendChild(
        banner250.cloneNode(true)
    );

}

if (banner600 && slot3) {

    slot3.appendChild(
        banner600.cloneNode(true)
    );

}
}

const inscreenSlot =
document.getElementById(
    "mobile-inscreen-slot"
);

const banner320x50 =
document.querySelector(
    '.creative-container[data-format="320x50"]'
);

if (
    banner320x50 &&
    inscreenSlot
) {

    inscreenSlot.appendChild(
        banner320x50.cloneNode(true)
    );

}

setupMobilePreview();