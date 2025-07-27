// THEME TOGGLE
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// FILTER LOGIC
const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.collection-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    // highlight active button
    filterButtons.forEach(b => b.classList.remove('bg-brand-accent', 'text-white'));
    btn.classList.add('bg-brand-accent', 'text-white');

    // filter items
    items.forEach(item => {
      const match = category === 'all' || item.classList.contains(category);
      if (match) {
        item.classList.remove('hidden');
        requestAnimationFrame(() => item.classList.add('opacity-100'));
      } else {
        item.classList.remove('opacity-100');
        setTimeout(() => item.classList.add('hidden'), 200);
      }
    });
  });
});
// SALES GRAPH
const salesCanvas = document.getElementById('salesChart');
let salesChart;

function getChartColors() {
  const darkMode = document.documentElement.classList.contains('dark');
  return {
    grid: darkMode ? '#444' : '#eee',
    text: darkMode ? '#ddd' : '#666'
  };
}

if (salesCanvas) {
  const ctx = salesCanvas.getContext('2d');
  const colors = getChartColors();

  salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales (in ₹ Lakhs)',
        data: [5, 8, 6, 10, 12, 15],
        borderColor: '#E94F37',
        backgroundColor: 'rgba(233,79,55,0.2)',
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#E94F37',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: colors.text,
            font: { weight: 'bold' }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: colors.text },
          grid: { color: colors.grid }
        },
        y: {
          ticks: { color: colors.text },
          grid: { color: colors.grid }
        }
      }
    }
  });
}

// Update chart colors on theme toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn?.addEventListener('click', () => {
  if (salesChart) {
    const colors = getChartColors();
    salesChart.options.plugins.legend.labels.color = colors.text;
    salesChart.options.scales.x.ticks.color = colors.text;
    salesChart.options.scales.x.grid.color = colors.grid;
    salesChart.options.scales.y.ticks.color = colors.text;
    salesChart.options.scales.y.grid.color = colors.grid;
    salesChart.update();
  }
});
