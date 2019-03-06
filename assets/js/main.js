function initMap() {

    var map;
    var article;

    if(window.location.hash) {
        var hash = window.location.hash.replace('#','');
    }

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
        var flightPlanCoordinates = [];

        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
        };

        locations.data.sort(function(a, b) {
            return a.id > b.id;
        });


        locations.data.forEach(function (location, i) {

            var obj = location;

            var index = i + 1;
            index = index.toString();

            var formattedDate = obj.date;
            formatDate(formattedDate);

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(obj.longitude, obj.latitude),
                label: {
                    text: index
                },
                map: map
            });

            infowindow = new google.maps.InfoWindow({
                content: "<div class='infowindow'><h2>" + obj.title + "</h2>" + obj.summary + "<a href='#" + obj.id + "' class='read-more' data-id='" + obj.id + "'>" + obj.url + "</a></div>",
                maxWidth: 350
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
                    iw[0].parentElement.className += 'gm-parent';
                }
            })(infowindow));

            google.maps.event.addListener(infowindow,'domready',function(){
                document.querySelector('.infowindow a').addEventListener('click', function() {
                    var id = this.getAttribute('data-id');

                    if (id == location.id) {
                        openPost(location);
                    }
                });
            });

            if(window.location.hash != "") {
                if (obj.id == hash) {
                    openPost(obj);
                }
            }

            flightPlanCoordinates.push(
                new google.maps.LatLng(obj.longitude, obj.latitude)
            );

        });

        path = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: "#98290e",
            strokeOpacity: 0,
            strokeWeight: 2,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }]
        });

        path.setMap(map);
    }

    google.maps.event.addDomListener(window, "load", drawMap);
    google.maps.event.addDomListener(window, "load", manageBlog);

    function manageBlog() {
        locations.data.sort(function(a, b) {
            return a.id < b.id;
        });
        locations.data.forEach(function (location, i) {

            displayInfo(location);

            var links = document.getElementsByClassName('read-more');
            for (var j = 0; j < links.length; j++) {
                var link = links[j];
                link.addEventListener('click', function(e) {
                    // e.preventDefault();
                    var id = this.getAttribute('data-id');

                    if (id == location.id) {
                        openPost(location);
                    }
                }, false);

            }

        });
    }

    function displayInfo(el) {
        var infoBox = document.getElementById("storyList");
        var node = document.createElement("li");
        node.classList.add("story");
        node.innerHTML = "<figure class='story__image' style='background-image:url(" + el.photos[0] +")'></figure>";
        node.innerHTML += "<article class='story__summary'><h2>" + el.title + "</h2>" + el.summary + "<a href='#" + el.id + "' class='read-more' data-id='" + el.id + "'>" + el.url + "</a></article>";
        infoBox.appendChild(node);
    }

    function openPost(el) {
        // article = el;
        var articleBox = document.getElementsByClassName('article-wrapper')[0];
        var bodyText = el.body;
        articleBox.innerHTML = "";
        articleBox.innerHTML += "<header style='background-image: url(" + el.photos[0] + ")'><div class='header-content'><h1>" + el.title + "</h1><date>" + el.date + "</date></div></header><article><ul class='langSelector'><li><a href='#' data-lang='en' class='langBtn active'>EN</a></li><li><a href='#' data-lang='nl' class='langBtn'>NL</a></li></ul><section class='summary'>" + el.summary + "</section><section class='main'>" + el.body + "</section><section class='gallery'><ul></ul></section></article>";
        var langBtn = document.getElementsByClassName('langBtn');
        for (i = 0; i < langBtn.length; i++) {
            langBtn[i].addEventListener('click', function(e) {
                e.preventDefault();
                var lang = this.getAttribute('data-lang');
                if(lang === 'nl') {
                    el.body = 'dikke nerd';
                    this.classList.add('active');
                    langBtn[0].classList.remove('active');
                    articleBox.innerHTML = "<header style='background-image: url(" + el.photos[0] + ")'><div class='header-content'><h1>" + el.title + "</h1><date>" + el.date + "</date></div></header><article><ul class='langSelector'><li><a href='#' data-lang='en' class='langBtn'>EN</a></li><li><a href='#' data-lang='nl' class='langBtn active'>NL</a></li></ul><section class='summary'>" + el.summary + "</section><section class='main'>" + el.body + "</section><section class='gallery'><ul></ul></section></article>";
                } else {
                    el.body = bodyText;
                    this.classList.add('active');
                    langBtn[1].classList.remove('active');
                    articleBox.innerHTML = "<header style='background-image: url(" + el.photos[0] + ")'><div class='header-content'><h1>" + el.title + "</h1><date>" + el.date + "</date></div></header><article><ul class='langSelector'><li><a href='#' data-lang='en' class='langBtn active'>EN</a></li><li><a href='#' data-lang='nl' class='langBtn'>NL</a></li></ul><section class='summary'>" + el.summary + "</section><section class='main'>" + el.body + "</section><section class='gallery'><ul></ul></section></article>";
                }
            })
        }
        var galleryList = document.querySelector('.gallery ul');
        el.photos.forEach(function (photos, i) {
            console.log('hello')
            var photo = document.createElement('li');
            photo.innerHTML = "<img src='" + photos + "' />";
            galleryList.appendChild(photo);
        });
        modal.show();
    }

    function formatDate(value) {
        value = new Date(value);
        return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
    }

    function languageControl () {

    }

}
