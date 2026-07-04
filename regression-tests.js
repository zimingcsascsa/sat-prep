// Regression Practice Tests — 3 focused tests for Desmos regression mastery
// Questions modeled after real digital SAT Math Module 2 questions
window.REGRESSION_TESTS = [
  // ============================================================
  // TEST 1: LINEAR REGRESSION
  // ============================================================
  {
    id: 'reg_linear',
    name: 'Linear Regression',
    description: '5 questions on linear regression — practice using Desmos for tables, lines of best fit, and predictions',
    badge: '📐 Desmos',
    modules: {
      rw1: [], rw2: [],
      math1: [
        {
          id: 'reg_lin_q1', module: 'math1', questionNumber: 1, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'A researcher collects data on the number of hours students study per week (x) and their GPA (y). The data are shown in the table below.\n\nHours (x): 2, 4, 6, 8, 10\nGPA (y): 2.1, 2.5, 2.8, 3.2, 3.6\n\nA linear regression model is fit to the data. What is the slope of the line of best fit? (Round to 2 decimal places)',
          choices: null, answer: '0.19',
          explanation: 'Using linear regression (y ~ mx + b in Desmos), the slope m ≈ 0.19. This means each additional hour of study per week is associated with a 0.19 increase in GPA.',
          desmosTutorial: {
            title: 'How to find the slope using Desmos',
            steps: [
              'Click the <strong>+</strong> button in Desmos and select <strong>Table</strong>',
              'Enter the x values: 2, 4, 6, 8, 10 in the first column',
              'Enter the y values: 2.1, 2.5, 2.8, 3.2, 3.6 in the second column',
              'In a new expression line, type: <code>y₁ ~ mx₁ + b</code>',
              'Desmos shows the regression equation. The coefficient of x₁ is your slope.',
              'Read the value of <strong>m</strong> from the expression list.'
            ]
          }
        },
        {
          id: 'reg_lin_q2', module: 'math1', questionNumber: 2, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'Using the same data from Question 1:\n\nHours (x): 2, 4, 6, 8, 10\nGPA (y): 2.1, 2.5, 2.8, 3.2, 3.6\n\nWhat GPA does the linear regression model predict for a student who studies 5 hours per week? (Round to 2 decimal places)',
          choices: null, answer: '2.65',
          explanation: 'The regression equation is approximately y = 0.19x + 1.70. At x = 5: y = 0.19(5) + 1.70 = 0.95 + 1.70 = 2.65. (Exact value depends on rounding.)',
          desmosTutorial: {
            title: 'How to make a prediction using Desmos regression',
            steps: [
              'After entering the table and typing <code>y₁ ~ mx₁ + b</code>, read the equation Desmos gives you',
              'In a new expression line, type the full equation with x = 5',
              'For example, if Desmos gives y = 0.185x + 1.72, type: <code>0.185(5) + 1.72</code>',
              'Desmos evaluates it instantly — that\'s your predicted GPA'
            ]
          }
        },
        {
          id: 'reg_lin_q3', module: 'math1', questionNumber: 3, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A scatterplot shows the relationship between the number of hours spent practicing a musical instrument (x) and the score on a proficiency test (y). The line of best fit has the equation y = 8.5x + 42. Which statement best interprets the slope of this line?',
          choices: [
            'A) For each additional hour of practice, the predicted test score increases by 8.5 points.',
            'B) For each additional hour of practice, the predicted test score increases by 42 points.',
            'C) A student who practices 0 hours is predicted to score 8.5 points.',
            'D) The test score increases by 42 points for every 8.5 hours of practice.'
          ],
          answer: 'A',
          explanation: 'In the equation y = 8.5x + 42, the slope is 8.5. This means for each 1-unit increase in x (hours practiced), y (test score) increases by 8.5 points. The y-intercept (42) is the predicted score for 0 hours of practice.',
          desmosTutorial: {
            title: 'How to interpret slope in Desmos',
            steps: [
              'Type the equation <code>y = 8.5x + 42</code> in Desmos',
              'The slope (8.5) is the coefficient of x — it tells you how much y changes for each +1 in x',
              'The y-intercept (42) is the value of y when x = 0',
              'Use the graph to verify: move along the line and check that y increases by 8.5 for every 1 unit increase in x'
            ]
          }
        },
        {
          id: 'reg_lin_q4', module: 'math1', questionNumber: 4, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A study records the outdoor temperature in °F (x) and ice cream sales in dollars (y) for 10 randomly selected days. The regression output shows:\n\ny = 4.2x − 130\nr = 0.91\nR² = 0.8281\n\nWhat is the best interpretation of R² in context?',
          choices: [
            'A) 82.81% of the variation in temperature is explained by ice cream sales.',
            'B) 82.81% of the variation in ice cream sales is explained by the linear relationship with temperature.',
            'C) The correlation between temperature and sales is 0.8281.',
            'D) On 82.81% of days, the prediction is accurate.'
          ],
          answer: 'B',
          explanation: 'R² tells us the proportion of variation in the response variable (y = ice cream sales) that is explained by the linear model with the predictor variable (x = temperature). R² = 0.8281 = 82.81%. Choice A reverses x and y. C confuses r with R². D is not what R² means.',
          desmosTutorial: {
            title: 'How to find R² in Desmos',
            steps: [
              'Enter data in a table and type <code>y₁ ~ mx₁ + b</code>',
              'Click on the regression equation in the expression list on the left',
              'Desmos shows r and R² in the details panel',
              'R² is always between 0 and 1 — multiply by 100 to get a percentage',
              'R² measures how well the line fits the data (higher = better fit)'
            ]
          }
        },
        {
          id: 'reg_lin_q5', module: 'math1', questionNumber: 5, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'hard',
          passage: '',
          stem: 'A linear regression model predicts a student\'s SAT score (y) from the number of practice tests taken (x). The equation is y = 28x + 920. If a student actually scored 1180 after taking 10 practice tests, what is the residual for this student?',
          choices: [
            'A) −20',
            'B) 20',
            'C) 1200',
            'D) −1200'
          ],
          answer: 'A',
          explanation: 'Predicted score = 28(10) + 920 = 280 + 920 = 1200. Residual = actual − predicted = 1180 − 1200 = −20. A negative residual means the model overpredicted.',
          desmosTutorial: {
            title: 'How to calculate residuals in Desmos',
            steps: [
              'Type the regression equation: <code>y = 28x + 920</code>',
              'Type the predicted value at x = 10: <code>28(10) + 920</code> = 1200',
              'Residual = actual y − predicted y = 1180 − 1200 = −20',
              'In Desmos, you can also plot the actual point (10, 1180) to see how far it is from the line'
            ]
          }
        }
      ],
      math2: []
    }
  },

  // ============================================================
  // TEST 2: QUADRATIC & POLYNOMIAL REGRESSION
  // ============================================================
  {
    id: 'reg_quadratic',
    name: 'Quadratic Regression',
    description: '5 questions on quadratic regression — curve fitting, vertex, and real-world parabolic models',
    badge: '📐 Desmos',
    modules: {
      rw1: [], rw2: [],
      math1: [
        {
          id: 'reg_quad_q1', module: 'math1', questionNumber: 1, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'A ball is thrown upward from a platform. Its height h (in feet) after t seconds is recorded:\n\nt: 0, 1, 2, 3, 4, 5\nh: 6, 40, 62, 72, 70, 56\n\nUsing quadratic regression (h = at² + bt + c), what is the value of a? (Round to the nearest integer)',
          choices: null, answer: '-6',
          explanation: 'Quadratic regression gives h = −6t² + 40t + 6. The coefficient a = −6 (negative because the parabola opens downward, representing gravity). Verify: h(0) = 6 ✓, h(1) = −6 + 40 + 6 = 40 ✓, h(3) = −54 + 120 + 6 = 72 ✓.',
          desmosTutorial: {
            title: 'How to do quadratic regression in Desmos',
            steps: [
              'Enter the t values (0,1,2,3,4,5) and h values (6,40,62,72,70,56) in a Desmos table',
              'In a new expression line, type: <code>h₁ ~ at₁² + bt₁ + c</code>',
              'Desmos fits a parabola and shows a, b, and c in the expression list',
              'Read the value of <strong>a</strong> — the coefficient of t²',
              'Negative a means the parabola opens downward (like a thrown ball)'
            ]
          }
        },
        {
          id: 'reg_quad_q2', module: 'math1', questionNumber: 2, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'Using the model h = −6t² + 40t + 6 from Question 1, what is the maximum height the ball reaches?',
          choices: null, answer: '72.67',
          explanation: 'The vertex is at t = −b/(2a) = −40/(2·(−6)) = 40/12 = 10/3 ≈ 3.33 seconds. h(10/3) = −6(100/9) + 40(10/3) + 6 = −200/3 + 400/3 + 6 = 200/3 + 6 = 218/3 ≈ 72.67 feet.',
          desmosTutorial: {
            title: 'How to find the maximum of a parabola in Desmos',
            steps: [
              'Type: <code>h = -6t² + 40t + 6</code>',
              'Click on the <strong>vertex</strong> (highest point) of the parabola',
              'Desmos shows the coordinates — the y-value is the maximum height',
              'Or use the formula: vertex at t = −b/(2a) = −40/(−12) = 3.33'
            ]
          }
        },
        {
          id: 'reg_quad_q3', module: 'math1', questionNumber: 3, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A company\'s profit P (in thousands of dollars) based on the number of units produced x (in hundreds) is modeled by P = −2.5x² + 30x − 40. How many units should the company produce to maximize profit?',
          choices: [
            'A) 300',
            'B) 600',
            'C) 1,000',
            'D) 1,200'
          ],
          answer: 'B',
          explanation: 'The vertex is at x = −b/(2a) = −30/(2·(−2.5)) = −30/(−5) = 6. Since x is in hundreds, 6 × 100 = 600 units. You can verify by clicking the vertex in Desmos.',
          desmosTutorial: {
            title: 'How to find the vertex in Desmos',
            steps: [
              'Type: <code>y = -2.5x² + 30x - 40</code>',
              'Click on the vertex (highest point) of the parabola',
              'Desmos shows the x-coordinate — that\'s the production level that maximizes profit',
              'Remember: x is in hundreds, so multiply by 100 for the actual number of units'
            ]
          }
        },
        {
          id: 'reg_quad_q4', module: 'math1', questionNumber: 4, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A scientist measures the height of a plant (in cm) over several weeks and fits a quadratic model: h = 1.2w² + 0.8w + 3, where w is the number of weeks. According to this model, which of the following is closest to the height at week 6?',
          choices: [
            'A) 36 cm',
            'B) 48 cm',
            'C) 51 cm',
            'D) 60 cm'
          ],
          answer: 'C',
          explanation: 'h(6) = 1.2(36) + 0.8(6) + 3 = 43.2 + 4.8 + 3 = 51 cm. You can verify by typing the equation in Desmos and checking the value at w = 6.',
          desmosTutorial: {
            title: 'How to evaluate a quadratic model in Desmos',
            steps: [
              'Type: <code>h = 1.2w² + 0.8w + 3</code>',
              'In a new line, type: <code>h(6)</code> or <code>1.2(6)² + 0.8(6) + 3</code>',
              'Desmos evaluates it: 43.2 + 4.8 + 3 = 51',
              'You can also click on the curve at w = 6 to see the point'
            ]
          }
        },
        {
          id: 'reg_quad_q5', module: 'math1', questionNumber: 5, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'hard',
          passage: '',
          stem: 'The quadratic regression model y = −0.5x² + 6x + 2 is used to predict values. For which interval is y ≥ 15?',
          choices: [
            'A) 2.8 ≤ x ≤ 9.2',
            'B) 0 ≤ x ≤ 6',
            'C) 3 ≤ x ≤ 9',
            'D) x ≤ 2.8 or x ≥ 9.2'
          ],
          answer: 'A',
          explanation: 'Set y = 15: −0.5x² + 6x + 2 = 15 → −0.5x² + 6x − 13 = 0 → x² − 12x + 26 = 0. Using the quadratic formula: x = (12 ± √(144−104))/2 = (12 ± √40)/2 = 6 ± √10 ≈ 6 ± 3.16. So y ≥ 15 for 2.84 ≤ x ≤ 9.16, approximately 2.8 ≤ x ≤ 9.2.',
          desmosTutorial: {
            title: 'How to solve inequalities with Desmos',
            steps: [
              'Type: <code>y = -0.5x² + 6x + 2</code>',
              'Type: <code>y = 15</code> (a horizontal line)',
              'Click the <strong>intersection points</strong> to find where the curves meet',
              'The parabola is above y = 15 between the two intersection points',
              'Read the x-values of the intersections — that\'s your interval'
            ]
          }
        }
      ],
      math2: []
    }
  },

  // ============================================================
  // TEST 3: EXPONENTIAL & POWER REGRESSION
  // ============================================================
  {
    id: 'reg_exponential',
    name: 'Exponential & Power Regression',
    description: '5 questions on exponential growth/decay and power models — the hardest regression type on the SAT',
    badge: '📐 Desmos',
    modules: {
      rw1: [], rw2: [],
      math1: [
        {
          id: 'reg_exp_q1', module: 'math1', questionNumber: 1, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'A bacteria population is measured at hourly intervals:\n\nHour (x): 0, 1, 2, 3, 4, 5\nPopulation (y): 200, 300, 450, 675, 1013, 1519\n\nUsing exponential regression (y = a·bˣ), what is the growth factor b? (Round to 2 decimal places)',
          choices: null, answer: '1.50',
          explanation: 'Exponential regression gives y ≈ 200 × 1.50ˣ. The growth factor b = 1.50, meaning the population increases by 50% each hour. Verify: 200 × 1.5 = 300 ✓, 300 × 1.5 = 450 ✓.',
          desmosTutorial: {
            title: 'How to do exponential regression in Desmos',
            steps: [
              'Enter the data in a Desmos table (x and y columns)',
              'In a new expression line, type: <code>y₁ ~ a·bˣ¹</code>',
              'Important: use the · symbol (Shift+8) between a and bˣ¹',
              'Desmos shows a (initial value) and b (growth/decay factor)',
              'If b > 1, it\'s growth. If 0 < b < 1, it\'s decay.'
            ]
          }
        },
        {
          id: 'reg_exp_q2', module: 'math1', questionNumber: 2, type: 'gridin',
          skill: 'Problem Solving and Data Analysis', difficulty: 'easy',
          passage: '',
          stem: 'Using the model y = 200 × 1.50ˣ from Question 1, what is the predicted population at hour 8? (Round to the nearest whole number)',
          choices: null, answer: '5126',
          explanation: 'y = 200 × 1.50⁸ = 200 × 25.6289 ≈ 5,126 bacteria.',
          desmosTutorial: {
            title: 'How to evaluate exponential models in Desmos',
            steps: [
              'Type: <code>200 · 1.5^8</code> in a new Desmos expression',
              'Desmos calculates: 200 × 25.6289 ≈ 5125.78',
              'Round to the nearest whole number: 5126',
              'Note: use ^ for exponents in Desmos'
            ]
          }
        },
        {
          id: 'reg_exp_q3', module: 'math1', questionNumber: 3, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A new car depreciates in value over time. The table shows the car\'s value at the end of each year:\n\nYear (x): 0, 1, 2, 3, 4\nValue $ (y): 32,000, 25,600, 20,480, 16,384, 13,107\n\nAn exponential regression model is fit to the data. Which is the best interpretation of the decay factor?',
          choices: [
            'A) The car loses $6,400 each year.',
            'B) The car retains 80% of its value each year, losing 20% annually.',
            'C) The car retains 20% of its value each year.',
            'D) The car\'s value decreases by a factor of 0.20 each year.'
          ],
          answer: 'B',
          explanation: 'Exponential regression gives y ≈ 32,000 × 0.80ˣ. The decay factor b = 0.80 means the car retains 80% of its value each year (loses 20%). Choice A describes linear decay. C and D misinterpret the decay factor.',
          desmosTutorial: {
            title: 'How to interpret exponential decay in Desmos',
            steps: [
              'Enter the data in a Desmos table',
              'Type: <code>y₁ ~ a·bˣ¹</code>',
              'Read b from the expression list — if b = 0.80, the decay rate is 1 − 0.80 = 0.20 = 20%',
              'To convert decay factor to percentage loss: (1 − b) × 100%',
              'To convert to percentage retained: b × 100%'
            ]
          }
        },
        {
          id: 'reg_exp_q4', module: 'math1', questionNumber: 4, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'medium',
          passage: '',
          stem: 'A town\'s population data is modeled using both an exponential and a quadratic regression:\n\nExponential: R² = 0.9753\nQuadratic: R² = 0.9621\n\nWhich conclusion is best supported by these values?',
          choices: [
            'A) The exponential model is a better fit because it has a higher R².',
            'B) The quadratic model is a better fit because it has a lower R².',
            'C) Both models fit equally well because both R² values are close to 1.',
            'D) Neither model is a good fit because R² should be exactly 1.'
          ],
          answer: 'A',
          explanation: 'R² measures how well the model fits the data — higher is better. The exponential model (R² = 0.9753) explains 97.53% of the variation, while the quadratic (R² = 0.9621) explains 96.21%. The exponential model is the better fit, though both are strong.',
          desmosTutorial: {
            title: 'How to compare regression models in Desmos',
            steps: [
              'Enter the data in a table',
              'Type both models: <code>y₁ ~ a·bˣ¹</code> and <code>y₁ ~ ax₁² + bx₁ + c</code>',
              'Click on each regression curve to see its R² value',
              'The model with the <strong>higher R²</strong> is the better fit',
              'R² closer to 1 means the model explains more of the variation in the data'
            ]
          }
        },
        {
          id: 'reg_exp_q5', module: 'math1', questionNumber: 5, type: 'multiplechoice',
          skill: 'Problem Solving and Data Analysis', difficulty: 'hard',
          passage: '',
          stem: 'A scientist models the spread of a virus using the exponential equation P = 500 · 1.03ᵗ, where P is the number of cases and t is the number of days. After how many days will the number of cases first exceed 2,000?',
          choices: [
            'A) 37',
            'B) 42',
            'C) 47',
            'D) 52'
          ],
          answer: 'C',
          explanation: 'Set P = 2000: 2000 = 500 · 1.03ᵗ → 4 = 1.03ᵗ → t = ln(4)/ln(1.03) = 1.3863/0.02956 ≈ 46.9. So t ≈ 47 days. You can verify in Desmos by graphing both P = 500·1.03ˣ and P = 2000 and finding the intersection.',
          desmosTutorial: {
            title: 'How to solve exponential equations in Desmos',
            steps: [
              'Type: <code>y = 500 · 1.03^x</code>',
              'Type: <code>y = 2000</code> (a horizontal line)',
              'Click the <strong>intersection point</strong> of the two curves',
              'The x-value is approximately 46.9, so the answer is 47 days',
              'Desmos solves this graphically — no logarithms needed!'
            ]
          }
        }
      ],
      math2: []
    }
  }
];
