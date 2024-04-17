<template>
    <div>
      <apexchart
        type="bar"
        :options="chartOptions"
        :series="series"
        width="100%"
        height="400"
      ></apexchart>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        series: [],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          title: {
            text: 'Productos más vendidos por género',
            align: 'left'
          },
          xaxis: {
            categories: ['Hombre', 'Mujer']
          },
          yaxis: {
            title: {
              text: 'Cantidad vendida'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
        }
      };
    },
    created() {
      this.fetchProductsByGender();
    },
    methods: {
      async fetchProductsByGender() {
        try {
          const token = localStorage.getItem('accessToken');
          if (!token) {
            console.error('No se encontró ningún token de acceso en el almacenamiento local.');
            return;
          }
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
          const response = await axios.get('http://localhost:8000/api/graph/products-by-gender');
  
          const productsData = response.data;
  
          if (productsData && productsData.most_sold_product_for_men && productsData.most_sold_product_for_women) {
            const seriesData = [productsData.most_sold_product_for_men.total_quantity, productsData.most_sold_product_for_women.total_quantity];
  
            this.series = [{
              name: 'Total vendido',
              data: seriesData
            }];
          } else {
            console.error('Los datos de productos no son válidos:', productsData);
          }
        } catch (error) {
          console.error('Error al obtener los datos de los productos por género:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para el componente */
  </style>
  