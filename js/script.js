    function createConfetti() {
      const container = document.querySelector('.confetti-container');
      const colors = ['#FFC107', '#E91E63', '#03A9F4', '#4CAF50', '#FFEB3B', '#FF5722'];
      const confettiCount = 500;

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 10}px`;  
        // Width between 10px and 20px
        confetti.style.height = `${Math.random() * 10 + 10}px`; 
        // Height between 10px and 20px
        // Random directions and distances for the burst effect
        const x = `${Math.random() * 150 - 100}vw`;  
        // X-axis direction between -100vw to 100vw
        const y = `${Math.random() * 150 - 100}vh`;
        // Y-axis direction between -100vh to 100vh
        confetti.style.setProperty('--x', x);
        confetti.style.setProperty('--y', y);

        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;  
         // Stagger the bursts slightly
        container.appendChild(confetti);
      }
    }


    function urlConfigurer(condition){
      let url="https://www.itiger.com/au/marketing/50tesla?lang=en_US&invite=aufinny";
      switch(condition){
      case 1:
        return url+"he";
        break;
      case 2:
        return url+"she";
        break;
      case 3:
        return url+"hed";
        break;
      case 4:
        return url+"hep";
        break;
      case 5:
        return url+"hel";
        break;
      case 6:
        return url+"heq";
        break;

      default:
        return url;
        break;
      }
    }


    

    var imgElement = '<img class="lottery" src="img/lottery.png" alt="Tiger Wheel">';
    var initialPage = document.getElementById('initialPage');
    var secondPage = document.getElementById('secondPage');
    const wheel = document.getElementById("wheel");
    const spinBtn = document.getElementById("spin-btn");
    const finalValue = document.getElementById("final-value");
    //Object that stores values of minimum and maximum angle for a value
    const rotationValues = [
      { minDegree: 0, maxDegree: 30, value: 2 },
      { minDegree: 31, maxDegree: 90, value: 1 },
      { minDegree: 91, maxDegree: 150, value: 6 },
      { minDegree: 151, maxDegree: 210, value: 5 },
      { minDegree: 211, maxDegree: 270, value: 4 },
      { minDegree: 271, maxDegree: 330, value: 3 },
      { minDegree: 331, maxDegree: 360, value: 2 },
      ];
      //Size of each piece
    const data = [16, 16, 16, 16, 16, 16];
    //background color for each piece
    var pieColors = [
      "#cfc804",
      "#ffffff",
      "#cfc804",
      "#ffffff",
      "#cfc804",
      "#ffffff",
      "#cfc804",
      "#ffffff"
      ];
//Create chart
    let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
      plugins: [ChartDataLabels],
  //Chart Type Pie
      type: "pie",
      data: {
    //Labels(values which are to be displayed on chart)
        labels: ["Tesla", "$50 shares", "1 BTC", "$100", "Tiger", "Lion is the king"],
    //Settings for dataset/pie
        datasets: [
        {
          backgroundColor: pieColors,
          data: data,
        },
        ],
      },
      options: {
    //Responsive chart
        responsive: true,
        borderColor:"black",
        maintainAspectRatio: true,
        animation: { duration: 10 },
        plugins: {
      //hide tooltip and legend
          title: {
            align:"center"
          },
          tooltip: false,
          legend: {
            display: false,
          },
      //display labels inside pie chart
          datalabels: {
            color: "black",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          },
        },
      },
    });

//display value based on the randomAngle
    const valueGenerator = (angleValue) => {
      for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
          finalValue.innerHTML = `<p class='heartbeat'>Congratulations you have won: <br> <b>50 tesla shares</b> </p>`+imgElement;
          initialPage.classList.add('fade-out');



          const link = document.getElementById('dynamicLink');

          let urlSetter=urlConfigurer(i.value);
          alert(urlSetter)

          if (true) {
            link.href = 'https://www.itiger.com/au/marketing/50tesla?lang=en_US&invite=aufinny';
          }



      //hiding initial page and showing the next one

          setTimeout(function() {
            secondPage.style.display="block";
            initialPage.style.display="none";
            createConfetti();
            setInterval(createConfetti, 4000); 

          }, 2000);


          spinBtn.disabled = false;
          break;
        }
      }
    };

//Spinner count
    let count = 0;
//100 rotations for animation and last rotation for result
    let resultValue = 101;
//Start spinning
    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
  //Empty final value
      finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
      let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
      let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
        myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
        myChart.update();
    //If rotation>360 reset it back to 0
        if (myChart.options.rotation >= 360) {
          count += 1;
          resultValue -= 5;
          myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
          valueGenerator(randomDegree);
          clearInterval(rotationInterval);
          count = 0;
          resultValue = 101;
        }
      }, 10);
    });
