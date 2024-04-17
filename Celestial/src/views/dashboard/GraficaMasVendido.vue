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
            endingShape: 'rounded',
            dataLabels: {}
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        title: {
          text: this.title || 'Producto más vendido',
          align: 'left'
        },
        xaxis: {
          categories: ['Papas','Rancheritos','Doritos'],
          labels: {
            show: true,
            rotate: -45,
            style: {
              colors: '#000000'
            }
          }
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
    }
  },
  created() {
    this.fetchMostSoldProductData();
  },
  methods: {
    async fetchMostSoldProductData() {
      try {
        const response = await axios.get('http://localhost:8000/api/graph/most-sold-products');

        const productsData = response.data;

        if (Array.isArray(productsData)) {
          const categories = [];
          const seriesData = [];

          productsData.forEach(product => {
            categories.push(product.product_name);
            seriesData.push(product.total_quantity);
          });

          this.series = [{
            name: 'Total vendido',
            data: seriesData
          }];

          this.chartOptions.xaxis.categories = categories;
        } else {
          console.error('Los datos de productos no son válidos:', productsData);
        }
      } catch (error) {
        console.error('Error al obtener los datos de los productos más vendidos:', error);
      }
    }
  }
};
</script>
