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
    props: {
      title: String
    },
    data() {
      return {
        series: [{
          name: 'Total vendido',
          data: []
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',
          },
          title: {
            text: this.title || 'Producto más frecuente en el carrito',
            align: 'left'
          },
          xaxis: {
            categories: ['Producto más frecuente']
          },
          yaxis: {
            title: {
              text: 'Cantidad'
            }
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
          const response = await axios.get('http://localhost:8000/api/graph/most-placed-product');
  
          const productData = response.data.data;
  
          if (productData) {
            const productName = productData.product_name; // Cambiar a productData.product_id si quieres mostrar el ID en lugar del nombre
            const productQuantity = productData.total_quantity;
  
            this.series = [{
              name: productName,
              data: [productQuantity]
            }];
          } else {
            console.error('No se encontraron datos del producto más frecuente en el carrito.');
          }
        } catch (error) {
          console.error('Error al obtener los datos del producto más frecuente en el carrito:', error);
        }
      }
    }
  };
  </script>
  