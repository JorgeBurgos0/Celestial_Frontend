<template>
    <div>
        <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
     
<script>
import axios from 'axios';

export default {
    props: {
        title: String,
        datos: Array,
        categories: Array
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
                    text: this.title || 'Usuarios por género',
                    align: 'left'
                },
                xaxis: {
                    categories: ['Hombres', 'Mujeres']
                }
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                console.error('No se encontró ningún token de acceso en el almacenamiento local.');
                return;
            }

            // Configurar el token de acceso en los encabezados de la solicitud axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axios.get('http://localhost:8000/api/graph/gender')
                .then(response => {
                    const [maleCount, femaleCount] = response.data;
                    this.series = [{
                        name: 'Usuarios',
                        data: [maleCount, femaleCount]
                    }];
                })
                .catch(error => {
                    console.error('Error al obtener los datos de género:', error);
                });
        }
    }
}
</script>
