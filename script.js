document.addEventListener('DOMContentLoaded', function () {
    const addCircleBtn = document.getElementById('addCircleBtn');
    const circlesContainer = document.getElementById('circlesContainer');
    const submitBtn = document.getElementById('submitBtn');
    const fractionInput = document.getElementById('fractionInput');
    const scoreContainer = document.getElementById('scoreContainer');

    let circleCount = 0;

    // Function to add a new circle
    function addCircle() {
        console.log("Add Circle Function Called");

        const circleContainer = document.createElement('div');
        circleContainer.className = 'circle-container';

        const circle = document.createElement('div');
        circle.className = 'circle';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove circle';
        removeBtn.addEventListener('click', () => {
            circleContainer.remove();
            circleCount--;
            if (circleCount === 0) {
                submitBtn.style.display = 'none';
            }
        });

        const addSectionBtn = document.createElement('button');
        addSectionBtn.textContent = 'Click to add section';
        addSectionBtn.addEventListener('click', () => addSection(circle));

        const removeSectionBtn = document.createElement('button');
        removeSectionBtn.textContent = 'Click to remove section';
        removeSectionBtn.addEventListener('click', () => removeSection(circle));

        circleContainer.appendChild(circle);
        circleContainer.appendChild(removeBtn);
        circleContainer.appendChild(addSectionBtn);
        circleContainer.appendChild(removeSectionBtn);

        circlesContainer.appendChild(circleContainer);
    }

    // Event listener for the Add Circle button
    addCircleBtn.addEventListener('click', () => {
        console.log("Add Circle Button Clicked");
        addCircle();
        circleCount++;
        if (circleCount > 0) {
            submitBtn.style.display = 'inline-block';
        }
    });

    // Function to add a section to the circle
    function addSection(circle) {
        const section = document.createElement('div');
        section.className = 'circle-section';
        section.style.backgroundColor = 'lightgray';

        section.addEventListener('click', () => {
            section.classList.toggle('active');
        });

        circle.appendChild(section);
    }

    // Function to remove a section from the circle
    function removeSection(circle) {
        const sections = circle.getElementsByClassName('circle-section');
        if (sections.length > 0) {
            sections[sections.length - 1].remove();
        }
    }

    // Event listener for the Submit button
    submitBtn.addEventListener('click', () => {
        console.log("Submit Button Clicked");
        const inputFraction = parseFraction(fractionInput.value);
        const coloredFraction = calculateColoredFraction();

        const score = calculateScore(inputFraction, coloredFraction);

        scoreContainer.textContent = Score: ${score};
    });

    // Function to parse the fraction input
    function parseFraction(fractionString) {
        console.log("Parsing Fraction: ", fractionString);
        let [whole, frac] = fractionString.split(' ');
        let [numerator, denominator] = frac ? frac.split('/') : whole.split('/');
        whole = frac ? parseInt(whole) : 0;
        numerator = parseInt(numerator);
        denominator = parseInt(denominator);
        return { whole, numerator, denominator };
    }

    // Function to calculate the colored fraction
    function calculateColoredFraction() {
        let totalSections = 0;
        let coloredSections = 0;

        const circles = circlesContainer.getElementsByClassName('circle');
        Array.from(circles).forEach(circle => {
            const sections = circle.getElementsByClassName('circle-section');
            totalSections += sections.length;
            Array.from(sections).forEach(section => {
                if (section.classList.contains('active')) {
                    coloredSections++;
                }
            });
        });

        return { numerator: coloredSections, denominator: totalSections };
    }

    // Function to calculate the score based on input fraction and colored fraction
    function calculateScore(input, colored) {
        let score = 0;

        if (input.whole === 0 && colored.denominator === 0) {
            return 0;
        }

        if (colored.numerator === input.numerator) score += 1/2;
        if (colored.denominator === input.denominator) score += 1/2;
        if (input.whole > 0 && colored.numerator / colored.denominator === input.whole) score += 1/2;

        return score;
    }
});