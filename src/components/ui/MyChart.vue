<template>
    <canvas ref="chartRef"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import {
  Chart,
  CategoryScale,
  LinearScale,
  ArcElement,
//   BarElement,
  BarController, // ✅ this is the missing piece
  Title,
  Tooltip,
  Legend,
  DoughnutController
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  ArcElement,
//   BarElement,
//   BarController, 
  DoughnutController,// ✅ add this too
  Title,
  Tooltip,
  Legend
);

const budgets = [
        {
            "category": "Entertainment",
            "maximum": 50.00,
            "theme": "#277C78"
        },
        {
            "category": "Bills",
            "maximum": 750.00,
            "theme": "#82C9D7"
        },
        {
            "category": "Dining Out",
            "maximum": 75.00,
            "theme": "#F2CDAC"
        },
        {
            "category": "Personal Care",
            "maximum": 100.00,
            "theme": "#626070"
        }
    ]
  
  // Register the components
//   Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  const chartRef = ref(null);
  
  onMounted(() => {
    if (!chartRef.value) return;
  
    const chart = new Chart(chartRef.value, {
      type: 'doughnut',
      data: {
        labels: budgets.map(b => b.category),
        datasets: [{
          label: '# of Votes',
          data: budgets.map(b => b.maximum),
          backgroundColor: budgets.map(b => b.theme),
          borderWidth:0
        }]
      },
      options: {
        responsive: true,
        cutout: 80,
        plugins:{
            legend: {
                position:'right',
            
            }
        }
      }
    });
  });
  </script>