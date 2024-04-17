<template>
    <div>
      <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      title: String
    },
    data() {
      return {
        series: [{
          name: 'Usuarios',
          data: []
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',
          },
          title: {
            text: this.title || 'Usuarios por grupo de edad',
            align: 'left'
          },
          xaxis: {
            categories: ['20-29', 'otros']
          }
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:8000/api/graph/age-groups');
  
          const ageGroupsData = response.data;
  
          if (Array.isArray(ageGroupsData) && ageGroupsData.length > 0) {
            const categories = ageGroupsData.map(item => item.age_group);
            const seriesData = ageGroupsData.map(item => item.user_count);
  
            this.chartOptions.xaxis.categories = categories;
            this.series = [{
              name: 'Usuarios',
              data: seriesData
            }];
          } else {
            console.error('Los datos de grupos de edad no son válidos o están vacíos.');
          }
        } catch (error) {
          console.error('Error al obtener los datos de grupos de edad:', error);
        }
      }
    }
  }
  </script>
  