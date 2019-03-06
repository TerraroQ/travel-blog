function initMap() {

    var map;
    //var locations = [
    //    ['<div class="contentBox"><h2>Melbourne!</h2><a href="http://google.nl">Check mah vette verhaal yo</a></div>', 52.3702, 4.8952, '1'],
    //    ['<div class="contentBox"><h2>Melbourne!</h2><a href="http://google.nl">Check mah vette verhaal yo</a></div>', -37.8136, 144.9631, '2'],
    //    ['ja leuk', -33.80010128657071, 151.28747820854187, '3'],
    //    ['nog leuker', -27.4698, 153.0251, '4'],
    //    ['HALLO JAPPIE DE REUS', 16.85, 96.183333, '5']
    //];

    var locations = data;

    function drawMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#d4b78f"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#0d0000"
                        },
                        {
                            "visibility": "on"
                        },
                        {
                            "weight": 1
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98290e"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98290e"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#d4b78f"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#c4b17e"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#0d0000"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#d9be94"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#0d0000"
                        },
                        {
                            "visibility": "off"
                        },
                        {
                            "weight": 2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a8ac91"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98290e"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        });

        var marker, i, infowindow, path;

        for (i = 0; i < locations.length; i++) {
            var index = i+1;
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                label: {
                    text: index.toString()
                },
                map: map
            });

            infowindow = new google.maps.InfoWindow({
                content: locations[i][0]
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i, infowindow) {
                return function () {
                    infowindow.open(map, marker);
                }
            })(marker, i, infowindow));

            google.maps.event.addListener(map, 'click', (function(map, infowindow) {
                return function() {
                    infowindow.close();
                }
            })(map, infowindow));

            google.maps.event.addListener(infowindow, 'domready', (function(infowindow) {
                return function() {
                    var iw = document.getElementsByClassName('gm-style-iw');
                    iw[0].parentElement.className += 'yolo';
                }
            })(infowindow));

        }

        var flightPlanCoordinates = [];

        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
        };

        for (i = 0; i < locations.length; i++) {
            flightPlanCoordinates.push(
                new google.maps.LatLng(locations[i][1], locations[i][2])
            )
        }

        path = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 0,
            strokeWeight: 2,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
        });

        path.setMap(map);
    }

    google.maps.event.addDomListener(window, "load", drawMap);

    function displayInfo() {
        var infoBox = document.getElementById("infoBox");
        for (i = 0; i < locations.length; i++) {
            var node = document.createElement("li");
            node.innerHTML = locations[i][0];
            infoBox.appendChild(node);
        }
    }

    displayInfo();
}