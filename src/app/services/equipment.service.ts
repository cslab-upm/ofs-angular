import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EquipmentService {
    equipment = [
        {
            name: 'Telescopio Meade',
            model: 'MEADE LX200-ACF',
            description: 'Telescopio comercial más utilizado en investigación.',
            image: 'assets/img/equipment/meade-lx200.jpg',
            type: 'telescope',
            properties: [
                {
                    name: 'Apertura',
                    value: '245mm (10")'
                },
                {
                    name: 'Distancia focal',
                    value: '2500mm'
                },
                {
                    name: 'Relación focal',
                    value: 'f/10'
                }
            ]
        },
        {
            name: 'Cámara DMK',
            model: 'DMK41 02 AU',
            description: 'Cámara profesional para máximo rendimiento en astrofotografía planetaria, lunar y solar.',
            image: 'assets/img/equipment/dmk41.jpg',
            type: 'camera',
            properties: [
                {
                    name: 'Resolución',
                    value: '1280 x 960 píxels'
                },
                {
                    name: 'Frame Rate',
                    value: '15 FPS'
                },
                {
                    name: 'Sensor',
                    value: '1/2 “CCD Sonyy ICX205AL (progressive scan)'
                }
            ]
        },
        {
            name: 'Mobotix Allsky',
            model: 'Mobotix Q25 Hemisferic',
            description: 'Cámara profesional hemisférica para exteriores con lente de ojo de pez.',
            image: 'assets/img/equipment/mobotix-q25.jpg',
            type: 'camera',
            properties: [
                {
                    name: 'Lente',
                    value: 'MX-B016'
                },
                {
                    name: 'Ángulo de lente',
                    value: '180ºx180º'
                },
                {
                    name: 'Relación focal',
                    value: 'f/2.0'
                },
                {
                    name: 'Sensor',
                    value: '1/1.8“ CMOS, 6MP (3072 x 2048), Progressive Scan'
                }
            ]
        },
        {
            name: 'Mobotix M16',
            model: 'Mobotix M16 AllaroundDual',
            description: 'Cámara de videovigilancia Dual, resistente a la intemperie.',
            image: 'assets/img/equipment/mobotix-m16.jpg',
            type: 'camera',
            properties: [
                {
                    name: 'Sensor',
                    value: '1/1.8“ CMOS, 6MP (3072 x 2048), Progressive Scan.'
                }
            ]
        },
        {
            name: 'Webcam',
            model: 'Philips ToUcam PRO',
            description: '',
            image: 'assets/img/equipment/philips-toucam.jpg',
            type: 'camera',
            properties: [
                {
                    name: 'Resolución',
                    value: '1280x960 píxels'
                },
                {
                    name: 'Frame Rate',
                    value: '60 FPS'
                },
                {
                    name: 'Sensor',
                    value: 'CCD'
                }
            ]
        },
        {
            name: 'Meteo Watcher',
            model: 'Meteo Watcher III',
            description: 'Monitor de condiciones medioambientales para observatorios astronómicos.',
            image: 'assets/img/equipment/meteowatcher.jpg',
            type: 'sensor',
            properties: []
        },
        {
            name: 'Estación Meteorológica',
            model: 'Estación Meteorológica',
            description: 'Estación meteorloógica de construcción propia, empleada para la recuperación de datos climáticos en el observatorio.',
            image: 'assets/img/equipment/meteostation.jpg',
            type: 'sensor',
            properties: [
                {
                    name: 'Sensores',
                    value: 'Temperatura, humedad, presión, viento, lluvia.'
                }
            ]
        },
    ];

    getEquipment() {
        return this.equipment;
    }
}