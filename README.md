# Restaurants in Zurich

A simple webmap with Leaflet showing restaurants and other food establishments in Zurich City.

- [Demo](https://moosetraveller.github.io/webmap-example)

## Categories

The webmap shows restaurants and other food establishments. Each category (`betriebsart`) has its own color which is determined by `getCategoryColor(category)`.

The restaurants and other food establishments can be filtered using the provided dropdown on the top right of the map.

## Popup

The popup contains the name (`betriebsname`) and the address.

## Dependencies

The webmap is using [Leaflet](https://leafletjs.com), [Leaflet.DonutCluster](https://github.com/kalisio/Leaflet.DonutCluster) and [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster).

## Data
| | |
|----|---|
| Source | [Stadt Zürich](https://data.stadt-zuerich.ch) |
| License | [Creative Commons CCZero](http://opendefinition.org/licenses/cc-zero/) |

A copy of the data can be found here [`data/stp.gastwirtschaftsbetriebe.json`](/data/stp.gastwirtschaftsbetriebe.json) (as of April 18, 2024) and [`data/stzh.adm_stadtkreise_a.json`](/data/stzh.adm_stadtkreise_a.json) (as of April 20, 2024).
