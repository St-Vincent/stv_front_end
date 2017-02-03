// A $( document ).ready() block.
$( document ).ready(function() {
  mapping = {
    infoWindow : new google.maps.InfoWindow(),
    markerGroups : [],
    mapPoint : {
      points: []
    },


    load : function() {
        var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(39.8990597, -86.1751449),
            zoom: 8,
            mapTypeId: 'roadmap'
        });

        for (var i = 0; i < this.mapPoint.points.length; i++) {
            type = '';
            var name = this.mapPoint.points[i].name;
            var address = this.mapPoint.points[i].address;

            var point = new google.maps.LatLng(
            parseFloat(this.mapPoint.points[i].lat),
            parseFloat(this.mapPoint.points[i].long));
            var html = "<b>" + name + "</b> <br/>" + address;
            var marker = this.createMarker(point, name, address, this.mapPoint.points[i].pointImg, map, 'test');
            this.bindInfoWindow(marker, map, this.infoWindow, html);
        }
    },

    createMarker : function(point, name, address, icon, map, type) {
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon,
            type: type
        });
        if (!this.markerGroups[type]) this.markerGroups[type] = [];
        this.markerGroups[type].push(marker);
        var html = "<b>" + name + "</b> <br/>" + address;
        this.bindInfoWindow(marker, map, this.infoWindow, html);
        return marker;
    },

    toggleGroup : function(type) {
        for (var i = 0; i < markerGroups[type].length; i++) {
            var marker = markerGroups[type][i];
            if (!marker.getVisible()) {
                marker.setVisible(true);
            } else {
                marker.setVisible(false);
            }
        }
    },

    bindInfoWindow : function(marker, map, infoWindow, html) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);

        });
    },

  };
});
